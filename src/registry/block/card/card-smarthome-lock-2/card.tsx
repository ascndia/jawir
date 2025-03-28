"use client";

import * as React from "react";
import {
  Lock,
  Unlock,
  DoorOpen,
  DoorClosed,
  BatteryMedium,
  BatteryWarning,
  History,
  CheckCircle,
  AlertCircle,
  WifiOff,
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
import { Progress } from "@/registry/components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import Switch from "@/registry/components/switch/switch-shadcn/switch";
import Label from "@/registry/components/label/label-shadcn/label";
import { cn } from "@/lib/utils";

// Define types
type LockStatus = "Online" | "Offline" | "Tampered";

interface LockDevice {
  id: string;
  name: string;
  isLocked: boolean;
  isDoorOpen?: boolean | null; // Door sensor status (optional)
  batteryLevel: number | null; // Percentage 0-100
  autoLockEnabled: boolean;
  status: LockStatus;
  lastEventTimestamp?: Date | string;
}

interface CardSmartHomeLock2Props {
  locks?: LockDevice[]; // Made optional
  initialSelectedLockId?: string;
  onLockToggle?: (lockId: string, currentState: boolean) => void;
  onAutoLockToggle?: (lockId: string, newState: boolean) => void;
  onViewHistory?: (lockId: string) => void;
  className?: string;
}

// Helper function to format date/time
const formatTimestamp = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return "N/A";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  try {
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "Invalid Date";
  }
};

// Default props
const defaultLocks: LockDevice[] = [
  {
    id: "front",
    name: "Front Door",
    isLocked: true,
    isDoorOpen: false,
    batteryLevel: 85,
    autoLockEnabled: true,
    status: "Online",
    lastEventTimestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "back",
    name: "Back Door",
    isLocked: false,
    isDoorOpen: true,
    batteryLevel: 30,
    autoLockEnabled: false,
    status: "Online",
    lastEventTimestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "garage",
    name: "Garage Side Door",
    isLocked: true,
    isDoorOpen: null,
    batteryLevel: 15,
    autoLockEnabled: true,
    status: "Offline",
    lastEventTimestamp: new Date(Date.now() - 60 * 60 * 1000),
  },
];

