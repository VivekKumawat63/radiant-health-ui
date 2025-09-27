import { useState } from "react";
import { Apple, Plus, Search, TrendingUp, Target, Clock, Utensils } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DietTracker() {
  const [searchTerm, setSearchTerm] = useState("");

  const dailyNutrition = {
    calories: { consumed: 1850, target: 2200, unit: "kcal" },
    protein: { consumed: 78, target: 120, unit: "g" },
    carbs: { consumed: 210, target: 275, unit: "g" },
    fat: { consumed: 65, target: 73, unit: "g" },
    fiber: { consumed: 18, target: 25, unit: "g" },
    water: { consumed: 6, target: 8, unit: "glasses" }
  };

  const todaysMeals = [
    {
      id: 1,
      meal: "Breakfast",
      time: "8:00 AM",
      items: [
        { name: "Oatmeal with berries", calories: 320, protein: 8, carbs: 65, fat: 6 },
        { name: "Greek yogurt", calories: 130, protein: 15, carbs: 9, fat: 0 },
        { name: "Green tea", calories: 2, protein: 0, carbs: 0, fat: 0 }
      ],
      totalCalories: 452,
      logged: true
    },
    {
      id: 2,
      meal: "Lunch",
      time: "12:30 PM",
      items: [
        { name: "Grilled chicken salad", calories: 380, protein: 35, carbs: 15, fat: 18 },
        { name: "Quinoa", calories: 220, protein: 8, carbs: 39, fat: 4 },
        { name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15 }
      ],
      totalCalories: 760,
      logged: true
    },
    {
      id: 3,
      meal: "Dinner",
      time: "7:00 PM",
      items: [
        { name: "Baked salmon", calories: 420, protein: 35, carbs: 0, fat: 28 },
        { name: "Roasted vegetables", calories: 120, protein: 4, carbs: 25, fat: 2 },
        { name: "Brown rice", calories: 150, protein: 3, carbs: 30, fat: 1 }
      ],
      totalCalories: 690,
      logged: false
    }
  ];

  const nutritionInsights = [
    {
      title: "Protein Intake",
      status: "Below Target",
      message: "You're 42g short of your daily protein goal. Consider adding protein-rich snacks.",
      recommendation: "Add nuts, protein shake, or lean meat to reach your target.",
      color: "warning"
    },
    {
      title: "Hydration",
      status: "Good Progress",
      message: "You're 75% of the way to your daily water intake goal.",
      recommendation: "Drink 2 more glasses of water to meet your target.",
      color: "success"
    },
    {
      title: "Fiber Intake",
      status: "Excellent",
      message: "You're getting good fiber from fruits and vegetables today.",
      recommendation: "Keep up the great work with whole foods and vegetables.",
      color: "success"
    }
  ];

  const weeklyProgress = [
    { day: "Mon", calories: 2100, protein: 110, carbs: 260, fat: 70 },
    { day: "Tue", calories: 1950, protein: 95, carbs: 245, fat: 65 },
    { day: "Wed", calories: 2250, protein: 125, carbs: 280, fat: 75 },
    { day: "Thu", calories: 2050, protein: 105, carbs: 255, fat: 68 },
    { day: "Fri", calories: 1850, protein: 85, carbs: 230, fat: 62 },
    { day: "Sat", calories: 2300, protein: 130, carbs: 290, fat: 78 },
    { day: "Today", calories: 1850, protein: 78, carbs: 210, fat: 65 }
  ];

  const foodSuggestions = [
    {
      name: "Grilled Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 4,
      category: "Protein",
      benefits: ["High protein", "Low carb", "Lean meat"]
    },
    {
      name: "Quinoa Bowl",
      calories: 220,
      protein: 8,
      carbs: 39,
      fat: 4,
      category: "Carbs",
      benefits: ["Complete protein", "High fiber", "Gluten-free"]
    },
    {
      name: "Mixed Berries",
      calories: 85,
      protein: 1,
      carbs: 21,
      fat: 0,
      category: "Fruits",
      benefits: ["Antioxidants", "Low calorie", "High fiber"]
    },
    {
      name: "Almonds (1 oz)",
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      category: "Nuts",
      benefits: ["Healthy fats", "Protein", "Vitamin E"]
    }
  ];

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getInsightColor = (color: string) => {
    switch (color) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'destructive': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Diet Tracker</h1>
          <p className="text-muted-foreground">Monitor your nutrition and achieve your health goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Log Food
        </Button>
      </div>

      {/* Daily Nutrition Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(dailyNutrition).map(([key, nutrition]) => (
          <Card key={key} className="health-card">
            <CardContent className="pt-4">
              <div className="text-center space-y-2">
                <div className="text-sm font-medium capitalize">{key}</div>
                <div className="text-lg font-bold">
                  {nutrition.consumed}
                  <span className="text-xs text-muted-foreground">/{nutrition.target}</span>
                </div>
                <div className="text-xs text-muted-foreground">{nutrition.unit}</div>
                <Progress 
                  value={(nutrition.consumed / nutrition.target) * 100} 
                  className="h-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today's Meals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="suggestions">Food Library</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {todaysMeals.map((meal) => (
            <Card key={meal.id} className="health-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-5 h-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{meal.meal}</CardTitle>
                      <CardDescription>{meal.time} • {meal.totalCalories} calories</CardDescription>
                    </div>
                  </div>
                  <Badge variant={meal.logged ? "secondary" : "outline"}>
                    {meal.logged ? "Logged" : "Planned"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meal.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          P: {item.protein}g • C: {item.carbs}g • F: {item.fat}g
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.calories}</div>
                        <div className="text-xs text-muted-foreground">calories</div>
                      </div>
                    </div>
                  ))}
                </div>
                {!meal.logged && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm">Log Meal</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            {nutritionInsights.map((insight, index) => (
              <Card key={index} className={`border ${getInsightColor(insight.color)}`}>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <Badge variant="outline">{insight.status}</Badge>
                    </div>
                    <p className="text-sm">{insight.message}</p>
                    <div className="bg-white/50 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Recommendation:</h4>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Weekly Nutrition Progress
              </CardTitle>
              <CardDescription>Track your daily nutrition intake over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{day.day}</span>
                      <span className="text-sm text-muted-foreground">
                        {day.calories} kcal
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className={`text-sm font-medium ${getProgressColor(day.calories, 2200)}`}>
                          {day.calories}
                        </div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${getProgressColor(day.protein, 120)}`}>
                          {day.protein}g
                        </div>
                        <div className="text-xs text-muted-foreground">Protein</div>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${getProgressColor(day.carbs, 275)}`}>
                          {day.carbs}g
                        </div>
                        <div className="text-xs text-muted-foreground">Carbs</div>
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${getProgressColor(day.fat, 73)}`}>
                          {day.fat}g
                        </div>
                        <div className="text-xs text-muted-foreground">Fat</div>
                      </div>
                    </div>
                    <Progress value={(day.calories / 2200) * 100} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Food Library</CardTitle>
              <CardDescription>Discover nutritious foods to meet your daily goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search foods..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid gap-4">
                  {foodSuggestions.map((food, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{food.name}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {food.category}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">Add</Button>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center text-sm mb-3">
                        <div>
                          <div className="font-medium">{food.calories}</div>
                          <div className="text-xs text-muted-foreground">cal</div>
                        </div>
                        <div>
                          <div className="font-medium">{food.protein}g</div>
                          <div className="text-xs text-muted-foreground">protein</div>
                        </div>
                        <div>
                          <div className="font-medium">{food.carbs}g</div>
                          <div className="text-xs text-muted-foreground">carbs</div>
                        </div>
                        <div>
                          <div className="font-medium">{food.fat}g</div>
                          <div className="text-xs text-muted-foreground">fat</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {food.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}