"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/registry/components/card/card-shadcn/card";
import {
  Zap,
  ShieldCheck,
  BarChart3,
  Users,
  Settings,
  Globe,
  LucideIcon,
} from "lucide-react";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/marquee/marquee-shadcn/marquee"; // Import the Marquee component

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

const defaultFeatures: FeatureItem[] = [
  {
    icon: Zap,
    title: "Blazing Performance",
    description:
      "Experience unparalleled speed and responsiveness with our optimized infrastructure.",
    color: "text-yellow-500",
  },
  {
    icon: ShieldCheck,
    title: "Robust Security",
    description:
      "Protect your data with multiple layers of security and proactive threat monitoring.",
    color: "text-green-500",
  },
  {
    icon: BarChart3,
    title: "Insightful Analytics",
    description:
      "Make data-driven decisions with comprehensive and easy-to-understand analytics.",
    color: "text-blue-500",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description:
      "Work together effectively with integrated tools designed for team productivity.",
    color: "text-purple-500",
  },
  {
    icon: Settings,
    title: "Deep Customization",
    description:
      "Tailor the platform to your exact needs with extensive configuration options.",
    color: "text-orange-500",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with users worldwide thanks to our globally distributed network.",
    color: "text-sky-500",
  },
];

// Keep the FeatureCard component as it defines the look of each item
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  const IconComponent = feature.icon;
  return (
    <Card className="w-64 flex-shrink-0 overflow-hidden border border-border/50 bg-card ">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div
          className={cn(
            "p-1.5 rounded-lg",
            `bg-${feature.color?.split("-")[1]}-100/20 dark:bg-${
              feature.color?.split("-")[1]
            }-900/30`
          )}
        >
          <IconComponent
            className={cn("h-5 w-5", feature.color || "text-primary")}
          />
        </div>
        <h3 className="text-base font-semibold tracking-tight">
          {feature.title}
        </h3>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  );
};

// Helper component to render the list of features
const FeatureList = () =>
  defaultFeatures.map((feature, index) => (
    <FeatureCard key={index} feature={feature} />
  ));

const FeaturesMarquee1 = () => {
  // No need for duplicatedFeatures or manual animation variants

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
        <Badge variant="outline" className="mb-4">
          Core Features
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Powering Your Success
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the key capabilities that set our platform apart and drive
          results.
        </p>
      </div>

      {/* Use the Marquee component */}
      <div className="relative">
        {/* Gradient fades */}
        <div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
        <div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
        {/* Apply Marquee component */}
        <Marquee pauseOnHover className="[--duration:30s]">
          <FeatureList />
        </Marquee>
        {/* Optional: Add a second reversed marquee for visual density if desired */}
        <Marquee pauseOnHover reverse className="[--duration:30s]">
          <FeatureList />
        </Marquee>
        <Marquee pauseOnHover className="[--duration:30s]">
          <FeatureList />
        </Marquee>
      </div>
    </section>
  );
};

export default FeaturesMarquee1;
