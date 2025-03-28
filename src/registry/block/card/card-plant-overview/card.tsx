"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import { MapPin, Sprout } from "lucide-react";

interface CardPlantOverviewProps {
  name?: string;
  species?: string;
  location?: string;
  imageUrl?: string;
}

const CardPlantOverview: React.FC<CardPlantOverviewProps> = ({
  name = "Monstera Deliciosa",
  species = "Araceae",
  location = "Living Room",
  imageUrl = "/images/placeholder.jpg", // Default placeholder image
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <CardTitle>{name}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm">
            <Sprout className="h-3 w-3" />
            {species}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1 h-4 w-4" />
          {location}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlantOverview;
