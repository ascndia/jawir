import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { Globe, Users, Mail, Link as LinkIcon } from "lucide-react"; // Example icons

interface TrafficSource {
  id: string;
  name: string;
  clicks: number;
  percentage: number; // Percentage of total clicks
  icon: React.ElementType;
}

interface AffiliateTrafficSourcesCardProps {
  sources?: TrafficSource[];
  title?: string;
  description?: string;
  totalClicks?: number; // Optional total clicks for context
}

// Helper to calculate percentages (ensures total doesn't exceed 100 due to rounding)
const calculatePercentages = (
  sources: Omit<TrafficSource, "percentage" | "icon">[],
  total: number
): TrafficSource[] => {
  let calculatedSources = sources.map((source) => ({
    ...source,
    percentage: total > 0 ? Math.round((source.clicks / total) * 100) : 0,
    // Assign icons based on name or a predefined mapping
    icon: source.name.toLowerCase().includes("social")
      ? Users
      : source.name.toLowerCase().includes("website")
      ? Globe
      : source.name.toLowerCase().includes("email")
      ? Mail
      : LinkIcon,
  }));

  // Adjust percentages if sum is not 100 due to rounding
  let sumPercentage = calculatedSources.reduce(
    (acc, curr) => acc + curr.percentage,
    0
  );
  let diff = 100 - sumPercentage;
  if (diff !== 0 && calculatedSources.length > 0) {
    // Distribute difference to the source with the highest click count
    calculatedSources.sort((a, b) => b.clicks - a.clicks);
    calculatedSources[0].percentage += diff;
    // Ensure no percentage is negative after adjustment
    if (calculatedSources[0].percentage < 0)
      calculatedSources[0].percentage = 0;
  }
  // Ensure percentages sum back up to 100 if possible, cap at 100
  sumPercentage = calculatedSources.reduce(
    (acc, curr) => acc + curr.percentage,
    0
  );
  if (sumPercentage > 100) {
    // Simple reduction strategy: reduce from largest percentage first
    calculatedSources.sort((a, b) => b.percentage - a.percentage);
    let over = sumPercentage - 100;
    calculatedSources[0].percentage -= over;
  }

  return calculatedSources.sort((a, b) => b.clicks - a.clicks); // Sort by clicks descending
};

const defaultRawSources = [
  { id: "s1", name: "Social Media Referral", clicks: 3540 },
  { id: "s2", name: "Direct Website Link", clicks: 2100 },
  { id: "s3", name: "Email Campaign Click", clicks: 1850 },
  { id: "s4", name: "Other Sources", clicks: 940 },
];

const totalDefaultClicks = defaultRawSources.reduce(
  (sum, s) => sum + s.clicks,
  0
);
const defaultSources = calculatePercentages(
  defaultRawSources,
  totalDefaultClicks
);

export function CardAffiliateTrafficSources1({
  sources = defaultSources,
  title = "Traffic Sources",
  description = "Where your referral clicks are coming from.",
  totalClicks = totalDefaultClicks,
}: AffiliateTrafficSourcesCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {description} (Total: {totalClicks.toLocaleString()} clicks)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sources.length > 0 ? (
            sources.map((source, index) => (
              <React.Fragment key={source.id}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-grow min-w-0">
                    <source.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-semibold w-10 text-right">
                      {source.percentage}%
                    </span>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      ({source.clicks.toLocaleString()})
                    </span>
                  </div>
                </div>
                {index < sources.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No traffic source data available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateTrafficSources1;
