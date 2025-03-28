"use client";

import * as React from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Tv,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Slider } from "@/registry/components/slider";
import { cn } from "@/lib/utils";

interface CardSmartHomeMediaProps {
  deviceName?: string;
  initialIsPlaying?: boolean;
  initialVolume?: number; // 0-100
  currentTrack?: string;
  currentArtist?: string;
  className?: string;
}

export function CardSmartHomeMedia1({
  deviceName = "Living Room Speaker",
  initialIsPlaying = false,
  initialVolume = 50,
  currentTrack = "Song Title",
  currentArtist = "Artist Name",
  className,
}: CardSmartHomeMediaProps) {
  const [isPlaying, setIsPlaying] = React.useState(initialIsPlaying);
  const [volume, setVolume] = React.useState(initialVolume);
  // In a real app, track/artist info would likely come from props/state

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    console.log(`${deviceName} ${isPlaying ? "Paused" : "Playing"}`);
    // Optionally, add logic here to send command
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    console.log(`${deviceName} Volume set to ${value[0]}`);
    // Optionally, add logic here to send command
  };

  const skipTrack = (direction: "forward" | "back") => {
    console.log(`${deviceName} Skip ${direction}`);
    // Optionally, add logic here to send command
  };

  const PlayPauseIcon = isPlaying ? Pause : Play;
  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  return (
    <Card className={cn("w-[350px]", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{deviceName}</CardTitle>
          <Tv className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription className="truncate pt-1">
          {isPlaying ? `${currentTrack} - ${currentArtist}` : "Paused"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Playback Controls */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipTrack("back")}
            aria-label="Previous track"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <PlayPauseIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipTrack("forward")}
            aria-label="Next track"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 pt-2">
          <VolumeIcon className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            aria-label="Volume control"
            className="flex-grow"
          />
          <span className="text-xs font-medium w-8 text-right">{volume}%</span>
        </div>
      </CardContent>
      {/* Footer can be used for source selection or other info if needed */}
      {/* <CardFooter></CardFooter> */}
    </Card>
  );
}
