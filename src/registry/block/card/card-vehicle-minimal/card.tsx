import * as React from "react";
import { Car } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface CardVehicleMinimalProps extends React.HTMLAttributes<HTMLDivElement> {
  vehicleName?: string;
  status?: "Online" | "Offline" | "Idle" | "Moving";
}

export function CardVehicleMinimal({
  vehicleName = "Vehicle-123",
  status = "Online",
  className,
  ...props
}: CardVehicleMinimalProps) {
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
    <Card className={cn("w-full max-w-[120px]", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{vehicleName}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <Car className="h-6 w-6 text-muted-foreground" />
      </CardContent>
      <Badge
        variant="outline"
        className={cn(
          "w-full justify-center rounded-none border-0 px-0 py-1 text-xs",
          getStatusColor()
        )}
      >
        {status}
      </Badge>
    </Card>
  );
}

export default CardVehicleMinimal;
