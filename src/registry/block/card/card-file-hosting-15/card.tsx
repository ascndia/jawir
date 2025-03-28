"use client";

import * as React from "react";
import {
  Clock,
  FileText,
  LogIn,
  MoreVertical,
  Share2,
  ShieldCheck,
  User,
  KeyRound, // For password change
  Smartphone, // For device type
} from "lucide-react";

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
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type LogEventType =
  | "login"
  | "file_access"
  | "sharing_change"
  | "password_change"
  | "device_added";

interface AccessLogItem {
  id: string;
  eventType: LogEventType;
  timestamp: string;
  description: string; // e.g., "Logged in from Chrome on Windows", "Accessed 'Report.docx'"
  user?: { name: string; avatarUrl?: string }; // Optional, if not current user action
  ipAddress?: string; // Optional
  location?: string; // Optional, e.g., "New York, USA"
  deviceType?: "desktop" | "mobile" | "unknown"; // Optional
}

interface CardSecurityLogProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  logItems?: AccessLogItem[];
  maxHeight?: string;
  onViewFullLog?: () => void; // Link to a more detailed log page
}

const defaultLogItems: AccessLogItem[] = [
  {
    id: "log1",
    eventType: "login",
    timestamp: "1 hour ago",
    description: "Successful login",
    ipAddress: "192.168.1.100",
    location: "Jakarta, Indonesia",
    deviceType: "desktop",
  },
  {
    id: "log2",
    eventType: "file_access",
    timestamp: "2 hours ago",
    description: "Accessed 'Project Proposal V2.docx'",
    user: { name: "Current User" }, // Assuming current user action
  },
  {
    id: "log3",
    eventType: "sharing_change",
    timestamp: "5 hours ago",
    description: "Sharing settings updated for 'Marketing Budget Q3.xlsx'",
    user: { name: "Current User" },
  },
  {
    id: "log4",
    eventType: "password_change",
    timestamp: "Yesterday",
    description: "Password changed successfully",
    user: { name: "Current User" },
  },
  {
    id: "log5",
    eventType: "device_added",
    timestamp: "3 days ago",
    description: "New device added: 'Pixel 8 Pro'",
    deviceType: "mobile",
    user: { name: "Current User" },
  },
];

const getEventTypeIcon = (type: LogEventType) => {
  switch (type) {
    case "login":
      return <LogIn className="h-4 w-4 text-blue-500" />;
    case "file_access":
      return <FileText className="h-4 w-4 text-green-500" />;
    case "sharing_change":
      return <Share2 className="h-4 w-4 text-purple-500" />;
    case "password_change":
      return <KeyRound className="h-4 w-4 text-orange-500" />;
    case "device_added":
      return <Smartphone className="h-4 w-4 text-teal-500" />;
    default:
      return <ShieldCheck className="h-4 w-4 text-muted-foreground" />;
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting15({
  className,
  title = "Security Log",
  description = "Recent security-related activity on your account.",
  logItems = defaultLogItems,
  maxHeight = "350px",
  onViewFullLog = () => console.log("View full log"),
  ...props
}: CardSecurityLogProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewFullLog}>
            View All
          </Button>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {logItems.length > 0 ? (
            <div className="space-y-3 p-4 pt-0">
              {logItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex items-start space-x-3 pt-3"
                >
                  {index !== 0 && (
                    <Separator className="absolute top-0 left-0 right-0" />
                  )}
                  <div className="flex-shrink-0 pt-0.5">
                    {getEventTypeIcon(item.eventType)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{item.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp}
                      {item.location && ` - ${item.location}`}
                      {item.ipAddress && ` (${item.ipAddress})`}
                    </p>
                  </div>
                  {/* Optional: Add user avatar if action was by someone else */}
                  {/* {item.user && item.user.name !== "Current User" && (
                     <Avatar className="h-6 w-6 border">
                       <AvatarImage src={item.user.avatarUrl} alt={item.user.name} />
                       <AvatarFallback className="text-[10px]">{getInitials(item.user.name)}</AvatarFallback>
                     </Avatar>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No recent security events.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
