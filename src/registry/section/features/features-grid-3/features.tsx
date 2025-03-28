"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LucideIcon,
  Zap,
  Shield,
  BarChart,
  Users,
  Settings,
  Globe,
} from "lucide-react";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/registry/components/card/card-shadcn/card";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  highlight?: boolean;
}

interface FeaturesSectionProps {
  badge?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  features?: FeatureItem[];
  ctaText?: string;
  ctaLink?: string;
  columns?: 2 | 3 | 4;
  withAnimation?: boolean;
  variant?: "default" | "minimal" | "bordered";
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "Lightning Fast",
    description:
      "Optimized performance ensures your application loads quickly and runs smoothly.",
    icon: Zap,
    color: "text-amber-500",
    highlight: true,
  },
  {
    title: "Secure by Default",
    description:
      "Built-in security features protect your data and users from common threats.",
    icon: Shield,
    color: "text-blue-500",
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain insights into user behavior with comprehensive analytics tools.",
    icon: BarChart,
    color: "text-purple-500",
  },
  {
    title: "Team Collaboration",
    description: "Collaborate seamlessly with your team members in real-time.",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Customizable Workflow",
    description:
      "Tailor the workflow to match your team's specific needs and processes.",
    icon: Settings,
    color: "text-orange-500",
  },
  {
    title: "Global Availability",
    description:
      "Deploy your application to multiple regions for optimal performance worldwide.",
    icon: Globe,
    color: "text-sky-500",
  },
];

const FeaturesGrid3 = ({
  badge = "Features",
  heading = "Powerful Features for Modern Applications",
  subheading = "EVERYTHING YOU NEED",
  description = "Our platform provides a comprehensive set of tools and features designed to help you build, deploy, and scale your applications with ease.",
  features = defaultFeatures,
  ctaText = "Explore All Features",
  ctaLink = "#",
  columns = 3,
  withAnimation = true,
  variant = "default",
}: FeaturesSectionProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Determine grid columns class
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2";
      case 3:
        return "md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4";
      default:
        return "md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const MotionWrapper = withAnimation ? motion.div : React.Fragment;
  const motionProps = withAnimation
    ? {
        variants: containerVariants,
        initial: "hidden",
        animate: "visible",
        viewport: { once: true, margin: "-100px" },
      }
    : {};

  // Get card style based on variant
  const getCardStyle = (feature: FeatureItem) => {
    switch (variant) {
      case "minimal":
        return "bg-transparent border-none shadow-none hover:bg-muted/50";
      case "bordered":
        return `border-2 ${
          feature.highlight
            ? `border-${feature.color?.split("-")[1]}-200 dark:border-${
                feature.color?.split("-")[1]
              }-900`
            : "border-muted"
        } hover:border-${feature.color?.split("-")[1]}-300 dark:hover:border-${
          feature.color?.split("-")[1]
        }-800`;
      default:
        return `${feature.highlight ? "bg-muted" : ""} hover:shadow-md`;
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          {badge && (
            <Badge variant="outline" className="mb-4">
              {badge}
            </Badge>
          )}
          {subheading && (
            <p className="text-sm font-semibold tracking-wider text-primary mb-2">
              {subheading}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {heading}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <MotionWrapper
          {...motionProps}
          className={`grid grid-cols-1 ${getGridClass()} gap-6`}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${feature.highlight ? "md:col-span-2" : ""}`}
              >
                <Card
                  className={`h-full transition-all duration-300 ${getCardStyle(
                    feature
                  )}`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        feature.color
                          ? `bg-${feature.color.split("-")[1]}-100 dark:bg-${
                              feature.color.split("-")[1]
                            }-950`
                          : "bg-primary/10"
                      }`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${feature.color || "text-primary"}`}
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>

                    {feature.highlight && (
                      <div className="mt-4 flex items-center text-sm">
                        <Check
                          className={`mr-1 h-4 w-4 ${
                            feature.color || "text-primary"
                          }`}
                        />
                        <span className={feature.color || "text-primary"}>
                          Premium feature
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </MotionWrapper>

        {ctaText && (
          <div className="mt-12 text-center">
            <Button size="lg" className="group">
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturesGrid3;
