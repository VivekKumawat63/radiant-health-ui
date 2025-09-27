import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import MedicalHistory from "./pages/MedicalHistory";
import HealthQuiz from "./pages/HealthQuiz";
import AIInsights from "./pages/AIInsights";
import Doctors from "./pages/Doctors";
import Authorization from "./pages/Authorization";
import DietTracker from "./pages/DietTracker";
import WellnessReminders from "./pages/WellnessReminders";
import HealthClassifier from "./pages/HealthClassifier";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="medical-history" element={<MedicalHistory />} />
            <Route path="health-quiz" element={<HealthQuiz />} />
            <Route path="ai-insights" element={<AIInsights />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="authorization" element={<Authorization />} />
            <Route path="diet" element={<DietTracker />} />
            <Route path="wellness" element={<WellnessReminders />} />
            <Route path="classifier" element={<HealthClassifier />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
