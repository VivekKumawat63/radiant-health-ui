import { useState } from "react";
import { Lightbulb, BookOpen, Video, Heart, Brain, Shield, Activity, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HealthAwareness() {
  const [searchTerm, setSearchTerm] = useState("");

  const healthArticles = [
    {
      id: 1,
      title: "Understanding Heart Health: Prevention and Early Detection",
      category: "Cardiology",
      readTime: "8 min read",
      date: "2024-03-15",
      author: "Dr. Michael Chen",
      excerpt: "Learn about the importance of cardiovascular health, risk factors, and how to maintain a healthy heart through lifestyle choices and regular monitoring.",
      tags: ["Heart Health", "Prevention", "Lifestyle"],
      type: "article",
      featured: true
    },
    {
      id: 2,
      title: "Mental Health Matters: Recognizing Signs and Seeking Help",
      category: "Mental Health",
      readTime: "12 min read",
      date: "2024-03-12",
      author: "Dr. Emily Thompson",
      excerpt: "A comprehensive guide to understanding mental health, recognizing warning signs, and knowing when and how to seek professional help.",
      tags: ["Mental Health", "Awareness", "Support"],
      type: "article",
      featured: true
    },
    {
      id: 3,
      title: "Nutrition Essentials: Building a Balanced Diet for Optimal Health",
      category: "Nutrition",
      readTime: "10 min read",
      date: "2024-03-10",
      author: "Dr. Lisa Rodriguez",
      excerpt: "Discover the fundamentals of proper nutrition, how to create balanced meals, and the role of vitamins and minerals in maintaining good health.",
      tags: ["Nutrition", "Diet", "Wellness"],
      type: "article",
      featured: false
    },
    {
      id: 4,
      title: "Exercise and Fitness: Your Guide to Physical Wellness",
      category: "Fitness",
      readTime: "15 min read",
      date: "2024-03-08",
      author: "Dr. James Park",
      excerpt: "Learn about different types of exercise, how to create a workout routine that works for you, and the benefits of regular physical activity.",
      tags: ["Exercise", "Fitness", "Physical Health"],
      type: "article",
      featured: false
    }
  ];

  const healthVideos = [
    {
      id: 1,
      title: "5-Minute Morning Stretches for Better Health",
      duration: "5:32",
      category: "Exercise",
      instructor: "Dr. Sarah Wilson",
      description: "Start your day right with these simple stretches that improve flexibility and reduce tension.",
      thumbnail: "/placeholder-video-1.jpg"
    },
    {
      id: 2,
      title: "Breathing Techniques for Stress Relief",
      duration: "8:15",
      category: "Mental Health",
      instructor: "Dr. Emily Thompson",
      description: "Learn powerful breathing exercises to manage stress and anxiety in your daily life.",
      thumbnail: "/placeholder-video-2.jpg"
    },
    {
      id: 3,
      title: "Heart-Healthy Cooking Tips",
      duration: "12:45",
      category: "Nutrition",
      instructor: "Dr. Lisa Rodriguez",
      description: "Discover how to prepare delicious meals that support cardiovascular health.",
      thumbnail: "/placeholder-video-3.jpg"
    }
  ];

  const healthTips = [
    {
      category: "Daily Wellness",
      icon: Heart,
      tips: [
        "Drink 8 glasses of water daily to stay properly hydrated",
        "Take a 10-minute walk after each meal to aid digestion",
        "Practice deep breathing for 5 minutes when feeling stressed",
        "Get 7-9 hours of quality sleep each night for optimal recovery"
      ]
    },
    {
      category: "Preventive Care",
      icon: Shield,
      tips: [
        "Schedule annual physical exams with your healthcare provider",
        "Keep up with recommended vaccinations and screenings",
        "Monitor your blood pressure and cholesterol levels regularly",
        "Perform monthly self-examinations for early detection"
      ]
    },
    {
      category: "Mental Wellness",
      icon: Brain,
      tips: [
        "Practice mindfulness or meditation for 10 minutes daily",
        "Maintain social connections with friends and family",
        "Engage in hobbies and activities that bring you joy",
        "Seek professional help when feeling overwhelmed"
      ]
    },
    {
      category: "Physical Activity",
      icon: Activity,
      tips: [
        "Aim for 150 minutes of moderate exercise per week",
        "Include strength training exercises 2-3 times weekly",
        "Take regular breaks from sitting throughout the day",
        "Choose activities you enjoy to maintain consistency"
      ]
    }
  ];

  const seasonalAlerts = [
    {
      title: "Spring Allergy Season",
      message: "Pollen levels are high this week. Consider taking antihistamines if you have seasonal allergies.",
      priority: "medium",
      date: "This Week"
    },
    {
      title: "Flu Vaccination Reminder",
      message: "Annual flu vaccines are now available. Schedule your appointment to protect yourself and others.",
      priority: "high",
      date: "Available Now"
    },
    {
      title: "Heart Health Awareness Month",
      message: "February is Heart Health Awareness Month. Schedule your cardiovascular screening today.",
      priority: "low",
      date: "This Month"
    }
  ];

  const categories = [
    { name: "All Topics", count: healthArticles.length, value: "all" },
    { name: "Cardiology", count: healthArticles.filter(a => a.category === "Cardiology").length, value: "cardiology" },
    { name: "Mental Health", count: healthArticles.filter(a => a.category === "Mental Health").length, value: "mental-health" },
    { name: "Nutrition", count: healthArticles.filter(a => a.category === "Nutrition").length, value: "nutrition" },
    { name: "Fitness", count: healthArticles.filter(a => a.category === "Fitness").length, value: "fitness" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Health Awareness</h1>
          <p className="text-muted-foreground">Stay informed with the latest health insights and wellness tips</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter Content
          </Button>
          <Button className="gap-2">
            <BookOpen className="w-4 h-4" />
            Browse Library
          </Button>
        </div>
      </div>

      {/* Seasonal Health Alerts */}
      <Card className="health-card bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Seasonal Health Alerts
          </CardTitle>
          <CardDescription>Important health information for this time of year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {seasonalAlerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border">
                <div>
                  <h4 className="font-semibold">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(alert.priority) as any}>
                    {alert.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search health topics, articles, videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="articles">Health Articles</TabsTrigger>
          <TabsTrigger value="videos">Educational Videos</TabsTrigger>
          <TabsTrigger value="tips">Daily Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-6">
          {/* Featured Articles */}
          <div className="grid gap-6">
            <h3 className="text-xl font-semibold">Featured Articles</h3>
            {healthArticles.filter(article => article.featured).map((article) => (
              <Card key={article.id} className="health-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          {article.category}
                        </Badge>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>By {article.author}</span>
                          <span>{article.readTime}</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                      <Button className="ml-4">Read Article</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Articles */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">All Articles</h3>
            <div className="grid gap-4">
              {healthArticles.filter(article => !article.featured).map((article) => (
                <Card key={article.id} className="health-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h4 className="font-semibold mb-2">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{article.excerpt}</p>
                        <p className="text-xs text-muted-foreground">By {article.author} • {article.date}</p>
                      </div>
                      <Button size="sm" variant="outline">Read</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthVideos.map((video) => (
              <Card key={video.id} className="health-card overflow-hidden">
                <div className="aspect-video bg-gradient-primary flex items-center justify-center">
                  <Video className="w-12 h-12 text-white" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{video.category}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                    <h4 className="font-semibold">{video.title}</h4>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                    <p className="text-xs text-muted-foreground">Instructor: {video.instructor}</p>
                    <Button size="sm" className="w-full mt-3">
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-6">
            {healthTips.map((tipCategory, index) => (
              <Card key={index} className="health-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <tipCategory.icon className="w-5 h-5 text-primary" />
                    {tipCategory.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tipCategory.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}