"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import Image from "next/image";

interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image: string;
}

interface FeaturesXProps {
  title?: string;
  description?: string;
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "Seamless Integration",
    description:
      "Connect with your favorite tools and platforms without any hassle",
    icon: <Check className="h-5 w-5 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain valuable insights with comprehensive data analysis tools",
    icon: <Check className="h-5 w-5 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    title: "Secure Infrastructure",
    description: "Enterprise-grade security to protect your data and privacy",
    icon: <Check className="h-5 w-5 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks and workflows to save time",
    icon: <Check className="h-5 w-5 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Scalable Architecture",
    description: "Easily scale your application as your business grows",
    icon: <Check className="h-5 w-5 text-primary" />,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
];

const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  imageAnim: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
};

export function FeaturesX({
  title = "Powerful Features For Your Business",
  description = "Our platform provides a comprehensive set of tools designed to enhance your workflow and boost productivity.",
  features = defaultFeatures,
}: FeaturesXProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>(`item-0`);

  const handleValueChange = (value: string) => {
    // If selecting an empty value, keep the previous selection
    if (value === "") return;
    setSelectedFeature(value);
  };

  // Safely get the current feature index
  const currentFeatureIndex = selectedFeature
    ? parseInt(selectedFeature.split("-")[1])
    : 0;

  // Safely get the current image
  const currentImage =
    features[currentFeatureIndex]?.image || features[0].image;

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationConfig.imageAnim}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={features[currentFeatureIndex].title}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationConfig.container}
            className="flex flex-col"
          >
            <div className="mb-10">
              <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <Accordion
              type="single"
              defaultValue="item-0"
              className="w-full"
              value={selectedFeature}
              onValueChange={handleValueChange}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={animationConfig.item}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="flex items-center">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesXReverse({
  title = "Powerful Features For Your Business",
  description = "Our platform provides a comprehensive set of tools designed to enhance your workflow and boost productivity.",
  features = defaultFeatures,
}: FeaturesXProps) {
  const [selectedFeature, setSelectedFeature] = useState<string>(`item-0`);

  const handleValueChange = (value: string) => {
    // If selecting an empty value, keep the previous selection
    if (value === "") return;
    setSelectedFeature(value);
  };

  // Safely get the current feature index
  const currentFeatureIndex = selectedFeature
    ? parseInt(selectedFeature.split("-")[1])
    : 0;

  // Safely get the current image
  const currentImage =
    features[currentFeatureIndex]?.image || features[0].image;

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationConfig.container}
            className="order-2 lg:order-1 flex flex-col"
          >
            <div className="mb-10">
              <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <Accordion
              type="single"
              defaultValue="item-0"
              className="w-full"
              value={selectedFeature}
              onValueChange={handleValueChange}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={animationConfig.item}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="flex items-center">
                      <div className="flex items-center gap-3">
                        {feature.icon}
                        <span>{feature.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animationConfig.imageAnim}
            className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full order-1 lg:order-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={features[currentFeatureIndex].title}
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const FeaturesXComponent = { FeaturesX, FeaturesXReverse };
export default FeaturesXComponent;
