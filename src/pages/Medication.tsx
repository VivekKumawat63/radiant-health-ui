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

  const currentMedications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      timeOfDay: "Morning (8:00 AM)",
      prescribedBy: "Dr. Michael Chen",
      startDate: "2024-01-10",
      endDate: null,
      purpose: "Blood pressure management",
      sideEffects: ["Dizziness", "Dry cough", "Fatigue"],
      instructions: "Take with or without food. Avoid potassium supplements.",
      adherence: 95,
      remainingDoses: 28,
      nextRefill: "2024-04-10",
      active: true
    },
    {
      id: 2,
      name: "Vitamin D3",
      dosage: "2000 IU",
      frequency: "Once daily",
      timeOfDay: "Morning (8:00 AM)",
      prescribedBy: "Dr. Lisa Rodriguez",
      startDate: "2024-02-15",
      endDate: null,
      purpose: "Vitamin D deficiency",
      sideEffects: ["Mild nausea", "Constipation"],
      instructions: "Take with food for better absorption.",
      adherence: 88,
      remainingDoses: 45,
      nextRefill: "2024-05-15",
      active: true
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      dosage: "1000mg",
      frequency: "Twice daily",
      timeOfDay: "Morning & Evening",
      prescribedBy: "Dr. Sarah Wilson",
      startDate: "2024-03-01",
      endDate: null,
      purpose: "Heart health support",
      sideEffects: ["Fishy aftertaste", "Mild stomach upset"],
      instructions: "Take with meals to reduce stomach upset.",
      adherence: 92,
      remainingDoses: 54,
      nextRefill: "2024-04-30",
      active: true
    }
  ];

  const medicationHistory = [
    {
      id: 4,
      name: "Ibuprofen",
      dosage: "400mg",
      frequency: "As needed",
      prescribedBy: "Dr. James Park",
      startDate: "2024-02-20",
      endDate: "2024-03-05",
      purpose: "Joint pain relief",
      reason: "Completed treatment course",
      active: false
    },
    {
      id: 5,
      name: "Antibiotics (Amoxicillin)",
      dosage: "500mg",
      frequency: "Three times daily",
      prescribedBy: "Dr. Emily Thompson",
      startDate: "2024-01-15",
      endDate: "2024-01-25",
      purpose: "Bacterial infection",
      reason: "Completed antibiotic course",
      active: false
    }
  ];

  const upcomingReminders = [
    {
      medication: "Lisinopril",
      time: "8:00 AM",
      dosage: "10mg",
      status: "due",
      hoursUntil: 2
    },
    {
      medication: "Omega-3 Fish Oil",
      time: "8:00 AM",
      dosage: "1000mg",
      status: "due",
      hoursUntil: 2
    },
    {
      medication: "Omega-3 Fish Oil",
      time: "8:00 PM",
      dosage: "1000mg",
      status: "scheduled",
      hoursUntil: 14
    },
    {
      medication: "Vitamin D3",
      time: "8:00 AM",
      dosage: "2000 IU",
      status: "due",
      hoursUntil: 2
    }
  ];

  const medicationInteractions = [
    {
      medication1: "Lisinopril",
      medication2: "Ibuprofen",
      severity: "Moderate",
      description: "NSAIDs like Ibuprofen may reduce the effectiveness of blood pressure medications.",
      recommendation: "Monitor blood pressure closely when using both medications."
    }
  ];

  const adherenceStats = {
    overall: 92,
    thisWeek: 95,
    thisMonth: 89,
    missedDoses: 3,
    onTimePercentage: 87
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
          <div className="grid gap-4">
            {currentMedications.map((medication) => (
              <Card key={medication.id} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Pill className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{medication.name}</CardTitle>
                        <CardDescription>
                          {medication.dosage} • {medication.frequency} • {medication.timeOfDay}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Active</Badge>
                      <Switch checked={medication.active} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Medication Details</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Purpose:</strong> {medication.purpose}</div>
                          <div><strong>Prescribed by:</strong> {medication.prescribedBy}</div>
                          <div><strong>Started:</strong> {medication.startDate}</div>
                          <div><strong>Instructions:</strong> {medication.instructions}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Possible Side Effects</h4>
                        <div className="flex flex-wrap gap-1">
                          {medication.sideEffects.map((effect, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Adherence Rate</span>
                          <span className="font-semibold">{medication.adherence}%</span>
                        </div>
                        <Progress value={medication.adherence} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-primary">{medication.remainingDoses}</div>
                          <div className="text-xs text-muted-foreground">Doses Left</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">{medication.nextRefill}</div>
                          <div className="text-xs text-muted-foreground">Next Refill</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Refill Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Medication Schedule
              </CardTitle>
              <CardDescription>Upcoming doses and reminders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-semibold">{reminder.medication}</h4>
                        <p className="text-sm text-muted-foreground">
                          {reminder.dosage} at {reminder.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {reminder.hoursUntil} hours remaining
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(reminder.status) as any}>
                        {reminder.status}
                      </Badge>
                      {reminder.status === 'due' && (
                        <Button size="sm" className="gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Mark Taken
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {medicationHistory.map((medication) => (
              <Card key={medication.id} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Pill className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold">{medication.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {medication.startDate} - {medication.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">Completed</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {medication.reason}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Purpose:</strong> {medication.purpose}</div>
                      <div><strong>Prescribed by:</strong> {medication.prescribedBy}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Drug Interactions
              </CardTitle>
              <CardDescription>Potential interactions between your medications</CardDescription>
            </CardHeader>
            <CardContent>
              {medicationInteractions.length > 0 ? (
                <div className="space-y-4">
                  {medicationInteractions.map((interaction, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">
                            {interaction.medication1} + {interaction.medication2}
                          </h4>
                        </div>
                        <Badge variant={getSeverityColor(interaction.severity) as any}>
                          {interaction.severity} Risk
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {interaction.description}
                      </p>
                      <div className="bg-white/60 p-3 rounded-lg">
                        <h5 className="font-medium text-sm mb-1">Recommendation:</h5>
                        <p className="text-sm text-muted-foreground">
                          {interaction.recommendation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-600 mb-2">No Interactions Detected</h3>
                  <p className="text-sm text-muted-foreground">
                    Your current medications have no known harmful interactions.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}