"use client";

import * as React from "react";
import { LogOut, Timer } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Progress } from "@/registry/components/progress";

interface LogoutWarningDialogProps {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onStayLoggedIn?: () => void;
  onLogout?: () => void;
  timeoutSeconds?: number;
  isLoading?: boolean;
}

export default function LogoutWarningDialog({
  title = "Session Timeout",
  description = "You will be logged out due to inactivity.",
  open = false,
  onOpenChange,
  onStayLoggedIn,
  onLogout,
  timeoutSeconds = 60,
  isLoading = false,
}: LogoutWarningDialogProps) {
  const [timeLeft, setTimeLeft] = React.useState(timeoutSeconds);
  const progressValue = (timeLeft / timeoutSeconds) * 100;

  React.useEffect(() => {
    if (!open) {
      setTimeLeft(timeoutSeconds);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onLogout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeoutSeconds, onLogout]);

  const handleStayLoggedIn = () => {
    onStayLoggedIn?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleLogout = () => {
    onLogout?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20">
            <Timer className="h-5 w-5 text-warning" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1.5">
              {description} You will be logged out in {formatTime(timeLeft)}.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <Progress value={progressValue} className="h-2" />
        </div>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="gap-2"
            disabled={isLoading}
          >
            <LogOut className="h-4 w-4" />
            Logout Now
          </Button>
          <Button onClick={handleStayLoggedIn} disabled={isLoading}>
            {isLoading ? "Processing..." : "Stay Logged In"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
