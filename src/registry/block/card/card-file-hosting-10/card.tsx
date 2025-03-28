"use client";

import * as React from "react";
import { Check, CreditCard, DollarSign, HelpCircle, User } from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface PlanFeature {
  text: string;
  included: boolean;
  tooltip?: string; // Optional tooltip for clarification
}

interface AccountPlan {
  name: string;
  price: string; // e.g., "$10/month" or "Free"
  storage: string;
  features: PlanFeature[];
  renewalDate?: string; // Optional, e.g., "Renews on Nov 15, 2024"
}

interface CardAccountPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPlan?: AccountPlan;
  onUpgradePlan?: () => void;
  onManageBilling?: () => void;
  onContactSupport?: () => void;
}

const defaultPlan: AccountPlan = {
  name: "Pro Plan",
  price: "$15 / month",
  storage: "50 GB",
  features: [
    { text: "Unlimited file uploads", included: true },
    { text: "Advanced sharing controls", included: true },
    { text: "Version history (30 days)", included: true },
    { text: "Priority support", included: true },
    {
      text: "Team collaboration features",
      included: false,
      tooltip: "Upgrade to Business plan for team features",
    },
  ],
  renewalDate: "Renews on December 1, 2024",
};

export function CardFileHosting10({
  className,
  currentPlan = defaultPlan,
  onUpgradePlan = () => console.log("Upgrade plan"),
  onManageBilling = () => console.log("Manage billing"),
  onContactSupport = () => console.log("Contact support"),
  ...props
}: CardAccountPlanProps) {
  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">
              Current Plan
            </CardTitle>
          </div>
          <Badge variant="default">{currentPlan.name}</Badge>
        </div>
        <CardDescription className="pt-1 text-sm">
          Manage your subscription and features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <div className="flex items-baseline justify-between rounded-lg bg-muted p-3">
          <span className="text-sm font-medium">
            {currentPlan.storage} Storage
          </span>
          <span className="text-lg font-semibold">{currentPlan.price}</span>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Features:</h4>
          <ul className="space-y-1.5">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    feature.included
                      ? "text-green-500"
                      : "text-muted-foreground/30"
                  )}
                />
                <span
                  className={cn(
                    !feature.included && "text-muted-foreground line-through"
                  )}
                >
                  {feature.text}
                </span>
                {feature.tooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="ml-1.5 h-3.5 w-3.5 cursor-help text-muted-foreground/50" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{feature.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </li>
            ))}
          </ul>
        </div>
        {currentPlan.renewalDate && (
          <p className="text-center text-xs text-muted-foreground">
            {currentPlan.renewalDate}
          </p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="grid grid-cols-3 gap-2 p-4">
        <Button variant="outline" size="sm" onClick={onUpgradePlan}>
          <DollarSign className="mr-1.5 h-4 w-4" />
          Upgrade
        </Button>
        <Button variant="outline" size="sm" onClick={onManageBilling}>
          <CreditCard className="mr-1.5 h-4 w-4" />
          Billing
        </Button>
        <Button variant="ghost" size="sm" onClick={onContactSupport}>
          <HelpCircle className="mr-1.5 h-4 w-4" />
          Support
        </Button>
      </CardFooter>
    </Card>
  );
}
