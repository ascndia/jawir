import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";
import { MousePointerClick, TrendingDown, TrendingUp } from "lucide-react";

interface CardStatsClicksToday1Props {
  clicksToday?: number;
  percentageChange?: number; // Positive for increase, negative for decrease
}

export default function CardStatsClicksToday1({
  clicksToday = 2350,
  percentageChange = 15.2,
}: CardStatsClicksToday1Props) {
  const isPositiveChange = percentageChange >= 0;
  const trendIcon = isPositiveChange ? (
    <TrendingUp className="ml-1 h-4 w-4" />
  ) : (
    <TrendingDown className="ml-1 h-4 w-4" />
  );
  const trendColor = isPositiveChange
    ? "text-emerald-600 dark:text-emerald-400" // Using specific colors for clarity, semantic might not be defined
    : "text-red-600 dark:text-red-400"; // Using specific colors for clarity

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Clicks Today</CardTitle>
        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{clicksToday.toLocaleString()}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground flex items-center",
            trendColor
          )}
        >
          {isPositiveChange ? "+" : ""}
          {percentageChange.toFixed(1)}% from yesterday
          {trendIcon}
        </p>
      </CardContent>
    </Card>
  );
}
