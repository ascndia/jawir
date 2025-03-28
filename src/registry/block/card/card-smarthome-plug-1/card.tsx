"use client";

import * as React from "react";
import { PlugZap, Gauge } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Switch from "@/registry/components/switch/switch-shadcn/switch";
import Label from "@/registry/components/label/label-shadcn/label";
import { cn } from "@/lib/utils";

interface CardSmartHomePlugProps {
  deviceName?: string;
  initialIsOn?: boolean;
  currentPowerW?: number | null; // Current power consumption in Watts
  totalEnergyKWh?: number | null; // Optional: Total energy consumed
  className?: string;
}

export function CardSmartHomePlug1({
  deviceName = "Desk Lamp Plug",
  initialIsOn = false,
  currentPowerW = 15.3,
  totalEnergyKWh = 1.2, // Example value
  className,
}: CardSmartHomePlugProps) {
  const [isOn, setIsOn] = React.useState(initialIsOn);
  // In a real app, currentPowerW and totalEnergyKWh would likely come from props/state management

  const handleSwitchChange = (checked: boolean) => {
    setIsOn(checked);
    // Optionally, add logic here to send command to smart home API
    console.log(`${deviceName} turned ${checked ? "On" : "Off"}`);
  };

  const displayPower =
    currentPowerW !== null ? `${currentPowerW.toFixed(1)} W` : "N/A";
  const displayEnergy =
    totalEnergyKWh !== null ? `${totalEnergyKWh.toFixed(2)} kWh` : "N/A";

  return (
    <Card className={cn("w-[300px]", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{deviceName}</CardTitle>
        <PlugZap
          className={`h-4 w-4 ${
            isOn ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <Label
            htmlFor={`plug-switch-${deviceName.replace(/\s+/g, "-")}`}
            className="flex flex-col space-y-1"
          >
            <span>{isOn ? "On" : "Off"}</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Toggle the plug power.
            </span>
          </Label>
          <Switch
            id={`plug-switch-${deviceName.replace(/\s+/g, "-")}`}
            checked={isOn}
            onCheckedChange={handleSwitchChange}
            aria-label={`Toggle ${deviceName}`}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>Current Power</span>
          </div>
          <span className="font-semibold">{displayPower}</span>
        </div>
      </CardContent>
      {totalEnergyKWh !== null && (
        <CardFooter>
          <p className="text-xs text-muted-foreground w-full text-center">
            Total Energy Used: {displayEnergy}
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
