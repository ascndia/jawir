"use client";

import * as React from "react";
import {
  CheckCircle2,
  File,
  PauseCircle,
  PlayCircle, // Added
  RefreshCw, // Added
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area"; // Added
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type UploadStatus = "uploading" | "paused" | "completed" | "error";

interface UploadItem {
  id: string;
  fileName: string;
  fileSize: string; // e.g., "15.2 MB"
  progress: number; // 0-100
  status: UploadStatus;
  remainingTime?: string; // e.g., "2 minutes left"
  errorMessage?: string;
}

interface CardUploadProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  uploads?: UploadItem[];
  maxHeight?: string;
  onPauseUpload?: (uploadId: string) => void;
  onResumeUpload?: (uploadId: string) => void;
  onCancelUpload?: (uploadId: string) => void;
  onRetryUpload?: (uploadId: string) => void; // Optional for error state
}

// Example default uploads with different states
const defaultUploads: UploadItem[] = [
  {
    id: "upload1",
    fileName: "Annual Report 2024.pdf",
    fileSize: "25.8 MB",
    progress: 75,
    status: "uploading",
    remainingTime: "1 minute left",
  },
  {
    id: "upload2",
    fileName: "Presentation_Deck_Final.pptx",
    fileSize: "52.1 MB",
    progress: 30,
    status: "paused",
  },
  {
    id: "upload3",
    fileName: "Project_Alpha_Assets.zip",
    fileSize: "1.2 GB",
    progress: 100,
    status: "completed",
  },
  {
    id: "upload4",
    fileName: "IMG_0078.jpg",
    fileSize: "4.5 MB",
    progress: 50, // Progress might be stuck or irrelevant on error
    status: "error",
    errorMessage: "Network connection lost",
  },
];

const getStatusIcon = (status: UploadStatus) => {
  switch (status) {
    case "uploading":
      return <UploadCloud className="h-4 w-4 animate-pulse text-blue-500" />;
    case "paused":
      return <PauseCircle className="h-4 w-4 text-yellow-500" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <File className="h-4 w-4 text-muted-foreground" />;
  }
};

export function CardFileHosting6({
  className,
  title = "Upload Progress",
  description = "Tracking your current file uploads.",
  uploads = defaultUploads,
  maxHeight = "400px",
  onPauseUpload = (id) => console.log("Pause upload:", id),
  onResumeUpload = (id) => console.log("Resume upload:", id),
  onCancelUpload = (id) => console.log("Cancel upload:", id),
  onRetryUpload = (id) => console.log("Retry upload:", id),
  ...props
}: CardUploadProgressProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UploadCloud className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          {/* Can add a global action like "Clear Completed" here */}
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          <div className="space-y-4 p-4 pt-0">
            {uploads.map((upload) => (
              <div key={upload.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 items-center space-x-2">
                    <div className="flex-shrink-0">
                      {getStatusIcon(upload.status)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {upload.fileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {upload.status === "uploading" &&
                          `${upload.progress}% - ${
                            upload.remainingTime || "Calculating..."
                          }`}
                        {upload.status === "paused" &&
                          `${upload.progress}% - Paused`}
                        {upload.status === "completed" &&
                          `Completed - ${upload.fileSize}`}
                        {upload.status === "error" && (
                          <span className="text-destructive">
                            Error: {upload.errorMessage || "Upload failed"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center space-x-1">
                    {upload.status === "uploading" && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onPauseUpload(upload.id)}
                            >
                              <PauseCircle className="h-4 w-4" />
                              <span className="sr-only">Pause</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Pause upload</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {upload.status === "paused" && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onResumeUpload(upload.id)}
                            >
                              <PlayCircle className="h-4 w-4" />{" "}
                              {/* Assuming PlayCircle exists */}
                              <span className="sr-only">Resume</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Resume upload</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {upload.status === "error" && onRetryUpload && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => onRetryUpload(upload.id)}
                            >
                              <RefreshCw className="h-4 w-4" />{" "}
                              {/* Assuming RefreshCw exists */}
                              <span className="sr-only">Retry</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Retry upload</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {upload.status !== "completed" && (
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive"
                              onClick={() => onCancelUpload(upload.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Cancel</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cancel upload</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                {upload.status !== "completed" && (
                  <Progress
                    value={upload.progress}
                    className={cn(
                      "h-1 w-full",
                      upload.status === "error" &&
                        "bg-destructive/20 [&>*]:bg-destructive"
                    )}
                    aria-label={`Upload progress ${upload.progress}%`}
                  />
                )}
                {/* Add separator if needed, maybe outside the loop or conditionally */}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
