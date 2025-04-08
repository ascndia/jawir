"use client";

import * as React from "react";
import { Loader2, RefreshCw, Wifi, WifiOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Progress } from "@/registry/components/progress";

interface OfflineModeDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onReconnect?: () => Promise<boolean>;
  onContinueOffline?: () => void;
  isLoading?: boolean;
}

export default function OfflineModeDialog({
  open = false,
  onOpenChange,
  onReconnect,
  onContinueOffline,
  isLoading = false,
}: OfflineModeDialogProps) {
  const [reconnecting, setReconnecting] = React.useState(false);
  const [reconnectProgress, setReconnectProgress] = React.useState(0);
  const [reconnectAttempts, setReconnectAttempts] = React.useState(0);
  const [reconnectSuccess, setReconnectSuccess] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setReconnecting(false);
      setReconnectProgress(0);
      setReconnectAttempts(0);
      setReconnectSuccess(null);
    }
  }, [open]);

  React.useEffect(() => {
    if (reconnecting) {
      const interval = setInterval(() => {
        setReconnectProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [reconnecting]);

  React.useEffect(() => {
    if (reconnectProgress === 100 && reconnecting) {
      handleReconnectComplete();
    }
  }, [reconnectProgress, reconnecting]);

  const handleReconnect = async () => {
    setReconnecting(true);
    setReconnectProgress(0);
    setReconnectAttempts((prev) => prev + 1);
    setReconnectSuccess(null);
  };

  const handleReconnectComplete = async () => {
    try {
      const success = (await onReconnect?.()) || false;
      setReconnectSuccess(success);
      setReconnecting(false);

      if (success && onOpenChange) {
        // Close dialog after a short delay if reconnection was successful
        setTimeout(() => {
          onOpenChange(false);
        }, 1500);
      }
    } catch (error) {
      setReconnectSuccess(false);
      setReconnecting(false);
    }
  };

  const handleContinueOffline = () => {
    onContinueOffline?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              reconnectSuccess === true ? "bg-success/10" : "bg-warning/10"
            }`}
          >
            {reconnectSuccess === true ? (
              <Wifi className="h-5 w-5 text-success" />
            ) : (
              <WifiOff className="h-5 w-5 text-warning" />
            )}
          </div>
          <div className="flex flex-col">
            <DialogTitle>
              {reconnectSuccess === true
                ? "Connection Restored"
                : "You're Offline"}
            </DialogTitle>
            <DialogDescription className="mt-1.5">
              {reconnectSuccess === true
                ? "Your internet connection has been restored. You're back online."
                : "We can't connect to the server. Check your internet connection."}
            </DialogDescription>
          </div>
        </DialogHeader>

        {reconnecting && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Reconnecting...</span>
              <span>{reconnectProgress}%</span>
            </div>
            <Progress value={reconnectProgress} className="h-2" />
          </div>
        )}

        {reconnectSuccess === false && reconnectAttempts > 0 && (
          <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            Connection attempt failed. Please check your network settings or try
            again.
          </div>
        )}

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          {reconnectSuccess !== true && (
            <Button
              variant="outline"
              onClick={handleContinueOffline}
              className="w-full sm:w-auto"
              disabled={reconnecting || isLoading}
            >
              Continue in Offline Mode
            </Button>
          )}

          {reconnectSuccess !== true && (
            <Button
              onClick={handleReconnect}
              className="w-full sm:w-auto"
              disabled={reconnecting || isLoading}
            >
              {reconnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reconnecting...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {reconnectAttempts > 0 ? "Try Again" : "Reconnect"}
                </>
              )}
            </Button>
          )}

          {reconnectSuccess === true && (
            <Button
              onClick={() => onOpenChange?.(false)}
              className="w-full sm:w-auto"
            >
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
