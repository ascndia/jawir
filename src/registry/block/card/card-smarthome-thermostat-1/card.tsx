"use client";

import * as React from "react";
import {
  Thermometer,
  Minus,
  Plus,
  Flame,
  Snowflake,
  Power,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils"; // Assuming utils file exists for cn function

type ThermostatMode = "Heat" | "Cool" | "Off";

interface CardSmartHomeThermostatProps {
  deviceName?: string;
  initialCurrentTemp?: number;
  initialTargetTemp?: number;
  initialMode?: ThermostatMode;
  temperatureUnit?: "°C" | "°F";
  className?: string;
}

export function CardSmartHomeThermostat1({
  deviceName = "Main Thermostat",
  initialCurrentTemp = 21,
  initialTargetTemp = 22,
  initialMode = "Heat",
  temperatureUnit = "°C",
  className,
}: CardSmartHomeThermostatProps) {
  const [targetTemp, setTargetTemp] = React.useState(initialTargetTemp);
  const [mode, setMode] = React.useState<ThermostatMode>(initialMode);
  // Assuming currentTemp might come from an external source/prop in a real app
  const currentTemp = initialCurrentTemp;

  const adjustTemperature = (amount: number) => {
    setTargetTemp((prev) => prev + amount);
    // Optionally, add logic here to send command to smart home API
  };

  const cycleMode = () => {
    setMode((prevMode) => {
      if (prevMode === "Off") return "Heat";
      if (prevMode === "Heat") return "Cool";
      return "Off"; // Cool -> Off
    });
    // Optionally, add logic here to send command to smart home API
  };

  const getModeIcon = () => {
    switch (mode) {
      case "Heat":
        return <Flame className="h-4 w-4" />;
      case "Cool":
        return <Snowflake className="h-4 w-4" />;
      case "Off":
        return <Power className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getModeBadgeVariant = ():
    | "default"
    | "destructive"
    | "outline"
    | "secondary" => {
    switch (mode) {
      case "Heat":
        return "destructive"; // Often associated with red/warmth
      case "Cool":
        return "default"; // Often associated with blue/cool (assuming default is blueish)
      case "Off":
        return "secondary"; // Neutral/gray
      default:
        return "secondary";
    }
  };

  return (
    <Card className={cn("w-[350px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{deviceName}</CardTitle>
          <Badge
            variant={getModeBadgeVariant()}
            className="flex items-center gap-1"
          >
            {getModeIcon()}
            {mode}
          </Badge>
        </div>
        <CardDescription>
          Currently {currentTemp}
          {temperatureUnit}. Set to {targetTemp}
          {temperatureUnit}.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl font-bold tracking-tighter">
          {targetTemp}
          {temperatureUnit}
        </div>
        <div className="flex w-full items-center justify-center space-x-2 pt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTemperature(-1)}
            disabled={mode === "Off"}
            aria-label="Decrease temperature"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <span className="text-sm text-muted-foreground">
              Target Temperature
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustTemperature(1)}
            disabled={mode === "Off"}
            aria-label="Increase temperature"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          Current: {currentTemp}
          {temperatureUnit}
        </span>
        <Button
          variant="ghost"
          onClick={cycleMode}
          className="flex items-center gap-1"
        >
          {getModeIcon()}
          Change Mode
        </Button>
      </CardFooter>
    </Card>
  );
}
