"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  MinusCircle,
  MousePointerClick,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  BookOpen,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

interface FaqProps {
  heading?: string;
  description?: string;
  categories?: {
    title: string;
    items: FaqItem[];
    icon?: React.ReactNode;
  }[];
}

const defaultCategories = [
  {
    title: "General",
    icon: <HelpCircle className="size-4 mr-2" />,
    items: [
      {
        question: "What makes this product different?",
        answer:
          "Our product stands out with its intuitive design, powerful features, and seamless integration capabilities. We've focused on creating a solution that not only meets but anticipates your needs.",
        icon: <Lightbulb className="size-5 text-primary" />,
      },
      {
        question: "How do I get started?",
        answer:
          "Getting started is easy. Simply create an account, complete your profile, and follow our interactive onboarding guide. You'll be up and running in minutes with our step-by-step instructions.",
        icon: <MousePointerClick className="size-5 text-primary" />,
      },
    ],
  },
  {
    title: "Features",
    icon: <BookOpen className="size-4 mr-2" />,
    items: [
      {
        question: "What are the key features?",
        answer:
          "Our platform offers comprehensive analytics, customizable dashboards, seamless third-party integrations, automated reporting, and enterprise-grade security measures to protect your data.",
        icon: <Lightbulb className="size-5 text-primary" />,
      },
      {
        question: "Is there a mobile application?",
        answer:
          "Yes, we offer fully-featured mobile applications for both iOS and Android platforms. Our mobile apps are designed to provide the same powerful experience as our desktop version.",
        icon: <MousePointerClick className="size-5 text-primary" />,
      },
    ],
  },
  {
    title: "Support",
    icon: <HelpCircle className="size-4 mr-2" />,
    items: [
      {
        question: "How can I contact support?",
        answer:
          "Our support team is available 24/7 through live chat, email, and phone. We also offer an extensive knowledge base and community forum where you can find answers to common questions.",
        icon: <Lightbulb className="size-5 text-primary" />,
      },
      {
        question: "Do you offer training sessions?",
        answer:
          "Yes, we provide personalized training sessions, webinars, and documentation to help you make the most of our platform. Our customer success team can create a custom training plan for your team.",
        icon: <MousePointerClick className="size-5 text-primary" />,
      },
    ],
  },
];

const FaqAccordion6 = ({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our products and services.",
  categories = defaultCategories,
}: FaqProps) => {
  const [activeTab, setActiveTab] = useState(categories[0].title);
  const [expandedItems, setExpandedItems] = useState<
    Record<string, Set<number>>
  >({});

  const toggleItem = (category: string, index: number) => {
    setExpandedItems((prev) => {
      const newExpandedItems = { ...prev };

      if (!newExpandedItems[category]) {
        newExpandedItems[category] = new Set();
      }

      const categorySet = new Set(newExpandedItems[category]);
      if (categorySet.has(index)) {
        categorySet.delete(index);
      } else {
        categorySet.add(index);
      }

      newExpandedItems[category] = categorySet;
      return newExpandedItems;
    });
  };

  const isExpanded = (category: string, index: number) => {
    return expandedItems[category]?.has(index) || false;
  };

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

        <Tabs
          defaultValue={categories[0].title}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-12">
            <TabsList className="bg-background/80 backdrop-blur-sm">
              {categories.map((category, index) => (
                <TabsTrigger
                  key={index}
                  value={category.title}
                  className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <span className="flex items-center">
                    {category.icon}
                    {category.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category, categoryIndex) => (
            <TabsContent
              key={categoryIndex}
              value={category.title}
              className="mt-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "border border-border rounded-lg overflow-hidden bg-background",
                      isExpanded(category.title, index) && "ring-1 ring-primary"
                    )}
                  >
                    <div
                      className="flex items-center justify-between p-6 cursor-pointer"
                      onClick={() => toggleItem(category.title, index)}
                    >
                      <div className="flex items-start gap-3">
                        {item.icon}
                        <h3 className="font-medium text-lg">{item.question}</h3>
                      </div>
                      {isExpanded(category.title, index) ? (
                        <MinusCircle className="size-5 text-primary flex-shrink-0" />
                      ) : (
                        <PlusCircle className="size-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <AnimatePresence>
                      {isExpanded(category.title, index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-6 border-t border-border">
                            <p className="text-muted-foreground">
                              {item.answer}
                            </p>
                            <div className="mt-4 flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                              <span className="text-sm font-medium">
                                Learn more
                              </span>
                              <ArrowRight className="ml-2 size-4" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FaqAccordion6;
