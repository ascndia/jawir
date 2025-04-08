"use client";
import { AlertTriangle, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";

interface ConfirmationDialogProps {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "delete" | "warning" | "success";
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  open = false,
  onOpenChange,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  isLoading = false,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm?.();
    if (!isLoading && onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const getIcon = () => {
    switch (variant) {
      case "delete":
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "success":
        return <Check className="h-6 w-6 text-success" />;
      case "warning":
      default:
        return <AlertTriangle className="h-6 w-6 text-warning" />;
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case "delete":
        return "destructive";
      case "success":
        return "default";
      case "warning":
      default:
        return "outline";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            {getIcon()}
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button
            variant={getConfirmButtonVariant() as any}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
