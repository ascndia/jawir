import * as React from "react";
import { Car, Package, Thermometer } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface CardVehicleCargoProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  cargoType?: string;
  weight?: number; // in kg
  temperature?: number; // in Celsius
  isRefrigerated?: boolean;
}

export function CardVehicleCargo({
  vehicleName = "Reefer Truck UVW-901",
  cargoType = "Produce",
  weight = 12500,
  temperature = 4,
  isRefrigerated = true,
  className,
  ...props
}: CardVehicleCargoProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
        </div>
        <CardDescription className="pt-1">Cargo Details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Cargo Type</span>
          <span>{cargoType}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Weight</span>
          <span>{weight.toLocaleString()} kg</span>
        </div>
        {isRefrigerated && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              <Thermometer className="mr-1.5 h-4 w-4" />
              Temperature
            </span>
            <span>{temperature}°C</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CardVehicleCargo;
