"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: { monthly: 19, annual: 190 },
    description: "Perfect for individuals and small projects",
    features: [
      "Access to all base components",
      "Basic animations",
      "Community support",
      "Light and dark themes",
      "Documentation",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 49, annual: 490 },
    description: "Ideal for professional designers and developers",
    features: [
      "Everything in Starter",
      "Advanced animations",
      "Priority support",
      "Custom themes",
      "Design files",
      "Component variants",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 99, annual: 990 },
    description: "For teams and organizations with advanced needs",
    features: [
      "Everything in Pro",
      "Custom component development",
      "Dedicated support",
      "Design system workshop",
      "Multiple themes",
      "Unlimited projects",
      "White labeling",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <section className="w-full bg-muted/50 py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Choose the plan that fits your needs. All plans include updates
              and core features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-6 flex items-center space-x-2"
          >
            <Label
              htmlFor="billing-toggle"
              className={
                billingCycle === "monthly"
                  ? "font-medium"
                  : "text-muted-foreground"
              }
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "annual" : "monthly")
              }
            />
            <Label
              htmlFor="billing-toggle"
              className={
                billingCycle === "annual"
                  ? "font-medium"
                  : "text-muted-foreground"
              }
            >
              Annual <span className="ml-1 text-xs text-primary">Save 20%</span>
            </Label>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
              >
                <Card
                  className={`relative h-full overflow-hidden transition-shadow hover:shadow-lg ${
                    plan.popular ? "border-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute right-0 top-0">
                      <div className="bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Popular
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        $
                        {billingCycle === "monthly"
                          ? plan.price.monthly
                          : plan.price.annual}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`group w-full ${
                        plan.popular ? "bg-primary text-primary-foreground" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
