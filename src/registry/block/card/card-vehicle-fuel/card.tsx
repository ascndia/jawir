import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Car, Fuel, Droplets } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress"; // Reusing Progress component

interface CardVehicleFuelProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  fuelLevel?: number; // Percentage 0-100
  estimatedRange?: number; // in km
  avgConsumption?: number; // e.g., L/100km or MPG
  consumptionUnit?: "L/100km" | "MPG";
  lastUpdate?: string;
}

export function CardVehicleFuel({
  vehicleName = "Sedan MNO-345",
  fuelLevel = 65, // Default percentage
  estimatedRange = 350,
  avgConsumption = 8.5,
  consumptionUnit = "L/100km",
  lastUpdate = "3 mins ago",
  className,
  ...props
}: CardVehicleFuelProps) {
  const fuelLevelColor =
    fuelLevel < 20
      ? "bg-destructive" // Low fuel warning color
      : fuelLevel < 50
      ? "bg-yellow-500" // Medium fuel color
      : "bg-primary"; // Normal fuel color

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
          <Fuel className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription className="pt-1">Fuel Status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fuel Level</span>
            <span className="font-semibold">{fuelLevel}%</span>
          </div>
          <Progress value={fuelLevel} aria-label="Fuel level" className="h-2">
            <ProgressIndicator className={fuelLevelColor} />
          </Progress>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Est. Range</span>
            <span>{estimatedRange} km</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Droplets className="mr-1.5 h-4 w-4" />
              Avg. Consumption
            </span>
            <span>
              {avgConsumption} {consumptionUnit}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-right pt-1">
            Last update: {lastUpdate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> & {
    value?: number;
  }
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Indicator
    ref={ref}
    className={cn("h-full w-full flex-1 transition-all", className)}
    style={{ transform: `translateX(-${100 - value}%)` }}
    {...props}
  />
));
ProgressIndicator.displayName = "ProgressIndicator";

export default CardVehicleFuel;
