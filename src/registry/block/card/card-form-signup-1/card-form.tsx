"use client";

import * as React from "react";
import { Mail, Lock, Eye, EyeOff, UserPlus, ShieldAlert } from "lucide-react";
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/registry/components/checkbox"; // Assuming Checkbox might be needed for terms

interface SignUpFormData {
  email: string;
  password?: string;
  confirmPassword?: string;
  agreedToTerms?: boolean; // Optional terms agreement
}

interface CardFormSignUp1Props {
  initialEmail?: string;
  onSubmit?: (data: SignUpFormData) => Promise<boolean | void> | boolean | void;
  onLogin?: () => void; // Handler for "Already have an account?"
  title?: string;
  description?: string;
  errorMessage?: string | null;
  isLoading?: boolean;
  className?: string;
  loginHref?: string;
  termsHref?: string; // Optional link to terms page
  showTermsAgreement?: boolean;
  passwordPolicyDescription?: string;
}

export function CardFormSignUp1({
  initialEmail = "",
  onSubmit,
  onLogin,
  title = "Create Account",
  description = "Sign up to get started",
  errorMessage,
  isLoading: parentIsLoading,
  className,
  loginHref = "#",
  termsHref = "#",
  showTermsAgreement = true,
  passwordPolicyDescription = "Password must be at least 8 characters.",
}: CardFormSignUp1Props) {
  const [email, setEmail] = React.useState(initialEmail);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreedToTerms, setAgreedToTerms] = React.useState(!showTermsAgreement); // Default true if not shown
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [internalIsLoading, setInternalIsLoading] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const isLoading = parentIsLoading ?? internalIsLoading;
  const displayError = errorMessage ?? localError;
  const passwordsMatch = password === confirmPassword && password !== "";
  const passwordMeetsPolicy = password.length >= 8; // Basic policy check

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!passwordsMatch) {
      setLocalError("Passwords do not match.");
      return;
    }
    if (!passwordMeetsPolicy) {
      setLocalError(
        `Password does not meet policy: ${passwordPolicyDescription}`
      );
      return;
    }
    if (showTermsAgreement && !agreedToTerms) {
      setLocalError("You must agree to the terms and conditions.");
      return;
    }
    if (!onSubmit || isLoading) return;

    setInternalIsLoading(true);

    try {
      const result = await onSubmit({
        email,
        password,
        confirmPassword, // Send confirmPassword for potential backend validation too
        agreedToTerms,
      });
      if (result === false) {
        setLocalError("Sign up failed. Please try again.");
      }
      // On success, parent component should handle redirect/state change
    } catch (error) {
      console.error("Sign up error:", error);
      setLocalError("An unexpected error occurred during sign up.");
    } finally {
      setInternalIsLoading(false);
    }
  };

  const togglePasswordVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    if (onLogin) {
      e.preventDefault();
      onLogin();
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password !== "" &&
    passwordsMatch &&
    passwordMeetsPolicy &&
    agreedToTerms;

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
          {displayError && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Sign Up Failed</AlertTitle>
              <AlertDescription>{displayError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="signup-email">
              <Mail className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
              Email Address
            </Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">
              <Lock className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                disabled={isLoading}
                className="pr-10"
                aria-describedby="password-policy"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(setShowPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            <p id="password-policy" className="text-xs text-muted-foreground">
              {passwordPolicyDescription}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">
              <Lock className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                disabled={isLoading}
                className={`pr-10 ${
                  confirmPassword && !passwordsMatch ? "border-destructive" : ""
                }`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                disabled={isLoading}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {confirmPassword && !passwordsMatch && (
              <p className="text-xs text-destructive">
                Passwords do not match.
              </p>
            )}
          </div>
          {showTermsAgreement && (
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) =>
                  setAgreedToTerms(Boolean(checked))
                }
                disabled={isLoading}
                aria-labelledby="terms-label"
              />
              <Label
                id="terms-label"
                htmlFor="terms"
                className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  href={termsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  tabIndex={isLoading ? -1 : 0}
                >
                  Terms and Conditions
                </Link>
                .
              </Label>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
            {!isLoading && <UserPlus className="ml-2 h-4 w-4" />}
          </Button>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={loginHref}
              onClick={handleLoginClick}
              className="font-medium text-primary underline-offset-4 hover:underline"
              tabIndex={isLoading ? -1 : 0}
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormSignUp1;
