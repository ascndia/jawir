import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogDelete1A({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete media?"
      headerAlignment="center"
      description={
        <>
          Are you sure you want to delete <strong>&quot;presentation.docx&quot;</strong>?<br />
          You can’t undo this action.
        </>
      }
      className="!max-w-md"
      footer={
        <div className="flex justify-between items-center w-full">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-1/2 mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-1/2 flex items-center justify-center space-x-2"
          >
            <span>Delete media</span>
            <AlertTriangle size={16} />
          </Button>
        </div>
      }
    >
      <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-orange-500" size={20} />
          <div>
            <p className="font-semibold text-orange-700">Warning</p>
            <p className="text-sm text-orange-700">
              By deleting this media, <strong>8 connected hotspots</strong> will also be deleted.
            </p>
          </div>
        </div>
      </div>
    </ReusableDialog>
  );
}

export function DialogDelete1B({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <AlertTriangle className="text-red-500 mb-2" size={40} />
          <span>Delete media?</span>
        </div>
      }
      headerAlignment="center"
      description={
        <>
          Are you sure you want to delete <strong>&quot;presentation.docx&quot;</strong>?<br />
          You can’t undo this action.
        </>
      }
      className="!max-w-md"
      footer={
        <div className="flex justify-between items-center w-full">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-1/2 mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="w-1/2 flex items-center justify-center space-x-2"
          >
            <span>Delete media</span>
            <AlertTriangle size={16} />
          </Button>
        </div>
      }
    >
      <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="text-orange-500" size={20} />
          <div>
            <p className="font-semibold text-orange-700">Warning</p>
            <p className="text-sm text-orange-700">
              By deleting this media, <strong>8 connected hotspots</strong> will also be deleted.
            </p>
          </div>
        </div>
      </div>
    </ReusableDialog>
  );
}