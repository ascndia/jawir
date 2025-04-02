"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingPlan {
  title: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: {
    text: string;
    tooltip?: string;
    included: boolean;
  }[];
  highlighted?: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    title: "Starter",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Perfect for trying out our toolkit on personal projects.",
    features: [
      { text: "Core components", included: true },
      { text: "Basic animations", included: true },
      { text: "Community support", included: true },
      { text: "Dark mode", included: true },
      { text: "Custom themes", included: false },
      { text: "Priority support", included: false },
      {
        text: "Premium templates",
        tooltip: "Pre-designed templates for common UI patterns",
        included: false,
      },
      { text: "Advanced components", included: false },
    ],
  },
  {
    title: "Pro",
    price: {
      monthly: 19,
      yearly: 190,
    },
    description:
      "For professional developers building commercial applications.",
    features: [
      { text: "Core components", included: true },
      { text: "Basic animations", included: true },
      { text: "Community support", included: true },
      { text: "Dark mode", included: true },
      { text: "Custom themes", included: true },
      { text: "Priority support", included: true },
      {
        text: "Premium templates",
        tooltip: "Pre-designed templates for common UI patterns",
        included: true,
      },
      { text: "Advanced components", included: false },
    ],
    highlighted: true,
    badge: "Popular",
  },
  {
    title: "Enterprise",
    price: {
      monthly: 49,
      yearly: 490,
    },
    description: "For teams building complex applications at scale.",
    features: [
      { text: "Core components", included: true },
      { text: "Basic animations", included: true },
      { text: "Community support", included: true },
      { text: "Dark mode", included: true },
      { text: "Custom themes", included: true },
      { text: "Priority support", included: true },
      {
        text: "Premium templates",
        tooltip: "Pre-designed templates for common UI patterns",
        included: true,
      },
      { text: "Advanced components", included: true },
    ],
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            <span className="mr-1 text-primary">💰</span> Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose the perfect plan for your needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            All plans include updates and bug fixes. No hidden fees.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Label
              htmlFor="yearly"
              className={yearly ? "text-muted-foreground" : "text-foreground"}
            >
              Monthly
            </Label>
            <Switch
              id="yearly"
              checked={yearly}
              onCheckedChange={setYearly}
              aria-label="Toggle between monthly and yearly billing"
            />
            <Label
              htmlFor="yearly"
              className={yearly ? "text-foreground" : "text-muted-foreground"}
            >
              Yearly{" "}
              <Badge variant="outline" className="ml-1.5 text-xs">
                Save 20%
              </Badge>
            </Label>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm",
                  plan.highlighted &&
                    "border-primary/50 shadow-md shadow-primary/5"
                )}
              >
                {plan.badge && (
                  <Badge className="absolute right-4 top-4" variant="default">
                    {plan.badge}
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {plan.title}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">
                      ${yearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-muted-foreground">
                        /{yearly ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="mb-4 text-sm font-medium text-foreground">
                    Features include:
                  </p>
                  <ul className="mb-6 space-y-3 text-sm">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="mt-0.5 flex-shrink-0">
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-muted opacity-70" />
                          )}
                        </div>
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                          {feature.tooltip && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="ml-1 inline h-3.5 w-3.5 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  {feature.tooltip}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.highlighted ? "default" : "outline"}
                  className={plan.highlighted ? "" : "border-border"}
                >
                  {plan.price.monthly === 0
                    ? "Get started for free"
                    : "Get started"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
