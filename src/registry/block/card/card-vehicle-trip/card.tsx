import * as React from "react";
import { Car, Map, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface CardVehicleTripProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  startLocation?: string;
  endLocation?: string;
  startTime?: string; // e.g., "08:00 AM"
  endTime?: string; // e.g., "10:30 AM"
  duration?: string; // e.g., "2h 30m"
  distance?: number; // in km
}

export function CardVehicleTrip({
  vehicleName = "Truck RST-678",
  startLocation = "Warehouse A",
  endLocation = "Distribution Center B",
  startTime = "08:00 AM",
  endTime = "10:30 AM",
  duration = "2h 30m",
  distance = 150,
  className,
  ...props
}: CardVehicleTripProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
        </div>
        <CardDescription className="pt-1">Current/Last Trip</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Map className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>
            {startLocation} to {endLocation}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Start Time</span>
          <span>{startTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">End Time</span>
          <span>{endTime}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span>{duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Distance</span>
          <span>{distance} km</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleTrip;
