"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { cn } from "@/lib/utils";

interface WeatherStat {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
}

interface WeatherStatsProps {
  location?: string;
  stats?: {
    monthly?: WeatherStat[];
    yearly?: WeatherStat[];
    allTime?: WeatherStat[];
  };
  className?: string;
}

const defaultStats = {
  monthly: [
    { label: "Avg High Temp", value: 26, unit: "°C" },
    { label: "Avg Low Temp", value: 19, unit: "°C" },
    { label: "Total Precipitation", value: 85, unit: "mm" },
    { label: "Avg Wind Speed", value: 10, unit: "km/h" },
  ],
  yearly: [
    { label: "Avg High Temp", value: 22, unit: "°C" },
    { label: "Avg Low Temp", value: 15, unit: "°C" },
    { label: "Total Precipitation", value: 950, unit: "mm" },
    { label: "Avg Wind Speed", value: 12, unit: "km/h" },
  ],
  allTime: [
    { label: "Record High", value: 41, unit: "°C", date: "Jul 2019" },
    { label: "Record Low", value: -5, unit: "°C", date: "Jan 1985" },
    { label: "Wettest Month", value: 210, unit: "mm", date: "Aug 2011" },
    { label: "Highest Wind Gust", value: 120, unit: "km/h", date: "Oct 2012" },
  ],
};

const CardWeatherStats = ({
  location = "New York",
  stats = defaultStats,
  className,
}: WeatherStatsProps) => {
  const [timePeriod, setTimePeriod] = useState<
    "monthly" | "yearly" | "allTime"
  >("monthly");

  const currentStats = stats[timePeriod] || [];

  return (
    <Card className={cn("max-w-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Weather Statistics for {location}</CardTitle>
        <Select
          value={timePeriod}
          onValueChange={(value: any) => setTimePeriod(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
            <SelectItem value="allTime">All Time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {currentStats.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No statistics available for this period.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {currentStats.map((stat, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  {stat.label}
                  {/* @ts-ignore */}
                  {stat.date && ` (${stat.date})`}
                </div>
                <div className="font-semibold text-lg">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm ml-1">{stat.unit}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardWeatherStats;
