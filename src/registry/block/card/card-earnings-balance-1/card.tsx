import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Send, Wallet } from "lucide-react";

interface CardEarningsBalance1Props {
  currentBalance?: number;
  currencySymbol?: string;
  minimumPayout?: number;
  onPayoutRequest?: () => void; // Optional callback for payout request
}

export default function CardEarningsBalance1({
  currentBalance = 145.78,
  currencySymbol = "$",
  minimumPayout = 50,
  onPayoutRequest = () => console.log("Payout requested"),
}: CardEarningsBalance1Props) {
  const canRequestPayout = currentBalance >= minimumPayout;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Current Balance
          </CardTitle>
          <Wallet className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Your available earnings ready for payout.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-4xl font-bold tracking-tight">
          {currencySymbol}
          {currentBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Minimum payout: {currencySymbol}
          {minimumPayout.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!canRequestPayout}
          onClick={onPayoutRequest}
          aria-label="Request Payout"
        >
          <Send className="mr-2 h-4 w-4" />
          Request Payout
        </Button>
      </CardFooter>
    </Card>
  );
}
