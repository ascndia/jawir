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
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import { Progress } from "@/registry/components/progress";
import {
  Star,
  ArrowUpCircle,
  FileText,
  DatabaseZap,
  Database,
} from "lucide-react"; // Added Database
import { cn } from "@/lib/utils";

interface TierInfo {
  name: string;
  pdfLimit: number | "unlimited";
  tokenLimitMonthly: number | "unlimited";
  ragSourceLimit: number | "unlimited";
}

interface CardUserProfileTierStatusProps {
  currentTier?: TierInfo;
  currentPdfCount?: number;
  currentTokenUsage?: number;
  currentRagSourceCount?: number;
  className?: string;
  onUpgradeClick?: () => void;
}

// Helper function to format limits
const formatLimit = (limit: number | "unlimited"): string => {
  if (limit === "unlimited") return "Unlimited";
  return limit.toLocaleString();
};

// Helper function to calculate percentage, handling unlimited limits
const calculatePercentage = (
  current: number,
  limit: number | "unlimited"
): number => {
  if (limit === "unlimited" || limit <= 0) return 0;
  return Math.min((current / limit) * 100, 100);
};

export default function CardUserProfileTierStatus1({
  currentTier = {
    name: "Pro",
    pdfLimit: 100,
    tokenLimitMonthly: 100000,
    ragSourceLimit: 5,
  },
  currentPdfCount = 58,
  currentTokenUsage = 75000,
  currentRagSourceCount = 3,
  className,
  onUpgradeClick,
}: CardUserProfileTierStatusProps) {
  const pdfUsagePercentage = calculatePercentage(
    currentPdfCount,
    currentTier.pdfLimit
  );
  const tokenUsagePercentage = calculatePercentage(
    currentTokenUsage,
    currentTier.tokenLimitMonthly
  );
  const ragSourceUsagePercentage = calculatePercentage(
    currentRagSourceCount,
    currentTier.ragSourceLimit
  );

  const getIndicatorClass = (percentage: number) => {
    if (percentage > 90)
      return "[&>[data-slot='progress-indicator']]:bg-destructive";
    if (percentage > 75)
      return "[&>[data-slot='progress-indicator']]:bg-warning";
    return "[&>[data-slot='progress-indicator']]:bg-primary";
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Subscription Tier</CardTitle>
          <CardDescription>Your current plan and usage.</CardDescription>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-1">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{currentTier.name} Plan</span>
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* PDF Limit */}
        {currentTier.pdfLimit !== "unlimited" && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center font-medium text-muted-foreground">
                <FileText className="mr-1.5 h-3.5 w-3.5" /> PDF Documents
              </span>
              <span>
                {currentPdfCount.toLocaleString()} /{" "}
                {formatLimit(currentTier.pdfLimit)}
              </span>
            </div>
            <Progress
              value={pdfUsagePercentage}
              className={cn("h-1.5", getIndicatorClass(pdfUsagePercentage))}
              aria-label={`${pdfUsagePercentage.toFixed(0)}% PDF limit used`}
            />
          </div>
        )}

        {/* Token Limit */}
        {currentTier.tokenLimitMonthly !== "unlimited" && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center font-medium text-muted-foreground">
                <DatabaseZap className="mr-1.5 h-3.5 w-3.5" /> Monthly Tokens
              </span>
              <span>
                {currentTokenUsage.toLocaleString()} /{" "}
                {formatLimit(currentTier.tokenLimitMonthly)}
              </span>
            </div>
            <Progress
              value={tokenUsagePercentage}
              className={cn("h-1.5", getIndicatorClass(tokenUsagePercentage))}
              aria-label={`${tokenUsagePercentage.toFixed(
                0
              )}% token limit used`}
            />
          </div>
        )}

        {/* RAG Source Limit */}
        {currentTier.ragSourceLimit !== "unlimited" && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center font-medium text-muted-foreground">
                <Database className="mr-1.5 h-3.5 w-3.5" /> RAG Sources
              </span>
              <span>
                {currentRagSourceCount.toLocaleString()} /{" "}
                {formatLimit(currentTier.ragSourceLimit)}
              </span>
            </div>
            <Progress
              value={ragSourceUsagePercentage}
              className={cn(
                "h-1.5",
                getIndicatorClass(ragSourceUsagePercentage)
              )}
              aria-label={`${ragSourceUsagePercentage.toFixed(
                0
              )}% RAG source limit used`}
            />
          </div>
        )}

        {/* Message for unlimited */}
        {currentTier.pdfLimit === "unlimited" &&
          currentTier.tokenLimitMonthly === "unlimited" &&
          currentTier.ragSourceLimit === "unlimited" && (
            <p className="text-sm text-muted-foreground">
              You have unlimited usage on the {currentTier.name} plan.
            </p>
          )}
      </CardContent>
      <CardFooter className="border-t p-4">
        <Button size="sm" className="w-full" onClick={onUpgradeClick}>
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          Upgrade Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
