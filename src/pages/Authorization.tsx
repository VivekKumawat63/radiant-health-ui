import { useState } from "react";
import { Shield, CheckCircle, AlertTriangle, Clock, Download, Upload, Eye, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Authorization() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const authorizationStatus = {
    overall: "Verified",
    completionRate: 92,
    lastUpdated: "2024-03-15",
    expiryDate: "2025-03-15"
  };

  const governmentDocuments = [
    {
      id: "medical-license",
      title: "Medical License Verification",
      type: "Professional License",
      status: "Verified",
      issuedBy: "State Medical Board",
      issuedDate: "2020-06-15",
      expiryDate: "2025-06-15",
      documentNumber: "MD-2020-458792",
      verificationCode: "SMB-VER-2024-0315",
      description: "Official medical license verification from state medical board"
    },
    {
      id: "dea-registration",
      title: "DEA Registration",
      type: "Drug Enforcement License",
      status: "Active",
      issuedBy: "Drug Enforcement Administration",
      issuedDate: "2021-01-10",
      expiryDate: "2024-01-10",
      documentNumber: "DEA-BL1234567",
      verificationCode: "DEA-ACT-2024",
      description: "Valid DEA registration for controlled substance prescriptions"
    },
    {
      id: "board-certification",
      title: "Board Certification",
      type: "Medical Specialty Certification",
      status: "Verified",
      issuedBy: "American Board of Internal Medicine",
      issuedDate: "2019-11-20",
      expiryDate: "2029-11-20",
      documentNumber: "ABIM-CERT-789456",
      verificationCode: "ABIM-VER-2024",
      description: "Board certification in Internal Medicine"
    },
    {
      id: "malpractice-insurance",
      title: "Malpractice Insurance",
      type: "Professional Insurance",
      status: "Current",
      issuedBy: "Medical Professional Liability Insurance",
      issuedDate: "2024-01-01",
      expiryDate: "2024-12-31",
      documentNumber: "MPLI-2024-789123",
      verificationCode: "INS-CURR-2024",
      description: "Active professional liability insurance coverage"
    },
    {
      id: "hipaa-compliance",
      title: "HIPAA Compliance Certificate",
      type: "Privacy Compliance",
      status: "Verified",
      issuedBy: "Department of Health and Human Services",
      issuedDate: "2024-02-01",
      expiryDate: "2025-02-01",
      documentNumber: "HIPAA-COMP-2024-456",
      verificationCode: "HHS-VER-2024",
      description: "HIPAA privacy and security compliance certification"
    }
  ];

  const complianceAreas = [
    {
      area: "Professional Licensing",
      score: 100,
      status: "Compliant",
      requirements: ["Valid Medical License", "State Registration", "Continuing Education"],
      lastReview: "2024-03-10"
    },
    {
      area: "Drug Prescribing Authority",
      score: 95,
      status: "Compliant",
      requirements: ["DEA Registration", "Controlled Substance License", "Prescription Monitoring"],
      lastReview: "2024-03-08"
    },
    {
      area: "Privacy & Security",
      score: 98,
      status: "Compliant",
      requirements: ["HIPAA Compliance", "Data Security", "Patient Privacy Protocols"],
      lastReview: "2024-03-12"
    },
    {
      area: "Professional Insurance",
      score: 100,
      status: "Compliant",
      requirements: ["Malpractice Coverage", "Professional Liability", "Risk Management"],
      lastReview: "2024-03-05"
    }
  ];

  const recentActivity = [
    {
      action: "License verification completed",
      date: "2024-03-15 10:30 AM",
      type: "verification",
      details: "State Medical Board confirmed license status"
    },
    {
      action: "HIPAA compliance review passed",
      date: "2024-03-12 2:15 PM",
      type: "review",
      details: "Annual privacy and security assessment completed"
    },
    {
      action: "Malpractice insurance renewed",
      date: "2024-03-01 9:00 AM",
      type: "renewal",
      details: "Professional liability coverage extended for 2024"
    },
    {
      action: "DEA registration status updated",
      date: "2024-02-28 11:45 AM",
      type: "update",
      details: "Registration status confirmed as active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'active':
      case 'current':
      case 'compliant':
        return 'success';
      case 'pending':
      case 'under review':
        return 'warning';
      case 'expired':
      case 'inactive':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
      case 'active':
      case 'current':
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
      case 'under review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'expired':
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Government Authorization</h1>
          <p className="text-muted-foreground">Professional credentials and compliance verification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Authorization Status Overview */}
      <Card className="health-card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600">{authorizationStatus.overall}</div>
              <p className="text-sm text-muted-foreground">Overall Status</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{authorizationStatus.completionRate}%</div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <Progress value={authorizationStatus.completionRate} className="h-2 mt-2" />
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold mb-2">{authorizationStatus.lastUpdated}</div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold mb-2">{authorizationStatus.expiryDate}</div>
              <p className="text-sm text-muted-foreground">Next Renewal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {governmentDocuments.map((doc) => (
              <Card key={doc.id} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>{doc.type}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doc.status)}
                      <Badge variant={getStatusColor(doc.status) as any}>
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Issued By:</span>
                        <p className="text-sm text-muted-foreground">{doc.issuedBy}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Document Number:</span>
                        <p className="text-sm text-muted-foreground font-mono">{doc.documentNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Verification Code:</span>
                        <p className="text-sm text-muted-foreground font-mono">{doc.verificationCode}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Issued Date:</span>
                        <p className="text-sm text-muted-foreground">{doc.issuedDate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Expiry Date:</span>
                        <p className="text-sm text-muted-foreground">{doc.expiryDate}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">{doc.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-6">
            {complianceAreas.map((area, index) => (
              <Card key={index} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{area.area}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(area.status)}
                      <Badge variant={getStatusColor(area.status) as any}>
                        {area.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Compliance Score</span>
                        <span className="font-semibold">{area.score}%</span>
                      </div>
                      <Progress value={area.score} className="h-2" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Requirements Met:</h4>
                      <ul className="space-y-1">
                        {area.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last reviewed: {area.lastReview}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Recent Authorization Activity</CardTitle>
              <CardDescription>Latest updates and changes to your authorization status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}