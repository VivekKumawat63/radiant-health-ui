import { useState } from "react";
import { FileText, Upload, Download, Search, Filter, Eye, Share2, Plus, FolderOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  const documents: any[] = [];

  const categories = [
    { id: "all", name: "All Documents", count: documents.length },
    { id: "test-results", name: "Test Results", count: documents.filter(d => d.category === "test-results").length },
    { id: "imaging", name: "Imaging", count: documents.filter(d => d.category === "imaging").length },
    { id: "prescriptions", name: "Prescriptions", count: documents.filter(d => d.category === "prescriptions").length },
    { id: "certificates", name: "Certificates", count: documents.filter(d => d.category === "certificates").length },
    { id: "consultations", name: "Consultations", count: documents.filter(d => d.category === "consultations").length },
    { id: "insurance", name: "Insurance", count: documents.filter(d => d.category === "insurance").length }
  ];

  const recentUploads: any[] = [];

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
            <div className="text-2xl font-bold text-muted-foreground">0</div>
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">0</div>
            <p className="text-sm text-muted-foreground">Recent Uploads</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">0</div>
            <p className="text-sm text-muted-foreground">Shared Documents</p>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">0</div>
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
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
            <p className="text-muted-foreground mb-6">Upload your medical documents to keep them organized and secure</p>
            <Button className="gap-2">
              <Upload className="w-4 h-4" />
              Upload First Document
            </Button>
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
          <div className="text-center py-6">
            <p className="text-sm text-muted-foreground">No recent activity to show</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}