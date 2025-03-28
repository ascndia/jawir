"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import {
  ScrollArea,
  ScrollBar,
} from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { Bell, Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationLevel = "info" | "warning" | "error" | "success";

interface NotificationItem {
  id: string;
  level: NotificationLevel;
  title: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
}

interface CardNotificationsListProps {
  notifications?: NotificationItem[];
  className?: string;
  maxHeight?: string; // e.g., "h-[300px]"
  onMarkAsRead?: (notificationId: string) => void;
  onViewAll?: () => void;
}

// Helper function to format relative time
const formatRelativeTimeShort = (date: Date): string => {
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);

  if (diffSeconds < 60) return `${diffSeconds}s`;
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function CardNotificationsList1({
  notifications = [
    // Default mock data
    {
      id: "notif1",
      level: "success",
      title: "PDF Processed",
      message: "'Annual Report 2024.pdf' is ready for chat.",
      timestamp: new Date(Date.now() - 5 * 60000),
      isRead: false,
    },
    {
      id: "notif2",
      level: "warning",
      title: "Usage Limit Approaching",
      message: "You've used 85% of your monthly token limit.",
      timestamp: new Date(Date.now() - 2 * 3600000),
      isRead: false,
    },
    {
      id: "notif3",
      level: "info",
      title: "New Model Available",
      message: "Claude 3 Haiku is now available for selection.",
      timestamp: new Date(Date.now() - 24 * 3600000),
      isRead: true,
    },
    {
      id: "notif4",
      level: "error",
      title: "Sync Failed",
      message:
        "Failed to sync RAG source 'Archived Reports'. Please check configuration.",
      timestamp: new Date(Date.now() - 2 * 24 * 3600000),
      isRead: true,
    },
  ],
  className,
  maxHeight = "h-[300px]",
  onMarkAsRead,
  onViewAll,
}: CardNotificationsListProps) {
  const getLevelInfo = (
    level: NotificationLevel
  ): { icon: React.ElementType; variant: "default" | "destructive" | null } => {
    switch (level) {
      case "info":
        return { icon: Info, variant: null }; // Default Alert variant
      case "warning":
        return { icon: AlertTriangle, variant: null }; // Use default, maybe style differently via className
      case "error":
        return { icon: XCircle, variant: "destructive" };
      case "success":
        return { icon: CheckCircle2, variant: null }; // Use default, maybe style differently via className
      default:
        return { icon: Info, variant: null };
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification(s).`
              : "No new notifications."}
          </CardDescription>
        </div>
        <Bell className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className={maxHeight}>
          <div className="space-y-2 p-4 pt-0">
            {notifications.map((notification) => {
              const levelInfo = getLevelInfo(notification.level);
              const Icon = levelInfo.icon;
              return (
                <Alert
                  key={notification.id}
                  variant={levelInfo.variant ?? undefined}
                  className={cn(
                    "relative",
                    !notification.isRead && "border-primary/50"
                  )} // Highlight unread
                  onClick={() => onMarkAsRead?.(notification.id)} // Mark as read on click
                  role="button"
                  tabIndex={0}
                  aria-label={`Notification: ${notification.title}`}
                >
                  <Icon className="h-4 w-4" />
                  <AlertTitle className="flex items-center justify-between">
                    <span>{notification.title}</span>
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {formatRelativeTimeShort(notification.timestamp)}
                    </span>
                  </AlertTitle>
                  <AlertDescription>{notification.message}</AlertDescription>
                  {!notification.isRead && (
                    <div
                      className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
                      aria-hidden="true"
                    /> // Unread indicator
                  )}
                </Alert>
              );
            })}
            {notifications.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No notifications to display.
              </div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
      {notifications.length > 0 && (
        <CardFooter className="border-t p-2">
          <Button
            variant="link"
            size="sm"
            className="w-full"
            onClick={onViewAll}
          >
            View All Notifications
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
