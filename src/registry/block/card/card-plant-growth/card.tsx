"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { TrendingUp } from "lucide-react";

interface CardPlantGrowthProps {
  growthData?: { date: string; height: number }[]; // Example data structure
  currentHeight?: number;
}

// Placeholder for a chart component
const GrowthChartPlaceholder: React.FC<{ data: any }> = ({ data }) => (
  <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
    [Growth Chart Placeholder]
  </div>
);

const CardPlantGrowth: React.FC<CardPlantGrowthProps> = ({
  growthData = [
    // Example data
    { date: "2024-03-01", height: 10 },
    { date: "2024-03-08", height: 12 },
    { date: "2024-03-15", height: 15 },
    { date: "2024-03-22", height: 18 },
  ],
  currentHeight = 18,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Growth Progress
        </CardTitle>
        <CardDescription>Height over time</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <GrowthChartPlaceholder data={growthData} />
        <div className="text-center text-sm text-muted-foreground">
          Current Height:{" "}
          <span className="font-semibold text-primary">{currentHeight} cm</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlantGrowth;
