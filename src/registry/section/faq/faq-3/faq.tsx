"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
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

interface Faq3Props {
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
        icon: <Lightbulb className="size-5 text-primary" />,
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
        icon: <Lightbulb className="size-5 text-primary" />,
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
        icon: <Lightbulb className="size-5 text-primary" />,
      },
    ],
  },
];

const Faq3 = ({
  heading = "Frequently Asked Questions",
  description = "Find answers to common questions about our products and services.",
  categories = defaultCategories,
}: Faq3Props) => {
  const [activeTab, setActiveTab] = useState(categories[0].title);

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
                className="space-y-6"
              >
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-border rounded-lg bg-background p-6"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {item.icon}
                      <h3 className="font-medium text-lg text-foreground">{item.question}</h3>
                    </div>
                    <div className="ml-8">
                      <p className="text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
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

export default Faq3;
