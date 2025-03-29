import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { FC } from "react";

interface PlanFeature {
  title: string;
  tooltip?: string;
}

interface Plan {
  name: string;
  price: number;
  description: string;
  buttonText: string;
  isPopular: boolean;
  features: PlanFeature[];
}

interface CardPricingProps {
  plan: Plan;
  selectedBillingPeriod: "monthly" | "yearly";
  yearlyDiscount: number;
}

const CardPricing: FC<Partial<CardPricingProps>> = ({
  plan = {
    name: "Starter",
    price: 20,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    buttonText: "Get 20 portraits in 5 hours",
    isPopular: true,
    features: [
      { title: "5 hours turnaround time" },
      { title: "20 AI portraits" },
      {
        title: "Choice of 2 styles",
        tooltip: "Choose from a variety of styles to suit your preferences.",
      },
      {
        title: "Choice of 2 filters",
        tooltip: "Choose from a variety of filters to enhance your portraits.",
      },
      {
        title: "2 retouch credits",
        tooltip: "Use these credits to retouch your portraits.",
      },
    ],
  },
  selectedBillingPeriod = "monthly",
  yearlyDiscount = 20,
}) => {
  return (
    <div
      key={plan.name}
      className={cn("relative border rounded-xl p-6", {
        "border-[2px] border-primary py-10": plan.isPopular,
      })}
    >
      {plan.isPopular && (
        <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
          Most Popular
        </Badge>
      )}
      <h3 className="text-lg font-medium">{plan.name}</h3>
      <p className="mt-2 text-4xl font-bold">
        $
        {selectedBillingPeriod === "monthly"
          ? plan.price
          : plan.price *
            parseFloat((((100 - yearlyDiscount) / 100) * 12).toFixed(2))}
        <span className="ml-1.5 text-sm text-muted-foreground font-normal">
          /month
        </span>
      </p>
      <p className="mt-4 mb-6 font-medium text-muted-foreground">
        {plan.description}
      </p>

      <Button size="lg" className="w-full">
        {plan.buttonText}
      </Button>
      <Separator className="my-8" />
      <ul className="space-y-2">
        {plan.features.map((feature) => (
          <li key={feature.title} className="flex items-start gap-1.5">
            <CircleCheck className="h-4 w-4 mt-1 text-green-600" />
            {feature.title}
            {feature.tooltip && (
              <Tooltip>
                <TooltipTrigger className="cursor-help">
                  <CircleHelp className="h-4 w-4 mt-1 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>{feature.tooltip}</TooltipContent>
              </Tooltip>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardPricing;
