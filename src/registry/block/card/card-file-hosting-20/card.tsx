"use client";

import * as React from "react";
import {
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Copy,
  File,
  MoreVertical,
  Move,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Trash2,
  XCircle,
  Download, // Added
} from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type TransferType = "move" | "copy" | "download"; // Could add 'upload' if not covered by Card 6
type TransferStatus =
  | "transferring"
  | "paused"
  | "completed"
  | "error"
  | "queued";

interface TransferItem {
  id: string;
  type: TransferType;
  itemName: string; // Could be multiple items, e.g., "3 items"
  source?: string; // Optional source path/location
  destination: string; // Destination path/location
  progress: number; // 0-100
  status: TransferStatus;
  speed?: string; // e.g., "15 MB/s"
  remainingTime?: string; // e.g., "5 minutes left"
  errorMessage?: string;
}

interface CardTransferStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  transfers?: TransferItem[];
  maxHeight?: string;
  onPauseTransfer?: (transferId: string) => void;
  onResumeTransfer?: (transferId: string) => void;
  onCancelTransfer?: (transferId: string) => void;
  onRetryTransfer?: (transferId: string) => void;
  onClearCompleted?: () => void; // Optional global action
}

const defaultTransfers: TransferItem[] = [
  {
    id: "t1",
    type: "move",
    itemName: "Project Alpha Assets",
    source: "/Drafts/",
    destination: "/Projects/Archive/",
    progress: 45,
    status: "transferring",
    speed: "12 MB/s",
    remainingTime: "3 minutes left",
  },
  {
    id: "t2",
    type: "copy",
    itemName: "Financial Report Q3.xlsx",
    source: "/Reports/",
    destination: "/Backup/Reports/",
    progress: 80,
    status: "paused",
  },
  {
    id: "t3",
    type: "download",
    itemName: "Large Video File.mp4",
    destination: "Downloads",
    progress: 100,
    status: "completed",
  },
  {
    id: "t4",
    type: "move",
    itemName: "Old Photos (25 items)",
    source: "/Camera Uploads/",
    destination: "/Photos/Archive/",
    progress: 0,
    status: "queued",
  },
  {
    id: "t5",
    type: "copy",
    itemName: "Design System V2",
    source: "/Shared/Design/",
    destination: "/My Projects/Design/",
    progress: 20,
    status: "error",
    errorMessage: "Permission denied",
  },
];

const getTransferIcon = (type: TransferType) => {
  switch (type) {
    case "move":
      return <Move className="h-4 w-4 text-blue-500" />;
    case "copy":
      return <Copy className="h-4 w-4 text-green-500" />;
    case "download":
      return <Download className="h-4 w-4 text-purple-500" />; // Assuming Download exists
    default:
      return <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusIcon = (status: TransferStatus) => {
  switch (status) {
    case "transferring":
      return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
    case "paused":
      return <PauseCircle className="h-4 w-4 text-yellow-500" />;
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "queued":
      return <Clock className="h-4 w-4 text-muted-foreground/70" />;
    default:
      return <File className="h-4 w-4 text-muted-foreground" />;
  }
};

export function CardFileHosting20({
  className,
  title = "File Transfers",
  description = "Status of ongoing file moves, copies, and downloads.",
  transfers = defaultTransfers,
  maxHeight = "400px",
  onPauseTransfer = (id) => console.log("Pause transfer:", id),
  onResumeTransfer = (id) => console.log("Resume transfer:", id),
  onCancelTransfer = (id) => console.log("Cancel transfer:", id),
  onRetryTransfer = (id) => console.log("Retry transfer:", id),
  onClearCompleted = () => console.log("Clear completed"),
  ...props
}: CardTransferStatusProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={onClearCompleted}>
            Clear Completed
          </Button>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {transfers.length > 0 ? (
            <div className="space-y-3 p-4 pt-0">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center space-x-2">
                      <div className="flex-shrink-0">
                        {getTransferIcon(transfer.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          title={transfer.itemName}
                        >
                          {transfer.itemName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {transfer.type === "move" &&
                            `Moving from ${transfer.source || "?"} to ${
                              transfer.destination
                            }`}
                          {transfer.type === "copy" &&
                            `Copying from ${transfer.source || "?"} to ${
                              transfer.destination
                            }`}
                          {transfer.type === "download" &&
                            `Downloading to ${transfer.destination}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center space-x-1">
                      {getStatusIcon(transfer.status)}
                      {/* Action Buttons */}
                      {transfer.status === "transferring" && (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onPauseTransfer(transfer.id)}
                              >
                                <PauseCircle className="h-4 w-4" />
                                <span className="sr-only">Pause</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Pause</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {transfer.status === "paused" && (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onResumeTransfer(transfer.id)}
                              >
                                <PlayCircle className="h-4 w-4" />
                                <span className="sr-only">Resume</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Resume</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {transfer.status === "error" && (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onRetryTransfer(transfer.id)}
                              >
                                <RefreshCw className="h-4 w-4" />
                                <span className="sr-only">Retry</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Retry</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      {transfer.status !== "completed" && (
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={() => onCancelTransfer(transfer.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Cancel</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cancel</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  {/* Progress Bar and Status Text */}
                  {(transfer.status === "transferring" ||
                    transfer.status === "paused" ||
                    transfer.status === "error") && (
                    <Progress
                      value={transfer.progress}
                      className={cn(
                        "h-1 w-full",
                        transfer.status === "error" &&
                          "bg-destructive/20 [&>*]:bg-destructive"
                      )}
                    />
                  )}
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>
                      {transfer.status === "transferring" &&
                        `${transfer.progress}% ${
                          transfer.speed ? `- ${transfer.speed}` : ""
                        }`}
                      {transfer.status === "paused" &&
                        `${transfer.progress}% - Paused`}
                      {transfer.status === "completed" && `Completed`}
                      {transfer.status === "error" &&
                        `Error: ${transfer.errorMessage || "Failed"}`}
                      {transfer.status === "queued" && `Queued`}
                    </span>
                    {transfer.status === "transferring" &&
                      transfer.remainingTime && (
                        <span>{transfer.remainingTime}</span>
                      )}
                  </div>
                  {/* Add separator if needed */}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No active file transfers.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
