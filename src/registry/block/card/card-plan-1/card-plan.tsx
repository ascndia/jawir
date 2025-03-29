import React from "react";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { DollarSign, Download, Users, LucideIcon } from "lucide-react";

interface PlanFeature {
  icon: LucideIcon;
  text: string;
}

interface CardPlanProps {
  /** Title of the subscription card */
  title?: string;
  /** Description text below the title */
  description?: string;
  /** Price amount of the plan */
  price?: string;
  /** Currency symbol to show before the price */
  currencySymbol?: string;
  /** Text for the badge */
  badgeText?: string;
  /** Features list to display in the card */
  features?: PlanFeature[];
  /** Button text */
  buttonText?: string;
  /** Card width */
  width?: string;
  /** Click handler for the button */
  onButtonClick?: () => void;
  /** Additional class name for the card */
  className?: string;
}

function CardPlan({
  title = "Subscription Plan",
  description = "You are currently on the Pro plan",
  price = "29.99",
  currencySymbol = "$",
  badgeText = "Monthly",
  features = [
    { icon: DollarSign, text: "Unlimited projects" },
    { icon: Users, text: "Unlimited team members" },
    { icon: Download, text: "5TB storage" },
  ],
  buttonText = "Upgrade Plan",
  width = "w-[310px]",
  onButtonClick = () => {},
  className = "",
}: CardPlanProps) {
  return (
    <Card className={`${width} ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">
              {currencySymbol}
              {price}
            </span>
            <Badge>{badgeText}</Badge>
          </div>
          {features.length > 0 && (
            <ul className="space-y-2 text-sm">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index} className="flex items-center">
                    <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {feature.text}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardPlan;
