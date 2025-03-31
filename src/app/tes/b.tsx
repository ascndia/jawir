"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  },
};

const features = [
  {
    title: "Powerful Analytics",
    description:
      "Gain deep insights with our comprehensive analytics platform.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Team Collaboration",
    description:
      "Work seamlessly with your team in real-time.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Cloud Integration",
    description:
      "Connect and synchronize with your favorite cloud services.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "24/7 Support",
    description:
      "Get help whenever you need with our responsive support team.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Secure Infrastructure",
    description:
      "Rest easy with enterprise-grade security protecting your data.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "API Access",
    description:
      "Extend functionality with our comprehensive API.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={animationConfig.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={animationConfig.item}
            className="text-3xl font-bold text-foreground mb-4"
          >
            Our Features
          </motion.h2>
          <motion.p
            variants={animationConfig.item}
            className="text-lg text-muted-foreground mb-8"
          >
            Discover the benefits that make our platform stand out.
          </motion.p>
          <motion.div
            variants={animationConfig.container}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={animationConfig.item}>
                <Card className="border-border">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="rounded-full p-2 bg-primary/10 h-10 w-10 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-medium text-foreground text-xl mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}