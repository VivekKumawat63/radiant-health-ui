import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthContext";
import { CheckCircle, XCircle, Clock, FileText, Loader2 } from "lucide-react";

export default function DoctorVerificationStatus() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [credentials, setCredentials] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchVerificationStatus();
  }, [user, navigate]);

  const fetchVerificationStatus = async () => {
    try {
      // Fetch doctor profile
      const { data: profileData, error: profileError } = await supabase
        .from('doctor_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch credentials
      const { data: credData, error: credError } = await supabase
        .from('doctor_credentials')
        .select('*')
        .eq('doctor_id', profileData.id);

      if (credError) throw credError;
      setCredentials(credData || []);
    } catch (error) {
      console.error("Error fetching verification status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      'verified': 'default',
      'approved': 'default',
      'pending': 'secondary',
      'rejected': 'destructive'
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground mb-4">
              No doctor profile found. Please complete your registration.
            </p>
            <Button onClick={() => navigate("/doctor/register")}>
              Complete Registration
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text">Verification Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Status */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(profile.verified_status)}
                <div>
                  <h3 className="font-semibold">Profile Status</h3>
                  <p className="text-sm text-muted-foreground">
                    {profile.verified_status === 'pending' && "Your profile is under review"}
                    {profile.verified_status === 'verified' && "Your profile has been verified"}
                    {profile.verified_status === 'rejected' && "Your profile was rejected"}
                  </p>
                </div>
              </div>
              {getStatusBadge(profile.verified_status)}
            </div>

            {/* Verifier Notes */}
            {profile.verifier_notes && (
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Admin Notes</h4>
                <p className="text-sm text-muted-foreground">{profile.verifier_notes}</p>
              </div>
            )}

            {/* Credentials Status */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Document Verification</h3>
              <div className="space-y-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {cred.credential_type.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </p>
                        <p className="text-sm text-muted-foreground">{cred.file_name}</p>
                        {cred.verification_notes && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Note: {cred.verification_notes}
                          </p>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(cred.verification_status)}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {profile.verified_status === 'verified' && (
                <Button onClick={() => navigate("/doctor/dashboard")} className="flex-1">
                  Go to Dashboard
                </Button>
              )}
              {profile.verified_status === 'rejected' && (
                <Button onClick={() => navigate("/doctor/register")} className="flex-1">
                  Update Profile
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
