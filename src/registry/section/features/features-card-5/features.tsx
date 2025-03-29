"use client";

import React from "react";
import { motion } from "framer-motion";
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

const FeaturesCard5 = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-4">
            Core Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the powerful features that make our platform the ideal
            choice for your next project.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {defaultFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg border border-border/50 bg-card">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div
                      className={`p-2 rounded-lg bg-${
                        feature.color?.split("-")[1]
                      }-100/20 dark:bg-${feature.color?.split("-")[1]}-900/30`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${feature.color || "text-primary"}`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCard5;
