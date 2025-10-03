import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Psychiatrist",
  "Neurologist",
  "Gynecologist",
  "Dentist",
  "ENT Specialist"
];

const LANGUAGES = ["English", "Hindi", "Spanish", "French", "German", "Mandarin"];

export default function DoctorRegister() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Basic info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  // Professional info
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [experienceYears, setExperienceYears] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [consultationFee, setConsultationFee] = useState("");
  const [teleconsultAvailable, setTeleconsultAvailable] = useState(false);
  const [workingHours, setWorkingHours] = useState("");

  // Location info
  const [clinicAddress, setClinicAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Files
  const [govIdFile, setGovIdFile] = useState<File | null>(null);
  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSpecializations.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one specialization",
        variant: "destructive"
      });
      return;
    }

    if (!govIdFile || !degreeFile || !licenseFile) {
      toast({
        title: "Error",
        description: "Please upload all required documents",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // 1. Sign up the user
      const { error: signUpError } = await signUp(email, password, fullName, "doctor");
      
      if (signUpError) {
        toast({
          title: "Signup Error",
          description: signUpError.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // 2. Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not found after signup");
      }

      // 3. Upload files
      setUploadingFiles(true);
      const uploadFile = async (file: File, type: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${type}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('doctor-credentials')
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('doctor-credentials')
          .getPublicUrl(fileName);

        return { url: publicUrl, name: file.name };
      };

      const [govId, degree, license] = await Promise.all([
        uploadFile(govIdFile, 'government_id'),
        uploadFile(degreeFile, 'degree'),
        uploadFile(licenseFile, 'medical_license')
      ]);

      // 4. Create doctor profile
      const { data: doctorProfile, error: profileError } = await supabase
        .from('doctor_profiles')
        .insert({
          user_id: user.id,
          specializations: selectedSpecializations,
          experience_years: parseInt(experienceYears),
          languages: selectedLanguages,
          consultation_fee: consultationFee ? parseFloat(consultationFee) : null,
          teleconsult_available: teleconsultAvailable,
          working_hours: workingHours ? JSON.parse(workingHours) : null,
          clinic_address: clinicAddress,
          clinic_latitude: latitude ? parseFloat(latitude) : null,
          clinic_longitude: longitude ? parseFloat(longitude) : null,
          bio,
          verified_status: 'pending'
        })
        .select()
        .single();

      if (profileError) throw profileError;

      // 5. Create credential records
      const credentials = [
        { type: 'government_id', file: govId },
        { type: 'degree', file: degree },
        { type: 'medical_license', file: license }
      ];

      for (const cred of credentials) {
        const { error: credError } = await supabase
          .from('doctor_credentials')
          .insert({
            doctor_id: doctorProfile.id,
            credential_type: cred.type,
            file_url: cred.file.url,
            file_name: cred.file.name,
            verification_status: 'pending'
          });

        if (credError) throw credError;
      }

      toast({
        title: "Registration Successful",
        description: "Your profile is under review. You'll be notified once verified.",
      });

      navigate("/doctor/verification-status");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Error",
        description: error.message || "Failed to complete registration",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setUploadingFiles(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text">Doctor Registration</CardTitle>
            <p className="text-muted-foreground">Complete your profile to get verified</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell patients about yourself..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Professional Information</h3>
                <div>
                  <Label>Specializations *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {SPECIALIZATIONS.map((spec) => (
                      <div key={spec} className="flex items-center space-x-2">
                        <Checkbox
                          id={spec}
                          checked={selectedSpecializations.includes(spec)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSpecializations([...selectedSpecializations, spec]);
                            } else {
                              setSelectedSpecializations(
                                selectedSpecializations.filter((s) => s !== spec)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={spec} className="text-sm font-normal cursor-pointer">
                          {spec}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fee">Consultation Fee ($)</Label>
                    <Input
                      id="fee"
                      type="number"
                      step="0.01"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Languages Spoken *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {LANGUAGES.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang}
                          checked={selectedLanguages.includes(lang)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLanguages([...selectedLanguages, lang]);
                            } else {
                              setSelectedLanguages(
                                selectedLanguages.filter((l) => l !== lang)
                              );
                            }
                          }}
                        />
                        <Label htmlFor={lang} className="text-sm font-normal cursor-pointer">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teleconsult"
                    checked={teleconsultAvailable}
                    onCheckedChange={(checked) => setTeleconsultAvailable(checked as boolean)}
                  />
                  <Label htmlFor="teleconsult" className="font-normal cursor-pointer">
                    Available for teleconsultation
                  </Label>
                </div>
              </div>

              {/* Clinic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Clinic Information</h3>
                <div>
                  <Label htmlFor="address">Clinic Address</Label>
                  <Input
                    id="address"
                    value={clinicAddress}
                    onChange={(e) => setClinicAddress(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      type="number"
                      step="0.000001"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      type="number"
                      step="0.000001"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents *</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="govId">Government ID</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="govId"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setGovIdFile(e.target.files?.[0] || null)}
                        required
                      />
                      {govIdFile && <Upload className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree Certificate</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="degree"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setDegreeFile(e.target.files?.[0] || null)}
                        required
                      />
                      {degreeFile && <Upload className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="license">Medical License</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        id="license"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
                        required
                      />
                      {licenseFile && <Upload className="w-4 h-4 text-green-500" />}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading || uploadingFiles}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploadingFiles ? "Uploading documents..." : "Creating profile..."}
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
