-- Drop the existing separate trigger for sample data
DROP TRIGGER IF EXISTS create_sample_data_on_signup ON auth.users;

-- Update handle_new_user to create profile AND sample data in one transaction
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role text;
BEGIN
  -- Insert profile first
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'patient')
  );

  -- Get the user's role
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');
  
  -- Only create sample data for patients
  IF user_role = 'patient' THEN
    -- Add sample medical history records
    INSERT INTO public.medical_history (user_id, record_type, doctor_name, visit_date, diagnosis, notes, status) VALUES
    (NEW.id, 'General Checkup', 'Dr. Sarah Wilson', CURRENT_DATE - INTERVAL '30 days', 'Routine Health Assessment', 'Patient showing excellent health indicators. Blood pressure normal, heart rate steady.', 'completed'),
    (NEW.id, 'Cardiology', 'Dr. Michael Chen', CURRENT_DATE - INTERVAL '60 days', 'Heart Health Monitoring', 'ECG results normal. Recommended continued monitoring and regular exercise.', 'completed'),
    (NEW.id, 'Blood Work', 'Dr. Lisa Rodriguez', CURRENT_DATE - INTERVAL '90 days', 'Annual Lab Panel', 'All values within normal ranges. Vitamin D slightly low, supplementation recommended.', 'completed'),
    (NEW.id, 'Dermatology', 'Dr. James Park', CURRENT_DATE - INTERVAL '45 days', 'Skin Assessment', 'Minor skin irritation observed. Prescribed topical treatment.', 'completed');

    -- Add sample medications
    INSERT INTO public.medications (user_id, name, dosage, frequency, start_date, status) VALUES
    (NEW.id, 'Lisinopril', '10mg', 'Once daily', CURRENT_DATE - INTERVAL '120 days', 'active'),
    (NEW.id, 'Vitamin D3', '2000 IU', 'Once daily', CURRENT_DATE - INTERVAL '90 days', 'active'),
    (NEW.id, 'Omega-3 Fish Oil', '1000mg', 'Twice daily', CURRENT_DATE - INTERVAL '60 days', 'active');

    -- Add sample allergies
    INSERT INTO public.allergies (user_id, allergen, severity, reaction) VALUES
    (NEW.id, 'Penicillin', 'Severe', 'Anaphylaxis'),
    (NEW.id, 'Peanuts', 'Moderate', 'Hives, Swelling'),
    (NEW.id, 'Shellfish', 'Mild', 'Digestive Issues');

    -- Add sample vaccinations
    INSERT INTO public.vaccinations (user_id, vaccine_name, date_administered, next_dose_date, provider) VALUES
    (NEW.id, 'COVID-19 Booster', CURRENT_DATE - INTERVAL '180 days', CURRENT_DATE + INTERVAL '365 days', 'City Health Clinic'),
    (NEW.id, 'Influenza', CURRENT_DATE - INTERVAL '120 days', CURRENT_DATE + INTERVAL '365 days', 'Family Medical Center'),
    (NEW.id, 'Tdap', CURRENT_DATE - INTERVAL '730 days', CURRENT_DATE + INTERVAL '3650 days', 'Community Hospital');

    -- Add sample appointments
    INSERT INTO public.appointments (user_id, doctor_name, specialty, appointment_date, location, status) VALUES
    (NEW.id, 'Dr. Michael Chen', 'Cardiology', CURRENT_TIMESTAMP + INTERVAL '7 days', 'Heart Health Center', 'scheduled'),
    (NEW.id, 'Dr. Lisa Rodriguez', 'General Practice', CURRENT_TIMESTAMP + INTERVAL '14 days', 'Family Medical Center', 'scheduled'),
    (NEW.id, 'Dr. James Park', 'Dermatology', CURRENT_TIMESTAMP + INTERVAL '21 days', 'Skin Care Clinic', 'scheduled');

    -- Add sample health metrics
    INSERT INTO public.health_metrics (user_id, metric_type, value, unit) VALUES
    (NEW.id, 'Blood Pressure', 120, 'mmHg systolic'),
    (NEW.id, 'Heart Rate', 72, 'bpm'),
    (NEW.id, 'Weight', 75, 'kg'),
    (NEW.id, 'Blood Sugar', 95, 'mg/dL');

    -- Add sample documents
    INSERT INTO public.documents (user_id, document_type, title, date, notes) VALUES
    (NEW.id, 'Test Results', 'Blood Test - Complete Panel', CURRENT_DATE - INTERVAL '90 days', 'All values within normal range'),
    (NEW.id, 'Imaging', 'Chest X-Ray', CURRENT_DATE - INTERVAL '120 days', 'Clear, no abnormalities detected'),
    (NEW.id, 'Prescription', 'Medication Prescription', CURRENT_DATE - INTERVAL '60 days', 'Lisinopril 10mg daily'),
    (NEW.id, 'Consultation', 'Cardiology Consultation Notes', CURRENT_DATE - INTERVAL '60 days', 'Heart health assessment - excellent condition');

    -- Add sample diet tracker entries
    INSERT INTO public.diet_tracker (user_id, meal_type, food_items, calories) VALUES
    (NEW.id, 'Breakfast', 'Oatmeal with berries, green tea', 350),
    (NEW.id, 'Lunch', 'Grilled chicken salad, whole grain bread', 520),
    (NEW.id, 'Dinner', 'Salmon with vegetables, brown rice', 680),
    (NEW.id, 'Snack', 'Apple with almond butter', 180);

    -- Add sample wellness reminders
    INSERT INTO public.wellness_reminders (user_id, reminder_type, title, description, scheduled_time, is_active) VALUES
    (NEW.id, 'Medication', 'Take Morning Medications', 'Lisinopril 10mg, Vitamin D3', '08:00:00', true),
    (NEW.id, 'Exercise', 'Daily Walk', '30 minutes of walking', '17:00:00', true),
    (NEW.id, 'Hydration', 'Drink Water', 'Stay hydrated throughout the day', '12:00:00', true),
    (NEW.id, 'Medication', 'Evening Omega-3', 'Take evening fish oil supplement', '20:00:00', true);

    -- Add sample health insights
    INSERT INTO public.health_insights (user_id, insight_type, title, description, severity) VALUES
    (NEW.id, 'Prediction', 'Excellent Heart Health', 'Your cardiovascular metrics are excellent. Continue your current exercise routine.', 'info'),
    (NEW.id, 'Alert', 'Medication Adherence Strong', 'You have maintained 95% medication adherence this month. Great work!', 'info'),
    (NEW.id, 'Recommendation', 'Vitamin D Monitoring', 'Consider regular sun exposure or continued supplementation for optimal Vitamin D levels.', 'info');
  END IF;

  RETURN NEW;
END;
$$;

-- Drop the old sample data function as it's now combined with handle_new_user
DROP FUNCTION IF EXISTS public.create_sample_health_data() CASCADE;