import * as React from "react";
import { Car, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
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
} from "@/registry/components/alert"; // Import from the correct path

interface AlertData {
  id: string | number;
  title: string;
  description: string;
  timestamp: string;
  severity?: "critical" | "warning" | "info"; // Optional severity
}

interface CardVehicleAlertsProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  alerts?: AlertData[];
}

const defaultAlerts: AlertData[] = [
  {
    id: 1,
    title: "Low Battery Voltage",
    description: "Battery voltage detected below 11.8V.",
    timestamp: "2 mins ago",
    severity: "critical",
  },
  {
    id: 2,
    title: "Harsh Braking Detected",
    description: "Sudden deceleration event occurred.",
    timestamp: "15 mins ago",
    severity: "warning",
  },
  {
    id: 3,
    title: "Geofence Exit",
    description: "Vehicle exited 'Warehouse Zone'.",
    timestamp: "1 hour ago",
    severity: "info",
  },
];

export function CardVehicleAlerts({
  vehicleName = "Truck JKL-012",
  alerts = defaultAlerts,
  className,
  ...props
}: CardVehicleAlertsProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
          {alerts.length > 0 && (
            <span className="text-xs font-semibold text-destructive">
              {alerts.length} Active Alert{alerts.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <CardDescription className="pt-1">Active Alerts</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No active alerts.
          </p>
        ) : (
          alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant="destructive"
              className="items-center"
            >
              <TriangleAlert className="h-4 w-4" /> {/* Icon */}
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>
                {alert.description}
                <span className="block text-xs text-muted-foreground/80 pt-0.5">
                  {alert.timestamp}
                </span>
              </AlertDescription>
            </Alert>
          ))
        )}
      </CardContent>
    </Card>
  );
}

export default CardVehicleAlerts;
