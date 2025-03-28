"use client";

import * as React from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert } from "lucide-react";
import Link from "next/link"; // Assuming Next.js for links

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
import { Checkbox } from "@/registry/components/checkbox"; // Confirmed path
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import { cn } from "@/lib/utils";

interface LoginFormData {
  emailOrUsername: string;
  password?: string; // Optional if using passwordless/social login later
  rememberMe: boolean;
}

interface CardFormLogin1Props {
  initialEmailOrUsername?: string;
  onSubmit?: (data: LoginFormData) => Promise<boolean | void> | boolean | void;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  title?: string;
  description?: string;
  errorMessage?: string | null;
  isLoading?: boolean; // Allow parent to control loading state
  className?: string;
  forgotPasswordHref?: string;
  signUpHref?: string;
}

export function CardFormLogin1({
  initialEmailOrUsername = "",
  onSubmit,
  onForgotPassword,
  onSignUp,
  title = "Login",
  description = "Access your account",
  errorMessage,
  isLoading: parentIsLoading,
  className,
  forgotPasswordHref = "#", // Default placeholder href
  signUpHref = "#", // Default placeholder href
}: CardFormLogin1Props) {
  const [emailOrUsername, setEmailOrUsername] = React.useState(
    initialEmailOrUsername
  );
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalIsLoading, setInternalIsLoading] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const isLoading = parentIsLoading ?? internalIsLoading;
  const displayError = errorMessage ?? localError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isLoading) return;

    setInternalIsLoading(true);
    setLocalError(null);

    try {
      const result = await onSubmit({
        emailOrUsername,
        password,
        rememberMe,
      });
      if (result === false) {
        // Allow onSubmit to signal failure
        setLocalError("Login failed. Please check your credentials.");
      }
      // On success, parent component should handle redirect/state change
    } catch (error) {
      console.error("Login error:", error);
      setLocalError("An unexpected error occurred during login.");
    } finally {
      setInternalIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    if (onForgotPassword) {
      e.preventDefault(); // Prevent navigation if handler is provided
      onForgotPassword();
    }
    // Otherwise, allow default Link behavior
  };

  const handleSignUpClick = (e: React.MouseEvent) => {
    if (onSignUp) {
      e.preventDefault(); // Prevent navigation if handler is provided
      onSignUp();
    }
    // Otherwise, allow default Link behavior
  };

  const isFormValid = emailOrUsername.trim() !== "" && password !== "";

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
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{displayError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="emailOrUsername">
              <Mail className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
              Email or Username
            </Label>
            <Input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text" // Use text to allow both email and username
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="you@example.com or username"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">
                <Lock className="mr-2 inline-block h-4 w-4 align-middle text-muted-foreground" />
                Password
              </Label>
              <Link
                href={forgotPasswordHref}
                onClick={handleForgotPasswordClick}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                tabIndex={isLoading ? -1 : 0} // Make non-interactive when loading
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                tabIndex={-1} // Keep focus on input
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
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              disabled={isLoading}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <Button type="submit" disabled={!isFormValid || isLoading}>
            {isLoading ? "Logging in..." : "Login"}
            {!isLoading && <LogIn className="ml-2 h-4 w-4" />}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          {/* Optional: Add Social Login Buttons here */}
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href={signUpHref}
              onClick={handleSignUpClick}
              className="font-medium text-primary underline-offset-4 hover:underline"
              tabIndex={isLoading ? -1 : 0}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormLogin1;
