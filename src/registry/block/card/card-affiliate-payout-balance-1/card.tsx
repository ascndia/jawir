"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress"; // Assuming named export
import Button from "@/registry/components/button/button-shadcn/button";
import { DollarSign, CalendarDays, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface AffiliatePayoutBalanceCardProps {
  currentBalance?: number;
  payoutThreshold?: number;
  nextPayoutDate?: string; // e.g., "April 15, 2025"
  currencySymbol?: string;
  payoutHistoryLink?: string; // Optional link to view full history
}

export function CardAffiliatePayoutBalance1({
  currentBalance = 78.5,
  payoutThreshold = 100,
  nextPayoutDate = "April 15, 2025",
  currencySymbol = "$",
  payoutHistoryLink = "#", // Default to '#' or could be omitted
}: AffiliatePayoutBalanceCardProps) {
  const progressPercentage = Math.min(
    (currentBalance / payoutThreshold) * 100,
    100
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payout Status</CardTitle>
          <DollarSign className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Your current balance and progress towards the next payout.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-4xl font-bold">
            {currencySymbol}
            {currentBalance.toFixed(2)}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Progress to Payout ({currencySymbol}
              {payoutThreshold})
            </span>
            <span>{progressPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={progressPercentage} aria-label="Payout Progress" />
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground pt-2">
          <CalendarDays className="h-4 w-4" />
          <span>Estimated Next Payout: {nextPayoutDate}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Payouts are processed once the threshold is met.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      {payoutHistoryLink && (
        <CardFooter>
          <Button variant="outline" className="w-full">
            View Payout History
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default CardAffiliatePayoutBalance1;
