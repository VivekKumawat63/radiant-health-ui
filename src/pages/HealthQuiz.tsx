import { useState } from "react";
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const quizQuestions = [
  {
    id: 1,
    category: "Physical Health",
    question: "How would you rate your overall energy levels throughout the day?",
    options: [
      { value: "excellent", label: "Excellent - I feel energized most of the day", score: 4 },
      { value: "good", label: "Good - I have steady energy with minor dips", score: 3 },
      { value: "fair", label: "Fair - I experience noticeable energy fluctuations", score: 2 },
      { value: "poor", label: "Poor - I often feel tired and sluggish", score: 1 }
    ]
  },
  {
    id: 2,
    category: "Mental Health",
    question: "How often do you feel stressed or overwhelmed?",
    options: [
      { value: "rarely", label: "Rarely - I feel calm and in control most days", score: 4 },
      { value: "sometimes", label: "Sometimes - Occasional stress that I manage well", score: 3 },
      { value: "often", label: "Often - Regular stress that affects my daily life", score: 2 },
      { value: "constantly", label: "Constantly - I feel overwhelmed most of the time", score: 1 }
    ]
  },
  {
    id: 3,
    category: "Sleep Quality",
    question: "How would you describe your sleep quality?",
    options: [
      { value: "excellent", label: "Excellent - I sleep deeply and wake refreshed", score: 4 },
      { value: "good", label: "Good - Generally restful with occasional disturbances", score: 3 },
      { value: "fair", label: "Fair - Inconsistent quality, sometimes tired in morning", score: 2 },
      { value: "poor", label: "Poor - Difficulty sleeping, often wake tired", score: 1 }
    ]
  },
  {
    id: 4,
    category: "Physical Activity",
    question: "How often do you engage in physical exercise?",
    options: [
      { value: "daily", label: "Daily - Regular exercise routine 5+ times per week", score: 4 },
      { value: "regular", label: "Regular - 3-4 times per week consistently", score: 3 },
      { value: "occasional", label: "Occasional - 1-2 times per week", score: 2 },
      { value: "rarely", label: "Rarely - Less than once per week", score: 1 }
    ]
  },
  {
    id: 5,
    category: "Nutrition",
    question: "How would you rate your eating habits?",
    options: [
      { value: "excellent", label: "Excellent - Balanced, nutritious meals daily", score: 4 },
      { value: "good", label: "Good - Mostly healthy with occasional treats", score: 3 },
      { value: "fair", label: "Fair - Mixed healthy and unhealthy choices", score: 2 },
      { value: "poor", label: "Poor - Frequent fast food and processed meals", score: 1 }
    ]
  },
  {
    id: 6,
    category: "Social Connections",
    question: "How satisfied are you with your social relationships?",
    options: [
      { value: "very", label: "Very satisfied - Strong, supportive relationships", score: 4 },
      { value: "satisfied", label: "Satisfied - Good relationships with room to grow", score: 3 },
      { value: "somewhat", label: "Somewhat satisfied - Limited but meaningful connections", score: 2 },
      { value: "unsatisfied", label: "Unsatisfied - Feel isolated or disconnected", score: 1 }
    ]
  }
];

export default function HealthQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const categoryScores: { [key: string]: { score: number; max: number } } = {};

    quizQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
          
          if (!categoryScores[question.category]) {
            categoryScores[question.category] = { score: 0, max: 0 };
          }
          categoryScores[question.category].score += option.score;
          categoryScores[question.category].max += 4;
        }
      }
    });

    setShowResults(true);
  };

  const getHealthScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    
    quizQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          totalScore += option.score;
        }
      }
      maxScore += 4;
    });

    return Math.round((totalScore / maxScore) * 100);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 85) return { label: "Excellent", color: "success" };
    if (score >= 70) return { label: "Good", color: "primary" };
    if (score >= 55) return { label: "Fair", color: "warning" };
    return { label: "Needs Attention", color: "destructive" };
  };

  const getRecommendations = (score: number) => {
    if (score >= 85) {
      return [
        "Maintain your excellent health habits",
        "Consider becoming a health mentor to others",
        "Continue regular check-ups to stay on track"
      ];
    } else if (score >= 70) {
      return [
        "Focus on areas that scored lower in the assessment",
        "Set specific, measurable health goals",
        "Consider working with a health coach"
      ];
    } else if (score >= 55) {
      return [
        "Prioritize sleep quality and stress management",
        "Gradually increase physical activity",
        "Consult with healthcare providers for personalized advice"
      ];
    } else {
      return [
        "Schedule a comprehensive health consultation",
        "Start with small, achievable health improvements",
        "Consider mental health support if feeling overwhelmed"
      ];
    }
  };

  if (showResults) {
    const healthScore = getHealthScore();
    const scoreCategory = getScoreCategory(healthScore);
    const recommendations = getRecommendations(healthScore);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Your Health Assessment Results</h1>
          <p className="text-muted-foreground">Based on your responses, here's your personalized health overview</p>
        </div>

        <Card className="health-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-white">{healthScore}%</span>
            </div>
            <CardTitle className="text-2xl">Overall Health Score</CardTitle>
            <Badge variant={scoreCategory.color as any} className="text-lg px-4 py-1">
              {scoreCategory.label}
            </Badge>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(quizQuestions.reduce((acc, q) => {
                if (!acc[q.category]) acc[q.category] = [];
                acc[q.category].push(q);
                return acc;
              }, {} as { [key: string]: any[] })).map(([category, questions]) => {
                const categoryScore = questions.reduce((sum, q) => {
                  const answer = answers[q.id];
                  const option = q.options.find(opt => opt.value === answer);
                  return sum + (option?.score || 0);
                }, 0);
                const maxCategoryScore = questions.length * 4;
                const percentage = Math.round((categoryScore / maxCategoryScore) * 100);

                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{category}</span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={() => {
            setCurrentQuestion(0);
            setAnswers({});
            setIsCompleted(false);
            setShowResults(false);
          }} variant="outline">
            Retake Quiz
          </Button>
          <Button className="gap-2">
            <Brain className="w-4 h-4" />
            Get AI Health Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Personal Health Assessment</h1>
        <p className="text-muted-foreground">Answer these questions to get personalized health insights</p>
      </div>

      {/* Progress */}
      <Card className="health-card">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {quizQuestions.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="health-card">
        <CardHeader>
          <Badge variant="outline" className="w-fit">{quizQuestions[currentQuestion].category}</Badge>
          <CardTitle className="text-xl">{quizQuestions[currentQuestion].question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[quizQuestions[currentQuestion].id] || ""}
            onValueChange={(value) => handleAnswer(quizQuestions[currentQuestion].id, value)}
          >
            {quizQuestions[currentQuestion].options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={!answers[quizQuestions[currentQuestion].id]}
          className="gap-2"
        >
          {currentQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}