import { useState } from "react";
import { FileText, Download, Upload, Search, Filter, Calendar, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState("");

  const medicalRecords = [
    {
      id: 1,
      date: "2024-03-15",
      type: "General Checkup",
      doctor: "Dr. Sarah Wilson",
      diagnosis: "Routine Health Assessment",
      status: "Completed",
      notes: "Patient showing excellent health indicators. Blood pressure normal, heart rate steady.",
      attachments: ["blood_work_march_2024.pdf", "x_ray_chest.jpg"]
    },
    {
      id: 2,
      date: "2024-02-28",
      type: "Cardiology",
      doctor: "Dr. Michael Chen",
      diagnosis: "Heart Health Monitoring",
      status: "Completed",
      notes: "ECG results normal. Recommended continued monitoring and regular exercise.",
      attachments: ["ecg_february_2024.pdf"]
    },
    {
      id: 3,
      date: "2024-02-10",
      type: "Blood Work",
      doctor: "Dr. Lisa Rodriguez",
      diagnosis: "Annual Lab Panel",
      status: "Completed",
      notes: "All values within normal ranges. Vitamin D slightly low, supplementation recommended.",
      attachments: ["lab_results_feb_2024.pdf"]
    },
    {
      id: 4,
      date: "2024-01-22",
      type: "Dermatology",
      doctor: "Dr. James Park",
      diagnosis: "Skin Assessment",
      status: "Follow-up Required",
      notes: "Minor skin irritation observed. Prescribed topical treatment. Follow-up in 6 weeks.",
      attachments: ["dermoscopy_images.jpg", "prescription_jan_2024.pdf"]
    }
  ];

  const vaccinations = [
    { name: "COVID-19 Booster", date: "2024-01-15", status: "Up to date", nextDue: "2025-01-15" },
    { name: "Influenza", date: "2023-10-20", status: "Up to date", nextDue: "2024-10-20" },
    { name: "Tdap", date: "2022-06-10", status: "Current", nextDue: "2032-06-10" },
    { name: "MMR", date: "1995-05-15", status: "Lifetime", nextDue: "N/A" }
  ];

  const allergies = [
    { allergen: "Penicillin", severity: "Severe", reaction: "Anaphylaxis", dateIdentified: "2010-03-15" },
    { allergen: "Peanuts", severity: "Moderate", reaction: "Hives, Swelling", dateIdentified: "2008-07-22" },
    { allergen: "Shellfish", severity: "Mild", reaction: "Digestive Issues", dateIdentified: "2012-11-08" }
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribedBy: "Dr. Michael Chen", startDate: "2024-01-10" },
    { name: "Vitamin D3", dosage: "2000 IU", frequency: "Once daily", prescribedBy: "Dr. Lisa Rodriguez", startDate: "2024-02-15" },
    { name: "Omega-3", dosage: "1000mg", frequency: "Twice daily", prescribedBy: "Dr. Sarah Wilson", startDate: "2024-03-01" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'follow-up required': return 'warning';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'severe': return 'destructive';
      case 'moderate': return 'warning';
      case 'mild': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Medical History</h1>
          <p className="text-muted-foreground">Complete overview of your health records and medical information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Record
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medical records, diagnoses, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Medical Records Tabs */}
      <Tabs defaultValue="records" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="records">Medical Records</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {medicalRecords.map((record) => (
            <Card key={record.id} className="health-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {record.type}
                    </CardTitle>
                    <CardDescription>{record.doctor} • {record.date}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(record.status) as any}>
                    {record.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Diagnosis</h4>
                    <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{record.notes}</p>
                  </div>
                  {record.attachments.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <Button key={index} variant="outline" size="sm" className="gap-2">
                            <Download className="w-3 h-3" />
                            {attachment}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="grid gap-4">
            {medications.map((medication, index) => (
              <Card key={index} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{medication.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {medication.dosage} • {medication.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Prescribed by {medication.prescribedBy} on {medication.startDate}
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <div className="grid gap-4">
            {allergies.map((allergy, index) => (
              <Card key={index} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{allergy.allergen}</h3>
                      <p className="text-sm text-muted-foreground">{allergy.reaction}</p>
                      <p className="text-xs text-muted-foreground">
                        Identified: {allergy.dateIdentified}
                      </p>
                    </div>
                    <Badge variant={getSeverityColor(allergy.severity) as any}>
                      {allergy.severity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <div className="grid gap-4">
            {vaccinations.map((vaccination, index) => (
              <Card key={index} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{vaccination.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last: {vaccination.date}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next due: {vaccination.nextDue}
                      </p>
                    </div>
                    <Badge variant="secondary">{vaccination.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}