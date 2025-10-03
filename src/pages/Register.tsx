import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Stethoscope } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For doctors, redirect to detailed registration page
    if (role === 'doctor') {
      navigate('/doctor/register');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, name, role);

      if (error) {
        throw new Error(error.message || 'Failed to register');
      }

      toast({
        title: 'Registration Successful',
        description: 'Welcome! Your account has been created.',
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>Create your account to get started</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-3">
              <Label>I am a</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as 'patient' | 'doctor')} className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="patient" id="patient" className="peer sr-only" />
                  <Label
                    htmlFor="patient"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <UserCircle className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Patient</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="doctor" id="doctor" className="peer sr-only" />
                  <Label
                    htmlFor="doctor"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Stethoscope className="mb-2 h-6 w-6" />
                    <span className="text-sm font-medium">Doctor</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {role === 'doctor' ? 'Continue to Doctor Registration' : isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}