"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs"; // Assuming named exports
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import {
  ArrowUp,
  ArrowDown,
  DollarSign,
  MousePointerClick,
  Target,
  TrendingUp,
} from "lucide-react";

// Reusing the PerformanceMetric component structure from summary-1 for consistency
// Could be extracted to a shared location in a real project
interface PerformanceMetricProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  changeDescription?: string;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  title,
  value,
  change,
  icon: Icon,
  changeDescription = "change",
}) => {
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? ArrowUp : ArrowDown;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";

  return (
    <div className="flex flex-col space-y-1 p-4 border border-border rounded-lg bg-background">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-sm">{title}</span>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold">{value}</span>
      </div>
      <div className="flex items-center gap-1 text-xs">
        {change !== 0 ? (
          <span className={`flex items-center gap-0.5 ${changeColor}`}>
            <ChangeIcon className="h-3 w-3" />
            {Math.abs(change)}%
          </span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
        <span className="text-muted-foreground">{changeDescription}</span>
      </div>
    </div>
  );
};

// Example data structure for different time periods
interface TimePeriodData {
  earnings: number;
  earningsChange: number;
  clicks: number;
  clicksChange: number;
  conversions: number;
  conversionsChange: number;
}

interface AffiliatePerformanceSummaryCard2Props {
  todayData?: TimePeriodData;
  weekData?: TimePeriodData;
  monthData?: TimePeriodData;
  currencySymbol?: string;
}

const defaultTodayData: TimePeriodData = {
  earnings: 45.5,
  earningsChange: 5.1,
  clicks: 280,
  clicksChange: 8.0,
  conversions: 12,
  conversionsChange: 10.0,
};
const defaultWeekData: TimePeriodData = {
  earnings: 315.2,
  earningsChange: -1.5,
  clicks: 1950,
  clicksChange: 2.3,
  conversions: 85,
  conversionsChange: -3.0,
};
const defaultMonthData: TimePeriodData = {
  earnings: 1254.75,
  earningsChange: 15.2,
  clicks: 8430,
  clicksChange: -2.1,
  conversions: 350,
  conversionsChange: 0.8,
};

export function CardAffiliatePerformanceSummary2({
  todayData = defaultTodayData,
  weekData = defaultWeekData,
  monthData = defaultMonthData,
  currencySymbol = "$",
}: AffiliatePerformanceSummaryCard2Props) {
  const renderTabData = (data: TimePeriodData, periodLabel: string) => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <PerformanceMetric
        title="Earnings"
        value={`${currencySymbol}${data.earnings.toFixed(2)}`}
        change={data.earningsChange}
        icon={DollarSign}
        changeDescription={`vs prev. ${periodLabel}`}
      />
      <PerformanceMetric
        title="Clicks"
        value={data.clicks.toLocaleString()}
        change={data.clicksChange}
        icon={MousePointerClick}
        changeDescription={`vs prev. ${periodLabel}`}
      />
      <PerformanceMetric
        title="Conversions"
        value={data.conversions.toLocaleString()}
        change={data.conversionsChange}
        icon={Target}
        changeDescription={`vs prev. ${periodLabel}`}
      />
    </div>
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <CardTitle>Performance Overview</CardTitle>
        </div>
        <CardDescription>
          View your key affiliate metrics by time period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            {renderTabData(todayData, "day")}
          </TabsContent>
          <TabsContent value="week">
            {renderTabData(weekData, "week")}
          </TabsContent>
          <TabsContent value="month">
            {renderTabData(monthData, "month")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default CardAffiliatePerformanceSummary2;
