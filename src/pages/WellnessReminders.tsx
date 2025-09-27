import { useState } from "react";
import { Bell, Droplets, Pill, Moon, Activity, Plus, Clock, CheckCircle, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WellnessReminders() {
  const [activeReminders, setActiveReminders] = useState({
    hydration: true,
    medication: true,
    meditation: true,
    exercise: false,
    sleep: true
  });

  const dailyGoals = {
    water: { current: 6, target: 8, unit: "glasses" },
    medication: { current: 2, target: 3, unit: "doses taken" },
    meditation: { current: 15, target: 20, unit: "minutes" },
    steps: { current: 7245, target: 10000, unit: "steps" },
    sleep: { current: 7.2, target: 8, unit: "hours" }
  };

  const todayReminders = [
    {
      id: 1,
      type: "hydration",
      title: "Drink Water",
      message: "You're due for your next glass of water",
      time: "2:00 PM",
      completed: false,
      urgent: false
    },
    {
      id: 2,
      type: "medication",
      title: "Evening Medication",
      message: "Lisinopril 10mg - Take with dinner",
      time: "6:00 PM",
      completed: false,
      urgent: true
    },
    {
      id: 3,
      type: "meditation",
      title: "Mindfulness Session",
      message: "Take 10 minutes for relaxation and breathing",
      time: "7:30 PM",
      completed: false,
      urgent: false
    },
    {
      id: 4,
      type: "sleep",
      title: "Bedtime Preparation",
      message: "Start winding down for optimal sleep",
      time: "9:30 PM",
      completed: false,
      urgent: false
    }
  ];

  const completedToday = [
    {
      id: 5,
      type: "hydration",
      title: "Morning Hydration",
      completedAt: "8:00 AM"
    },
    {
      id: 6,
      type: "medication",
      title: "Morning Medication",
      completedAt: "8:15 AM"
    },
    {
      id: 7,
      type: "meditation",
      title: "Morning Meditation",
      completedAt: "7:00 AM"
    }
  ];

  const weeklyProgress = [
    { day: "Mon", hydration: 100, medication: 100, meditation: 75, sleep: 90 },
    { day: "Tue", hydration: 87, medication: 100, meditation: 100, sleep: 85 },
    { day: "Wed", hydration: 75, medication: 100, meditation: 50, sleep: 80 },
    { day: "Thu", hydration: 100, medication: 100, meditation: 100, sleep: 95 },
    { day: "Fri", hydration: 62, medication: 100, meditation: 75, sleep: 70 },
    { day: "Sat", hydration: 87, medication: 100, meditation: 100, sleep: 100 },
    { day: "Today", hydration: 75, medication: 67, meditation: 75, sleep: 90 }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hydration': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'medication': return <Pill className="w-4 h-4 text-green-500" />;
      case 'meditation': return <Moon className="w-4 h-4 text-purple-500" />;
      case 'exercise': return <Activity className="w-4 h-4 text-orange-500" />;
      case 'sleep': return <Moon className="w-4 h-4 text-indigo-500" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-green-600";
    if (progress >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const toggleReminder = (type: string) => {
    setActiveReminders(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof activeReminders]
    }));
  };

  const markCompleted = (id: number) => {
    // Implementation would mark reminder as completed
    console.log(`Marked reminder ${id} as completed`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Wellness Reminders</h1>
          <p className="text-muted-foreground">Stay on track with your daily health goals and habits</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </div>

      {/* Daily Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(dailyGoals).map(([key, goal]) => (
          <Card key={key} className="health-card">
            <CardContent className="pt-4">
              <div className="text-center space-y-2">
                {getTypeIcon(key)}
                <div>
                  <div className="text-2xl font-bold">
                    {goal.current}
                    <span className="text-sm font-normal text-muted-foreground">/{goal.target}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{goal.unit}</p>
                </div>
                <Progress 
                  value={(goal.current / goal.target) * 100} 
                  className="h-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Pending Reminders */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Upcoming Reminders
              </CardTitle>
              <CardDescription>Your scheduled wellness activities for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayReminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(reminder.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{reminder.title}</h4>
                          {reminder.urgent && (
                            <Badge variant="destructive" className="text-xs">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{reminder.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {reminder.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markCompleted(reminder.id)}
                        className="gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Done
                      </Button>
                      <Button size="sm" variant="ghost">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Today */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                Completed Today
              </CardTitle>
              <CardDescription>Great job! You've completed these wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedToday.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    {getTypeIcon(item.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">{item.title}</h4>
                      <p className="text-sm text-green-600">Completed at {item.completedAt}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Reminder Settings</CardTitle>
              <CardDescription>Configure which reminders you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(activeReminders).map(([type, isActive]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(type)}
                      <div>
                        <h4 className="font-medium capitalize">{type} Reminders</h4>
                        <p className="text-sm text-muted-foreground">
                          {type === 'hydration' && "Stay hydrated throughout the day"}
                          {type === 'medication' && "Never miss your medication schedule"}
                          {type === 'meditation' && "Daily mindfulness and relaxation"}
                          {type === 'exercise' && "Regular physical activity reminders"}
                          {type === 'sleep' && "Bedtime and sleep quality tracking"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isActive}
                      onCheckedChange={() => toggleReminder(type)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Track your consistency across different wellness activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{day.day}</span>
                      <span className="text-sm text-muted-foreground">
                        Avg: {Math.round((day.hydration + day.medication + day.meditation + day.sleep) / 4)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <div className={`text-xs font-medium ${getProgressColor(day.hydration)}`}>
                          {day.hydration}%
                        </div>
                        <div className="text-xs text-muted-foreground">Water</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xs font-medium ${getProgressColor(day.medication)}`}>
                          {day.medication}%
                        </div>
                        <div className="text-xs text-muted-foreground">Meds</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xs font-medium ${getProgressColor(day.meditation)}`}>
                          {day.meditation}%
                        </div>
                        <div className="text-xs text-muted-foreground">Mindful</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xs font-medium ${getProgressColor(day.sleep)}`}>
                          {day.sleep}%
                        </div>
                        <div className="text-xs text-muted-foreground">Sleep</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Reminder History</CardTitle>
              <CardDescription>Your wellness activity log from the past weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>History tracking will appear here as you complete more activities</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}