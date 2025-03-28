"use client";
import { Button } from "@/registry/components/button/select";
import { Check, ChevronDown, Shield, Star, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PricingSingle2() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "yearly"
  );
  const yearlyDiscount = 25; // 25% discount for yearly billing

  const monthlyPrice = 129;
  const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscount / 100);
  const displayPrice =
    billingCycle === "monthly" ? monthlyPrice : Math.round(yearlyPrice / 12);
  const totalYearlyPrice = Math.round(yearlyPrice);

  return (
    <div className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[25%] w-[50%] h-[70%] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-[30%] -left-[25%] w-[50%] h-[70%] bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-12 md:mb-20">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-primary/10 text-primary">
            <Star className="w-3.5 h-3.5 mr-1.5" />
            Premium Solution
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Enterprise-grade power, startup-friendly price
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-prose mx-auto">
            Everything you need to scale your business with professional tools,
            priority support, and enterprise security.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left column - Plan details */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-card relative rounded-3xl border shadow-lg shadow-black/5 dark:shadow-white/5 p-8 md:p-10 h-full">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              </div>

              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Enterprise Suite</h3>
                  <p className="text-muted-foreground mt-2">
                    Complete solution for growing businesses
                  </p>
                </div>

                <div className="mt-2 mb-8">
                  <div className="flex items-center justify-center p-2 rounded-lg bg-muted mb-6">
                    <button
                      onClick={() => setBillingCycle("monthly")}
                      className={cn(
                        "flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all",
                        billingCycle === "monthly"
                          ? "bg-background shadow-sm"
                          : "text-muted-foreground hover:bg-background/50"
                      )}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle("yearly")}
                      className={cn(
                        "flex-1 text-center py-2 px-3 rounded-md text-sm font-medium transition-all",
                        billingCycle === "yearly"
                          ? "bg-background shadow-sm"
                          : "text-muted-foreground hover:bg-background/50"
                      )}
                    >
                      Yearly
                      <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                        Save {yearlyDiscount}%
                      </span>
                    </button>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <span className="text-5xl font-bold">
                        ${displayPrice}
                      </span>
                      <span className="text-muted-foreground ml-2 text-lg">
                        /month
                      </span>
                    </div>

                    {billingCycle === "yearly" && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Billed annually (${totalYearlyPrice}/year)
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <PricingFeature feature="Unlimited projects and users" />
                  <PricingFeature feature="50TB secure cloud storage" />
                  <PricingFeature feature="Advanced analytics dashboard" />
                  <PricingFeature feature="24/7 priority support" />
                  <PricingFeature feature="Custom integrations" />
                  <PricingFeature feature="Enterprise-grade security" />
                  <PricingFeature feature="Dedicated account manager" />
                </div>

                <div className="mt-auto">
                  <Button size="lg" className="w-full text-base py-6">
                    Get started with Enterprise
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Benefits and details */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-3xl border shadow-lg shadow-black/5 dark:shadow-white/5 p-8 md:p-10 h-full">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <BenefitCard
                  icon={<Shield className="w-10 h-10 text-blue-500" />}
                  title="Enterprise Security"
                  description="Bank-level encryption, SSO, role-based permissions, and compliance with GDPR, HIPAA, and SOC 2."
                />
                <BenefitCard
                  icon={<Zap className="w-10 h-10 text-amber-500" />}
                  title="Performance at Scale"
                  description="Optimized infrastructure that scales with your business, handling millions of operations without slowdowns."
                />
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-semibold mb-6">
                  Trusted by industry leaders
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <CompanyLogo
                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                    alt="Nvidia"
                  />
                  <CompanyLogo
                    src="https://html.tailus.io/blocks/customers/github.svg"
                    alt="GitHub"
                  />
                  <CompanyLogo
                    src="https://html.tailus.io/blocks/customers/nike.svg"
                    alt="Nike"
                  />
                  <CompanyLogo
                    src="https://html.tailus.io/blocks/customers/column.svg"
                    alt="Column"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">
                  Frequently asked questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  <PricingFAQItem
                    question="How does the 30-day guarantee work?"
                    answer="If you're not satisfied with our service for any reason, simply contact our support team within 30 days of your purchase for a full refund, no questions asked."
                  />
                  <PricingFAQItem
                    question="Can I change plans later?"
                    answer="Yes, you can upgrade, downgrade, or cancel your plan at any time. If you downgrade or cancel during a billing cycle, the changes will take effect at the start of your next billing period."
                  />
                  <PricingFAQItem
                    question="Is there a limit to team members?"
                    answer="No, our Enterprise plan supports unlimited team members. You can add as many users as needed without additional per-user fees."
                  />
                  <PricingFAQItem
                    question="Do you offer custom enterprise solutions?"
                    answer="Yes, for organizations with specific requirements, we offer custom enterprise solutions with dedicated support, custom integrations, and tailored security features. Contact our sales team for details."
                  />
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <a href="#" className="text-primary font-medium hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function PricingFeature({ feature }: { feature: string }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <Check className="h-5 w-5 text-green-500" />
      </div>
      <p className="ml-3 text-base">{feature}</p>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col p-6 rounded-2xl bg-muted/50 border border-border/50">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex items-center justify-center">
      <img
        className="h-8 w-auto object-contain dark:invert opacity-70 hover:opacity-100 transition-opacity"
        src={src}
        alt={alt}
        height="32"
        width="auto"
      />
    </div>
  );
}

function PricingFAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger className="text-left font-medium">
        {question}
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
