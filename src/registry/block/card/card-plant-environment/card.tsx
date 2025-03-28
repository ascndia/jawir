"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { Thermometer, Droplets, SunMedium } from "lucide-react"; // Using Droplets for Humidity

interface CardPlantEnvironmentProps {
  temperature?: number;
  humidity?: number;
  uvIndex?: number;
}

const CardPlantEnvironment: React.FC<CardPlantEnvironmentProps> = ({
  temperature = 24,
  humidity = 55,
  uvIndex = 5,
}) => {
  const getUvIndexLevel = (index: number): string => {
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  };

  const uvLevel = getUvIndexLevel(uvIndex);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Environment</CardTitle>
        <CardDescription>Current ambient conditions</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <Thermometer className="h-6 w-6 text-blue-500" />
          <span className="text-xs text-muted-foreground">Temperature</span>
          <span className="text-lg font-semibold">{temperature}°C</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Droplets className="h-6 w-6 text-cyan-500" />
          <span className="text-xs text-muted-foreground">Humidity</span>
          <span className="text-lg font-semibold">{humidity}%</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <SunMedium className="h-6 w-6 text-orange-500" />
          <span className="text-xs text-muted-foreground">UV Index</span>
          <span className="text-lg font-semibold">{uvIndex}</span>
          <span className="text-xs text-muted-foreground">({uvLevel})</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlantEnvironment;
