"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  MousePointerClick,
  Target,
} from "lucide-react";

interface PerformanceMetricProps {
  title: string;
  value: string;
  change: number; // Percentage change, positive for increase, negative for decrease
  icon: React.ElementType;
  changeDescription?: string; // e.g., "vs last month"
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  title,
  value,
  change,
  icon: Icon,
  changeDescription = "vs last period",
}) => {
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
  const changeColor = isPositive ? "text-green-600" : "text-red-600"; // Using specific colors here for trend indication

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center justify-between">
        <CardDescription>{title}</CardDescription>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{value}</span>
        {change !== 0 && (
          <Badge
            variant={isPositive ? "default" : "destructive"}
            className={`flex items-center gap-1 text-xs ${changeColor} bg-opacity-10`} // Adjusted badge styling
          >
            <ChangeIcon className={`h-3 w-3 ${changeColor}`} />
            {Math.abs(change)}%
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{changeDescription}</p>
    </div>
  );
};

interface AffiliatePerformanceSummaryCardProps {
  totalEarnings?: number;
  earningsChange?: number;
  totalClicks?: number;
  clicksChange?: number;
  conversionRate?: number;
  conversionRateChange?: number;
  currencySymbol?: string;
  timePeriod?: string;
}

export function CardAffiliatePerformanceSummary1({
  totalEarnings = 1254.75,
  earningsChange = 15.2,
  totalClicks = 8430,
  clicksChange = -2.1,
  conversionRate = 3.5,
  conversionRateChange = 0.8,
  currencySymbol = "$",
  timePeriod = "last 30 days",
}: AffiliatePerformanceSummaryCardProps) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
        <CardDescription>
          Your affiliate stats for the {timePeriod}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <PerformanceMetric
          title="Total Earnings"
          value={`${currencySymbol}${totalEarnings.toFixed(2)}`}
          change={earningsChange}
          icon={DollarSign}
          changeDescription={`vs ${timePeriod}`}
        />
        <PerformanceMetric
          title="Total Clicks"
          value={totalClicks.toLocaleString()}
          change={clicksChange}
          icon={MousePointerClick}
          changeDescription={`vs ${timePeriod}`}
        />
        <PerformanceMetric
          title="Conversion Rate"
          value={`${conversionRate.toFixed(1)}%`}
          change={conversionRateChange}
          icon={Target}
          changeDescription={`vs ${timePeriod}`}
        />
      </CardContent>
    </Card>
  );
}

export default CardAffiliatePerformanceSummary1;
