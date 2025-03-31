"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export function Features2Section() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="mb-12 text-center"
            variants={animationConfig.item}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the tools that empower your workflow.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={animationConfig.featureItem}
                className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4"
              >
                <div className="rounded-full p-2 bg-primary/10 h-10 w-10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={animationConfig.item} 
            className="mt-12 flex justify-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Button size="lg" className="gap-2">
              Explore All Features
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    );
}