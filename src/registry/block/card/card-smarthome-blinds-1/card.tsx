"use client";

import * as React from "react";
import {
  PanelTopOpen,
  PanelBottomOpen,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Slider } from "@/registry/components/slider";
import Label from "@/registry/components/label/label-shadcn/label";
import { cn } from "@/lib/utils";

interface CardSmartHomeBlindsProps {
  deviceName?: string;
  initialPosition?: number; // Percentage 0-100 (0=closed, 100=open)
  className?: string;
}

export function CardSmartHomeBlinds1({
  deviceName = "Bedroom Blinds",
  initialPosition = 50,
  className,
}: CardSmartHomeBlindsProps) {
  const [position, setPosition] = React.useState(initialPosition);
  const [isLoading, setIsLoading] = React.useState(false); // Simulate action delay

  const handleSliderChange = (value: number[]) => {
    setPosition(value[0]);
    // Debounce this in a real app before sending command
    console.log(`${deviceName} Position set to ${value[0]}%`);
    // Optionally, add logic here to send command
  };

  const setBlindPosition = (newPosition: number) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosition(newPosition);
      setIsLoading(false);
      console.log(`${deviceName} Position set to ${newPosition}%`);
      // Optionally, add logic here to send command
    }, 500);
  };

  return (
    <Card className={cn("w-[320px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{deviceName}</CardTitle>
          <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Control the position of your smart blinds.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        {/* Position Slider */}
        <div className="space-y-2">
          <Label
            htmlFor={`blinds-slider-${deviceName.replace(/\s+/g, "-")}`}
            className="flex items-center justify-between"
          >
            <span>Position</span>
            <span className="text-sm font-semibold">{position}% Open</span>
          </Label>
          <Slider
            id={`blinds-slider-${deviceName.replace(/\s+/g, "-")}`}
            value={[position]}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            disabled={isLoading}
            aria-label="Adjust blinds position"
            className="flex-grow"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Closed</span>
            <span>Open</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setBlindPosition(0)} // Fully Close
            disabled={isLoading || position === 0}
            aria-label="Fully close blinds"
          >
            <PanelBottomOpen className="h-5 w-5" /> {/* Icon for Close */}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setBlindPosition(100)} // Fully Open
            disabled={isLoading || position === 100}
            aria-label="Fully open blinds"
          >
            <PanelTopOpen className="h-5 w-5" /> {/* Icon for Open */}
          </Button>
        </div>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter>
          <p className="text-xs text-muted-foreground">Status: {isLoading ? 'Moving...' : 'Idle'}</p>
       </CardFooter> */}
    </Card>
  );
}
