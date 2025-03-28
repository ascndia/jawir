"use client"; // Needed for dismissing alerts

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle,
  X,
  XCircle,
} from "lucide-react"; // Added XCircle
import { cn } from "@/lib/utils";

type AlertType = "info" | "warning" | "success" | "error";

interface NotificationAlert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  timestamp: string; // ISO 8601
  isDismissible?: boolean;
}

interface CardNotificationsAlerts1Props {
  initialAlerts?: NotificationAlert[];
}

// Define the expected variant type for clarity
type AlertVariant = "default" | "destructive" | null | undefined;

const getAlertAttributes = (
  type: AlertType
): { Icon: React.ElementType; variant: AlertVariant; iconColor: string } => {
  switch (type) {
    case "success":
      return {
        Icon: CheckCircle,
        variant: "default",
        iconColor: "text-green-500",
      }; // Use default Alert variant, color icon
    case "warning":
      return {
        Icon: AlertTriangle,
        variant: "destructive",
        iconColor: "text-yellow-500",
      }; // Use destructive for attention, color icon
    case "error":
      return {
        Icon: XCircle,
        variant: "destructive",
        iconColor: "text-red-500",
      };
    case "info":
    default:
      return { Icon: Info, variant: "default", iconColor: "text-blue-500" };
  }
};

export default function CardNotificationsAlerts1({
  initialAlerts = [
    {
      id: "n1",
      type: "success",
      title: "Payout Processed",
      description: "Your payout of $55.20 has been sent.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      isDismissible: true,
    },
    {
      id: "n2",
      type: "warning",
      title: "Approaching Link Limit",
      description: "You have used 850/1000 links. Consider upgrading.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      isDismissible: true,
    },
    {
      id: "n3",
      type: "info",
      title: "New Feature: Analytics Export",
      description: "You can now export your link analytics data.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isDismissible: false,
    },
  ],
}: CardNotificationsAlerts1Props) {
  const [alerts, setAlerts] = React.useState(initialAlerts);

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications & Alerts</CardTitle>
          <Bell className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Important updates and system messages.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const { Icon, variant, iconColor } = getAlertAttributes(alert.type);
            return (
              <Alert
                key={alert.id}
                variant={variant}
                className="relative pr-10"
              >
                {" "}
                {/* Add padding for close button */}
                <Icon className={cn("h-4 w-4", iconColor)} />
                <AlertTitle>{alert.title}</AlertTitle>
                <AlertDescription>{alert.description}</AlertDescription>
                {alert.isDismissible && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-6 w-6"
                    onClick={() => dismissAlert(alert.id)}
                    aria-label="Dismiss alert"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </Alert>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center">
            <Bell className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No new notifications.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
