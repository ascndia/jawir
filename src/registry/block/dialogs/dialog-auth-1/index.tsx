"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Github, AlertCircle, Apple, Twitter, Facebook } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogAuth1A({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (!email.trim() || !password) {
        throw new Error("Email and password are required");
      }

      if (mode === 'signup' && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Here you would normally connect to your auth provider
      // This is a placeholder for demonstration
      
      // Simulate successful auth
      setTimeout(() => {
        toast(mode === 'signin' ? "Signed in successfully" : "Account created successfully",{
          description: "Welcome to Vibe Right Now!",
        });
        onOpenChange(false);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      toast.error("Authentication error",{
        description: error instanceof Error ? error.message : "Something went wrong",
        action: (
          <Button variant="outline" size="sm">
            <AlertCircle className="h-4 w-4" />
          </Button>
        ),
      });
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    // Placeholder for Google auth integration
    setTimeout(() => {
      toast("Google authentication",{
        description: "Google authentication would happen here.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleGithubAuth = () => {
    setIsLoading(true);
    // Placeholder for GitHub auth integration
    setTimeout(() => {
      toast("GitHub authentication",{
        description: "GitHub authentication would happen here.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin' 
              ? 'Enter your email below to sign in to your account.'
              : 'Enter your email below to create your account.'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={mode} onValueChange={(value) => setMode(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In with Email"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGithubAuth}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up with Email"}
              </Button>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <Mail className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGithubAuth}
                disabled={isLoading}
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


export function DialogAuth1B({ open, onOpenChange }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [agreed, setAgreed] = useState(false);

  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast(`${mode === 'signin' ? 'Signed in' : 'Signed up'} with ${provider}`, {
        description: "Welcome to Vibe Right Now!",
      });
      setIsLoading(false);
      onOpenChange(false);
    }, 1000);
  };

  const providers = [
    { name: "Google", icon: <Mail className="mr-2 h-4 w-4" /> },
    { name: "GitHub", icon: <Github className="mr-2 h-4 w-4" /> },
    { name: "Apple", icon: <Apple className="mr-2 h-4 w-4" /> },
    { name: "Twitter", icon: <Twitter className="mr-2 h-4 w-4" /> },
    { name: "Facebook", icon: <Facebook className="mr-2 h-4 w-4" /> }
  ];

  const renderButtons = () => (
    <div className="grid gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          variant="outline"
          className="w-full"
          onClick={() => handleSocialAuth(provider.name)}
          disabled={isLoading}
        >
          {provider.icon}
          {provider.name}
        </Button>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin' ? 'Sign in to your account' : 'Create a new account'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'signin'
              ? 'Choose a provider to sign in to your account.'
              : 'Choose a provider to create your account.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={mode} onValueChange={(value) => setMode(value as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            {renderButtons()}
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            {renderButtons()}
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <Checkbox id="tos" checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} />
              <Label htmlFor="tos">
                I agree to the{" "}
                <a href="/terms" className="underline" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
              </Label>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
