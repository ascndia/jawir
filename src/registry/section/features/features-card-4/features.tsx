"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/registry/components/button";
import { Card, CardContent } from "@/registry/components/card";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  delay?: number;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  className,
  onClick,
  delay = 0,
  index,
  activeIndex,
  setActiveIndex,
}) => {
  const isActive = activeIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn("w-full", className)}
      onHoverStart={() => setActiveIndex(index)}
      onHoverEnd={() => setActiveIndex(null)}
    >
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 cursor-pointer h-full",
          isActive
            ? "bg-background border-muted-foreground/20 shadow-lg"
            : "bg-muted/40 hover:bg-muted/60"
        )}
        onClick={() => setActiveIndex(isActive ? null : index)}
      >
        <CardContent className="p-6">
          <div className="space-y-2">
            <motion.h3
              className="text-sm font-medium uppercase tracking-wide"
              animate={{
                color: isActive
                  ? "var(--color-primary)"
                  : "var(--color-muted-foreground)",
              }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm"
              animate={{
                color: isActive
                  ? "var(--color-foreground)"
                  : "var(--color-muted-foreground)",
              }}
              transition={{ duration: 0.3 }}
            >
              {description}
            </motion.p>
            <motion.div
              className="pt-4"
              initial={{ opacity: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0.8,
                y: isActive ? 0 : 5,
              }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                asChild
              >
                <Link href="#">
                  <span>Learn more</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const features = [
    {
      title: "TIP ONE",
      description:
        "Nam vitae molestie arcu. Quisque eu libero erit. Aliquam vehicula magna nec massa interdum ut, at interdum ante sodales.",
      delay: 0.1,
    },
    {
      title: "TIP TWO",
      description:
        "Nam vitae molestie arcu. Quisque eu libero erit. Aliquam vehicula magna nec massa interdum ut, at interdum ante sodales.",
      delay: 0.2,
    },
    {
      title: "TIP THREE",
      description:
        "Nam vitae molestie arcu. Quisque eu libero erit. Aliquam vehicula magna nec massa interdum ut, at interdum ante sodales.",
      delay: 0.3,
    },
  ];

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-background/50">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-start gap-4 md:gap-8"
        >
          <div className="space-y-3 max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Feature name
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Etia
              consectetur lacinia tortor felis eu ante sodales imperdiet.
            </motion.p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                delay={feature.delay}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
