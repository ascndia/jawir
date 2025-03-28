"use client";

import * as React from "react";
import { Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";

interface DeleteConfirmationDialogProps {
  title?: string;
  description?: string;
  itemName?: string;
  confirmationText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmationDialog({
  title = "Delete Item",
  description = "This action cannot be undone. This will permanently delete this item and remove its data from our servers.",
  itemName = "",
  confirmationText = "delete",
  open = false,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationDialogProps) {
  const [inputValue, setInputValue] = React.useState("");
  const isConfirmDisabled = inputValue !== confirmationText || isLoading;

  const handleConfirm = () => {
    if (inputValue === confirmationText) {
      onConfirm?.();
      if (!isLoading && onOpenChange) {
        onOpenChange(false);
      }
    }
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
    setInputValue("");
  };

  React.useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <Trash2 className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1.5">
              {description}
              {itemName && (
                <span className="mt-1 block font-medium text-foreground">
                  {itemName}
                </span>
              )}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mt-4">
          <Label htmlFor="confirm-delete" className="text-sm font-medium">
            Please type{" "}
            <span className="font-semibold">{confirmationText}</span> to confirm
          </Label>
          <Input
            id="confirm-delete"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-1.5"
            placeholder={confirmationText}
            autoComplete="off"
          />
        </div>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2 sm:justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
