"use client";

import * as React from "react";
import { Lock, Unlock, BatteryMedium, BatteryWarning } from "lucide-react";

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
import { Progress } from "@/registry/components/progress"; // Found path
import { cn } from "@/lib/utils";

interface CardSmartHomeLockProps {
  deviceName?: string;
  initialIsLocked?: boolean;
  batteryLevel?: number | null; // Percentage 0-100
  lastActionTimestamp?: Date | string;
  className?: string;
}

// Helper function to format date/time (similar to security card)
const formatTimestamp = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return "N/A";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  try {
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

export function CardSmartHomeLock1({
  deviceName = "Front Door Lock",
  initialIsLocked = true,
  batteryLevel = 75,
  lastActionTimestamp,
  className,
}: CardSmartHomeLockProps) {
  const [isLocked, setIsLocked] = React.useState(initialIsLocked);
  const [isLoading, setIsLoading] = React.useState(false); // For simulating action delay

  const toggleLock = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLocked((prev) => !prev);
      // Update lastActionTimestamp here if needed, or rely on external update
      setIsLoading(false);
      console.log(`${deviceName} ${isLocked ? "Unlocked" : "Locked"}`);
      // Optionally, add logic here to send command to smart home API
    }, 750); // Simulate network delay
  };

  const getStatusText = () => (isLocked ? "Locked" : "Unlocked");
  const getActionText = () => (isLocked ? "Unlock" : "Lock");
  const getStatusIcon = () =>
    isLocked ? (
      <Lock className="h-6 w-6 text-destructive" />
    ) : (
      <Unlock className="h-6 w-6 text-green-600" /> // Using specific color for unlocked
    );

  const getBatteryIcon = () => {
    if (batteryLevel === null || batteryLevel === undefined) return null;
    if (batteryLevel < 20)
      return <BatteryWarning className="h-4 w-4 text-destructive" />;
    return <BatteryMedium className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className={cn("w-[320px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{deviceName}</CardTitle>
          <Badge
            variant={isLocked ? "destructive" : "default"}
            className="text-xs"
          >
            {getStatusText()}
          </Badge>
        </div>
        {lastActionTimestamp && (
          <CardDescription>
            Last action: {formatTimestamp(lastActionTimestamp)}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 pt-4 pb-6">
        <div className="p-4 rounded-full bg-muted">{getStatusIcon()}</div>
        <Button
          onClick={toggleLock}
          disabled={isLoading}
          className="w-full"
          variant={isLocked ? "default" : "secondary"}
        >
          {isLoading ? "Processing..." : getActionText()}
        </Button>
      </CardContent>
      {batteryLevel !== null && batteryLevel !== undefined && (
        <CardFooter className="flex flex-col items-start space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 w-full">
            {getBatteryIcon()}
            <span>Battery: {batteryLevel}%</span>
          </div>
          <Progress
            value={batteryLevel}
            aria-label={`${batteryLevel}% Battery Remaining`}
            className="h-2"
          />
        </CardFooter>
      )}
    </Card>
  );
}
