import { Activity, Heart, FileText, Calendar, TrendingUp, Users, Shield, Pill } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: healthMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['healthMetrics', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(4);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .gte('appointment_date', new Date().toISOString())
        .order('appointment_date', { ascending: true })
        .limit(3);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: medications, isLoading: medicationsLoading } = useQuery({
    queryKey: ['medications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('medications')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active');
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const quickActions = [
    { title: "Schedule Appointment", icon: Calendar, color: "primary", path: "/doctors" },
    { title: "View Medical Records", icon: FileText, color: "secondary", path: "/medical-history" },
    { title: "Take Health Quiz", icon: Activity, color: "warning", path: "/health-quiz" },
    { title: "AI Health Analysis", icon: TrendingUp, color: "success", path: "/ai-insights" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-white/90 text-lg">
            Your health journey continues. Here's your daily health overview and personalized insights.
          </p>
          <div className="mt-6 flex gap-4">
            <Button 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30" 
              variant="secondary"
              onClick={() => navigate('/ai-insights')}
            >
              View Health Report
            </Button>
            <Button 
              className="border-white/30 text-white hover:bg-white/10" 
              variant="outline"
              onClick={() => navigate('/doctors')}
            >
              Schedule Checkup
            </Button>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsLoading ? (
          Array(4).fill(0).map((_: unknown, index: number) => (
            <Card key={index} className="health-card h-28 animate-pulse bg-muted"></Card>
          ))
        ) : healthMetrics && healthMetrics.length > 0 ? (
          healthMetrics.map((metric: any) => (
            <Card key={metric.id} className="health-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.metric_type}</CardTitle>
                <Heart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value} {metric.unit}
                </div>
                <Badge className="mt-2 bg-success-light text-success" variant="secondary">
                  Normal
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="health-card col-span-full">
            <CardContent className="pt-6 text-center text-muted-foreground">
              No health metrics recorded yet. Start tracking your health!
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used health management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action: any, index: number) => (
                <Button
                  key={index}
                  className="h-20 flex-col gap-2 hover:shadow-soft transition-all duration-200"
                  variant="outline"
                  onClick={() => navigate(action.path)}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Medications */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Active Medications</CardTitle>
            <CardDescription>Current medication regimen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicationsLoading ? (
              <div className="h-24 animate-pulse bg-muted rounded-md"></div>
            ) : medications && medications.length > 0 ? (
              medications.map((med: any) => (
                <div key={med.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {med.dosage} • {med.frequency}
                    </p>
                  </div>
                  <Badge variant="secondary">{med.status}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                No active medications
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments Summary */}
        <Card className="health-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointmentsLoading ? (
                <div className="h-32 animate-pulse bg-muted rounded-md"></div>
              ) : appointments && appointments.length > 0 ? (
                appointments.map((apt: any) => (
                  <div key={apt.id} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                    <Calendar className="w-8 h-8 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{apt.doctor_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {apt.specialty} • {new Date(apt.appointment_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{apt.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No upcoming appointments scheduled
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Health Status</CardTitle>
            <CardDescription>Overall wellness score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-muted-foreground mb-2">0%</div>
              <p className="text-sm text-muted-foreground mb-4">Start tracking your health</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Physical</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Mental</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Lifestyle</span>
                  <span className="text-muted-foreground">0%</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <Button className="w-full gap-2" onClick={() => navigate('/health-classifier')}>
                  <Activity className="w-4 h-4" />
                  Add Health Data
                </Button>
                <Button variant="outline" className="w-full gap-2" onClick={() => navigate('/medical-history')}>
                  <FileText className="w-4 h-4" />
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}