"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { Thermometer, Droplet, Sun } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils.ts exists for cn function
import { Progress } from "@/registry/components/progress";

interface CardPlantHealthProps {
  soilMoisture?: number;
  temperature?: number;
  lightLevel?: number;
}

const getStatusColor = (
  value: number,
  thresholds: { warn: number; danger: number },
  lowerIsBetter = false
) => {
  if (lowerIsBetter) {
    if (value > thresholds.danger) return "bg-destructive";
    if (value > thresholds.warn) return "bg-warning";
  } else {
    if (value < thresholds.danger) return "bg-destructive";
    if (value < thresholds.warn) return "bg-warning";
  }
  return "bg-success"; // Assuming you have success, warning, destructive colors defined in tailwind.config.js
};

const CardPlantHealth: React.FC<CardPlantHealthProps> = ({
  soilMoisture = 65, // Example value
  temperature = 22, // Example value
  lightLevel = 80, // Example value
}) => {
  const moistureStatusColor = getStatusColor(soilMoisture, {
    warn: 40,
    danger: 20,
  });
  const tempStatusColor = getStatusColor(temperature, { warn: 30, danger: 15 }); // Example thresholds
  const lightStatusColor = getStatusColor(lightLevel, { warn: 50, danger: 30 });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Plant Health Status</CardTitle>
        <CardDescription>Current environmental metrics</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm font-medium">
              <Droplet className="mr-2 h-4 w-4 text-muted-foreground" />
              Soil Moisture
            </span>
            <span className="text-sm font-semibold">{soilMoisture}%</span>
          </div>
          <Progress
            value={soilMoisture}
            max={100}
            // className="h-2 [&>*]:bg-primary"
            className={`h-2 [&>*]:bg-primary ${moistureStatusColor}`}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm font-medium">
              <Thermometer className="mr-2 h-4 w-4 text-muted-foreground" />
              Temperature
            </span>
            <span className="text-sm font-semibold">{temperature}°C</span>
          </div>
          <Progress
            value={temperature}
            max={40}
            // className="h-2 [&>*]:bg-primary"
            className={`h-2 [&>*]:bg-primary ${moistureStatusColor}`}
          />{" "}
          {/* Assuming max temp 40 */}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm font-medium">
              <Sun className="mr-2 h-4 w-4 text-muted-foreground" />
              Light Level
            </span>
            <span className="text-sm font-semibold">{lightLevel}%</span>
          </div>
          <Progress
            value={lightLevel}
            max={100}
            // className="h-2 [&>*]:bg-primary"
            className={`h-2 [&>*]:bg-primary ${moistureStatusColor}`}
            // indicatorClassName={lightStatusColor}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlantHealth;