export function CardSmartHomeLock2({
  locks = defaultLocks,
  initialSelectedLockId,
  onLockToggle,
  onAutoLockToggle,
  onViewHistory,
  className,
}: CardSmartHomeLock2Props) {
  const [selectedLockId, setSelectedLockId] = React.useState(
    initialSelectedLockId || (locks.length > 0 ? locks[0].id : "")
  );
  const [isLoading, setIsLoading] = React.useState(false); // Loading state for lock action
  const [isAutoLockLoading, setIsAutoLockLoading] = React.useState(false); // Loading state for auto-lock toggle

  const selectedLock = locks.find((lock) => lock.id === selectedLockId);

  // Handlers
  const handleLockSelect = (value: string) => {
    setSelectedLockId(value);
  };

  const handleToggleLock = () => {
    if (!selectedLock) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Toggling lock for ${selectedLock.name}`);
      onLockToggle?.(selectedLock.id, selectedLock.isLocked);
      // Note: The actual state update should come via props update
    }, 750);
  };

  const handleToggleAutoLock = (checked: boolean) => {
    if (!selectedLock) return;
    setIsAutoLockLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAutoLockLoading(false);
      console.log(`Toggling auto-lock for ${selectedLock.name} to ${checked}`);
      onAutoLockToggle?.(selectedLock.id, checked);
      // Note: The actual state update should come via props update
    }, 500);
  };

  const handleViewHistoryClick = () => {
    if (!selectedLock) return;
    console.log(`Viewing history for ${selectedLock.name}`);
    onViewHistory?.(selectedLock.id);
  };

  // UI Helpers
  const getStatusBadge = () => {
    if (!selectedLock) return null;
    let variant: "default" | "destructive" | "outline" | "secondary" =
      "secondary";
    let Icon = WifiOff;
    switch (selectedLock.status) {
      case "Online":
        variant = "default";
        Icon = CheckCircle;
        break;
      case "Offline":
        variant = "secondary";
        Icon = WifiOff;
        break;
      case "Tampered":
        variant = "destructive";
        Icon = AlertCircle;
        break;
    }
    return (
      <Badge variant={variant} className="flex items-center gap-1 text-xs">
        <Icon className="h-3 w-3" />
        {selectedLock.status}
      </Badge>
    );
  };

  const getCombinedStatusIcon = () => {
    if (!selectedLock)
      return <Lock className="h-10 w-10 text-muted-foreground" />;
    if (selectedLock.isDoorOpen)
      return <DoorOpen className="h-10 w-10 text-yellow-600" />;
    if (selectedLock.isLocked)
      return <Lock className="h-10 w-10 text-destructive" />;
    return <Unlock className="h-10 w-10 text-green-600" />;
  };

  const getCombinedStatusText = () => {
    if (!selectedLock) return "No lock selected";
    const lockText = selectedLock.isLocked ? "Locked" : "Unlocked";
    const doorText =
      selectedLock.isDoorOpen === true
        ? " / Door Open"
        : selectedLock.isDoorOpen === false
        ? " / Door Closed"
        : "";
    return lockText + doorText;
  };

  const getBatteryIcon = () => {
    if (!selectedLock || selectedLock.batteryLevel === null) return null;
    if (selectedLock.batteryLevel < 20)
      return <BatteryWarning className="h-4 w-4 text-destructive" />;
    return <BatteryMedium className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className={cn("w-[360px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Select
            value={selectedLockId}
            onValueChange={handleLockSelect}
            disabled={locks.length <= 1}
          >
            <SelectTrigger className="flex-grow truncate pr-2">
              <SelectValue placeholder="Select Lock..." />
            </SelectTrigger>
            <SelectContent>
              {locks.map((lock) => (
                <SelectItem key={lock.id} value={lock.id}>
                  {lock.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {getStatusBadge()}
        </div>
        <CardDescription>{getCombinedStatusText()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        {/* Combined Status Icon */}
        <div className="flex justify-center py-4">
          <div className="p-4 rounded-full bg-muted">
            {getCombinedStatusIcon()}
          </div>
        </div>

        {/* Lock/Unlock Button */}
        <Button
          onClick={handleToggleLock}
          disabled={
            isLoading || !selectedLock || selectedLock.status !== "Online"
          }
          className="w-full"
          variant={selectedLock?.isLocked ? "default" : "secondary"}
        >
          {isLoading
            ? "Processing..."
            : selectedLock?.isLocked
            ? "Unlock"
            : "Lock"}
        </Button>

        {/* Auto-Lock Toggle */}
        {selectedLock && (
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-3 shadow-sm">
            <Label
              htmlFor={`auto-lock-${selectedLock.id}`}
              className="flex flex-col space-y-1"
            >
              <span>Auto-Lock</span>
              <span className="font-normal leading-snug text-muted-foreground text-xs">
                Automatically lock after a period.
              </span>
            </Label>
            <Switch
              id={`auto-lock-${selectedLock.id}`}
              checked={selectedLock.autoLockEnabled}
              onCheckedChange={handleToggleAutoLock}
              disabled={isAutoLockLoading || selectedLock.status !== "Online"}
              aria-label="Toggle auto-lock"
            />
          </div>
        )}

        {/* Battery Progress */}
        {selectedLock?.batteryLevel !== null &&
          selectedLock?.batteryLevel !== undefined && (
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  {getBatteryIcon()}
                  <span>Battery</span>
                </div>
                <span>{selectedLock.batteryLevel}%</span>
              </div>
              <Progress
                value={selectedLock.batteryLevel}
                aria-label={`${selectedLock.batteryLevel}% Battery Remaining`}
                className="h-2"
              />
            </div>
          )}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <span>
          Last Event: {formatTimestamp(selectedLock?.lastEventTimestamp)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewHistoryClick}
          disabled={!selectedLock}
        >
          <History className="h-4 w-4 mr-1" />
          History
        </Button>
      </CardFooter>
    </Card>
  );
}
