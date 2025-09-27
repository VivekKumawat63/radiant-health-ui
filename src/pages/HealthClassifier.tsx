import { useState } from "react";
import { Zap, Brain, Search, Filter, TrendingUp, AlertTriangle, CheckCircle, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function HealthClassifier() {
  const [symptomInput, setSymptomInput] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Sore throat", "Fatigue", "Nausea",
    "Chest pain", "Shortness of breath", "Dizziness", "Joint pain",
    "Abdominal pain", "Skin rash", "Loss of appetite", "Sleep issues"
  ];

  const recentAnalyses = [
    {
      id: 1,
      date: "2024-03-15",
      symptoms: ["Headache", "Fatigue", "Fever"],
      classification: "Viral Infection",
      confidence: 87,
      recommendation: "Rest, hydration, monitor symptoms",
      urgency: "Low",
      followUp: "Consult doctor if symptoms persist beyond 48 hours"
    },
    {
      id: 2,
      date: "2024-03-10",
      symptoms: ["Chest pain", "Shortness of breath"],
      classification: "Cardiovascular Concern",
      confidence: 92,
      recommendation: "Seek immediate medical attention",
      urgency: "High",
      followUp: "Emergency consultation recommended"
    },
    {
      id: 3,
      date: "2024-03-08",
      symptoms: ["Joint pain", "Stiffness"],
      classification: "Musculoskeletal Issue",
      confidence: 78,
      recommendation: "Rest, anti-inflammatory medication, gentle movement",
      urgency: "Low",
      followUp: "Monitor for 1 week, see doctor if worsening"
    }
  ];

  const healthCategories = [
    {
      category: "Respiratory",
      symptoms: ["Cough", "Shortness of breath", "Chest pain", "Wheezing"],
      commonConditions: ["Asthma", "Bronchitis", "Pneumonia", "Common Cold"],
      riskLevel: "Medium"
    },
    {
      category: "Cardiovascular",
      symptoms: ["Chest pain", "Palpitations", "Dizziness", "Shortness of breath"],
      commonConditions: ["Hypertension", "Arrhythmia", "Heart Disease", "Angina"],
      riskLevel: "High"
    },
    {
      category: "Neurological",
      symptoms: ["Headache", "Dizziness", "Memory issues", "Numbness"],
      commonConditions: ["Migraine", "Tension headache", "Vertigo", "Neuropathy"],
      riskLevel: "Medium"
    },
    {
      category: "Gastrointestinal",
      symptoms: ["Nausea", "Abdominal pain", "Diarrhea", "Constipation"],
      commonConditions: ["IBS", "Gastritis", "Food poisoning", "Acid reflux"],
      riskLevel: "Low"
    }
  ];

  const aiInsights = [
    {
      title: "Pattern Recognition",
      description: "AI detected recurring headache patterns on weekdays, possibly stress-related",
      confidence: 89,
      actionable: true
    },
    {
      title: "Risk Assessment",
      description: "Based on your health profile, low risk for cardiovascular issues",
      confidence: 94,
      actionable: false
    },
    {
      title: "Seasonal Trends",
      description: "Increased respiratory symptoms during spring months - possible allergies",
      confidence: 76,
      actionable: true
    }
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    // Simulate AI analysis
    const mockResult = {
      classification: "Viral Upper Respiratory Infection",
      confidence: 85,
      riskLevel: "Low",
      recommendations: [
        "Get adequate rest and sleep",
        "Stay hydrated with water and warm fluids",
        "Use throat lozenges for sore throat relief",
        "Monitor temperature regularly"
      ],
      urgency: "Low",
      followUpAdvice: "Consult healthcare provider if symptoms worsen or persist beyond 7 days",
      relatedConditions: ["Common Cold", "Flu", "Viral Pharyngitis"],
      estimatedDuration: "5-7 days"
    };
    setAnalysisResult(mockResult);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Health Classifier</h1>
          <p className="text-muted-foreground">AI-powered symptom analysis and health condition classification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Medical Data
          </Button>
          <Button className="gap-2">
            <Brain className="w-4 h-4" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* AI Status */}
      <Card className="health-card bg-gradient-to-r from-purple-50 to-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI Health Classifier</h3>
                <p className="text-sm text-muted-foreground">Advanced medical AI with 94% accuracy rate</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">Active</div>
              <p className="text-sm text-muted-foreground">Ready for analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analyze">Symptom Analysis</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
          <TabsTrigger value="categories">Health Categories</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          {/* Symptom Input */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Describe Your Symptoms</CardTitle>
              <CardDescription>Select symptoms or describe your condition for AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your symptoms in detail..."
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                className="min-h-24"
              />
              
              <div>
                <h4 className="font-semibold mb-3">Common Symptoms</h4>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Button
                      key={symptom}
                      variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleSymptom(symptom)}
                      className="text-xs"
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedSymptoms.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Selected Symptoms</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary" className="gap-1">
                        {symptom}
                        <button onClick={() => toggleSymptom(symptom)} className="ml-1 hover:bg-red-100 rounded">
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button 
                onClick={analyzeSymptoms} 
                disabled={selectedSymptoms.length === 0 && !symptomInput.trim()}
                className="w-full gap-2"
              >
                <Brain className="w-4 h-4" />
                Analyze Symptoms
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Analysis Complete
                </CardTitle>
                <CardDescription>AI classification based on your symptoms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold text-lg">{analysisResult.classification}</h3>
                    <p className="text-sm text-muted-foreground">Primary Classification</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-lg">{analysisResult.confidence}%</h3>
                    <p className="text-sm text-muted-foreground">Confidence Level</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-lg">{analysisResult.estimatedDuration}</h3>
                    <p className="text-sm text-muted-foreground">Est. Duration</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Risk Assessment
                  </h4>
                  <div className="flex items-center gap-3">
                    <Badge variant={getUrgencyColor(analysisResult.urgency) as any}>
                      {analysisResult.urgency} Urgency
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {analysisResult.followUpAdvice}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Related Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.relatedConditions.map((condition: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="grid gap-4">
            {recentAnalyses.map((analysis) => (
              <Card key={analysis.id} className="health-card">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{analysis.classification}</h3>
                        <p className="text-sm text-muted-foreground">{analysis.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getUrgencyColor(analysis.urgency) as any}>
                          {analysis.urgency}
                        </Badge>
                        <span className="text-sm font-medium">{analysis.confidence}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Symptoms Analyzed</h4>
                      <div className="flex flex-wrap gap-1">
                        {analysis.symptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Recommendation</h4>
                      <p className="text-sm text-muted-foreground">{analysis.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4">
            {healthCategories.map((category, index) => (
              <Card key={index} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{category.category}</CardTitle>
                    <Badge variant="outline" className={getRiskColor(category.riskLevel)}>
                      {category.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Common Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.symptoms.map((symptom, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Related Conditions</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.commonConditions.map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="health-card">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <div className="flex items-center gap-2">
                        <Progress value={insight.confidence} className="w-16 h-2" />
                        <span className="text-xs text-muted-foreground">{insight.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    {insight.actionable && (
                      <Button size="sm" variant="outline">
                        View Recommendations
                      </Button>
                    )}
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