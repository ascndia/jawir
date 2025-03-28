"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";
import { Bug, ShieldAlert } from "lucide-react";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface PestInfo {
  name: string;
  description: string;
  imageUrl: string;
  severity: "Low" | "Medium" | "High";
}

interface CardPlantPestsProps {
  pests?: PestInfo[];
}

const CardPlantPests: React.FC<CardPlantPestsProps> = ({
  pests = [
    // Example data
    {
      name: "Spider Mites",
      description: "Tiny pests causing yellow spots.",
      imageUrl: "/images/placeholder.jpg",
      severity: "Medium",
    },
    {
      name: "Fungal Gnats",
      description: "Small flies around the soil.",
      imageUrl: "/images/placeholder.jpg",
      severity: "Low",
    },
  ],
}) => {
  const getSeverityBadgeVariant = (
    severity: PestInfo["severity"]
  ): "default" | "secondary" | "destructive" | "outline" | null | undefined => {
    switch (severity) {
      case "Low":
        return "secondary";
      case "Medium":
        return "outline"; // Using outline for warning
      case "High":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Pest & Disease Alert
        </CardTitle>
        <CardDescription>Potential threats detected</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {pests.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center text-muted-foreground">
            <ShieldAlert className="h-8 w-8" />
            <span>No threats detected.</span>
          </div>
        ) : (
          pests.map((pest, index) => (
            <div key={index} className="flex items-start gap-4">
              <img
                src={pest.imageUrl}
                alt={pest.name}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{pest.name}</span>
                  <Badge variant={getSeverityBadgeVariant(pest.severity)}>
                    {pest.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {pest.description}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CardPlantPests;
