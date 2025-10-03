import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthContext";
import {
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Video,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingActions: 0,
    totalConsultations: 0
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchDoctorData();
  }, [user, navigate]);

  const fetchDoctorData = async () => {
    try {
      // Fetch doctor profile
      const { data: profileData, error: profileError } = await supabase
        .from('doctor_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (profileError) throw profileError;

      if (profileData.verified_status !== 'verified') {
        navigate("/doctor/verification-status");
        return;
      }

      setProfile(profileData);

      // Fetch appointments for today
      const today = new Date().toISOString().split('T')[0];
      const { data: appointmentsData } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_name', profileData.id)
        .gte('appointment_date', today)
        .lt('appointment_date', `${today}T23:59:59`);

      // Fetch total consultations
      const { count: totalConsultations } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('doctor_name', profileData.id)
        .eq('status', 'completed');

      setStats({
        todayAppointments: appointmentsData?.length || 0,
        totalPatients: 0, // Will be calculated from unique patient IDs
        pendingActions: appointmentsData?.filter(a => a.status === 'scheduled').length || 0,
        totalConsultations: totalConsultations || profileData.total_consultations || 0
      });
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Pending Actions",
      value: stats.pendingActions,
      icon: AlertCircle,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Total Consultations",
      value: stats.totalConsultations,
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Doctor Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. {profile?.user_id}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="health-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Video className="w-6 h-6" />
              <span>Start Teleconsult</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <FileText className="w-6 h-6" />
              <span>Create Prescription</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>View Patients</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.todayAppointments === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You have {stats.todayAppointments} appointment{stats.todayAppointments !== 1 ? 's' : ''} today
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Specializations</span>
            <div className="flex flex-wrap gap-2">
              {profile?.specializations?.map((spec: string) => (
                <Badge key={spec} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Experience</span>
            <span className="font-medium">{profile?.experience_years} years</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Consultation Fee</span>
            <span className="font-medium">${profile?.consultation_fee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Rating</span>
            <span className="font-medium">{profile?.rating || 'N/A'} ⭐</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/settings")}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
