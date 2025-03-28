import React from "react";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";

interface WeatherMinimalProps {
  location?: string;
  currentTemp?: number;
  condition?: string;
  icon?: React.ReactNode;
  className?: string;
}

const CardWeatherMinimal = ({
  location = "New York",
  currentTemp = 24,
  condition = "Partly Cloudy",
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="w-10 h-10 text-primary fill-current"
    >
      <path d="M100,352H400a16,16,0,0,1,0,32H100a16,16,0,0,1,0-32Z" />
      <path d="M432,224H382.43a1.1,1.1,0,0,1-.43-.1,1,1,0,0,1-.66-1.27A96.77,96.77,0,0,0,393,192a98.5,98.5,0,0,0-181.34-52.8c-0.06.17-.12,0.33-0.19,0.5a1.1,1.1,0,0,1-.83.5,1,1,0,0,1-.89-0.61A96.59,96.59,0,0,0,96,192a97.32,97.32,0,0,0,10.43,44.27A1,1,0,0,1,105.9,238H80a48,48,0,0,0,0,96H432a48,48,0,0,0,0-96Z" />
    </svg>
  ),
  className,
}: WeatherMinimalProps) => {
  return (
    <Card className={cn("max-w-[180px] p-0", className)}>
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <div className="mb-2">{icon}</div>
        <div className="text-3xl font-bold mb-1">{currentTemp}°</div>
        <div className="text-xs text-muted-foreground mb-2">{condition}</div>
        <div className="text-sm font-medium">{location}</div>
      </CardContent>
    </Card>
  );
};

export default CardWeatherMinimal;
