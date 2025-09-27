import { useState } from "react";
import { Brain, TrendingUp, AlertTriangle, Heart, Activity, Zap, Download, Share } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIInsights() {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const healthInsights = [
    {
      id: "sleep-pattern",
      title: "Sleep Pattern Analysis",
      category: "Sleep Health",
      priority: "High",
      confidence: 92,
      summary: "Your sleep quality has improved 15% over the past month, but bedtime consistency needs attention.",
      details: "Based on your recent data, you're getting an average of 7.2 hours of sleep per night. However, your bedtime varies by up to 2 hours, which may be affecting sleep quality. Consider establishing a consistent bedtime routine.",
      recommendations: [
        "Set a consistent bedtime within 30 minutes each night",
        "Limit screen time 1-2 hours before bed",
        "Consider a relaxation routine before sleep"
      ],
      trend: "improving"
    },
    {
      id: "heart-health",
      title: "Cardiovascular Health Trends",
      category: "Heart Health",
      priority: "Medium",
      confidence: 88,
      summary: "Your resting heart rate shows excellent stability, with minor fluctuations during stress periods.",
      details: "Your average resting heart rate of 62 BPM is excellent for your age group. The AI detected slight increases during reported stress periods, suggesting good heart-stress correlation awareness.",
      recommendations: [
        "Continue current cardio exercise routine",
        "Monitor stress levels during high-pressure periods",
        "Consider heart rate variability tracking"
      ],
      trend: "stable"
    },
    {
      id: "nutrition-gaps",
      title: "Nutritional Gap Analysis",
      category: "Nutrition",
      priority: "Medium",
      confidence: 85,
      summary: "Vitamin D and Omega-3 levels may be suboptimal based on dietary patterns and geographic location.",
      details: "Analysis of your food intake patterns suggests potential deficiencies in Vitamin D (especially during winter months) and Omega-3 fatty acids. Your calcium intake is excellent.",
      recommendations: [
        "Consider Vitamin D supplementation (consult doctor)",
        "Increase fatty fish consumption to 2-3 times per week",
        "Add more leafy greens for additional micronutrients"
      ],
      trend: "attention-needed"
    },
    {
      id: "activity-optimization",
      title: "Activity Pattern Optimization",
      category: "Physical Activity",
      priority: "Low",
      confidence: 90,
      summary: "Your exercise timing and intensity are well-optimized, with room for minor improvements in recovery periods.",
      details: "You maintain excellent consistency in physical activity. The AI suggests slightly longer recovery periods between high-intensity sessions to optimize performance gains.",
      recommendations: [
        "Add one additional rest day per week",
        "Incorporate more active recovery activities",
        "Consider sleep quality on heavy training days"
      ],
      trend: "optimized"
    }
  ];

  const aiPredictions = [
    {
      title: "Health Risk Assessment",
      timeframe: "Next 6 months",
      prediction: "Very low risk for cardiovascular events based on current health metrics",
      confidence: 94,
      factors: ["Excellent heart rate variability", "Optimal blood pressure", "Regular exercise routine"]
    },
    {
      title: "Wellness Trajectory",
      timeframe: "Next 3 months",
      prediction: "Continued improvement in sleep quality if recommendations are followed",
      confidence: 87,
      factors: ["Current positive sleep trends", "Stress management improvements", "Consistent bedtime efforts"]
    },
    {
      title: "Medication Effectiveness",
      timeframe: "Ongoing",
      prediction: "Current medication regimen showing optimal effectiveness",
      confidence: 91,
      factors: ["Stable vital signs", "No adverse reactions reported", "Consistent adherence"]
    }
  ];

  const healthAlerts = [
    {
      type: "reminder",
      title: "Annual Physical Due",
      message: "Based on your last checkup date, you're due for your annual physical examination.",
      priority: "medium",
      dueDate: "Within 2 weeks"
    },
    {
      type: "trend",
      title: "Stress Pattern Detected",
      message: "AI detected elevated stress markers on weekdays. Consider stress management techniques.",
      priority: "low",
      dueDate: "Ongoing observation"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'stable': return <Activity className="w-4 h-4 text-primary" />;
      case 'attention-needed': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'optimized': return <Zap className="w-4 h-4 text-success" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">AI Health Insights</h1>
          <p className="text-muted-foreground">Personalized health analysis powered by artificial intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button variant="outline" className="gap-2">
            <Share className="w-4 h-4" />
            Share with Doctor
          </Button>
        </div>
      </div>

      {/* AI Status */}
      <Card className="health-card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI Analysis Status</h3>
                <p className="text-sm text-muted-foreground">Last updated 2 hours ago</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">Active</div>
              <p className="text-sm text-muted-foreground">Monitoring 24/7</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">Health Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {healthInsights.map((insight) => (
              <Card key={insight.id} className="health-card cursor-pointer hover:shadow-medium transition-all duration-200"
                    onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTrendIcon(insight.trend)}
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription>{insight.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(insight.priority) as any}>
                        {insight.priority}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">{insight.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{insight.summary}</p>
                  <Progress value={insight.confidence} className="h-2 mb-4" />
                  
                  {selectedInsight === insight.id && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <h4 className="font-semibold mb-2">Detailed Analysis</h4>
                        <p className="text-sm text-muted-foreground">{insight.details}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">AI Recommendations</h4>
                        <ul className="space-y-1">
                          {insight.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {aiPredictions.map((prediction, index) => (
              <Card key={index} className="health-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{prediction.title}</CardTitle>
                    <Badge variant="outline">{prediction.timeframe}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{prediction.prediction}</p>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Prediction Confidence</span>
                        <span>{prediction.confidence}%</span>
                      </div>
                      <Progress value={prediction.confidence} className="h-2" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Factors</h4>
                      <ul className="space-y-1">
                        {prediction.factors.map((factor, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <Heart className="w-3 h-3 text-success mt-1 flex-shrink-0" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {healthAlerts.map((alert, index) => (
              <Card key={index} className="health-card">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        alert.priority === 'medium' ? 'text-warning' : 'text-muted-foreground'
                      }`} />
                      <div className="space-y-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.dueDate}</p>
                      </div>
                    </div>
                    <Badge variant={alert.priority === 'medium' ? 'destructive' : 'secondary'}>
                      {alert.priority}
                    </Badge>
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