"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingFeature {
  name: string;
  included: boolean | string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  badge?: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams just getting started",
    price: {
      monthly: 12,
      annual: 120,
    },
    features: [
      { name: "Up to 5 team members", included: true },
      { name: "10 projects", included: true },
      { name: "Basic task management", included: true },
      { name: "File sharing (100MB)", included: true },
      { name: "Basic reporting", included: true },
      { name: "Email support", included: true },
      { name: "API access", included: false },
      { name: "Advanced integrations", included: false },
      { name: "Admin controls", included: false },
      { name: "Custom branding", included: false },
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "For growing teams that need more features and flexibility",
    price: {
      monthly: 29,
      annual: 290,
    },
    features: [
      { name: "Up to 20 team members", included: true },
      { name: "Unlimited projects", included: true },
      { name: "Advanced task management", included: true },
      { name: "File sharing (1GB)", included: true },
      { name: "Advanced reporting", included: true },
      { name: "Priority email support", included: true },
      { name: "API access", included: true },
      { name: "Advanced integrations", included: true },
      { name: "Admin controls", included: true },
      { name: "Custom branding", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    description:
      "For large organizations with complex workflows and security needs",
    price: {
      monthly: 79,
      annual: 790,
    },
    features: [
      { name: "Unlimited team members", included: true },
      { name: "Unlimited projects", included: true },
      { name: "Enterprise task management", included: true },
      { name: "File sharing (10GB)", included: true },
      { name: "Custom reporting", included: true },
      { name: "24/7 phone & email support", included: true },
      { name: "API access", included: true },
      { name: "All integrations", included: true },
      { name: "Advanced admin controls", included: true },
      { name: "Custom branding", included: true },
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="w-full bg-muted/30 py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              Choose the plan that works best for your team. All plans include a
              14-day free trial.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Label
              htmlFor="pricing-toggle"
              className={!isAnnual ? "font-medium" : "text-muted-foreground"}
            >
              Monthly
            </Label>
            <Switch
              id="pricing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label
              htmlFor="pricing-toggle"
              className={isAnnual ? "font-medium" : "text-muted-foreground"}
            >
              Annually{" "}
              <span className="ml-1 text-xs text-primary">Save 20%</span>
            </Label>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex"
            >
              <Card
                className={`flex flex-col w-full border ${
                  plan.popular ? "border-primary shadow-md" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid flex-1 gap-6">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">
                        $
                        {isAnnual ? plan.price.annual / 12 : plan.price.monthly}
                      </span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-muted-foreground">
                        Billed annually (${plan.price.annual})
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="mt-1 h-4 w-4 text-primary" />
                        ) : (
                          <div className="mt-1 h-4 w-4" />
                        )}
                        <span
                          className={
                            !feature.included ? "text-muted-foreground" : ""
                          }
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular ? "bg-primary text-primary-foreground" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid gap-8 rounded-xl border bg-card/80 p-8 md:grid-cols-[1fr_2fr]"
        >
          <div className="flex flex-col justify-center space-y-4">
            <h3 className="text-2xl font-bold">Need a custom plan?</h3>
            <p className="text-muted-foreground">
              Contact our sales team to discuss a customized plan for your
              organization's specific needs.
            </p>
            <Button variant="outline">Contact Sales</Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 text-lg font-medium">
                Enterprise features
              </div>
              <ul className="grid gap-2">
                {[
                  "Single Sign-On (SSO)",
                  "Advanced security controls",
                  "Custom contract terms",
                  "Dedicated account manager",
                  "Custom onboarding",
                  "SLA guarantees",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="mb-2 text-lg font-medium">Industry solutions</div>
              <ul className="grid gap-2">
                {[
                  "Software development",
                  "Marketing & creative",
                  "Professional services",
                  "Non-profit organizations",
                  "Education institutions",
                  "Government agencies",
                ].map((industry, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{industry}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
