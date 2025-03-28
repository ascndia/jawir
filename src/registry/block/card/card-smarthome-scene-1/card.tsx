"use client";

import * as React from "react";
import { Film, Sunrise, Home, Bed, Zap } from "lucide-react"; // Example icons

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { cn } from "@/lib/utils";

// Define a type for a scene
interface Scene {
  id: string;
  name: string;
  icon?: React.ElementType; // Lucide icon component
}

interface CardSmartHomeSceneProps {
  title?: string;
  scenes?: Scene[];
  initialActiveSceneId?: string | null;
  onActivateScene?: (sceneId: string) => void; // Callback when a scene is activated
  className?: string;
}

// Default scenes if none are provided
const defaultScenes: Scene[] = [
  { id: "movie", name: "Movie Night", icon: Film },
  { id: "morning", name: "Good Morning", icon: Sunrise },
  { id: "away", name: "Away", icon: Home },
  { id: "bedtime", name: "Bedtime", icon: Bed },
];

export function CardSmartHomeScene1({
  title = "Activate Scene",
  scenes = defaultScenes,
  initialActiveSceneId = null,
  onActivateScene,
  className,
}: CardSmartHomeSceneProps) {
  const [activeSceneId, setActiveSceneId] =
    React.useState(initialActiveSceneId);
  const [isLoadingId, setIsLoadingId] = React.useState<string | null>(null); // Track loading state per button

  const handleSceneClick = (sceneId: string) => {
    setIsLoadingId(sceneId);
    // Simulate API call or action
    setTimeout(() => {
      setActiveSceneId(sceneId);
      setIsLoadingId(null);
      console.log(`Activating scene: ${sceneId}`);
      onActivateScene?.(sceneId); // Call the callback if provided
    }, 500); // Simulate delay
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Tap a scene to activate your smart home settings.
          {activeSceneId && (
            <span className="block text-xs text-muted-foreground mt-1">
              Active:{" "}
              {scenes.find((s) => s.id === activeSceneId)?.name ||
                activeSceneId}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {scenes.map((scene) => {
            const IconComponent = scene.icon || Zap; // Default icon if none provided
            const isActive = scene.id === activeSceneId;
            const isLoading = scene.id === isLoadingId;

            return (
              <Button
                key={scene.id}
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "flex flex-col items-center justify-center h-20 p-2 space-y-1 text-center",
                  isLoading && "opacity-75 cursor-not-allowed"
                )}
                onClick={() => handleSceneClick(scene.id)}
                disabled={isLoading}
                aria-pressed={isActive}
              >
                <IconComponent className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium truncate w-full">
                  {isLoading ? "Activating..." : scene.name}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
