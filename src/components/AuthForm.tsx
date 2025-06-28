
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const AuthForm: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await signIn(formData.email, formData.password);
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await signUp(formData.email, formData.password);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-green-400">
            Καλλιέργειες App
          </CardTitle>
          <p className="text-center text-gray-400">
            Συνδεθείτε ή εγγραφείτε για να διαχειριστείτε τις καταχωρίσεις σας
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-700">
              <TabsTrigger value="signin" className="data-[state=active]:bg-green-600">
                Σύνδεση
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-green-600">
                Εγγραφή
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4 mt-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Εισάγετε το email σας"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-gray-300">Κωδικός</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Εισάγετε τον κωδικό σας"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Σύνδεση...
                    </>
                  ) : (
                    'Σύνδεση'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Εισάγετε το email σας"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300">Κωδικός</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Δημιουργήστε κωδικό (τουλάχιστον 6 χαρακτήρες)"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                      minLength={6}
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Εγγραφή...
                    </>
                  ) : (
                    'Εγγραφή'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
