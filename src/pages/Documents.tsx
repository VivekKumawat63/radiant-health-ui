import { useState } from "react";
import { FileText, Upload, Download, Search, Filter, Eye, Share2, Plus, FolderOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: 1,
      name: "Blood Test Results - March 2024",
      type: "Lab Results",
      date: "2024-03-15",
      size: "2.4 MB",
      category: "test-results",
      doctor: "Dr. Lisa Rodriguez",
      status: "Recent",
      description: "Complete blood panel including CBC, lipid profile, and metabolic panel"
    },
    {
      id: 2,
      name: "Chest X-Ray Report",
      type: "Imaging",
      date: "2024-03-10",
      size: "5.8 MB",
      category: "imaging",
      doctor: "Dr. Michael Chen",
      status: "Normal",
      description: "Routine chest X-ray showing clear lungs and normal heart size"
    },
    {
      id: 3,
      name: "Vaccination Certificate",
      type: "Certificate",
      date: "2024-01-15",
      size: "1.2 MB",
      category: "certificates",
      doctor: "Dr. Sarah Wilson",
      status: "Valid",
      description: "COVID-19 booster vaccination certificate"
    },
    {
      id: 4,
      name: "Prescription - Lisinopril",
      type: "Prescription",
      date: "2024-03-01",
      size: "0.8 MB",
      category: "prescriptions",
      doctor: "Dr. Michael Chen",
      status: "Active",
      description: "Blood pressure medication prescription - 10mg daily"
    },
    {
      id: 5,
      name: "Cardiology Consultation Notes",
      type: "Consultation",
      date: "2024-02-28",
      size: "1.5 MB",
      category: "consultations",
      doctor: "Dr. Michael Chen",
      status: "Completed",
      description: "Follow-up consultation notes for heart health monitoring"
    },
    {
      id: 6,
      name: "Insurance Card - Front & Back",
      type: "Insurance",
      date: "2024-01-01",
      size: "0.9 MB",
      category: "insurance",
      doctor: "N/A",
      status: "Current",
      description: "Health insurance card copies for 2024"
    }
  ];

  const categories = [
    { id: "all", name: "All Documents", count: documents.length },
    { id: "test-results", name: "Test Results", count: documents.filter(d => d.category === "test-results").length },
    { id: "imaging", name: "Imaging", count: documents.filter(d => d.category === "imaging").length },
    { id: "prescriptions", name: "Prescriptions", count: documents.filter(d => d.category === "prescriptions").length },
    { id: "certificates", name: "Certificates", count: documents.filter(d => d.category === "certificates").length },
    { id: "consultations", name: "Consultations", count: documents.filter(d => d.category === "consultations").length },
    { id: "insurance", name: "Insurance", count: documents.filter(d => d.category === "insurance").length }
  ];

  const recentUploads = [
    { name: "ECG_Report_March2024.pdf", uploadedAt: "2 hours ago" },
    { name: "Prescription_Updates.pdf", uploadedAt: "1 day ago" },
    { name: "Lab_Results_Summary.pdf", uploadedAt: "3 days ago" }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'recent':
      case 'normal':
      case 'valid':
      case 'active':
      case 'current':
      case 'completed':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'expired':
      case 'invalid':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-primary" />;
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Medical Documents</h1>
          <p className="text-muted-foreground">Organize and access all your health documents in one place</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Folder
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-primary">{documents.length}</div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-success">3</div>
            <p className="text-sm text-muted-foreground">Recent Uploads</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-sm text-muted-foreground">Shared Documents</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-secondary">12.5</div>
            <p className="text-sm text-muted-foreground">Total Size (MB)</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents, types, doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getFileIcon(document.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold">{document.name}</h3>
                        <p className="text-sm text-muted-foreground">{document.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{document.type}</span>
                          <span>{document.date}</span>
                          <span>{document.size}</span>
                          <span>Dr. {document.doctor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(document.status) as any}>
                        {document.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Category-specific tabs would filter documents */}
        {categories.slice(1).map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid gap-4">
              {documents
                .filter(doc => doc.category === category.id)
                .map((document) => (
                  <Card key={document.id} className="health-card">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getFileIcon(document.type)}
                          <div className="flex-1">
                            <h3 className="font-semibold">{document.name}</h3>
                            <p className="text-sm text-muted-foreground">{document.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span>{document.type}</span>
                              <span>{document.date}</span>
                              <span>{document.size}</span>
                              <span>Dr. {document.doctor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(document.status) as any}>
                            {document.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Recent Activity */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest document uploads and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">{upload.name}</h4>
                    <p className="text-xs text-muted-foreground">Uploaded {upload.uploadedAt}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}