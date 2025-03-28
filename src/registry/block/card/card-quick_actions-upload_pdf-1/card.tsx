"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { UploadCloud } from "lucide-react";

interface CardQuickActionsUploadPdfProps {
  onFileSelect?: (file: File) => void;
  className?: string;
  accept?: string; // e.g., ".pdf"
}

export default function CardQuickActionsUploadPdf1({
  onFileSelect,
  className,
  accept = ".pdf",
}: CardQuickActionsUploadPdfProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
    // Reset file input value to allow uploading the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Quickly upload a new PDF document to start chatting.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
        <UploadCloud className="h-12 w-12 text-muted-foreground" />
        <Button onClick={handleButtonClick}>
          <UploadCloud className="mr-2 h-4 w-4" /> Select PDF
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          aria-hidden="true"
        />
        <p className="text-xs text-muted-foreground">
          Maximum file size: 50MB.
        </p>
      </CardContent>
    </Card>
  );
}
