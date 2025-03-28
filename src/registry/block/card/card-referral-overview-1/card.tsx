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
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Copy, DollarSign, Share2, Users } from "lucide-react";
// import { toast } from "sonner-react"; // Removed due to import errors

interface CardReferralOverview1Props {
  referralLink?: string;
  referredUsers?: number;
  commissionEarned?: number;
  currencySymbol?: string;
  onCopy?: (url: string) => void;
}

export default function CardReferralOverview1({
  referralLink = "https://yourapp.com/ref/user123",
  referredUsers = 42,
  commissionEarned = 84.5,
  currencySymbol = "$",
  onCopy = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        console.log("Referral link copied:", url); // Fallback to console log
        // toast("Referral link copied!", { description: url }); // Removed
      },
      (err) => {
        console.error("Failed to copy referral link:", err); // Fallback to console error
        // toast("Failed to copy link.", { description: err.message }); // Removed
      }
    );
  },
}: CardReferralOverview1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Referral Program</CardTitle>
          <Share2 className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Share your link and earn commissions!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-around gap-4 text-center">
          <div>
            <Users className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">{referredUsers}</p>
            <p className="text-xs text-muted-foreground">Referred Users</p>
          </div>
          <div>
            <DollarSign className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
            <p className="text-2xl font-bold">
              {currencySymbol}
              {commissionEarned.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-xs text-muted-foreground">Commission Earned</p>
          </div>
        </div>
        <div className="space-y-1 pt-2">
          <label
            htmlFor="referralLinkInput"
            className="text-sm font-medium text-muted-foreground"
          >
            Your Referral Link
          </label>
          <div className="flex space-x-2">
            <Input
              id="referralLinkInput"
              value={referralLink}
              readOnly
              className="flex-1"
              aria-label="Your referral link"
            />
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onCopy(referralLink)}
              aria-label="Copy referral link"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      {/* Optional Footer for more actions */}
      {/* <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Referral Details</Button>
      </CardFooter> */}
    </Card>
  );
}
