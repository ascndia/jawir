import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, ListChecks, XCircle } from "lucide-react";

type PayoutStatus = "completed" | "pending" | "failed";

interface Payout {
  id: string;
  amount: number;
  currencySymbol: string;
  date: string; // ISO 8601 format string
  status: PayoutStatus;
}

interface CardEarningsPayoutHistory1Props {
  payouts?: Payout[];
}

// Helper to get status icon and color
const getStatusAttributes = (status: PayoutStatus) => {
  switch (status) {
    case "completed":
      return {
        Icon: CheckCircle2,
        color: "text-green-600 dark:text-green-400",
        label: "Completed",
      };
    case "pending":
      return {
        Icon: Clock,
        color: "text-yellow-600 dark:text-yellow-400",
        label: "Pending",
      };
    case "failed":
      return {
        Icon: XCircle,
        color: "text-red-600 dark:text-red-400",
        label: "Failed",
      };
    default:
      return { Icon: Clock, color: "text-muted-foreground", label: "Unknown" };
  }
};

// Helper to format date (simplified)
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CardEarningsPayoutHistory1({
  payouts = [
    {
      id: "p1",
      amount: 55.2,
      currencySymbol: "$",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: "completed",
    },
    {
      id: "p2",
      amount: 70.0,
      currencySymbol: "$",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: "completed",
    },
    {
      id: "p3",
      amount: 62.5,
      currencySymbol: "$",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: "failed",
    },
    {
      id: "p4",
      amount: 85.0,
      currencySymbol: "$",
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      status: "completed",
    },
    {
      id: "p5",
      amount: 110.1,
      currencySymbol: "$",
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
    },
  ],
}: CardEarningsPayoutHistory1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Payout History</CardTitle>
          <ListChecks className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Your recent payout transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        {payouts.length > 0 ? (
          <ul className="space-y-4">
            {payouts.slice(0, 5).map((payout) => {
              // Show top 5
              const { Icon, color, label } = getStatusAttributes(payout.status);
              return (
                <li
                  key={payout.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      {payout.currencySymbol}
                      {payout.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(payout.date)}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("flex items-center gap-1.5", color)}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </Badge>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center">
            <ListChecks className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No payout history found.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
