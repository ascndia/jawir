"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  badge?: string;
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
    badge: "Milestone",
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
    badge: "Growth",
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
    badge: "Current",
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

export default function Timeline3({
  heading = "Our Journey",
  subheading = "Milestones",
  description = "From humble beginnings to industry leadership, explore the key moments that shaped our path.",
  items = defaultTimelineItems,
  ctaButton,
  variant = "default",
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
        <div className="flex flex-col gap-6 mb-12 text-center items-center">
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
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-border" />

          {/* Timeline items */}
          <div className="relative">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "relative mb-12 last:mb-0",
                    "flex items-center",
                    "md:flex-row", // Mobile is always left-aligned
                    isEven ? "md:flex-row" : "md:flex-row-reverse" // Desktop alternates
                  )}
                >
                  {/* Timeline node */}
                  <div
                    className={cn(
                      "absolute left-8 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10",
                      item.isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : item.isCompleted
                        ? "border-primary bg-background text-primary"
                        : "border-muted-foreground bg-background text-muted-foreground"
                    )}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      "pl-16 md:pl-0", // Mobile padding
                      "md:w-1/2", // Desktop width
                      isEven
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    )}
                  >
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
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={cn(
                            "text-sm font-semibold text-primary",
                            isEven ? "md:ml-auto" : ""
                          )}
                        >
                          {item.date}
                        </div>
                        {item.badge && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              isEven ? "md:mr-0 md:ml-2" : "md:ml-0 md:mr-2"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty side (for desktop symmetry) */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
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
