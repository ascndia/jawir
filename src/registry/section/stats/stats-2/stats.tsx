"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, Users, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  value: string;
  label: string;
  description?: string;
  icon?: React.ElementType;
  highlight?: boolean;
}

interface Stats2Props {
  heading?: string;
  subheading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: StatItem[];
  variant?: "default" | "cards" | "minimal";
  columns?: 2 | 3 | 4;
  alignment?: "center" | "left";
}

const Stats2 = ({
  heading = "Results that speak for themselves",
  subheading = "PROVEN PERFORMANCE",
  description = "Our platform has consistently delivered exceptional results for businesses across industries. Here's what our customers have achieved:",
  link = {
    text: "Read customer success stories",
    url: "https://www.example.com/case-studies",
  },
  stats = [
    {
      id: "stat-1",
      value: "250%+",
      label: "Average growth in user engagement",
      description: "Compared to previous solutions",
      icon: TrendingUp,
      highlight: true,
    },
    {
      id: "stat-2",
      value: "$2.5M",
      label: "Annual savings per enterprise",
      description: "Through workflow automation",
      icon: Award,
    },
    {
      id: "stat-3",
      value: "10M+",
      label: "Active users worldwide",
      description: "Across 150+ countries",
      icon: Users,
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "Customer satisfaction rating",
      description: "Based on 25,000+ reviews",
      icon: Globe,
    },
  ],
  variant = "default",
  columns = 4,
  alignment = "center",
}: Stats2Props) => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

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

  const renderIcon = (Icon: React.ElementType | undefined) => {
    if (!Icon) return null;
    return <Icon className="h-6 w-6 text-primary" />;
  };

  return (
    <section className="py-20 md:py-32 overflow-hidden">
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
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">
              {subheading}
            </p>
          )}
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="max-w-[800px] text-muted-foreground md:text-xl">
              {description}
            </p>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={cn(
            "grid gap-8",
            columns === 2
              ? "md:grid-cols-2"
              : columns === 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
              className={cn(
                "relative transition-all duration-300",
                variant === "cards"
                  ? "bg-card border rounded-xl p-6 shadow-sm hover:shadow-md"
                  : variant === "minimal"
                  ? "p-4"
                  : "p-6 rounded-lg",
                stat.highlight && "border-primary",
                hoveredStat === stat.id && "scale-105"
              )}
            >
              {stat.icon && <div className="mb-4">{renderIcon(stat.icon)}</div>}
              <div className="flex flex-col gap-2">
                <div className="text-4xl md:text-5xl font-bold text-foreground">
                  {stat.value}
                </div>
                <h3 className="text-lg font-semibold">{stat.label}</h3>
                {stat.description && (
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                )}
              </div>
              {stat.highlight && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {link && (
          <div
            className={cn(
              "mt-12 flex items-center gap-2 font-medium hover:underline cursor-pointer",
              alignment === "center" ? "mx-auto justify-center" : ""
            )}
            onClick={() => window.open(link.url, "_blank")}
          >
            {link.text}
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Stats2;
