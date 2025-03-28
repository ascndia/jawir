"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/registry/components/button/select";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
}

interface TimelineProps {
  heading?: string;
  subheading?: string;
  description?: string;
  items?: TimelineItem[];
  ctaButton?: {
    text: string;
    url: string;
  };
  variant?: "default" | "cards" | "minimal";
  alignment?: "left" | "center";
  className?: string;
}

const defaultTimelineItems: TimelineItem[] = [
  {
    id: "1",
    date: "2020",
    title: "Company Founded",
    description:
      "Our journey began with a simple idea to transform the industry with innovative solutions.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: "2",
    date: "2021",
    title: "First Major Product Launch",
    description:
      "After months of development, we launched our flagship product to critical acclaim.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: "3",
    date: "2022",
    title: "International Expansion",
    description:
      "We expanded our operations to Europe and Asia, bringing our solutions to a global audience.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: "4",
    date: "2023",
    title: "Series B Funding",
    description:
      "Secured $50M in Series B funding to accelerate growth and product development.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: "5",
    date: "2024",
    title: "Present Day",
    description:
      "Today, we're a team of 100+ professionals serving over 500 enterprise clients worldwide.",
    isActive: true,
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
  {
    id: "6",
    date: "2025",
    title: "Future Vision",
    description:
      "Our roadmap includes AI-powered features and deeper integrations with enterprise systems.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

export default function Timeline1({
  heading = "Our Journey",
  subheading = "Milestones",
  description = "From humble beginnings to industry leadership, explore the key moments that shaped our path.",
  items = defaultTimelineItems,
  ctaButton,
  variant = "default",
  alignment = "left",
  className,
}: TimelineProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
    <section className={cn("py-20 md:py-32 overflow-hidden", className)}>
      <div className="container px-4 md:px-6">
        <div
          className={cn(
            "flex flex-col gap-6 mb-12",
            alignment === "center"
              ? "text-center items-center"
              : "text-left items-start"
          )}
        >
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-wider text-primary uppercase"
            >
              {subheading}
            </motion.p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-[800px] text-muted-foreground md:text-xl"
            >
              {description}
            </motion.p>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Timeline line */}
          <div
            className={cn(
              "absolute top-0 bottom-0 w-0.5 bg-border",
              alignment === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-8 md:left-12"
            )}
          />

          {/* Timeline items */}
          <div className="relative">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  "relative mb-12 last:mb-0",
                  alignment === "center"
                    ? index % 2 === 0
                      ? "md:pr-[50%] md:text-right"
                      : "md:pl-[50%] md:ml-auto"
                    : "pl-16 md:pl-24"
                )}
              >
                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute top-0 w-8 h-8 rounded-full border-4 flex items-center justify-center",
                    item.isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : item.isCompleted
                      ? "border-primary bg-background text-primary"
                      : "border-muted-foreground bg-background text-muted-foreground",
                    alignment === "center"
                      ? "left-1/2 -translate-x-1/2"
                      : "left-4 md:left-8"
                  )}
                >
                  {item.icon}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "transition-all duration-300",
                    variant === "cards"
                      ? "bg-card border rounded-xl p-6 shadow-sm hover:shadow-md"
                      : variant === "minimal"
                      ? "p-4"
                      : "p-6",
                    hoveredItem === item.id && "scale-[1.02]"
                  )}
                >
                  <div className="text-sm font-semibold text-primary mb-2">
                    {item.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
              "mt-16",
              alignment === "center" ? "text-center" : "text-left"
            )}
          >
            <Button
              className="gap-2"
              onClick={() => window.open(ctaButton.url, "_blank")}
            >
              {ctaButton.text}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
