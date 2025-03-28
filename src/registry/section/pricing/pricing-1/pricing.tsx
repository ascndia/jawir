"use client";
import { Button } from "@/registry/components/button/select";
import {
  Check,
  ChevronRight,
  HelpCircle,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";

export default function Pricing5() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "annual"
  );

  const plans = [
    {
      id: "pro",
      name: "Pro",
      description: "Perfect for professionals and small teams",
      monthlyPrice: 49,
      annualPrice: 470,
      features: [
        "Up to 10 team members",
        "50GB secure storage",
        "Advanced analytics",
        "API access",
        "Email support",
      ],
      missingFeatures: [
        "Custom integrations",
        "Dedicated account manager",
        "Enterprise security",
      ],
      cta: "Get started with Pro",
      popular: false,
    },
    {
      id: "business",
      name: "Business",
      description: "Ideal for growing businesses and teams",
      monthlyPrice: 99,
      annualPrice: 950,
      features: [
        "Up to 50 team members",
        "250GB secure storage",
        "Advanced analytics",
        "API access",
        "Priority support",
        "Custom integrations",
      ],
      missingFeatures: ["Dedicated account manager", "Enterprise security"],
      cta: "Get started with Business",
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 249,
      annualPrice: 2390,
      features: [
        "Unlimited team members",
        "1TB secure storage",
        "Advanced analytics",
        "API access",
        "24/7 priority support",
        "Custom integrations",
        "Dedicated account manager",
        "Enterprise security",
      ],
      missingFeatures: [],
      cta: "Contact sales",
      popular: false,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-20">
          <Badge
            variant="outline"
            className="px-3.5 py-1.5 border-primary/20 bg-primary/10"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
            <span className="text-primary">Premium Solutions</span>
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
            Choose the perfect plan for your business
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl">
            All plans include core features like unlimited projects, real-time
            collaboration, and advanced security. Select the plan that fits your
            needs.
          </p>

          <div className="bg-muted/50 p-1 rounded-full mt-8">
            <Tabs
              defaultValue={billingPeriod}
              onValueChange={(value) =>
                setBillingPeriod(value as "monthly" | "annual")
              }
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual
                  <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    Save 20%
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md",
                plan.popular && "border-primary/50 shadow-md shadow-primary/10"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    $
                    {billingPeriod === "monthly"
                      ? plan.monthlyPrice
                      : Math.round(plan.annualPrice / 12)}
                  </span>
                  <span className="text-muted-foreground ml-1.5">/month</span>
                </div>

                {billingPeriod === "annual" && (
                  <p className="text-sm text-muted-foreground mt-1">
                    ${plan.annualPrice} billed annually
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-sm">{feature}</span>
                  </div>
                ))}

                {plan.missingFeatures.map((feature) => (
                  <div key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-muted-foreground/30 flex-shrink-0 mt-0.5" />
                    <span className="ml-3 text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full justify-between group"
                >
                  {plan.cta}
                  <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-muted/50 rounded-2xl p-8 border">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>

              <div className="ml-5">
                <h3 className="text-xl font-semibold">
                  Enterprise-grade security for all plans
                </h3>
                <p className="text-muted-foreground mt-2">
                  All plans include our core security features like two-factor
                  authentication, single sign-on, and encrypted data storage.
                  Enterprise plans include additional advanced security features
                  and compliance certifications.
                </p>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <SecurityFeature label="SOC 2 Compliance" />
                  <SecurityFeature label="GDPR Compliance" />
                  <SecurityFeature label="HIPAA Compliance" />
                  <SecurityFeature label="99.9% Uptime SLA" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold mb-4">
            Frequently Asked Questions
          </h3>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <FaqItem
              question="Can I change plans later?"
              answer="Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, PayPal, and bank transfers for annual plans. Enterprise customers can also pay by invoice."
            />
            <FaqItem
              question="Is there a free trial available?"
              answer="Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial."
            />
            <FaqItem
              question="Do you offer discounts for nonprofits?"
              answer="Yes, we offer special pricing for nonprofit organizations, educational institutions, and open-source projects. Contact our sales team for details."
            />
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">View documentation</Button>
              <Button>Contact sales</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityFeature({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <Check className="h-4 w-4 text-green-500 mr-2" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="space-y-2">
      <h4 className="font-medium flex items-center">
        {question}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{answer}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h4>
      <p className="text-sm text-muted-foreground">{answer}</p>
    </div>
  );
}
