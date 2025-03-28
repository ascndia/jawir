"use client";

import * as React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Sun,
  Home,
  BatteryCharging,
  Battery,
  Info,
  Zap,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import Button from "@/registry/components/button/button-shadcn/button";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils";

// --- Types ---
interface LiveEnergyData {
  gridPowerW: number; // Positive=Import, Negative=Export
  solarPowerW: number;
  homeConsumptionW: number;
  batteryPowerW?: number; // Positive=Charging, Negative=Discharging
  batteryPercent?: number; // 0-100
}

interface DailyEnergySummary {
  consumptionKWh: number;
  generationKWh: number;
  gridImportKWh: number;
  gridExportKWh: number;
  selfSufficiencyPercent: number;
}

interface CardSmartHomeEnergyProps {
  liveData?: LiveEnergyData;
  dailySummaryToday?: DailyEnergySummary;
  dailySummaryYesterday?: DailyEnergySummary;
  lastUpdated?: Date | string;
  hasBattery?: boolean;
  onViewDetails?: () => void;
  className?: string;
}

// --- Helper Functions ---
const formatPower = (watts: number | undefined): string => {
  if (watts === undefined) return "N/A";
  if (Math.abs(watts) >= 1000) {
    return `${(watts / 1000).toFixed(2)} kW`;
  }
  return `${watts.toFixed(0)} W`;
};

const formatEnergy = (kWh: number | undefined): string => {
  if (kWh === undefined) return "N/A";
  return `${kWh.toFixed(1)} kWh`;
};

const formatPercent = (percent: number | undefined): string => {
  if (percent === undefined) return "N/A";
  return `${percent.toFixed(0)}%`;
};

const formatTimestamp = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return "N/A";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  try {
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    if (diffSeconds < 5) return "Just now";
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    return `${diffMinutes}m ago`;
  } catch (e) {
    return "Invalid Date";
  }
};

// --- Default Props ---
const defaultLiveData: LiveEnergyData = {
  gridPowerW: -1250, // Exporting 1.25 kW
  solarPowerW: 3500,
  homeConsumptionW: 2250,
  batteryPowerW: 500, // Charging at 0.5 kW
  batteryPercent: 65,
};

const defaultSummary: DailyEnergySummary = {
  consumptionKWh: 15.2,
  generationKWh: 25.8,
  gridImportKWh: 2.1,
  gridExportKWh: 12.7,
  selfSufficiencyPercent: 86,
};

// --- Component ---
export function CardSmartHomeEnergy1({
  liveData = defaultLiveData,
  dailySummaryToday = defaultSummary,
  dailySummaryYesterday = {
    ...defaultSummary,
    consumptionKWh: 16.1,
    selfSufficiencyPercent: 82,
  },
  lastUpdated = new Date(),
  hasBattery = true,
  onViewDetails,
  className,
}: CardSmartHomeEnergyProps) {
  const [activeTab, setActiveTab] = React.useState("today");

  const gridIsExporting = liveData.gridPowerW < 0;
  const batteryIsCharging = hasBattery && (liveData.batteryPowerW ?? 0) > 0;
  const batteryIsDischarging = hasBattery && (liveData.batteryPowerW ?? 0) < 0;

  const renderSummary = (summary: DailyEnergySummary | undefined) => {
    if (!summary)
      return (
        <div className="text-center text-sm text-muted-foreground py-4">
          No data available.
        </div>
      );
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2">
        <div>Consumption:</div>
        <div className="font-medium text-right">
          {formatEnergy(summary.consumptionKWh)}
        </div>
        <div>Solar Generation:</div>
        <div className="font-medium text-right">
          {formatEnergy(summary.generationKWh)}
        </div>
        <div>Grid Import:</div>
        <div className="font-medium text-right">
          {formatEnergy(summary.gridImportKWh)}
        </div>
        <div>Grid Export:</div>
        <div className="font-medium text-right">
          {formatEnergy(summary.gridExportKWh)}
        </div>
        <div>Self Sufficiency:</div>
        <div className="font-medium text-right">
          {formatPercent(summary.selfSufficiencyPercent)}
        </div>
      </div>
    );
  };

  return (
    <Card className={cn("w-[400px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Energy Monitor</CardTitle>
          <Zap className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Live power flow and daily summary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Live Flow */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Live Flow
          </h3>
          {/* Grid */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {gridIsExporting ? (
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDownLeft className="h-5 w-5 text-destructive" />
              )}
              <span>Grid</span>
            </div>
            <span
              className={cn(
                "font-semibold",
                gridIsExporting ? "text-green-600" : "text-destructive"
              )}
            >
              {formatPower(liveData.gridPowerW)}
            </span>
          </div>
          {/* Solar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <span>Solar</span>
            </div>
            <span className="font-semibold text-yellow-600">
              {formatPower(liveData.solarPowerW)}
            </span>
          </div>
          {/* Home Consumption */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              <span>Home</span>
            </div>
            <span className="font-semibold text-blue-600">
              {formatPower(liveData.homeConsumptionW)}
            </span>
          </div>
          {/* Battery */}
          {hasBattery && liveData.batteryPercent !== undefined && (
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                {batteryIsCharging ? (
                  <BatteryCharging className="h-5 w-5 text-green-500" />
                ) : (
                  <Battery className="h-5 w-5 text-muted-foreground" />
                )}
                <span>Battery</span>
              </div>
              <div className="flex items-center gap-2">
                {(batteryIsCharging || batteryIsDischarging) && (
                  <span
                    className={cn(
                      "text-xs font-medium",
                      batteryIsCharging ? "text-green-600" : "text-orange-600"
                    )}
                  >
                    {formatPower(liveData.batteryPowerW)}
                  </span>
                )}
                <Progress
                  value={liveData.batteryPercent}
                  className="w-12 h-2"
                />
                <span className="text-sm font-semibold w-8 text-right">
                  {liveData.batteryPercent}%
                </span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Daily Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">
            Daily Summary
          </h3>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            </TabsList>
            <TabsContent value="today">
              {renderSummary(dailySummaryToday)}
            </TabsContent>
            <TabsContent value="yesterday">
              {renderSummary(dailySummaryYesterday)}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
        <span>Updated: {formatTimestamp(lastUpdated)}</span>
        {onViewDetails && (
          <Button variant="ghost" size="sm" onClick={onViewDetails}>
            <Info className="h-3 w-3 mr-1" />
            Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
