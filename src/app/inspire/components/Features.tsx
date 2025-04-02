"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Code,
  Layers,
  Paintbrush,
  Pencil,
  Smartphone,
  Sparkles,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: <Layers className="h-10 w-10 text-primary" />,
    title: "Responsive Components",
    description:
      "Beautifully designed components that work seamlessly across all devices and screen sizes.",
  },
  {
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    title: "Customizable Themes",
    description:
      "Easily adapt the design system to match your brand with our powerful theming capabilities.",
  },
  {
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Developer Friendly",
    description:
      "Clean, well-documented code that makes implementation a breeze for developers.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Mobile First",
    description:
      "Designed with mobile experiences in mind, ensuring your users have a great experience on any device.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Animated Interactions",
    description:
      "Subtle, purposeful animations that enhance the user experience without being distracting.",
  },
  {
    icon: <Pencil className="h-10 w-10 text-primary" />,
    title: "Design System",
    description:
      "A comprehensive design system with consistent patterns and components for rapid development.",
  },
];

export default function Features() {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="w-full bg-muted/30 py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Powerful Features for Modern Interfaces
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Our design system provides everything you need to create stunning,
              functional interfaces
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group h-full border-0 bg-card/50 shadow-sm transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 rounded-full bg-primary/10 p-2.5 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      {feature.title}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1, rotate: 45 }}
                        className="text-primary opacity-0 group-hover:opacity-100"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
