-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'doctor', 'patient');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create doctor_profiles table
CREATE TABLE public.doctor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  specializations TEXT[] NOT NULL,
  experience_years INTEGER NOT NULL,
  languages TEXT[] NOT NULL,
  consultation_fee NUMERIC(10, 2),
  teleconsult_available BOOLEAN DEFAULT false,
  working_hours JSONB,
  clinic_address TEXT,
  clinic_latitude NUMERIC(10, 8),
  clinic_longitude NUMERIC(11, 8),
  bio TEXT,
  verified_status TEXT DEFAULT 'pending' CHECK (verified_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,
  verifier_notes TEXT,
  rating NUMERIC(3, 2) DEFAULT 0,
  total_consultations INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;

-- Create doctor_credentials table
CREATE TABLE public.doctor_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctor_profiles(id) ON DELETE CASCADE NOT NULL,
  credential_type TEXT NOT NULL CHECK (credential_type IN ('government_id', 'degree', 'medical_license')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  extracted_data JSONB,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_notes TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  verified_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.doctor_credentials ENABLE ROW LEVEL SECURITY;

-- Create consent_logs table
CREATE TABLE public.consent_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctor_profiles(user_id) ON DELETE CASCADE NOT NULL,
  consent_given BOOLEAN NOT NULL,
  consent_type TEXT NOT NULL,
  purpose TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  revoked_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.consent_logs ENABLE ROW LEVEL SECURITY;

-- Create audits table
CREATE TABLE public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('doctor-credentials', 'doctor-credentials', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for doctor_profiles
CREATE POLICY "Anyone can view verified doctors"
ON public.doctor_profiles FOR SELECT
USING (verified_status = 'verified');

CREATE POLICY "Doctors can view their own profile"
ON public.doctor_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update their own profile"
ON public.doctor_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert their own profile"
ON public.doctor_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all doctor profiles"
ON public.doctor_profiles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for doctor_credentials
CREATE POLICY "Doctors can view their own credentials"
ON public.doctor_credentials FOR SELECT
USING (
  doctor_id IN (
    SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Doctors can insert their own credentials"
ON public.doctor_credentials FOR INSERT
WITH CHECK (
  doctor_id IN (
    SELECT id FROM public.doctor_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage all credentials"
ON public.doctor_credentials FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for consent_logs
CREATE POLICY "Patients can view their own consent logs"
ON public.consent_logs FOR SELECT
USING (auth.uid() = patient_id);

CREATE POLICY "Doctors can view consents given to them"
ON public.consent_logs FOR SELECT
USING (
  doctor_id IN (
    SELECT user_id FROM public.doctor_profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Patients can manage their own consent"
ON public.consent_logs FOR INSERT
WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Patients can revoke their own consent"
ON public.consent_logs FOR UPDATE
USING (auth.uid() = patient_id);

-- RLS Policies for audits
CREATE POLICY "Admins can view all audits"
ON public.audits FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own audit logs"
ON public.audits FOR SELECT
USING (auth.uid() = user_id);

-- Storage policies for doctor credentials
CREATE POLICY "Doctors can upload their own credentials"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'doctor-credentials' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Doctors can view their own credentials"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'doctor-credentials' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can view all doctor credentials"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'doctor-credentials' AND
  public.has_role(auth.uid(), 'admin')
);

-- Update handle_new_user to create user_role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role app_role;
BEGIN
  -- Get role from metadata, default to patient
  user_role := COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'patient');
  
  -- Insert profile
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient')
  );
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role);
  
  RETURN NEW;
END;
$$;

-- Trigger for updating doctor_profiles updated_at
CREATE TRIGGER update_doctor_profiles_updated_at
BEFORE UPDATE ON public.doctor_profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();