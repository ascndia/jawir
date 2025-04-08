"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Github } from 'lucide-react';

interface CardNewsletter1Props {
  className?: string;
  title?: string;
  description?: string;
  onSubscribe?: (email: string) => void;
}

export function CardNewsletter1({
  className = "",
  title = "Subscribe to My Newsletter",
  description = "Get the latest updates and insights delivered straight to your inbox",
  onSubscribe = (email) => console.log("Subscribed with email:", email)
}: CardNewsletter1Props) {
  const [email, setEmail] = React.useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
    }
  };

  return (
    <Card className={`mx-auto w-full max-w-md shadow-lg ${className}`}>
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-purple-600 p-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-full w-full text-white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" className="rounded-full">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Github className="h-4 w-4" />
            <span className="sr-only">Github</span>
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <Input
            type="email"
            placeholder="name@example.com"
            className="h-11"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Subscribe Now
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Terms of Service
          </a>
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            Help
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardFooter>
    </Card>
  );
}

export default CardNewsletter1;
