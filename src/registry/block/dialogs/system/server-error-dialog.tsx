"use client";
import { AlertTriangle, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";

interface ServerErrorDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRetry?: () => void;
  onContact?: () => void;
  title?: string;
  description?: string;
  errorCode?: string;
  errorDetails?: string;
}

export default function ServerErrorDialog({
  open = false,
  onOpenChange,
  onRetry,
  onContact,
  title = "Server Error",
  description = "We're experiencing some technical difficulties. Please try again later.",
  errorCode,
  errorDetails,
}: ServerErrorDialogProps) {
  const handleRetry = () => {
    onRetry?.();
  };

  const handleContact = () => {
    onContact?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1.5">
              {description}
              {errorCode && (
                <span className="mt-2 block font-mono text-xs">
                  Error Code: {errorCode}
                </span>
              )}
            </DialogDescription>
          </div>
        </DialogHeader>

        {errorDetails && (
          <div className="mt-4 rounded-md bg-muted p-4">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap text-xs">
              {errorDetails}
            </pre>
          </div>
        )}

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleContact}
            className="w-full sm:w-auto"
          >
            Contact Support
          </Button>
          <Button onClick={handleRetry} className="w-full sm:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
