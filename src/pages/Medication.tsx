import { useState } from "react";
import { Pill, Clock, Plus, Search, AlertTriangle, CheckCircle, Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export default function Medication() {
  const [searchTerm, setSearchTerm] = useState("");

  const currentMedications: any[] = [];

  const medicationHistory: any[] = [];

  const upcomingReminders: any[] = [];

  const medicationInteractions: any[] = [];

  const adherenceStats = {
    overall: 0,
    thisWeek: 0,
    thisMonth: 0,
    missedDoses: 0,
    onTimePercentage: 0
  };

  const getAdherenceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'destructive';
      case 'moderate': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due': return 'destructive';
      case 'scheduled': return 'secondary';
      case 'taken': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Medication Management</h1>
          <p className="text-muted-foreground">Track your medications, set reminders, and monitor adherence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Bell className="w-4 h-4" />
            Set Reminder
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Medication
          </Button>
        </div>
      </div>

      {/* Adherence Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className={`text-2xl font-bold ${getAdherenceColor(adherenceStats.overall)}`}>
              {adherenceStats.overall}%
            </div>
            <p className="text-sm text-muted-foreground">Overall Adherence</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className={`text-2xl font-bold ${getAdherenceColor(adherenceStats.thisWeek)}`}>
              {adherenceStats.thisWeek}%
            </div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className={`text-2xl font-bold ${getAdherenceColor(adherenceStats.onTimePercentage)}`}>
              {adherenceStats.onTimePercentage}%
            </div>
            <p className="text-sm text-muted-foreground">On Time</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-red-600">{adherenceStats.missedDoses}</div>
            <p className="text-sm text-muted-foreground">Missed Doses</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">{currentMedications.length}</div>
            <p className="text-sm text-muted-foreground">Active Meds</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search medications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">Current Medications</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Medications Yet</h3>
            <p className="text-muted-foreground mb-6">Start tracking your medications to manage your health better</p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add First Medication
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reminders Set</h3>
            <p className="text-muted-foreground mb-6">Set medication reminders to never miss a dose</p>
            <Button variant="outline" className="gap-2">
              <Bell className="w-4 h-4" />
              Set First Reminder
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Medication History</h3>
            <p className="text-muted-foreground">Your past medications will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-600 mb-2">No Interactions to Check</h3>
            <p className="text-muted-foreground">Add medications to check for potential drug interactions</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}