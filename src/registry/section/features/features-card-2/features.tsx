"use client";

import React, { useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  ArrowRight,
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
  icon: React.ElementType;
  color: string;
  highlight?: boolean;
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
    highlight: true,
  },
];

const FeaturesCard2 = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const getBackgroundGradient = (index: number, isHovered: boolean) => {
    if (!isHovered) return "bg-card";

    const colors = [
      "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20",
      "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20",
      "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20",
      "from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20",
      "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20",
      "from-sky-50 to-sky-100 dark:from-sky-950/30 dark:to-sky-900/20",
    ];

    return `bg-gradient-to-br ${colors[index % colors.length]}`;
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Powerful Features for Modern Applications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Our platform provides a comprehensive set of tools and features
            designed to help you build, deploy, and scale your applications with
            ease.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {defaultFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredCard === index;

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`${
                  feature.highlight ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Card
                  className={`h-full transition-all duration-500 border overflow-hidden ${getBackgroundGradient(
                    index,
                    isHovered
                  )} ${isHovered ? "shadow-lg -translate-y-2" : "shadow"}`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <motion.div
                      variants={iconVariants}
                      className={`p-3 rounded-lg ${
                        feature.color
                          ? `bg-${feature.color.split("-")[1]}-100 dark:bg-${
                              feature.color.split("-")[1]
                            }-950/50`
                          : "bg-primary/10"
                      }`}
                    >
                      <IconComponent
                        className={`h-6 w-6 ${feature.color || "text-primary"}`}
                      />
                    </motion.div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>

                    {feature.highlight && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4 flex items-center text-sm"
                      >
                        <Check
                          className={`mr-1 h-4 w-4 ${
                            feature.color || "text-primary"
                          }`}
                        />
                        <span className={feature.color || "text-primary"}>
                          Premium feature
                        </span>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-sm font-medium group"
                      >
                        Learn more
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="group">
            Explore All Features
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesCard2;
