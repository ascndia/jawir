"use client";

import * as React from "react";
import { Lock, Eye, EyeOff, Save, ShieldAlert } from "lucide-react";

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
} from "@/registry/components/alert"; // Assuming standard path

interface CardFormPassword1Props {
  onSubmit?: (data: { currentPassword: string; newPassword: string }) => void;
  onCancel?: () => void;
  passwordPolicyDescription?: string;
  errorMessage?: string | null;
}

export function CardFormPassword1({
  onSubmit,
  onCancel,
  passwordPolicyDescription = "Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.",
  errorMessage,
}: CardFormPassword1Props) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  const passwordsMatch = newPassword === confirmPassword && newPassword !== "";
  const canSubmit =
    currentPassword !== "" && newPassword !== "" && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Clear previous local errors
    if (!passwordsMatch) {
      setLocalError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      // Basic policy check example
      setLocalError("New password does not meet the policy requirements.");
      return;
    }
    if (onSubmit) {
      onSubmit({ currentPassword, newPassword });
    }
    // Add logic here to actually submit the data (e.g., API call)
    console.log("Submitting password change...");
    // Optionally clear fields on successful submission, depending on UX preference
    // setCurrentPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset state
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setLocalError(null);
    console.log("Cancelled password change");
  };

  const togglePasswordVisibility = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account's password. {passwordPolicyDescription}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
          {(errorMessage || localError) && (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage || localError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(setShowCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showCurrentPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility(setShowNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showNewPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
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
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!canSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormPassword1;
