import { useState } from "react";
import { Apple, Plus, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/AuthContext";

export default function DietTracker() {
  const { user } = useAuth();

  // Fetch diet tracker entries
  const { data: dietEntries = [], isLoading } = useQuery({
    queryKey: ['diet-tracker', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const { data, error } = await supabase
        .from('diet_tracker')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const todaysEntries = dietEntries.filter(entry => {
    const entryDate = new Date(entry.recorded_at);
    const today = new Date();
    return entryDate.toDateString() === today.toDateString();
  });

  const EmptyState = ({ message }: { message: string }) => (
    <Card className="health-card">
      <CardContent className="py-12 text-center">
        <Utensils className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">No Meals Logged</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Log Your First Meal
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Diet Tracker</h1>
          <p className="text-muted-foreground">Track your meals and monitor your nutrition goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Log Meal
        </Button>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today's Meals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="library">Food Library</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading meals...</p>
            </div>
          ) : todaysEntries.length === 0 ? (
            <EmptyState message="Start logging your meals to track your nutrition and reach your health goals." />
          ) : (
            <div className="space-y-4">
              {todaysEntries.map((entry) => (
                <Card key={entry.id} className="health-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{entry.meal_type}</CardTitle>
                        <CardDescription>{new Date(entry.recorded_at).toLocaleTimeString()}</CardDescription>
                      </div>
                      <Badge variant="secondary">{entry.calories} cal</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{entry.food_items}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {dietEntries.length === 0 ? (
            <EmptyState message="Log your meals to receive personalized nutrition insights and recommendations." />
          ) : (
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Nutrition Insights</CardTitle>
                <CardDescription>AI-powered analysis of your eating patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Insights will appear here as you log more meals.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {dietEntries.length === 0 ? (
            <EmptyState message="Track your meals to see your nutrition progress over time." />
          ) : (
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your nutrition trends this week</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Progress charts will appear here as you log more meals.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Food Library
              </CardTitle>
              <CardDescription>Search and browse common foods to log</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Food library coming soon. You can manually enter your meals for now.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
