import { useState } from "react";
import { Brain, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function HealthClassifier() {
  const [symptomInput, setSymptomInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const commonSymptoms = [
    "Headache", "Fever", "Cough", "Sore throat", "Fatigue", "Nausea",
    "Chest pain", "Shortness of breath", "Dizziness", "Joint pain",
    "Abdominal pain", "Skin rash", "Loss of appetite", "Sleep issues"
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

  const handleAnalyze = () => {
    // Placeholder for AI analysis
    setAnalysisResult({
      classification: "Analysis in progress",
      confidence: 0,
      recommendation: "Please add AI integration to enable symptom analysis"
    });
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">Health Classifier</h1>
        <p className="text-muted-foreground">AI-powered symptom analysis and health categorization</p>
      </div>

      <Tabs defaultValue="analyzer" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analyzer">Symptom Analyzer</TabsTrigger>
          <TabsTrigger value="categories">Health Categories</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Describe Your Symptoms
              </CardTitle>
              <CardDescription>
                Tell us what symptoms you're experiencing, and our AI will help classify and provide guidance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Describe your symptoms in detail..."
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setSymptomInput(prev => prev ? `${prev}, ${symptom}` : symptom)}
                  >
                    {symptom}
                  </Badge>
                ))}
              </div>

              <Button 
                className="w-full" 
                onClick={handleAnalyze}
                disabled={!symptomInput.trim()}
              >
                <Brain className="w-4 h-4 mr-2" />
                Analyze Symptoms
              </Button>

              {analysisResult && (
                <Card className="bg-muted">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Analysis Result</h4>
                        <Badge variant="outline">{analysisResult.confidence}% Confidence</Badge>
                      </div>
                      <p className="text-sm">{analysisResult.classification}</p>
                      <p className="text-sm text-muted-foreground">{analysisResult.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {healthCategories.map((category) => (
              <Card key={category.category} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{category.category}</CardTitle>
                    <Badge variant={getRiskColor(category.riskLevel) as any}>
                      {category.riskLevel} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Common Symptoms</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Related Conditions</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.commonConditions.map((condition) => (
                        <Badge key={condition} variant="outline" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="health-card">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Analysis History</h3>
              <p className="text-muted-foreground mb-4">
                Your symptom analyses will appear here once you start using the analyzer.
              </p>
              <Button onClick={() => {
                const analyzerTab = document.querySelector('[value="analyzer"]') as HTMLElement;
                if (analyzerTab) analyzerTab.click();
              }}>
                Start First Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
