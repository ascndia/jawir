"use client";

import * as React from "react";
import { Mail, Send, CheckCircle, AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { cn } from "@/lib/utils";

interface NewsletterFormData {
  email: string;
}

interface CardFormNewsletter1Props {
  initialEmail?: string;
  onSubmit?: (
    data: NewsletterFormData
  ) => Promise<boolean | void> | boolean | void;
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export function CardFormNewsletter1({
  initialEmail = "",
  onSubmit,
  title = "Subscribe to our Newsletter",
  description = "Stay updated with our latest news and offers.",
  inputPlaceholder = "you@example.com",
  submitButtonText = "Subscribe",
  successMessage = "Thanks for subscribing!",
  errorMessage = "Subscription failed. Please try again.",
  className,
}: CardFormNewsletter1Props) {
  const [email, setEmail] = React.useState(initialEmail);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitStatus("idle"); // Reset status on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isSubmitting || !isValidEmail(email)) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await onSubmit({ email });
      if (result !== false) {
        setSubmitStatus("success");
        setEmail(""); // Clear email on success
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic email validation
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </Label>
            <div className="flex space-x-2">
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder={inputPlaceholder}
                required
                disabled={isSubmitting || submitStatus === "success"}
                className="flex-1"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                disabled={
                  !isValidEmail(email) ||
                  isSubmitting ||
                  submitStatus === "success"
                }
                aria-label="Subscribe to newsletter"
              >
                {isSubmitting ? "Subscribing..." : submitButtonText}
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
          {submitStatus === "success" && (
            <p className="flex items-center text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2 h-4 w-4" />
              {successMessage}
            </p>
          )}
          {submitStatus === "error" && (
            <p className="flex items-center text-sm text-destructive">
              <AlertTriangle className="mr-2 h-4 w-4" />
              {errorMessage}
            </p>
          )}
        </CardContent>
        {/* Optional Footer - can be removed if not needed */}
        {/* <CardFooter className="text-xs text-muted-foreground">
          <p>We respect your privacy. Unsubscribe at any time.</p>
        </CardFooter> */}
      </form>
    </Card>
  );
}

export default CardFormNewsletter1;
