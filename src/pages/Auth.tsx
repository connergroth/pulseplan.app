import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/ui/container';
import Navbar from '@/components/Navbar';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { authHelpers } from '@/lib/supabase';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const GoogleLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
      fill="#4285F4"
    />
    <path 
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
      fill="#34A853"
    />
    <path 
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
      fill="#FBBC05"
    />
    <path 
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
      fill="#EA4335"
    />
  </svg>
);

const AppleLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.13.22 6.41-.65 1.29-1.52 2.58-2.25 4.03zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const Auth = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setLoadingProvider(provider);
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await authHelpers.signInWithGoogle();
          break;
        case 'apple':
          result = await authHelpers.signInWithApple();
          break;
      }

      if (result.error) {
        toast.error(`Authentication failed: ${result.error.message}`);
      }
    } catch (error: any) {
      toast.error(`Authentication failed: ${error.message}`);
    } finally {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const { error } = await authHelpers.signInWithEmail(email);
      if (error) {
        toast.error(`Sign in failed: ${error.message}`);
      } else {
        toast.success('Check your email for the login link!');
      }
    } catch (error: any) {
      toast.error(`Sign in failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="bg-grid noise">
        <Navbar />
        
        <div className="flex items-center justify-center min-h-screen pt-16">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-bold mb-2">
                    Try PulsePlan for free!
                  </CardTitle>
                  <p className="text-muted-foreground text-base">
                    Log in with Google or Apple.
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                                     {/* Google */}
                   <Button
                     onClick={() => handleOAuthSignIn('google')}
                     disabled={isLoading}
                     className="w-full h-12 bg-muted hover:bg-muted/80 text-foreground border border-border/50 transition-all duration-200"
                     variant="outline"
                   >
                     {loadingProvider === 'google' ? (
                       <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                     ) : (
                       <GoogleLogo className="w-6 h-6 mr-3" />
                     )}
                     Continue with Google
                   </Button>

                                     {/* Apple */}
                   <Button
                     onClick={() => handleOAuthSignIn('apple')}
                     disabled={isLoading}
                     className="w-full h-12 bg-muted hover:bg-muted/80 text-foreground border border-border/50 transition-all duration-200"
                     variant="outline"
                   >
                     {loadingProvider === 'apple' ? (
                       <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                     ) : (
                       <AppleLogo className="w-6 h-6 mr-3" />
                     )}
                     Continue with Apple
                   </Button>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-card text-muted-foreground">OR</span>
                    </div>
                  </div>

                  {/* Email */}
                  <form onSubmit={handleEmailSignIn} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="tony.stark@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-muted border-border/50 text-foreground placeholder:text-muted-foreground focus:border-rhythm-blue focus:ring-rhythm-blue/20"
                      required
                    />
                    
                    <Button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full h-12 bg-rhythm-blue hover:bg-rhythm-blue/90 text-white font-medium transition-all duration-200"
                    >
                      {isLoading && loadingProvider === null ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>

                  {/* Terms */}
                  <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                      By signing up, you agree to our{' '}
                      <a href="/terms" className="text-rhythm-blue hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="/privacy" className="text-rhythm-blue hover:underline">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Auth; 