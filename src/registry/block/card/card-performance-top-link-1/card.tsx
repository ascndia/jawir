"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Copy, DollarSign, MousePointerClick, Trophy } from "lucide-react";
import { toast } from "sonner"; // Correct import for sonner hook

interface CardPerformanceTopLink1Props {
  linkName?: string;
  shortUrl?: string;
  clicks?: number;
  earnings?: number;
  currencySymbol?: string;
}

export default function CardPerformanceTopLink1({
  linkName = "My Awesome Campaign Link",
  shortUrl = "https://sho.rt/xyz789",
  clicks = 12567,
  earnings = 251.34,
  currencySymbol = "$",
}: CardPerformanceTopLink1Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(
      () => {
        toast("Link copied to clipboard!", {
          description: shortUrl,
          action: {
            label: "Dismiss",
            onClick: () => {}, // No-op for dismiss
          },
        });
      },
      (err) => {
        console.error("Failed to copy text: ", err);
        toast("Failed to copy link", {
          description: "Could not copy link to clipboard.",
        });
      }
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold leading-none tracking-tight">
              {linkName}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {shortUrl}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="ml-2 flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Top Link
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-around gap-4 pb-4">
        <div className="flex flex-col items-center">
          <MousePointerClick className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-xl font-bold">{clicks.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">Clicks</span>
        </div>
        <div className="flex flex-col items-center">
          <DollarSign className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-xl font-bold">
            {currencySymbol}
            {earnings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-xs text-muted-foreground">Earnings</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleCopy}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
      </CardFooter>
    </Card>
  );
}
