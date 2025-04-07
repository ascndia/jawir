"use client";
import { useState } from "react";
import { Lock, Smartphone, Monitor, RectangleHorizontal, RectangleVertical } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SquareIcon } from "lucide-react"; // Changed from AspectRatio to SquareIcon
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface DialogAspectRatio1AProps {
  open: boolean;
  onOpenChange: (ratio: boolean) => void;
}

export const DialogAspectRatio1A = ({
  open,
  onOpenChange,
}: DialogAspectRatio1AProps) => {

    const [aspectRatio, setAspectRatio] = useState<AspectRatioType>("1:1");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Aspect Ratio</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <AspectRatioSelector
            currentAspectRatio={aspectRatio}
            onChange={setAspectRatio}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type AspectRatioType = "1:1" | "16:9" | "4:5" | "9:16" | "16:10" | "4:3" | "3:2" | "2:1" | "3:4" | "1:2" | "2:3" | "5:4" | "10:16" | "1:3" | "3:1";

interface AspectRatioOption {
  ratio: AspectRatioType;
  name?: string;
  locked?: boolean;
}

interface AspectRatioSelectorProps {
  currentAspectRatio: string;
  onChange: (ratio: AspectRatioType) => void;
}

export const AspectRatioSelector = ({
  currentAspectRatio,
  onChange,
}: AspectRatioSelectorProps) => {
  const [activeTab, setActiveTab] = useState<"portrait" | "landscape">("portrait");
  
  // Helper function to calculate ratio as a number
  const getRatioValue = (ratio: string): number => {
    const [width, height] = ratio.split(":").map(Number);
    return width / height;
  };

  // Calculate width and height based on current ratio
  const calculateDimensions = (ratio: string, baseValue: number = 1024): { width: number; height: number } => {
    const [width, height] = ratio.split(":").map(Number);
    
    if (width > height) {
      return {
        width: baseValue,
        height: Math.round(baseValue * (height / width)),
      };
    } else {
      return {
        width: Math.round(baseValue * (width / height)),
        height: baseValue,
      };
    }
  };

  const dimensions = calculateDimensions(currentAspectRatio);

  const portraitOptions: AspectRatioOption[] = [
    { ratio: "9:16", name: "9:16" },
    { ratio: "4:5", name: "4:5" },
    { ratio: "3:4", name: "3:4" },
    { ratio: "10:16", name: "10:16" },
    { ratio: "1:2", name: "1:2", locked: true },
    { ratio: "1:3", name: "1:3", locked: true },
  ];

  const landscapeOptions: AspectRatioOption[] = [
    { ratio: "16:9", name: "16:9" },
    { ratio: "3:2", name: "3:2" },
    { ratio: "4:3", name: "4:3" },
    { ratio: "16:10", name: "16:10" },
    { ratio: "2:1", name: "2:1", locked: true },
    { ratio: "3:1", name: "3:1", locked: true },
  ];

  const squareOption: AspectRatioOption = { ratio: "1:1", name: "1:1 (Square)" };

  return (
    <div className="aspect-ratio-selector bg-secondary/30 rounded-xl p-5 border border-border shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Preview Box */}
        <div className="preview-container w-full md:w-1/2 aspect-square bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden border border-border/50">
          <div 
            className="preview-box bg-secondary/40 flex items-center justify-center transition-all duration-300 ease-in-out"
            style={{
              width: `${Math.min(100, getRatioValue(currentAspectRatio) * 100)}%`,
              height: `${Math.min(100, (1 / getRatioValue(currentAspectRatio)) * 100)}%`,
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          >
            <span className="text-lg font-medium text-foreground/80">{currentAspectRatio}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="aspect-controls w-full md:w-1/2">
          {/* Tab Navigation */}
          <div className="flex rounded-lg overflow-hidden mb-3 border border-border/50">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-none h-10 gap-1.5",
                activeTab === "portrait" && "bg-muted"
              )}
              onClick={() => setActiveTab("portrait")}
            >
              <Smartphone className="h-4 w-4" />
              <span>Portrait</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-none h-10 gap-1.5",
                activeTab === "landscape" && "bg-muted"
              )}
              onClick={() => setActiveTab("landscape")}
            >
              <Monitor className="h-4 w-4" />
              <span>Landscape</span>
            </Button>
          </div>
          
          {/* Square Option */}
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "w-full mb-3 justify-start h-10 px-3",
              currentAspectRatio === squareOption.ratio && "bg-muted/60 border-primary/50"
            )}
            onClick={() => onChange(squareOption.ratio)}
          >
            <SquareIcon className="h-4 w-4 mr-2" />
            <span>{squareOption.name}</span>
          </Button>
          
          {/* Ratio Options Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(activeTab === "portrait" ? portraitOptions : landscapeOptions).map((option) => (
              <Button
                key={option.ratio}
                variant="outline"
                size="sm"
                disabled={option.locked}
                className={cn(
                  "justify-start h-10 px-3",
                  currentAspectRatio === option.ratio && "bg-muted/60 border-primary/50"
                )}
                onClick={() => onChange(option.ratio)}
              >
                {activeTab === "portrait" ? (
                  <RectangleVertical className="h-4 w-4 mr-2" />
                ) : (
                  <RectangleHorizontal className="h-4 w-4 mr-2" />
                )}
                <span>{option.name}</span>
                {option.locked && <Lock className="h-3 w-3 ml-1 opacity-70" />}
              </Button>
            ))}
          </div>
          
          {/* Dimensions Display */}
          <div className="dimensions-display flex items-center justify-between text-sm text-muted-foreground mb-1">
            <div>Width: {dimensions.width}px</div>
            <div>Height: {dimensions.height}px</div>
          </div>
          
          {/* Size Slider */}
          {/* <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="my-4"
            disabled
          /> */}
          
          {/* Current Selection Display */}
          <div className="current-selection bg-muted/40 border border-border/50 text-center py-2 rounded-lg">
            <span className="text-sm font-medium">{currentAspectRatio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};