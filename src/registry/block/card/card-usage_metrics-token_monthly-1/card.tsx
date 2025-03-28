"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { DatabaseZap } from "lucide-react"; // Using DatabaseZap for tokens
import { cn } from "@/lib/utils"; // Import cn utility

interface CardUsageMetricsTokenMonthlyProps {
  currentUsage?: number;
  limit?: number;
  className?: string;
  month?: string; // e.g., "March"
}

export default function CardUsageMetricsTokenMonthly1({
  currentUsage = 75000,
  limit = 100000,
  className,
  month = new Date().toLocaleString("default", { month: "long" }), // Default to current month
}: CardUsageMetricsTokenMonthlyProps) {
  const usagePercentage =
    limit > 0 ? Math.min((currentUsage / limit) * 100, 100) : 0;

  // Helper function to get the appropriate Tailwind class for the indicator
  const getIndicatorClass = (percentage: number) => {
    if (percentage > 90)
      return "[&>[data-slot='progress-indicator']]:bg-destructive";
    if (percentage > 75)
      return "[&>[data-slot='progress-indicator']]:bg-warning"; // Assuming you have a warning color defined in tailwind.config.js
    return "[&>[data-slot='progress-indicator']]:bg-primary"; // Default
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Token Usage ({month})</CardTitle>
          <DatabaseZap className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Your monthly token consumption for LLM interactions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium">
            {currentUsage.toLocaleString()} Tokens Used
          </span>
          <span className="text-muted-foreground">
            {usagePercentage.toFixed(1)}%
          </span>
        </div>
        <Progress
          value={usagePercentage}
          className={cn("h-2", getIndicatorClass(usagePercentage))} // Apply indicator class here using cn
          aria-label={`${usagePercentage.toFixed(1)}% token usage`}
        />
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Limit: {limit.toLocaleString()} Tokens</span>
          {currentUsage > limit && (
            <Badge variant="destructive">Limit Exceeded</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
