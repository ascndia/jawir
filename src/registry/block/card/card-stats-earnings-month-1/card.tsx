import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import { DollarSign, Target } from "lucide-react";

interface CardStatsEarningsMonth1Props {
  currentEarnings?: number;
  monthlyGoal?: number;
  currencySymbol?: string;
}

export default function CardStatsEarningsMonth1({
  currentEarnings = 785.5,
  monthlyGoal = 1500,
  currencySymbol = "$",
}: CardStatsEarningsMonth1Props) {
  const progressPercentage =
    monthlyGoal > 0 ? (currentEarnings / monthlyGoal) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Monthly Earnings
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>
          Your earnings progress for this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold">
          {currencySymbol}
          {currentEarnings.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Goal: {currencySymbol}
          {monthlyGoal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-0">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-semibold">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <Progress
          value={progressPercentage}
          aria-label="Monthly earnings progress"
        />
      </CardFooter>
    </Card>
  );
}
