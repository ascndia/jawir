"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Animation configuration
const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  featureItem: {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  },
};

// Features data
const features = [
  {
    title: "Powerful Analytics",
    description: "Gain deep insights with our comprehensive analytics platform.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team in real-time.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Cloud Integration",
    description: "Connect and synchronize with your favorite cloud services.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need with our responsive support team.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "Secure Infrastructure",
    description: "Rest easy with enterprise-grade security protecting your data.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
  {
    title: "API Access",
    description: "Extend functionality with our comprehensive API.",
    icon: <Check className="h-5 w-5 text-primary" />,
  },
];

  export function FeaturesGrid1A() {
    return (
      <section className="w-full py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 bg-primary/10 text-primary px-4 py-1.5">
              Our Features
            </Badge>
            <motion.h2 
              variants={animationConfig.item}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              What We Offer
            </motion.h2>
            <motion.p 
              variants={animationConfig.item}
              className="mt-4 max-w-2xl mx-auto text-muted-foreground text-lg"
            >
              Explore the robust suite of features designed to give you a competitive edge.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={animationConfig.item}
                className="bg-card p-6 rounded-lg shadow-md border border-border"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground text-center">
                  {feature.description}
                </p>
                <motion.div 
                  variants={animationConfig.item}
                  className="mt-4 flex justify-center"
                >
                  <Button size="sm">
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
  
  export function FeaturesGrid1B() {
    return (
      <section className="w-full py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={animationConfig.item}
              className="text-3xl md:text-5xl font-extrabold text-foreground"
            >
              Our Capabilities
            </motion.h2>
            <motion.p 
              variants={animationConfig.item}
              className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              We empower your business with a versatile array of features, tailored to elevate your digital experience.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={animationConfig.item}
                className="flex bg-card flex-col items-center text-center p-8 border border-border rounded-lg transition hover:shadow-lg"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }