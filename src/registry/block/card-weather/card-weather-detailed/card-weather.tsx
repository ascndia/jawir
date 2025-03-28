"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";

interface WeatherDetailedProps {
  location?: string;
  currentTemp?: number;
  feelsLike?: number;
  highTemp?: number;
  lowTemp?: number;
  condition?: string;
  windSpeed?: number;
  windDirection?: string;
  humidity?: number;
  pressure?: number;
  visibility?: number;
  uvIndex?: number;
  precipitation?: number;
  dewPoint?: number;
  sunrise?: string;
  sunset?: string;
  backgroundImage?: string;
  className?: string;
}

const CardWeatherDetailed = ({
  location = "New York",
  currentTemp = 24,
  feelsLike = 26,
  highTemp = 28,
  lowTemp = 18,
  condition = "Partly Cloudy",
  windSpeed = 8,
  windDirection = "NE",
  humidity = 65,
  pressure = 1012,
  visibility = 10,
  uvIndex = 7,
  precipitation = 5,
  dewPoint = 14,
  sunrise = "6:15 AM",
  sunset = "7:45 PM",
  backgroundImage = "https://source.unsplash.com/600x200/?skyline",
  className,
}: WeatherDetailedProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "hourly" | "radar">(
    "details"
  );

  return (
    <Card className={cn("max-w-2xl py-0 overflow-hidden", className)}>
      <div
        className="h-48 bg-primary/10 bg-center bg-cover relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-left">
          <h2 className="text-2xl font-bold">{location}</h2>
          <p className="text-muted-foreground">
            Updated as of {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="flex border-b border-border">
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium border-b-2 border-transparent transition-colors",
            activeTab === "details" && "border-primary text-primary"
          )}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium border-b-2 border-transparent transition-colors",
            activeTab === "hourly" && "border-primary text-primary"
          )}
          onClick={() => setActiveTab("hourly")}
        >
          Hourly
        </button>
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium border-b-2 border-transparent transition-colors",
            activeTab === "radar" && "border-primary text-primary"
          )}
          onClick={() => setActiveTab("radar")}
        >
          Radar
        </button>
      </div>

      <CardContent className="p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">{currentTemp}°</span>
                  <span className="text-lg text-muted-foreground ml-2">
                    Feels like {feelsLike}°
                  </span>
                </div>
                <p className="text-lg mt-1">{condition}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>H: {highTemp}°</span>
                  <span>L: {lowTemp}°</span>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-16 h-16 text-primary fill-current"
                >
                  <path d="M100,352H400a16,16,0,0,1,0,32H100a16,16,0,0,1,0-32Z" />
                  <path d="M432,224H382.43a1.1,1.1,0,0,1-.43-.1,1,1,0,0,1-.66-1.27A96.77,96.77,0,0,0,393,192a98.5,98.5,0,0,0-181.34-52.8c-0.06.17-.12,0.33-0.19,0.5a1.1,1.1,0,0,1-.83.5,1,1,0,0,1-.89-0.61A96.59,96.59,0,0,0,96,192a97.32,97.32,0,0,0,10.43,44.27A1,1,0,0,1,105.9,238H80a48,48,0,0,0,0,96H432a48,48,0,0,0,0-96Z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Wind</div>
                <div className="font-medium">
                  {windSpeed} km/h {windDirection}
                </div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Humidity
                </div>
                <div className="font-medium">{humidity}%</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Pressure
                </div>
                <div className="font-medium">{pressure} hPa</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Visibility
                </div>
                <div className="font-medium">{visibility} km</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  UV Index
                </div>
                <div className="font-medium">{uvIndex} of 10</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Precipitation
                </div>
                <div className="font-medium">{precipitation}%</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Dew Point
                </div>
                <div className="font-medium">{dewPoint}°</div>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">
                  Sunrise/Sunset
                </div>
                <div className="font-medium text-xs">
                  {sunrise} / {sunset}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hourly" && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Hourly forecast data would appear here
            </p>
          </div>
        )}

        {activeTab === "radar" && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Weather radar map would appear here
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border p-4 text-xs text-muted-foreground">
        <button className="hover:text-primary transition-colors">
          View Full Report
        </button>
        <span>Powered by Weather Service</span>
      </CardFooter>
    </Card>
  );
};

export default CardWeatherDetailed;
