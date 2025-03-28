import * as React from "react";
import { Wrench, Car, CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress"; // Assuming progress component exists

interface CardVehicleMaintenanceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  maintenanceType?: string;
  dueDate?: string; // e.g., "2025-04-15" or "in 5 days"
  dueMileage?: number; // e.g., 75000
  currentMileage?: number; // e.g., 72500
  progressValue?: number; // Optional override for progress, 0-100
}

export function CardVehicleMaintenance({
  vehicleName = "Van DEF-456",
  maintenanceType = "Oil Change",
  dueDate = "in 15 days",
  dueMileage = 80000,
  currentMileage = 78500,
  progressValue,
  className,
  ...props
}: CardVehicleMaintenanceProps) {
  // Calculate progress based on mileage if not overridden
  const calculatedProgress =
    progressValue !== undefined
      ? progressValue
      : dueMileage && currentMileage
      ? Math.min(Math.max((currentMileage / dueMileage) * 100, 0), 100)
      : 50; // Default progress if mileage info is missing

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
          <Wrench className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription className="pt-1">
          Next Service: {maintenanceType}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              Due Date
            </span>
            <span>{dueDate}</span>
          </div>
          {dueMileage && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due Mileage</span>
              <span>{dueMileage.toLocaleString()} km</span>
            </div>
          )}
          {currentMileage && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Mileage</span>
              <span>{currentMileage.toLocaleString()} km</span>
            </div>
          )}
          <div className="pt-2">
            <Progress
              value={calculatedProgress}
              aria-label={`${maintenanceType} progress`}
            />
            <p className="text-xs text-muted-foreground text-center pt-1">
              {calculatedProgress.toFixed(0)}% until next service
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleMaintenance;
