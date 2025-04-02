"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Layers,
  Palette,
  Wand2,
  Box,
  Smartphone,
  ZapIcon,
  PenTool,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    name: "Modular Components",
    description:
      "Build interfaces using composable, reusable components that are easy to customize.",
    icon: Layers,
  },
  {
    name: "Themeable Design",
    description:
      "Fully customizable with your brand colors and design tokens. Switch between light and dark mode effortlessly.",
    icon: Palette,
  },
  {
    name: "Advanced Animations",
    description:
      "Add life to your interfaces with smooth, performant animations that enhance user experience.",
    icon: Wand2,
  },
  {
    name: "Flexible Layouts",
    description:
      "Create responsive designs that work across all device sizes and screen types.",
    icon: Box,
  },
  {
    name: "Mobile Optimized",
    description:
      "Touch-friendly controls and interactions that are designed for mobile-first experiences.",
    icon: Smartphone,
  },
  {
    name: "Performance Focused",
    description:
      "Built with performance in mind, ensuring smooth experiences even on low-end devices.",
    icon: ZapIcon,
  },
  {
    name: "Design System Ready",
    description:
      "Consistent with modern design principles and ready to integrate with your design system.",
    icon: PenTool,
  },
  {
    name: "Accessibility Built-in",
    description:
      "Follows WCAG guidelines to ensure your interfaces are accessible to all users.",
    icon: ShieldCheck,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-border/80 hover:shadow-md"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <feature.icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-foreground">
        {feature.name}
      </h3>
      <p className="mt-2 text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="relative py-16 md:py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            <span className="mr-1 text-primary">✨</span> Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for modern UI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our UI toolkit provides all the components and utilities you need to
            create stunning interfaces that users will love.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
