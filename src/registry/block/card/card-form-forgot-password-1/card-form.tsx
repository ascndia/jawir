"use client";

import * as React from "react";
import {
  Mail,
  Send,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

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

interface ForgotPasswordFormData {
  email: string;
}

interface CardFormForgotPassword1Props {
  initialEmail?: string;
  onSubmit?: (
    data: ForgotPasswordFormData
  ) => Promise<boolean | void> | boolean | void;
  onBackToLogin?: () => void; // Handler for back link
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  loginHref?: string; // Link back to login page
}

export function CardFormForgotPassword1({
  initialEmail = "",
  onSubmit,
  onBackToLogin,
  title = "Forgot Password",
  description = "Enter your email address and we'll send you instructions to reset your password.",
  inputPlaceholder = "you@example.com",
  submitButtonText = "Send Reset Link",
  successMessage = "Password reset instructions sent! Check your email.",
  errorMessage = "Failed to send reset link. Please check the email address or try again.",
  className,
  loginHref = "#",
}: CardFormForgotPassword1Props) {
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
        // Optionally clear email on success, or keep it
        // setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Basic email validation
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    if (onBackToLogin) {
      e.preventDefault();
      onBackToLogin();
    }
  };

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
          {submitStatus === "success" && (
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0" />
              <p>{successMessage}</p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="flex items-center text-sm text-destructive">
              <AlertTriangle className="mr-2 h-4 w-4 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="forgot-email">
              <Mail className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
              Email Address
            </Label>
            <Input
              id="forgot-email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder={inputPlaceholder}
              required
              disabled={isSubmitting || submitStatus === "success"}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button
            type="submit"
            disabled={
              !isValidEmail(email) || isSubmitting || submitStatus === "success"
            }
          >
            {isSubmitting ? "Sending..." : submitButtonText}
            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
          <Button
            variant="link"
            size="sm"
            asChild
            className="text-muted-foreground"
          >
            <Link href={loginHref} onClick={handleBackClick}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormForgotPassword1;
