import * as React from "react";
import { Car, MapPin, Home, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface CardVehicleGeofenceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  geofenceName?: string;
  isInside?: boolean;
}

export function CardVehicleGeofence({
  vehicleName = "Truck GEF-012",
  geofenceName = "Headquarters",
  isInside = true,
  className,
  ...props
}: CardVehicleGeofenceProps) {
  const getGeofenceStatusColor = () => {
    return isInside ? "bg-green-500" : "bg-red-500";
  };

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Car className="mr-2 h-4 w-4 text-muted-foreground" />
          {vehicleName}
        </CardTitle>
        <Badge
          variant="outline"
          className={cn("px-2 py-0.5 text-xs", getGeofenceStatusColor())}
        >
          {isInside ? "Inside" : "Outside"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {isInside ? (
            <Home className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <span className="text-sm">
            Currently {isInside ? "inside" : "outside"} {geofenceName}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleGeofence;
