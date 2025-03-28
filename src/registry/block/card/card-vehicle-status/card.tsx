import * as React from "react";
import { Car, Gauge, Power } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge"; // Corrected path and default import

interface CardVehicleStatusProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  status?: "Online" | "Offline" | "Idle" | "Moving";
  ignition?: boolean;
  speed?: number;
  lastUpdate?: string;
}

export function CardVehicleStatus({
  vehicleName = "Truck ABC-123",
  status = "Online",
  ignition = true,
  speed = 45,
  lastUpdate = "2 mins ago",
  className,
  ...props
}: CardVehicleStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Online":
        return "bg-green-500"; // Using specific color for status indication
      case "Offline":
        return "bg-muted";
      case "Idle":
        return "bg-yellow-500"; // Using specific color for status indication
      case "Moving":
        return "bg-blue-500"; // Using specific color for status indication
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{vehicleName}</CardTitle>
        <Badge
          variant="outline"
          className={cn("px-2 py-0.5 text-xs", getStatusColor())}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Car className="h-8 w-8 text-muted-foreground" />
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Power
                  className={cn(
                    "mr-1 h-4 w-4",
                    ignition ? "text-green-500" : "text-destructive" // Using specific color for status indication
                  )}
                />
                Ignition: {ignition ? "On" : "Off"}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Gauge className="mr-1 h-4 w-4" />
                {speed} km/h
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Last update: {lastUpdate}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleStatus;
