"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { Sun, Gauge } from "lucide-react"; // Using Gauge for DLI

interface CardPlantLightProps {
  currentLightLevel?: number; // e.g., in lux or PAR
  dailyLightIntegral?: number; // DLI in mol/m²/day
  lightUnit?: string; // e.g., "lux"
}

const CardPlantLight: React.FC<CardPlantLightProps> = ({
  currentLightLevel = 15000,
  dailyLightIntegral = 12,
  lightUnit = "lux",
}) => {
  const getLightStatus = (level: number): string => {
    // Example thresholds for lux (adjust based on plant type)
    if (level < 5000) return "Too Low";
    if (level < 20000) return "Optimal";
    return "Too High";
  };

  const lightStatus = getLightStatus(currentLightLevel);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="h-5 w-5" />
          Light Exposure
        </CardTitle>
        <CardDescription>Current and daily light levels</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Sun className="h-6 w-6 text-yellow-500" />
            <div>
              <div className="text-xs text-muted-foreground">Current Level</div>
              <div className="text-lg font-semibold">
                {currentLightLevel.toLocaleString()} {lightUnit}
              </div>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {lightStatus}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-muted-foreground">
            <Gauge className="mr-2 h-4 w-4" />
            Daily Light Integral (DLI)
          </span>
          <span className="text-sm font-semibold">
            {dailyLightIntegral} mol/m²/day
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlantLight;
