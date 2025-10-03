import { Bell, Check, X, Calendar, FileText, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Your appointment with Dr. Smith is tomorrow at 2:00 PM",
      time: "2 hours ago",
      read: false,
      icon: Calendar,
      color: "text-primary"
    },
    {
      id: 2,
      type: "medication",
      title: "Medication Reminder",
      message: "Time to take your daily medication",
      time: "4 hours ago",
      read: false,
      icon: Heart,
      color: "text-destructive"
    },
    {
      id: 3,
      type: "document",
      title: "Lab Results Available",
      message: "Your recent lab test results are ready to view",
      time: "1 day ago",
      read: true,
      icon: FileText,
      color: "text-success"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your health activities</p>
        </div>
        <Button variant="outline">
          <Check className="w-4 h-4 mr-2" />
          Mark All as Read
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={`health-card ${!notification.read ? 'border-primary' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-muted ${notification.color}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default" className="bg-primary">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="health-card">
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up! Check back later for updates.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications.filter(n => !n.read).length > 0 ? (
            notifications.filter(n => !n.read).map((notification) => (
              <Card key={notification.id} className="health-card border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full bg-muted ${notification.color}`}>
                      <notification.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <Badge variant="default" className="bg-primary">New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="health-card">
              <CardContent className="py-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Unread Notifications</h3>
                <p className="text-muted-foreground">
                  You're all caught up!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {notifications.filter(n => n.read).map((notification) => (
            <Card key={notification.id} className="health-card">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full bg-muted ${notification.color}`}>
                    <notification.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
