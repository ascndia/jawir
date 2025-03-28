"use client";

import * as React from "react";
import { Lightbulb, Sun } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Switch from "@/registry/components/switch/switch-shadcn/switch";
import Label from "@/registry/components/label/label-shadcn/label";
import { Slider } from "@/registry/components/slider";

interface CardSmartHomeLightProps {
  deviceName?: string;
  initialIsOn?: boolean;
  initialBrightness?: number;
  className?: string;
}

export function CardSmartHomeLight1({
  deviceName = "Living Room Lamp",
  initialIsOn = false,
  initialBrightness = 50,
  className,
}: CardSmartHomeLightProps) {
  const [isOn, setIsOn] = React.useState(initialIsOn);
  const [brightness, setBrightness] = React.useState(initialBrightness);

  const handleSwitchChange = (checked: boolean) => {
    setIsOn(checked);
    // Optionally, add logic here to send command to smart home API
  };

  const handleSliderChange = (value: number[]) => {
    setBrightness(value[0]);
    // Optionally, add logic here to send command to smart home API
    // Ensure light turns on if brightness is adjusted while off
    if (!isOn && value[0] > 0) {
      setIsOn(true);
    }
    // Ensure light turns off if brightness is set to 0
    if (isOn && value[0] === 0) {
      setIsOn(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{deviceName}</CardTitle>
        <Lightbulb
          className={`h-4 w-4 ${
            isOn ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between space-x-4 pb-4">
          <Label
            htmlFor={`light-switch-${deviceName.replace(/\s+/g, "-")}`}
            className="flex flex-col space-y-1"
          >
            <span>{isOn ? "On" : "Off"}</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Toggle the light status.
            </span>
          </Label>
          <Switch
            id={`light-switch-${deviceName.replace(/\s+/g, "-")}`}
            checked={isOn}
            onCheckedChange={handleSwitchChange}
            aria-label={`Toggle ${deviceName}`}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor={`brightness-slider-${deviceName.replace(/\s+/g, "-")}`}
            className="flex items-center justify-between"
          >
            <span>Brightness</span>
            <span className="text-sm text-muted-foreground">{brightness}%</span>
          </Label>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Slider
              id={`brightness-slider-${deviceName.replace(/\s+/g, "-")}`}
              value={[brightness]}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              disabled={!isOn && brightness === 0} // Disable slider if light is off *and* brightness is 0
              aria-label={`Adjust ${deviceName} brightness`}
              className="flex-grow"
            />
            <Sun className="h-5 w-5 text-muted-foreground fill-current" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
