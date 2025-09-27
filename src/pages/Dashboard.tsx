import { Activity, Heart, FileText, Calendar, TrendingUp, Users, Shield, Pill } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const healthMetrics = [
    { label: "Heart Rate", value: "72 BPM", status: "Normal", color: "success" },
    { label: "Blood Pressure", value: "120/80", status: "Optimal", color: "success" },
    { label: "Weight", value: "68.5 kg", status: "Healthy", color: "success" },
    { label: "BMI", value: "22.4", status: "Normal", color: "success" },
  ];

  const quickActions = [
    { title: "Schedule Appointment", icon: Calendar, color: "primary" },
    { title: "View Medical Records", icon: FileText, color: "secondary" },
    { title: "Take Health Quiz", icon: Activity, color: "warning" },
    { title: "AI Health Analysis", icon: TrendingUp, color: "success" },
  ];

  const recentActivities = [
    { activity: "Blood pressure reading recorded", time: "2 hours ago", type: "measurement" },
    { activity: "Medication reminder completed", time: "4 hours ago", type: "medication" },
    { activity: "Health quiz completed", time: "1 day ago", type: "quiz" },
    { activity: "Doctor appointment scheduled", time: "2 days ago", type: "appointment" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-hero rounded-xl p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
          <p className="text-white/90 text-lg">
            Your health journey continues. Here's your daily health overview and personalized insights.
          </p>
          <div className="mt-6 flex gap-4">
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              View Health Report
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Schedule Checkup
            </Button>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="health-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <Heart className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge variant="secondary" className="mt-2 bg-success-light text-success">
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
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:shadow-soft transition-all duration-200"
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
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Daily Steps</span>
                <span>7,245 / 10,000</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Water Intake</span>
                <span>6 / 8 glasses</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Medication Adherence</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
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
            <div className="space-y-4">
              {recentActivities.map((item, index) => (
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
                <Badge variant="outline" className="text-primary">Cardiology</Badge>
                <span className="text-sm text-muted-foreground">Tomorrow</span>
              </div>
              <h4 className="font-semibold">Dr. Michael Chen</h4>
              <p className="text-sm text-muted-foreground">Heart Health Checkup</p>
              <p className="text-sm">10:30 AM - 11:00 AM</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-secondary">General</Badge>
                <span className="text-sm text-muted-foreground">Next Week</span>
              </div>
              <h4 className="font-semibold">Dr. Lisa Rodriguez</h4>
              <p className="text-sm text-muted-foreground">Annual Physical</p>
              <p className="text-sm">2:00 PM - 3:00 PM</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-warning">Dermatology</Badge>
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