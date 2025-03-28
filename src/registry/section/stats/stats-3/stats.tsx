"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Globe,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { Button } from "@/registry/components/button/select";

interface StatCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
  footnote?: string;
  categoryId: string;
}

interface Stats3Props {
  heading?: string;
  subheading?: string;
  description?: string;
  categories?: StatCategory[];
  stats?: StatItem[];
  link?: {
    text: string;
    url: string;
  };
  showLiveCounter?: boolean;
  backgroundStyle?: "gradient" | "pattern" | "minimal";
}

const defaultCategories: StatCategory[] = [
  {
    id: "performance",
    name: "Performance",
    description: "Key metrics showing our platform's performance advantages",
    icon: Zap,
  },
  {
    id: "growth",
    name: "Growth",
    description: "How our customers have grown using our platform",
    icon: TrendingUp,
  },
  {
    id: "global",
    name: "Global Impact",
    description: "Our worldwide reach and influence",
    icon: Globe,
  },
  {
    id: "security",
    name: "Security & Reliability",
    description: "Our commitment to keeping your data safe",
    icon: Shield,
  },
];

const defaultStats: StatItem[] = [
  {
    id: "stat-1",
    value: "3.2s",
    label: "Average page load time",
    change: {
      value: 60,
      isPositive: true,
    },
    footnote: "60% faster than industry average",
    categoryId: "performance",
  },
  {
    id: "stat-2",
    value: "99.99%",
    label: "Uptime guarantee",
    footnote: "Based on the last 12 months of service",
    categoryId: "performance",
  },
  {
    id: "stat-3",
    value: "250%",
    label: "Average ROI",
    change: {
      value: 30,
      isPositive: true,
    },
    footnote: "For customers using our platform for 6+ months",
    categoryId: "growth",
  },
  {
    id: "stat-4",
    value: "10M+",
    label: "Active users",
    change: {
      value: 42,
      isPositive: true,
    },
    footnote: "Growing by 150,000 new users monthly",
    categoryId: "growth",
  },
  {
    id: "stat-5",
    value: "190+",
    label: "Countries served",
    footnote: "With localized support in 42 languages",
    categoryId: "global",
  },
  {
    id: "stat-6",
    value: "24/7",
    label: "Global support",
    footnote: "Average response time under 15 minutes",
    categoryId: "global",
  },
  {
    id: "stat-7",
    value: "SOC 2",
    label: "Compliance certified",
    footnote: "Plus GDPR, HIPAA, and ISO 27001",
    categoryId: "security",
  },
  {
    id: "stat-8",
    value: "0",
    label: "Data breaches",
    footnote: "Strong security record since our founding",
    categoryId: "security",
  },
];

const Stats3 = ({
  heading = "Our impact by the numbers",
  subheading = "PROVEN RESULTS",
  description = "We're committed to transparency and measurable outcomes. Here's how our platform is making a difference for thousands of businesses worldwide:",
  categories = defaultCategories,
  stats = defaultStats,
  link = {
    text: "Explore detailed case studies",
    url: "https://www.example.com/case-studies",
  },
  showLiveCounter = true,
  backgroundStyle = "gradient",
}: Stats3Props) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [expandedMobile, setExpandedMobile] = useState(false);
  const [liveCount, setLiveCount] = useState(10482756);

  // Increment live counter
  useEffect(() => {
    if (!showLiveCounter) return;

    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [showLiveCounter]);

  const formatLiveCount = (count: number) => {
    return new Intl.NumberFormat().format(count);
  };

  const filteredStats = stats.filter(
    (stat) => stat.categoryId === activeCategory
  );

  const backgroundClasses = {
    gradient:
      "bg-gradient-to-b from-background to-background/80 via-background/90",
    pattern: "bg-[url('/stats-pattern.svg')] bg-fixed bg-opacity-10",
    minimal: "bg-background",
  };

  return (
    <section
      className={cn(
        "py-20 md:py-32 relative overflow-hidden",
        backgroundClasses[backgroundStyle]
      )}
    >
      {backgroundStyle === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-50" />
      )}

      <div className="container mx-auto relative z-10 px-4 md:px-6">
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

        {/* Live counter */}
        {showLiveCounter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col items-center"
          >
            <div className="bg-card border shadow-sm rounded-lg px-6 py-3 flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium">Live data:</span>
              <span className="text-lg font-bold font-mono tabular-nums">
                {formatLiveCount(liveCount)}
              </span>
              <span className="text-sm text-muted-foreground">
                total platform interactions
              </span>
            </div>
          </motion.div>
        )}

        {/* Desktop tabs */}
        <div className="hidden md:block">
          <Tabs
            defaultValue={categories[0].id}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 py-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <div className="text-center mb-8">
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats
                    .filter((stat) => stat.categoryId === category.id)
                    .map((stat) => (
                      <StatCard key={stat.id} stat={stat} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden">
          <div className="flex justify-between items-center p-4 bg-card rounded-lg shadow-sm mb-4">
            <div className="flex items-center gap-2">
              {(() => {
                const activeIcon = categories.find(
                  (c) => c.id === activeCategory
                )?.icon;
                const Icon = activeIcon || BarChart3;
                return <Icon className="h-5 w-5 text-primary" />;
              })()}
              <span className="font-medium">
                {categories.find((c) => c.id === activeCategory)?.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedMobile(!expandedMobile)}
            >
              {expandedMobile ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {expandedMobile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-6"
              >
                <div className="grid grid-cols-1 gap-2 p-2 bg-muted/50 rounded-lg">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={cn(
                        "flex items-center gap-2 p-2 text-left rounded",
                        activeCategory === category.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setExpandedMobile(false);
                      }}
                    >
                      {React.createElement(category.icon, {
                        className: "h-4 w-4",
                      })}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {filteredStats.map((stat) => (
              <StatCard key={stat.id} stat={stat} isMobile />
            ))}
          </div>
        </div>

        {link && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <Button
              className="gap-2"
              onClick={() => window.open(link.url, "_blank")}
            >
              {link.text}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Stat Card Component
const StatCard = ({
  stat,
  isMobile = false,
}: {
  stat: StatItem;
  isMobile?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "bg-card border rounded-xl p-6 shadow-sm transition-all duration-300",
        isMobile ? "flex items-center justify-between" : "flex flex-col"
      )}
    >
      <div className={isMobile ? "flex-1" : ""}>
        <div
          className={cn("text-4xl font-bold", isMobile ? "text-2xl" : "mb-2")}
        >
          {stat.value}
        </div>
        <p className={cn("font-medium", isMobile ? "text-sm" : "text-lg")}>
          {stat.label}
        </p>
        {stat.footnote && !isMobile && (
          <p className="text-xs text-muted-foreground mt-2">{stat.footnote}</p>
        )}
      </div>

      {stat.change && (
        <div
          className={cn("flex items-center gap-1", isMobile ? "ml-2" : "mt-4")}
        >
          {stat.change.isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              stat.change.isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {stat.change.value}%
          </span>
        </div>
      )}

      {stat.footnote && isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-2 cursor-help">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{stat.footnote}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.div>
  );
};

export default Stats3;
