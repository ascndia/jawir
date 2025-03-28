"use client";

import * as React from "react";
import { HardDrive, PlusCircle, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface CardStorageUsageProps extends React.HTMLAttributes<HTMLDivElement> {
  totalStorage?: string;
  usedStorage?: string;
  storagePercentage?: number;
  planName?: string;
  onUpgrade?: () => void;
  onManage?: () => void;
}

export function CardFileHosting2({
  className,
  totalStorage = "50 GB",
  usedStorage = "32.8 GB",
  storagePercentage = 65.6,
  planName = "Pro Plan",
  onUpgrade = () => console.log("Upgrade clicked"),
  onManage = () => console.log("Manage clicked"),
  ...props
}: CardStorageUsageProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HardDrive className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">
              Storage Usage
            </CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {planName}
          </Badge>
        </div>
        <CardDescription className="pt-1 text-xs">
          Manage your storage space and plan.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-2xl font-semibold">{usedStorage}</span>
          <span className="text-sm text-muted-foreground">
            / {totalStorage}
          </span>
        </div>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Progress
                value={storagePercentage}
                aria-label={`${storagePercentage}% storage used`}
                className="h-2 w-full"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{storagePercentage}% used</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {(100 - storagePercentage).toFixed(1)}% remaining
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-2 gap-2 p-4">
        <Button variant="outline" size="sm" onClick={onManage}>
          <Settings className="mr-1.5 h-4 w-4" />
          Manage
        </Button>
        <Button size="sm" onClick={onUpgrade}>
          <PlusCircle className="mr-1.5 h-4 w-4" />
          Upgrade
        </Button>
      </CardFooter>
    </Card>
  );
}
