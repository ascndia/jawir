import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";

interface WeatherBasicProps {
  location?: string;
  currentTemp?: number;
  highTemp?: number;
  lowTemp?: number;
  condition?: string;
  windSpeed?: number;
  humidity?: number;
  backgroundImage?: string;
  className?: string;
}

const CardWeatherBasic = ({
  location = "New York",
  currentTemp = 24,
  highTemp = 28,
  lowTemp = 18,
  condition = "Partly Cloudy",
  windSpeed = 8,
  humidity = 65,
  backgroundImage = "https://source.unsplash.com/300x150/?skyline",
  className,
}: WeatherBasicProps) => {
  return (
    <Card className={cn("max-w-xs overflow-hidden py-0", className)}>
      <div
        className="flex items-end justify-end h-32 p-4 bg-primary/10 bg-center bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <p className="px-2 py-1 text-sm tracking-wide text-primary-foreground bg-primary bg-opacity-75 rounded shadow-lg">
          {location}
        </p>
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-5xl font-semibold">{currentTemp}°</span>
              <span className="text-lg text-muted-foreground">
                / {lowTemp}°
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-12 h-12 text-primary fill-current shrink-0"
            >
              <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z" />
              <rect width={32} height={48} x={240} y={16} />
              <rect width={32} height={48} x={240} y={448} />
              <rect width={48} height={32} x={448} y={240} />
              <rect width={48} height={32} x={16} y={240} />
              <rect
                width={32}
                height="45.255"
                x={400}
                y="393.373"
                transform="rotate(-45 416 416)"
              />
              <rect
                width="32.001"
                height="45.255"
                x={80}
                y="73.373"
                transform="rotate(-45 96 96)"
              />
              <rect
                width="45.255"
                height={32}
                x="73.373"
                y={400}
                transform="rotate(-45.001 96.002 416.003)"
              />
              <rect
                width="45.255"
                height="32.001"
                x="393.373"
                y={80}
                transform="rotate(-45 416 96)"
              />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">
            {condition}
            <br />
            {windSpeed} KPH winds
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-8 p-4 border-t border-border">
        <div className="flex items-center space-x-1">
          <span className="font-bold">{humidity}%</span>
          <span className="text-sm text-muted-foreground">Humidity</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="font-bold">5%</span>
          <span className="text-sm text-muted-foreground">Precip</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="font-bold">14°</span>
          <span className="text-sm text-muted-foreground">Dew Point</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardWeatherBasic;
