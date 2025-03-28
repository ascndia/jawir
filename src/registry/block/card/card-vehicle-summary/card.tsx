import * as React from "react";
import { Car, MapPin, User, Power } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/components/avatar/avatar-shadcn/avatar"; // Corrected path
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface CardVehicleSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  status?: "Online" | "Offline" | "Idle" | "Moving";
  lastLocation?: string;
  driverName?: string;
  driverImage?: string;
  ignition?: boolean;
}

export function CardVehicleSummary({
  vehicleName = "Truck LMN-012",
  status = "Online",
  lastLocation = "456 Elm St, Anytown",
  driverName = "Jane Smith",
  driverImage = "https://source.unsplash.com/40x40/?portrait",
  ignition = true,
  className,
  ...props
}: CardVehicleSummaryProps) {
  const getStatusColor = () => {
    switch (status) {
      case "Online":
        return "bg-green-500";
      case "Offline":
        return "bg-muted";
      case "Idle":
        return "bg-yellow-500";
      case "Moving":
        return "bg-blue-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{vehicleName}</CardTitle>
        <Badge
          variant="outline"
          className={cn("px-2 py-0.5 text-xs", getStatusColor())}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-[1fr_2fr] items-start gap-4">
        <Avatar>
          <AvatarImage src={driverImage} alt={driverName} />
          <AvatarFallback>
            {driverName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium">{driverName}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{lastLocation}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Power
              className={cn(
                "mr-1 h-4 w-4",
                ignition ? "text-green-500" : "text-destructive"
              )}
            />
            <span>Ignition: {ignition ? "On" : "Off"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVehicleSummary;
