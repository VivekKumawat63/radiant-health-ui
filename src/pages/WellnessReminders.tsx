import { useState } from "react";
import { Bell, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthContext";

export default function WellnessReminders() {
  const { user } = useAuth();
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Fetch wellness reminders
  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['wellness-reminders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('wellness_reminders')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_time', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const activeReminders = reminders.filter(r => r.is_active);

  const handleAddReminder = () => {
    // For now, just show an alert. This can be expanded to open a dialog/form
    alert('Add Reminder feature coming soon! This will open a form to create a new wellness reminder.');
  };

  const EmptyState = ({ message }: { message: string }) => (
    <Card className="health-card">
      <CardContent className="py-12 text-center">
        <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">No Reminders Set</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Button onClick={handleAddReminder}>
          <Plus className="w-4 h-4 mr-2" />
          Add Your First Reminder
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Wellness Reminders</h1>
          <p className="text-muted-foreground">Set and manage your health reminders and daily goals</p>
        </div>
        <Button className="gap-2" onClick={handleAddReminder}>
          <Plus className="w-4 h-4" />
          Add Reminder
        </Button>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading reminders...</p>
            </div>
          ) : activeReminders.length === 0 ? (
            <EmptyState message="Set up wellness reminders to stay on track with your health goals throughout the day." />
          ) : (
            <div className="space-y-4">
              <Card className="health-card">
                <CardHeader>
                  <CardTitle>Upcoming Reminders</CardTitle>
                  <CardDescription>Your scheduled wellness activities for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Bell className="w-5 h-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground">{reminder.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Scheduled: {reminder.scheduled_time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading settings...</p>
            </div>
          ) : reminders.length === 0 ? (
            <EmptyState message="Create reminders to manage your wellness routine and notification preferences." />
          ) : (
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
                <CardDescription>Manage your wellness reminder preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{reminder.title}</p>
                        <p className="text-sm text-muted-foreground">{reminder.reminder_type}</p>
                      </div>
                      <span className={reminder.is_active ? 'text-success' : 'text-muted-foreground'}>
                        {reminder.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {reminders.length === 0 ? (
            <EmptyState message="Start using reminders to track your wellness progress over time." />
          ) : (
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your wellness reminder completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Progress tracking will appear here as you complete your reminders.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {reminders.length === 0 ? (
            <EmptyState message="Your reminder history will appear here once you start using wellness reminders." />
          ) : (
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Past wellness reminder activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No history available yet. Complete reminders to see your activity log.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
