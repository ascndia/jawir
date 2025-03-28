import * as React from "react";
import { MapPin, Car } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { AspectRatio } from "@/registry/components/aspect-ratio"; // Assuming aspect-ratio is available

interface CardVehicleLocationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  timestamp?: string;
  mapImageUrl?: string; // URL for a static map image preview
}

export function CardVehicleLocation({
  vehicleName = "Truck XYZ-789",
  address = "123 Main St, Anytown, USA",
  latitude = 40.7128,
  longitude = -74.006,
  timestamp = "5 mins ago",
  mapImageUrl = "/images/placeholder.jpg", // Default placeholder
  className,
  ...props
}: CardVehicleLocationProps) {
  return (
    <Card className={cn("w-full max-w-sm pb-0", className)} {...props}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center">
            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
            {vehicleName}
          </CardTitle>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <CardDescription className="flex items-start pt-1">
          <MapPin className="mr-1 h-4 w-4 flex-shrink-0 mt-0.5" />
          {address}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Assuming AspectRatio component exists for map preview */}
        <AspectRatio ratio={16 / 9}>
          <img
            src={mapImageUrl}
            alt={`Map location for ${vehicleName}`}
            className="rounded-b-lg object-cover w-full h-full"
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}

export default CardVehicleLocation;
