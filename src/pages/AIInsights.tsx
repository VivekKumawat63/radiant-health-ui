import { Brain, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthContext";

export default function AIInsights() {
  const { user } = useAuth();

  // Fetch health insights from database
  const { data: insights = [], isLoading: insightsLoading } = useQuery({
    queryKey: ['health-insights', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('health_insights')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const predictions = insights.filter(i => i.insight_type === 'Prediction');
  const alerts = insights.filter(i => i.insight_type === 'Alert');
  const recommendations = insights.filter(i => i.insight_type === 'Recommendation');

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  const EmptyState = ({ type }: { type: string }) => (
    <Card className="health-card">
      <CardContent className="py-12 text-center">
        <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">No {type} Yet</h3>
        <p className="text-muted-foreground mb-4">
          Start tracking your health data to receive AI-powered {type.toLowerCase()}.
        </p>
        <Button>Add Health Data</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold gradient-text">AI Health Insights</h1>
        <p className="text-muted-foreground">Personalized health analysis powered by artificial intelligence</p>
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
                <p className="text-sm text-muted-foreground">Ready to analyze your health data</p>
              </div>
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

        <TabsContent value="insights" className="space-y-6">
          {insightsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading insights...</p>
            </div>
          ) : recommendations.length === 0 ? (
            <EmptyState type="Insights" />
          ) : (
            <div className="grid gap-6">
              {recommendations.map((insight) => (
                <Card key={insight.id} className="health-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <CardDescription>{insight.insight_type}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(insight.severity) as any}>
                        {insight.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {insightsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading predictions...</p>
            </div>
          ) : predictions.length === 0 ? (
            <EmptyState type="Predictions" />
          ) : (
            <div className="grid gap-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="health-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-success" />
                        <div>
                          <CardTitle className="text-lg">{prediction.title}</CardTitle>
                          <CardDescription>{prediction.insight_type}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(prediction.severity) as any}>
                        {prediction.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{prediction.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          {insightsLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading alerts...</p>
            </div>
          ) : alerts.length === 0 ? (
            <EmptyState type="Alerts" />
          ) : (
            <div className="grid gap-6">
              {alerts.map((alert) => (
                <Card key={alert.id} className="health-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <div>
                          <CardTitle className="text-lg">{alert.title}</CardTitle>
                          <CardDescription>{alert.insight_type}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
