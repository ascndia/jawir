import * as React from "react";
import { Car, Clock, Timer } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface CardVehicleUtilizationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  engineOnTime?: string; // e.g., "12h 30m"
  idleTime?: string; // e.g., "2h 15m"
  mileage?: number; // in km
}

export function CardVehicleUtilization({
  vehicleName = "Vehicle XYZ-789",
  engineOnTime = "8h 45m",
  idleTime = "1h 30m",
  mileage = 250,
  className,
  ...props
}: CardVehicleUtilizationProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
        </div>
        <CardDescription className="pt-1">Utilization Stats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center">
            <Clock className="mr-1.5 h-4 w-4" />
            Engine On Time
          </span>
          <span>{engineOnTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground flex items-center">
            <Timer className="mr-1.5 h-4 w-4" />
            Idle Time
          </span>
          <span>{idleTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Mileage</span>
          <span>{mileage} km</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleUtilization;
