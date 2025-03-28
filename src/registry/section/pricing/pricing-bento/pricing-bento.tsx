"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { ScrollReveal } from "@/registry/components/framer";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Clock,
  Users,
  Layers,
  Infinity,
  Award,
  Rocket,
  Crown,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/components/tabs";

interface PricingFeature {
  name: string;
  included: boolean;
  highlight?: boolean;
  tooltip?: string;
  new?: boolean;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
  accentColor?: string;
  icon?: React.ReactNode;
  badge?: string;
  gridArea?: string;
}

const PricingBento = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly"
  );
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [animateFeatures, setAnimateFeatures] = useState(false);

  useEffect(() => {
    // Trigger feature animation when billing cycle changes
    setAnimateFeatures(true);
    const timer = setTimeout(() => setAnimateFeatures(false), 500);
    return () => clearTimeout(timer);
  }, [billingCycle]);

  const pricingTiers: PricingTier[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: {
        monthly: 12,
        annually: 9,
      },
      features: [
        { name: "Up to 5 projects", included: true },
        { name: "Basic analytics", included: true },
        { name: "24-hour support response time", included: true },
        { name: "Community access", included: true },
        { name: "50GB storage", included: true },
        { name: "API access", included: false },
        { name: "Custom domain", included: false },
        { name: "Advanced security", included: false },
      ],
      cta: "Start with Starter",
      icon: <Layers className="h-5 w-5" />,
      gridArea: "starter",
    },
    {
      id: "pro",
      name: "Pro",
      description: "Ideal for professionals and growing teams",
      price: {
        monthly: 29,
        annually: 24,
      },
      features: [
        { name: "Unlimited projects", included: true, highlight: true },
        { name: "Advanced analytics", included: true },
        { name: "4-hour support response time", included: true },
        { name: "Community access", included: true },
        { name: "250GB storage", included: true },
        { name: "API access", included: true },
        { name: "Custom domain", included: true },
        { name: "Advanced security", included: true },
        { name: "Team collaboration", included: true, new: true },
        { name: "Workflow automation", included: false },
      ],
      cta: "Upgrade to Pro",
      popular: true,
      accentColor: "bg-gradient-to-r from-violet-600 to-indigo-600",
      icon: <Rocket className="h-5 w-5" />,
      badge: "Most Popular",
      gridArea: "pro",
    },
    {
      id: "business",
      name: "Business",
      description: "For organizations with advanced needs",
      price: {
        monthly: 79,
        annually: 69,
      },
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Enterprise analytics", included: true, highlight: true },
        { name: "1-hour support response time", included: true },
        { name: "Priority community access", included: true },
        { name: "1TB storage", included: true },
        { name: "Advanced API access", included: true },
        { name: "Multiple custom domains", included: true },
        { name: "Enterprise-grade security", included: true },
        { name: "Team collaboration", included: true },
        { name: "Advanced workflow automation", included: true, new: true },
        { name: "Dedicated account manager", included: true },
        { name: "Custom integrations", included: true },
      ],
      cta: "Contact Sales",
      accentColor: "bg-gradient-to-r from-amber-500 to-orange-600",
      icon: <Crown className="h-5 w-5" />,
      gridArea: "business",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      price: {
        monthly: 299,
        annually: 249,
      },
      features: [
        { name: "Unlimited everything", included: true, highlight: true },
        { name: "Custom analytics dashboard", included: true },
        { name: "15-minute support response time", included: true },
        { name: "VIP community access", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Enterprise API with dedicated support", included: true },
        { name: "Unlimited custom domains", included: true },
        { name: "Military-grade security", included: true },
        { name: "Advanced team collaboration tools", included: true },
        { name: "Custom workflow automation", included: true },
        { name: "Dedicated success team", included: true },
        { name: "White-glove onboarding", included: true, new: true },
        { name: "SLA guarantees", included: true },
        { name: "Custom feature development", included: true },
      ],
      cta: "Contact Sales",
      accentColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      icon: <Award className="h-5 w-5" />,
      gridArea: "enterprise",
    },
  ];

  // Additional feature blocks for the bento grid
  const featureBlocks = [
    {
      id: "support",
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our round-the-clock support team.",
      icon: <Clock className="h-6 w-6" />,
      gridArea: "support",
    },
    {
      id: "teams",
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team members with our collaborative tools.",
      icon: <Users className="h-6 w-6" />,
      gridArea: "teams",
    },
    {
      id: "security",
      title: "Enterprise Security",
      description:
        "Rest easy with our enterprise-grade security protocols and compliance.",
      icon: <Shield className="h-6 w-6" />,
      gridArea: "security",
    },
    {
      id: "performance",
      title: "Lightning Performance",
      description:
        "Experience blazing fast performance with our optimized infrastructure.",
      icon: <Zap className="h-6 w-6" />,
      gridArea: "performance",
    },
    {
      id: "testimonial",
      quote:
        "This platform has transformed how our team works. The pricing is transparent and the value is undeniable.",
      author: "Sarah Johnson",
      role: "CTO at TechCorp",
      gridArea: "testimonial",
    },
  ];

  // Custom comparison features for the comparison tab
  const comparisonFeatures = [
    {
      category: "Core Features",
      features: [
        {
          name: "Projects",
          starter: "5",
          pro: "Unlimited",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Storage",
          starter: "50GB",
          pro: "250GB",
          business: "1TB",
          enterprise: "Unlimited",
        },
        {
          name: "Users",
          starter: "1",
          pro: "Up to 10",
          business: "Up to 50",
          enterprise: "Unlimited",
        },
      ],
    },
    {
      category: "Support",
      features: [
        {
          name: "Response Time",
          starter: "24 hours",
          pro: "4 hours",
          business: "1 hour",
          enterprise: "15 minutes",
        },
        {
          name: "Support Channels",
          starter: "Email",
          pro: "Email, Chat",
          business: "Email, Chat, Phone",
          enterprise: "Priority on all channels",
        },
        {
          name: "Dedicated Manager",
          starter: "—",
          pro: "—",
          business: "✓",
          enterprise: "✓",
        },
      ],
    },
    {
      category: "Security",
      features: [
        {
          name: "Two-Factor Auth",
          starter: "✓",
          pro: "✓",
          business: "✓",
          enterprise: "✓",
        },
        { name: "SSO", starter: "—", pro: "✓", business: "✓", enterprise: "✓" },
        {
          name: "Audit Logs",
          starter: "—",
          pro: "30 days",
          business: "1 year",
          enterprise: "Unlimited",
        },
        {
          name: "Custom Security",
          starter: "—",
          pro: "—",
          business: "Basic",
          enterprise: "Advanced",
        },
      ],
    },
    {
      category: "Advanced Features",
      features: [
        {
          name: "API Access",
          starter: "—",
          pro: "Basic",
          business: "Advanced",
          enterprise: "Enterprise",
        },
        {
          name: "Custom Domains",
          starter: "—",
          pro: "1",
          business: "Multiple",
          enterprise: "Unlimited",
        },
        {
          name: "Integrations",
          starter: "3",
          pro: "20+",
          business: "50+",
          enterprise: "Unlimited + Custom",
        },
        {
          name: "Analytics",
          starter: "Basic",
          pro: "Advanced",
          business: "Enterprise",
          enterprise: "Custom Dashboard",
        },
        {
          name: "Automation",
          starter: "—",
          pro: "—",
          business: "Advanced",
          enterprise: "Custom",
        },
      ],
    },
  ];

  return (
    <div className="container w-full mx-auto px-4 py-16 max-w-7xl">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Flexible Pricing for Every Need
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a
            14-day free trial.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex justify-center mb-12">
          <Tabs defaultValue="plans" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="mt-6 w-full">
              <div className="flex justify-center mb-8">
                <div className="bg-muted p-1 rounded-lg inline-flex items-center">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all",
                      billingCycle === "monthly"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("annually")}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5",
                      billingCycle === "annually"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Annually
                    <Badge
                      variant="outline"
                      className="text-xs font-normal py-0 h-5"
                    >
                      Save 20%
                    </Badge>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-fr w-full">
                {/* Bento grid layout for pricing tiers and feature blocks */}
                <div
                  className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6"
                  style={{
                    gridTemplateAreas: `
                    "starter starter starter starter pro pro pro pro business business business business"
                    "support support teams teams pro pro pro pro security security performance performance"
                    "testimonial testimonial testimonial testimonial testimonial testimonial enterprise enterprise enterprise enterprise enterprise enterprise"
                  `,
                  }}
                >
                  {/* Pricing Tiers */}
                  {pricingTiers.map((tier) => (
                    <motion.div
                      key={tier.id}
                      style={{ gridArea: tier.gridArea }}
                      className={cn(
                        "relative rounded-xl border bg-card text-card-foreground shadow transition-all duration-200 overflow-hidden",
                        hoveredTier === tier.id &&
                          "shadow-lg scale-[1.02] z-10",
                        tier.popular && "border-primary/50"
                      )}
                      onMouseEnter={() => setHoveredTier(tier.id)}
                      onMouseLeave={() => setHoveredTier(null)}
                      layout
                    >
                      {tier.badge && (
                        <div className="absolute top-0 right-0">
                          <div
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg",
                              tier.accentColor || "bg-primary"
                            )}
                          >
                            <span className="text-white flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              {tier.badge}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={cn(
                              "p-1.5 rounded-full",
                              tier.accentColor || "bg-primary/10"
                            )}
                          >
                            {tier.icon}
                          </div>
                          <h3 className="text-xl font-semibold">{tier.name}</h3>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {tier.description}
                        </p>

                        <div className="mb-6">
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold">
                              $
                              {billingCycle === "monthly"
                                ? tier.price.monthly
                                : tier.price.annually}
                            </span>
                            <span className="text-sm text-muted-foreground ml-1">
                              /
                              {billingCycle === "monthly"
                                ? "month"
                                : "month, billed annually"}
                            </span>
                          </div>
                        </div>

                        <AnimatePresence>
                          <motion.div
                            key={`${tier.id}-${billingCycle}`}
                            initial={
                              animateFeatures ? { opacity: 0, y: 10 } : false
                            }
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-2 mb-6"
                          >
                            {tier.features.slice(0, 4).map((feature, idx) => (
                              <div
                                key={`${tier.id}-feature-${idx}`}
                                className={cn(
                                  "flex items-start gap-2 text-sm",
                                  !feature.included && "text-muted-foreground"
                                )}
                              >
                                {feature.included ? (
                                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                )}
                                <span
                                  className={cn(
                                    feature.highlight && "font-medium",
                                    feature.new &&
                                      "after:content-['_•_New'] after:text-primary after:font-medium"
                                  )}
                                >
                                  {feature.name}
                                </span>
                              </div>
                            ))}

                            {tier.features.length > 4 && (
                              <div className="text-xs text-muted-foreground">
                                +{tier.features.length - 4} more features
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>

                        <Button
                          className={cn(
                            "w-full",
                            tier.popular ? "bg-primary hover:bg-primary/90" : ""
                          )}
                        >
                          {tier.cta}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Feature Blocks */}
                  {featureBlocks.map((block) =>
                    block.quote ? (
                      <motion.div
                        key={block.id}
                        style={{ gridArea: block.gridArea }}
                        className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col justify-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-col h-full justify-center">
                          <div className="mb-4">
                            <Star className="h-6 w-6 text-yellow-500" />
                            <Star className="h-6 w-6 text-yellow-500 inline-block ml-1" />
                            <Star className="h-6 w-6 text-yellow-500 inline-block ml-1" />
                            <Star className="h-6 w-6 text-yellow-500 inline-block ml-1" />
                            <Star className="h-6 w-6 text-yellow-500 inline-block ml-1" />
                          </div>
                          <blockquote className="text-lg italic mb-4">
                            "{block.quote}"
                          </blockquote>
                          <div className="mt-auto">
                            <p className="font-medium">{block.author}</p>
                            <p className="text-sm text-muted-foreground">
                              {block.role}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={block.id}
                        style={{ gridArea: block.gridArea }}
                        className="rounded-xl border bg-card text-card-foreground shadow p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                          {block.icon}
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          {block.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {block.description}
                        </p>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="mt-6 w-full">
              <div className="flex justify-center overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left p-3 border-b"></th>
                      <th className="text-center p-3 border-b">
                        <div className="font-medium">Starter</div>
                        <div className="text-sm text-muted-foreground">
                          ${billingCycle === "monthly" ? "12" : "9"}/mo
                        </div>
                      </th>
                      <th className="text-center p-3 border-b bg-primary/5 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-primary text-white">
                            Popular
                          </Badge>
                        </div>
                        <div className="font-medium">Pro</div>
                        <div className="text-sm text-muted-foreground">
                          ${billingCycle === "monthly" ? "29" : "24"}/mo
                        </div>
                      </th>
                      <th className="text-center p-3 border-b">
                        <div className="font-medium">Business</div>
                        <div className="text-sm text-muted-foreground">
                          ${billingCycle === "monthly" ? "79" : "69"}/mo
                        </div>
                      </th>
                      <th className="text-center p-3 border-b">
                        <div className="font-medium">Enterprise</div>
                        <div className="text-sm text-muted-foreground">
                          ${billingCycle === "monthly" ? "299" : "249"}/mo
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((categoryGroup, categoryIndex) => (
                      <React.Fragment key={`category-${categoryIndex}`}>
                        <tr>
                          <td
                            colSpan={5}
                            className="p-3 bg-muted/50 font-medium"
                          >
                            {categoryGroup.category}
                          </td>
                        </tr>
                        {categoryGroup.features.map((feature, featureIndex) => (
                          <tr
                            key={`feature-${categoryIndex}-${featureIndex}`}
                            className="border-b"
                          >
                            <td className="p-3 text-sm">{feature.name}</td>
                            <td className="p-3 text-center text-sm">
                              {feature.starter}
                            </td>
                            <td className="p-3 text-center text-sm bg-primary/5">
                              {feature.pro}
                            </td>
                            <td className="p-3 text-center text-sm">
                              {feature.business}
                            </td>
                            <td className="p-3 text-center text-sm">
                              {feature.enterprise}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                    <tr>
                      <td className="p-3"></td>
                      <td className="p-3 text-center">
                        <Button size="sm">Get Started</Button>
                      </td>
                      <td className="p-3 text-center bg-primary/5">
                        <Button size="sm">Upgrade to Pro</Button>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm">Contact Sales</Button>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm">Contact Sales</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6 w-full">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">
                    What's included in the free trial?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    All plans include a 14-day free trial with full access to
                    all features in that plan. No credit card required to start.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">
                    Can I change plans later?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Prorated credits will be applied to your next billing cycle.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">How does billing work?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer both monthly and annual billing. Annual plans come
                    with a 20% discount compared to monthly billing.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">
                    Do you offer custom plans?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, for organizations with specific needs, we offer custom
                    plans. Contact our sales team to discuss your requirements.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">
                    What payment methods do you accept?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and for annual
                    Enterprise plans, we can provide invoicing options.
                  </p>
                </div>
                <div className="rounded-lg border p-5">
                  <h3 className="font-medium mb-2">
                    Is there a refund policy?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We offer a 30-day money-back guarantee for all plans. If
                    you're not satisfied, contact support for a full refund.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollReveal>

      <ScrollReveal className="w-full mx-auto" delay={0.2}>
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Enterprise Solutions</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Need a custom solution for your organization? Our enterprise plans
            offer tailored features, dedicated support, and flexible pricing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                <Shield className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-medium mb-2">Enhanced Security</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Military-grade encryption, custom security policies, and
                compliance with industry standards.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </div>

            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-medium mb-2">Dedicated Support</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get a dedicated account manager and priority support for your
                entire organization.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </div>

            <div className="rounded-xl border bg-card p-6 text-left">
              <div className="p-2 rounded-full bg-primary/10 w-fit mb-4">
                <Infinity className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-medium mb-2">Unlimited Resources</h4>
              <p className="text-sm text-muted-foreground mb-4">
                No limits on projects, storage, or users. Scale your usage as
                your organization grows.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Still not sure which plan is right for you?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our team of experts is ready to help you find the perfect
                solution for your specific needs. Schedule a free consultation
                today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Schedule Consultation</Button>
                <Button variant="outline">View Case Studies</Button>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border shadow-sm">
              <h4 className="font-medium mb-4">
                What our customers are saying
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">
                      "The flexible pricing allowed us to start small and scale
                      as our company grew. Excellent value for money."
                    </p>
                    <p className="text-xs text-muted-foreground">
                      — Michael T., Marketing Director
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="rounded-full bg-primary/10 p-2 mt-1">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm mb-1">
                      "The flexible pricing allowed us to start small and scale
                      as our company grew. Excellent value for money."
                    </p>
                    <p className="text-xs text-muted-foreground">
                      — Michael T., Marketing Director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default PricingBento;
