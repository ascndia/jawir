import * as React from "react";
import { Car, Gauge, Clock, BatteryCharging } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator"; // Corrected path

interface CardVehicleTelemetryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  odometer?: number; // in km
  engineHours?: number;
  voltage?: number; // in Volts
  lastUpdate?: string;
}

export function CardVehicleTelemetry({
  vehicleName = "Bus GHI-789",
  odometer = 125678,
  engineHours = 3450.5,
  voltage = 12.8,
  lastUpdate = "1 min ago",
  className,
  ...props
}: CardVehicleTelemetryProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{lastUpdate}</span>
        </div>
        <CardDescription className="pt-1">Telemetry Data</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center">
            <Gauge className="mr-1.5 h-4 w-4" />
            Odometer
          </span>
          <span>{odometer.toLocaleString()} km</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center">
            <Clock className="mr-1.5 h-4 w-4" />
            Engine Hours
          </span>
          <span>{engineHours.toLocaleString()} hrs</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center">
            <BatteryCharging className="mr-1.5 h-4 w-4" />
            Voltage
          </span>
          <span>{voltage.toFixed(1)} V</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleTelemetry;
