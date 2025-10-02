import { useState } from "react";
import { FileText, Download, Upload, Search, Filter, Calendar, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MedicalHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  const { data: medicalRecords = [] } = useQuery({
    queryKey: ['medicalHistory', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('medical_history')
        .select('*')
        .eq('user_id', user.id)
        .order('visit_date', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: vaccinations = [] } = useQuery({
    queryKey: ['vaccinations', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('vaccinations')
        .select('*')
        .eq('user_id', user.id)
        .order('date_administered', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: allergies = [] } = useQuery({
    queryKey: ['allergies', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('allergies')
        .select('*')
        .eq('user_id', user.id);
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: medications = [] } = useQuery({
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
          {medicalRecords.length > 0 ? (
            medicalRecords.map((record) => (
              <Card key={record.id} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {record.record_type}
                      </CardTitle>
                      <CardDescription>
                        {record.doctor_name} • {record.visit_date ? new Date(record.visit_date).toLocaleDateString() : 'No date'}
                      </CardDescription>
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
                    {record.notes && (
                      <div>
                        <h4 className="font-semibold mb-2">Notes</h4>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="health-card">
              <CardContent className="pt-6 text-center text-muted-foreground">
                No medical records found. Click "Add Entry" to create your first record.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <div className="grid gap-4">
            {medications.length > 0 ? (
              medications.map((medication: any, index) => (
                <Card key={index} className="health-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Started on {medication.start_date ? new Date(medication.start_date).toLocaleDateString() : 'Unknown'}
                        </p>
                      </div>
                      <Badge variant="secondary">{medication.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="health-card">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No medications found
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          <div className="grid gap-4">
            {allergies.length > 0 ? (
              allergies.map((allergy: any, index) => (
                <Card key={index} className="health-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{allergy.allergen}</h3>
                        <p className="text-sm text-muted-foreground">{allergy.reaction}</p>
                      </div>
                      <Badge variant={getSeverityColor(allergy.severity) as any}>
                        {allergy.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="health-card">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No allergies recorded
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vaccinations" className="space-y-4">
          <div className="grid gap-4">
            {vaccinations.length > 0 ? (
              vaccinations.map((vaccination: any, index) => (
                <Card key={index} className="health-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{vaccination.vaccine_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Last: {vaccination.date_administered ? new Date(vaccination.date_administered).toLocaleDateString() : 'Unknown'}
                        </p>
                        {vaccination.next_dose_date && (
                          <p className="text-xs text-muted-foreground">
                            Next due: {new Date(vaccination.next_dose_date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge variant="secondary">Up to date</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="health-card">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No vaccinations recorded
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}