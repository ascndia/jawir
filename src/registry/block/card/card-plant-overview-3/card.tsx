"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Flower, Gauge } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";

interface CardPlantOverview3Props {
  name?: string;
  species?: string;
  health?: number;
}

const CardPlantOverview3: React.FC<CardPlantOverview3Props> = ({
  name = "My Plant",
  species = "Unknown",
  health = 50,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flower className="h-4 w-4" />
          <span>{name}</span>
        </CardTitle>
        <CardDescription>{species}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <Gauge className="h-4 w-4" />
          <span>Overall Health:</span>
        </div>
        <Progress value={health} max={100} />
      </CardContent>
    </Card>
  );
};

export default CardPlantOverview3;
