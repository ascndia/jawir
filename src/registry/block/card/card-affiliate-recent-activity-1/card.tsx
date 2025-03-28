"use client"; // Required for potential state/effects

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Activity,
  DollarSign,
  MousePointerClick,
  ArrowRight,
} from "lucide-react";

type ActivityType = "conversion" | "click" | "payout" | "milestone";

interface ActivityItem {
  id: string;
  type: ActivityType;
  timestamp: Date;
  description: string;
  value?: number; // e.g., commission amount, number of clicks
  currencySymbol?: string;
  relatedLink?: string; // Link to order, campaign, etc.
}

interface AffiliateRecentActivityCardProps {
  activities?: ActivityItem[];
  title?: string;
  description?: string;
  viewAllLink?: string;
  maxItems?: number; // Max items to display initially
}

// Helper to format time ago
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
};

// Helper to get icon based on type
const getActivityIcon = (type: ActivityType): React.ElementType => {
  switch (type) {
    case "conversion":
      return DollarSign;
    case "click":
      return MousePointerClick;
    case "payout":
      return DollarSign; // Could use a different one
    case "milestone":
      return Activity; // Or Trophy, Award etc.
    default:
      return Activity;
  }
};

const defaultActivities: ActivityItem[] = [
  {
    id: "a1",
    type: "conversion",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    description: "New conversion from Spring Sale campaign",
    value: 15.5,
    currencySymbol: "$",
    relatedLink: "#order123",
  },
  {
    id: "a2",
    type: "milestone",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    description: "Reached 1000 total clicks this month!",
  },
  {
    id: "a3",
    type: "click",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    description: "Significant click spike from Facebook Ad",
  },
  {
    id: "a4",
    type: "conversion",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    description: "Conversion on Product X",
    value: 8.75,
    currencySymbol: "$",
    relatedLink: "#order122",
  },
  {
    id: "a5",
    type: "payout",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    description: "Payout of $112.30 processed",
    value: 112.3,
    currencySymbol: "$",
  },
];

export function CardAffiliateRecentActivity1({
  activities = defaultActivities,
  title = "Recent Activity",
  description = "Latest events from your affiliate account.",
  viewAllLink = "#",
  maxItems = 5,
}: AffiliateRecentActivityCardProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          {viewAllLink && activities.length > maxItems && (
            <Button variant="link" size="sm" className="text-sm" asChild>
              <a href={viewAllLink}>
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {displayedActivities.length > 0 ? (
          <ul className="space-y-4">
            {displayedActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              const badgeVariant =
                activity.type === "conversion"
                  ? "default"
                  : activity.type === "payout"
                  ? "secondary"
                  : "outline";
              const badgeColor =
                activity.type === "conversion"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : ""; // Example specific styling

              return (
                <React.Fragment key={activity.id}>
                  <li className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        activity.type === "conversion"
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          activity.type === "conversion"
                            ? "text-green-600 dark:text-green-300"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{timeAgo(activity.timestamp)}</span>
                        {activity.value && (
                          <>
                            <span className="font-semibold">
                              {activity.currencySymbol}
                              {activity.value.toFixed(2)}
                            </span>
                            <Badge
                              variant={badgeVariant}
                              className={`text-xs ${badgeColor}`}
                            >
                              {activity.type}
                            </Badge>
                          </>
                        )}
                        {!activity.value && (
                          <Badge variant={badgeVariant} className="text-xs">
                            {activity.type}
                          </Badge>
                        )}
                        {activity.relatedLink && (
                          <a
                            href={activity.relatedLink}
                            className="hover:underline"
                          >
                            Details
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                  {index < displayedActivities.length - 1 && <Separator />}
                </React.Fragment>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground">
            No recent activity.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default CardAffiliateRecentActivity1;
