"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { FlaskConical, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface NutrientLevel {
  name: string; // e.g., "Nitrogen (N)"
  value: number; // e.g., 80
  unit: string; // e.g., "ppm"
  status: "Low" | "Optimal" | "High";
}

interface CardPlantNutrientsProps {
  nutrients?: NutrientLevel[];
  recommendation?: string;
}

const CardPlantNutrients: React.FC<CardPlantNutrientsProps> = ({
  nutrients = [
    // Example data
    { name: "Nitrogen (N)", value: 85, unit: "ppm", status: "Optimal" },
    { name: "Phosphorus (P)", value: 40, unit: "ppm", status: "Low" },
    { name: "Potassium (K)", value: 120, unit: "ppm", status: "Optimal" },
  ],
  recommendation = "Consider adding a phosphorus-rich fertilizer.",
}) => {
  const getStatusColorClass = (status: NutrientLevel["status"]): string => {
    switch (status) {
      case "Low":
        return "text-destructive";
      case "Optimal":
        return "text-success"; // Assuming success color
      case "High":
        return "text-warning"; // Assuming warning color
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <TooltipProvider>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5" />
            Nutrient Levels
          </CardTitle>
          <CardDescription>Soil nutrient analysis</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {nutrients.map((nutrient, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{nutrient.name}</span>
              <span
                className={`text-sm font-semibold ${getStatusColorClass(
                  nutrient.status
                )}`}
              >
                {nutrient.value} {nutrient.unit} ({nutrient.status})
              </span>
            </div>
          ))}
          {recommendation && (
            <div className="mt-2 flex items-start gap-2 rounded-lg border border-dashed p-3 text-sm">
              <Info className="h-4 w-4 mt-1 flex-shrink-0" />
              <p className="text-muted-foreground">{recommendation}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default CardPlantNutrients;
