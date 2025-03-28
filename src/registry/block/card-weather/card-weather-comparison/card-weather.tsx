"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Button } from "@/registry/components/button";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { cn } from "@/lib/utils";

interface LocationWeather {
  id: string;
  location: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ReactNode;
}

interface WeatherComparisonProps {
  initialLocations?: LocationWeather[];
  className?: string;
}

const defaultLocations: LocationWeather[] = [
  {
    id: "loc-1",
    location: "New York",
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 8,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M100,352H400a16,16,0,0,1,0,32H100a16,16,0,0,1,0-32Z" />
        <path d="M432,224H382.43a1.1,1.1,0,0,1-.43-.1,1,1,0,0,1-.66-1.27A96.77,96.77,0,0,0,393,192a98.5,98.5,0,0,0-181.34-52.8c-0.06.17-.12,0.33-0.19,0.5a1.1,1.1,0,0,1-.83.5,1,1,0,0,1-.89-0.61A96.59,96.59,0,0,0,96,192a97.32,97.32,0,0,0,10.43,44.27A1,1,0,0,1,105.9,238H80a48,48,0,0,0,0,96H432a48,48,0,0,0,0-96Z" />
      </svg>
    ),
  },
  {
    id: "loc-2",
    location: "London",
    temp: 15,
    condition: "Cloudy",
    humidity: 80,
    windSpeed: 12,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-8 h-8 text-primary fill-current"
      >
        <path d="M376,432H136c-36.44,0-70.36-12.57-95.51-35.41C14.38,372.88,0,340,0,304c0-36.58,13.39-68.12,38.72-91.22,18.11-16.53,42.22-28.25,69.18-33.87a16,16,0,0,0,11.37-9.15,156.24,156.24,0,0,1,42.05-56C187.76,91.69,220.5,80,256,80a153.57,153.57,0,0,1,107.14,42.9c24.73,23.81,41.5,55.28,49.18,92a16,16,0,0,0,12.12,12.39C470,237.42,512,270.43,512,328c0,33.39-12.24,60.78-35.41,79.23C456.23,423.43,428.37,432,376,432Z" />
      </svg>
    ),
  },
];

const CardWeatherComparison = ({
  initialLocations = defaultLocations,
  className,
}: WeatherComparisonProps) => {
  const [locations, setLocations] =
    useState<LocationWeather[]>(initialLocations);
  const [newLocation, setNewLocation] = useState("");

  const addLocation = () => {
    if (newLocation.trim() === "") return;
    // In a real app, you'd fetch weather data for the new location
    const newLocData: LocationWeather = {
      id: `loc-${Date.now()}`,
      location: newLocation,
      temp: Math.floor(Math.random() * 30) + 5, // Dummy data
      condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 50) + 50,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-8 h-8 text-primary fill-current"
        >
          <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z" />
        </svg>
      ), // Dummy icon
    };
    setLocations([...locations, newLocData]);
    setNewLocation("");
  };

  const removeLocation = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  return (
    <Card className={cn("max-w-4xl", className)}>
      <CardHeader>
        <CardTitle>Weather Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Add location..."
            value={newLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewLocation(e.target.value)
            }
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === "Enter" && addLocation()
            }
            className="flex-grow"
          />
          <Button onClick={addLocation}>Add</Button>
        </div>

        {locations.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Add locations to compare weather.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="border rounded-lg p-4 bg-muted/30 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeLocation(loc.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
                <h3 className="font-semibold text-lg mb-2">{loc.location}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-bold">{loc.temp}°</span>
                  {loc.icon}
                </div>
                <p className="text-sm mb-3">{loc.condition}</p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p>Humidity: {loc.humidity}%</p>
                  <p>Wind: {loc.windSpeed} km/h</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardWeatherComparison;
