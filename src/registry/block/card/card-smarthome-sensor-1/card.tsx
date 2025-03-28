import * as React from "react";
import { Thermometer, Droplets, AlertCircle, CheckCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils"; // Assuming utils file exists for cn function

type SensorStatus = "Normal" | "Warning" | "Critical";

interface CardSmartHomeSensorProps {
  deviceName?: string;
  temperature?: number | null;
  humidity?: number | null;
  status?: SensorStatus;
  lastUpdated?: Date | string;
  temperatureUnit?: "°C" | "°F";
  className?: string;
}

// Helper function to format date/time
const formatTimestamp = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return "N/A";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  try {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "Invalid Date";
  }
};

export function CardSmartHomeSensor1({
  deviceName = "Environment Sensor",
  temperature = 23.5,
  humidity = 45,
  status = "Normal",
  lastUpdated = new Date(),
  temperatureUnit = "°C",
  className,
}: CardSmartHomeSensorProps) {
  const getStatusBadgeVariant = ():
    | "default"
    | "destructive"
    | "outline"
    | "secondary" => {
    switch (status) {
      case "Normal":
        return "default"; // Or "secondary" if default is too prominent
      case "Warning":
        return "outline"; // Often associated with yellow/orange - outline might fit
      case "Critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "Normal":
        return <CheckCircle className="h-3 w-3" />;
      case "Warning":
      case "Critical":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-[300px]", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{deviceName}</CardTitle>
          <Badge
            variant={getStatusBadgeVariant()}
            className="flex items-center gap-1 text-xs"
          >
            {getStatusIcon()}
            {status}
          </Badge>
        </div>
        <CardDescription>Latest sensor readings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Temperature</span>
          </div>
          <span className="text-lg font-semibold">
            {temperature !== null ? `${temperature}${temperatureUnit}` : "N/A"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Humidity</span>
          </div>
          <span className="text-lg font-semibold">
            {humidity !== null ? `${humidity}%` : "N/A"}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Last updated: {formatTimestamp(lastUpdated)}
        </p>
      </CardFooter>
    </Card>
  );
}
