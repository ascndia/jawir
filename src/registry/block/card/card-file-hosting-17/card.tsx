"use client";

import * as React from "react";
import { FileText, Folder, Lock, Unlock, User, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface LockInfo {
  isLocked: boolean;
  lockedBy?: {
    name: string;
    avatarUrl?: string;
  };
  lockedAt?: string; // e.g., "15 minutes ago"
  lockExpiresAt?: string; // Optional auto-unlock time
}

interface CardFileLockProps extends React.HTMLAttributes<HTMLDivElement> {
  itemName?: string;
  itemType?: "file" | "folder";
  lockInfo?: LockInfo;
  onLock?: () => void; // Action for current user to lock
  onUnlock?: () => void; // Action for current user/admin to unlock
  onRequestUnlock?: () => void; // Action to notify the locker
}

const defaultLockInfo: LockInfo = {
  isLocked: true,
  lockedBy: { name: "Alice Wonderland", avatarUrl: "/images/placeholder.svg" },
  lockedAt: "15 minutes ago",
  lockExpiresAt: "in 45 minutes",
};

const defaultUnlockedInfo: LockInfo = {
  isLocked: false,
};

const getItemIcon = (type: "file" | "folder") => {
  switch (type) {
    case "file":
      return <FileText className="h-5 w-5 text-muted-foreground" />;
    case "folder":
      return <Folder className="h-5 w-5 text-muted-foreground" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting17({
  className,
  itemName = "Annual Report Draft.docx",
  itemType = "file",
  lockInfo = defaultLockInfo, // Start with locked example
  onLock = () => console.log("Lock item"),
  onUnlock = () => console.log("Unlock item"),
  onRequestUnlock = () => console.log("Request unlock"),
  ...props
}: CardFileLockProps) {
  // Assuming the current user is 'You' for unlock logic example
  const isCurrentUserLocker =
    lockInfo.isLocked && lockInfo.lockedBy?.name === "You"; // Simplified check

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center space-x-2">
          {getItemIcon(itemType)}
          <CardTitle
            className="text-base font-medium truncate"
            title={itemName}
          >
            {itemName}
          </CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm">
          Lock status and controls.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {lockInfo.isLocked ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 rounded-lg bg-destructive/10 p-3 text-destructive">
              <Lock className="h-5 w-5" />
              <span className="font-medium">Locked for Editing</span>
            </div>
            {lockInfo.lockedBy && (
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6 border">
                  <AvatarImage
                    src={lockInfo.lockedBy.avatarUrl}
                    alt={lockInfo.lockedBy.name}
                  />
                  <AvatarFallback className="text-[10px]">
                    {getInitials(lockInfo.lockedBy.name)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">
                  Locked by{" "}
                  <span className="font-medium text-foreground">
                    {lockInfo.lockedBy.name}
                  </span>{" "}
                  {lockInfo.lockedAt}.
                </p>
              </div>
            )}
            {lockInfo.lockExpiresAt && (
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Auto-unlocks {lockInfo.lockExpiresAt}</span>
              </div>
            )}
            <div className="pt-2">
              {isCurrentUserLocker ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={onUnlock}
                >
                  <Unlock className="mr-1.5 h-4 w-4" />
                  Unlock Now
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={onRequestUnlock}
                >
                  <User className="mr-1.5 h-4 w-4" />
                  Request Unlock
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2 rounded-lg bg-green-500/10 p-3 text-green-600">
              <Unlock className="h-5 w-5" />
              <span className="font-medium">Available for Editing</span>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              You can lock this item to prevent others from editing.
            </p>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={onLock}
              >
                <Lock className="mr-1.5 h-4 w-4" />
                Lock Item
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
