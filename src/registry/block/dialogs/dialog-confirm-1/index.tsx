import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogConfirm1A({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Are you sure?"
      description="This action cannot be undone. Please confirm your decision."
      className="!max-w-sm"
      footer={
        <div className="flex flex-col space-y-2 w-full">
          <Button
            className="w-full"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      }
    />
  );
}