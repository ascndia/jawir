"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Flower } from "lucide-react";

interface CardPlantOverview2Props {
  name?: string;
  species?: string;
  description?: string;
  imageUrl?: string;
}

const CardPlantOverview2: React.FC<CardPlantOverview2Props> = ({
  name = "My Plant",
  species = "Unknown",
  description = "A beautiful plant.",
  imageUrl = "/images/placeholder.jpg",
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
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default CardPlantOverview2;
