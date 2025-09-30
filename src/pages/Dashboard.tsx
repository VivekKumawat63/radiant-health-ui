import { Activity, Heart, FileText, Calendar, TrendingUp, Users, Shield, Pill } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const createAuthorizedFetcher = (token: string | null) => async (url: string) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

export default function Dashboard() {
  const { token, user } = useAuth();
  const fetcher = createAuthorizedFetcher(token);

  const { data: healthMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['healthMetrics'],
    queryFn: () => fetcher("/api/dashboard/health-metrics"),
    enabled: !!token,
  });
  const { data: healthGoals, isLoading: goalsLoading } = useQuery({
    queryKey: ['healthGoals'],
    queryFn: () => fetcher("/api/dashboard/health-goals"),
    enabled: !!token,
  });
  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: () => fetcher("/api/dashboard/recent-activities"),
    enabled: !!token,
  });

  const quickActions = [
    { title: "Schedule Appointment", icon: Calendar, color: "primary" },
    { title: "View Medical Records", icon: FileText, color: "secondary" },
    { title: "Take Health Quiz", icon: Activity, color: "warning" },
    { title: "AI Health Analysis", icon: TrendingUp, color: "success" },
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
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30" variant="secondary">
              View Health Report
            </Button>
            <Button className="border-white/30 text-white hover:bg-white/10" variant="outline">
              Schedule Checkup
            </Button>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsLoading ? Array(4).fill(0).map((_: unknown, index: number) => <Card key={index} className="health-card h-28 animate-pulse bg-muted"></Card>) : healthMetrics?.map((metric: any, index: number) => (
          <Card key={index} className="health-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Heart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge className="mt-2 bg-success-light text-success" variant="secondary">
                {metric.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
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
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-xs text-center">{action.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Goals */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle>Health Goals Progress</CardTitle>
            <CardDescription>Track your wellness journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {goalsLoading || !healthGoals ? (
              <div className="h-24 animate-pulse bg-muted rounded-md"></div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Steps</span>
                    <span>
                      {(healthGoals.steps?.current ?? 0).toLocaleString()} / {(healthGoals.steps?.target ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <Progress
                    value={
                      healthGoals.steps?.current && healthGoals.steps?.target
                        ? (healthGoals.steps.current / healthGoals.steps.target) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Water Intake</span>
                    <span>
                      {healthGoals.water?.current ?? 0} / {healthGoals.water?.target ?? 0} glasses
                    </span>
                  </div>
                  <Progress
                    value={
                      healthGoals.water?.current && healthGoals.water?.target
                        ? (healthGoals.water.current / healthGoals.water.target) * 100
                        : 0
                    }
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Medication Adherence</span>
                    <span>{healthGoals.adherence?.current ?? 0}%</span>
                  </div>
                  <Progress value={healthGoals.adherence?.current ?? 0} className="h-2" />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="health-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest health interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">{activitiesLoading ? <div className="h-32 animate-pulse bg-muted rounded-md"></div> :
              recentActivities?.map((item: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
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
              <div className="text-4xl font-bold text-success mb-2">92%</div>
              <p className="text-sm text-muted-foreground mb-4">Excellent Health</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Physical</span>
                  <span className="text-success">95%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Mental</span>
                  <span className="text-success">88%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Lifestyle</span>
                  <span className="text-warning">85%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription>Your scheduled medical consultations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="text-primary" variant="outline">Cardiology</Badge>
                <span className="text-sm text-muted-foreground">Tomorrow</span>
              </div>
              <h4 className="font-semibold">Dr. Michael Chen</h4>
              <p className="text-sm text-muted-foreground">Heart Health Checkup</p>
              <p className="text-sm">10:30 AM - 11:00 AM</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="text-secondary" variant="outline">General</Badge>
                <span className="text-sm text-muted-foreground">Next Week</span>
              </div>
              <h4 className="font-semibold">Dr. Lisa Rodriguez</h4>
              <p className="text-sm text-muted-foreground">Annual Physical</p>
              <p className="text-sm">2:00 PM - 3:00 PM</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge className="text-warning" variant="outline">Dermatology</Badge>
                <span className="text-sm text-muted-foreground">March 15</span>
              </div>
              <h4 className="font-semibold">Dr. James Park</h4>
              <p className="text-sm text-muted-foreground">Skin Assessment</p>
              <p className="text-sm">9:00 AM - 9:30 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}