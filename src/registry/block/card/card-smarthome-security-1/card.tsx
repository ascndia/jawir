"use client";

import * as React from "react";
import {
  Video,
  Camera,
  AlertCircle,
  CheckCircle,
  CircleDot,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { AspectRatio } from "@/registry/components/aspect-ratio"; // Assuming path
import { cn } from "@/lib/utils";

type CameraStatus =
  | "Live"
  | "Recording"
  | "Offline"
  | "Motion Detected"
  | "Idle";

interface CardSmartHomeSecurityProps {
  deviceName?: string;
  initialStatus?: CameraStatus;
  lastEventTimestamp?: Date | string;
  imageUrl?: string; // Optional image URL for placeholder
  className?: string;
}

// Helper function to format date/time
const formatTimestamp = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return "N/A";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  try {
    // Show relative time or absolute time based on how old it is
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch (e) {
    return "Invalid Date";
  }
};

export function CardSmartHomeSecurity1({
  deviceName = "Front Door Cam",
  initialStatus = "Idle",
  lastEventTimestamp = new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  imageUrl, // No default image
  className,
}: CardSmartHomeSecurityProps) {
  // In a real app, status would likely come from props or context
  const [status, setStatus] = React.useState<CameraStatus>(initialStatus);

  const getStatusBadgeVariant = ():
    | "default"
    | "destructive"
    | "outline"
    | "secondary" => {
    switch (status) {
      case "Live":
      case "Recording":
        return "destructive"; // Often red for active recording/live
      case "Motion Detected":
        return "outline"; // Yellow/Orange indication
      case "Offline":
        return "secondary"; // Grayed out
      case "Idle":
      default:
        return "default"; // Or secondary
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Live":
        return <CircleDot className="h-3 w-3 animate-pulse" />; // Pulsing dot for live
      case "Recording":
        return <CircleDot className="h-3 w-3" />; // Solid dot for recording
      case "Motion Detected":
        return <AlertCircle className="h-3 w-3" />;
      case "Offline":
        return <AlertCircle className="h-3 w-3" />;
      case "Idle":
      default:
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  // Placeholder actions
  const handleViewLive = () =>
    console.log(`Viewing live feed for ${deviceName}`);
  const handleViewRecordings = () =>
    console.log(`Viewing recordings for ${deviceName}`);

  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-muted-foreground" />
            <CardTitle>{deviceName}</CardTitle>
          </div>
          <Badge
            variant={getStatusBadgeVariant()}
            className="flex items-center gap-1 text-xs whitespace-nowrap"
          >
            {getStatusIcon()}
            {status}
          </Badge>
        </div>
        <CardDescription>
          Last event: {formatTimestamp(lastEventTimestamp)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-md overflow-hidden"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Preview for ${deviceName}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Video className="h-12 w-12" />
            </div>
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleViewRecordings}>
          View Recordings
        </Button>
        <Button
          size="sm"
          onClick={handleViewLive}
          disabled={status === "Offline"}
        >
          View Live
        </Button>
      </CardFooter>
    </Card>
  );
}
