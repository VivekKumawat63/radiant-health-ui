import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MedicalHistory from "@/pages/MedicalHistory";
import HealthQuiz from "@/pages/HealthQuiz";
import AIInsights from "@/pages/AIInsights";
import Doctors from "@/pages/Doctors";
import Authorization from "@/pages/Authorization";
import Documents from "@/pages/Documents";
import HealthAwareness from "@/pages/HealthAwareness";
import Medication from "@/pages/Medication";
import DietTracker from "@/pages/DietTracker";
import WellnessReminders from "@/pages/WellnessReminders";
import HealthClassifier from "@/pages/HealthClassifier";
import Settings from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";
import DoctorRegister from "@/pages/DoctorRegister";
import DoctorVerificationStatus from "@/pages/DoctorVerificationStatus";
import DoctorDashboard from "@/pages/DoctorDashboard";
import Index from "@/pages/Index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor/register" element={<DoctorRegister />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/doctor/verification-status" element={<DoctorVerificationStatus />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="medical-history" element={<MedicalHistory />} />
                <Route path="health-quiz" element={<HealthQuiz />} />
                <Route path="ai-insights" element={<AIInsights />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="authorization" element={<Authorization />} />
                <Route path="documents" element={<Documents />} />
                <Route path="awareness" element={<HealthAwareness />} />
                <Route path="medication" element={<Medication />} />
                <Route path="diet" element={<DietTracker />} />
                <Route path="wellness" element={<WellnessReminders />} />
                <Route path="classifier" element={<HealthClassifier />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
