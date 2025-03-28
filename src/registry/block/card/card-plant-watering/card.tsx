"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { Droplet, CalendarDays, CheckCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import Button from "@/registry/components/button/button-shadcn/button";

interface CardPlantWateringProps {
  lastWatered?: Date;
  wateringIntervalDays?: number; // e.g., water every 3 days
}

const CardPlantWatering: React.FC<CardPlantWateringProps> = ({
  lastWatered = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Default to 2 days ago
  wateringIntervalDays = 3,
}) => {
  const [isWatered, setIsWatered] = useState(false);
  const [currentLastWatered, setCurrentLastWatered] = useState(lastWatered);

  const nextWateringDate = addDays(currentLastWatered, wateringIntervalDays);

  const handleWaterPlant = () => {
    setCurrentLastWatered(new Date());
    setIsWatered(true);
    // Optionally reset isWatered after a delay or based on next watering date
    setTimeout(() => setIsWatered(false), 5000); // Reset after 5 seconds for demo
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Watering Schedule</CardTitle>
        <CardDescription>Keep your plant hydrated</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-muted-foreground">
            <Droplet className="mr-2 h-4 w-4" />
            Last Watered
          </span>
          <span className="text-sm font-medium">
            {format(currentLastWatered, "PPP")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center text-sm text-muted-foreground">
            <CalendarDays className="mr-2 h-4 w-4" />
            Next Watering
          </span>
          <span className="text-sm font-medium">
            {format(nextWateringDate, "PPP")}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleWaterPlant}
          disabled={isWatered}
        >
          {isWatered ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Watered Today!
            </>
          ) : (
            "Mark as Watered"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardPlantWatering;
