"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
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
  icon?: React.ReactNode;
  image?: string;
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
  layout?: "grid" | "list";
  columns?: 2 | 3 | 4;
  withAnimation?: boolean;
}

const FeaturesGrid2 = ({
  badge = "Features",
  heading = "Powerful Features for Modern Applications",
  subheading = "EVERYTHING YOU NEED",
  description = "Our platform provides a comprehensive set of tools and features designed to help you build, deploy, and scale your applications with ease.",
  features = [
    {
      title: "Responsive Design",
      description:
        "Build interfaces that work flawlessly across all devices and screen sizes.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      highlight: true,
    },
    {
      title: "Component Library",
      description:
        "Access a rich library of pre-built components to accelerate development.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Performance Optimization",
      description:
        "Ensure fast loading times and smooth interactions for the best user experience.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Accessibility",
      description:
        "Create inclusive applications that work for everyone with built-in a11y features.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Dark Mode Support",
      description:
        "Implement beautiful dark mode interfaces with just a few lines of code.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Customization",
      description:
        "Tailor every aspect of your application to match your brand and requirements.",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
  ],
  ctaText = "Explore All Features",
  ctaLink = "#",
  layout = "grid",
  columns = 3,
  withAnimation = true,
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`${feature.highlight ? "md:col-span-2" : ""}`}
            >
              <Card
                className={`h-full overflow-hidden transition-all duration-30 pt-0 hover:shadow-md ${
                  feature.highlight ? "border-primary/20" : ""
                }`}
              >
                {feature.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {feature.highlight && (
                      <div className="flex items-center text-sm text-primary">
                        <Check className="mr-1 h-4 w-4" />
                        <span>Premium feature</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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

export default FeaturesGrid2;
