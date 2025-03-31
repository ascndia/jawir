"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/registry/components/card";
import { ChevronRight, Heart } from "lucide-react";
import {
  Calculator,
  Calendar,
  BarChart3,
  Scale,
  Timer,
  Ruler,
  Clock,
  Percent,
} from "lucide-react";

const tools = [
  {
    icon: Scale,
    name: "Body Composition Calculator",
    description:
      "Calculate body fat percentage and lean muscle mass to track fitness progress.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Calculator,
    name: "BMI Calculator",
    description:
      "Determine your body mass index based on height and weight measurements.",
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: BarChart3,
    name: "Calorie Counter",
    description:
      "Track daily calorie intake and nutritional breakdown for diet management.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Timer,
    name: "Workout Timer",
    description:
      "Customizable interval timer for tracking rest periods and exercise routines.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Calendar,
    name: "Meal Planner",
    description:
      "Plan weekly meals with nutritional information and grocery lists.",
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    icon: Ruler,
    name: "Body Measurement Tracker",
    description: "Record and visualize changes in body measurements over time.",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Clock,
    name: "Sleep Calculator",
    description:
      "Determine optimal bedtime based on sleep cycles and wake-up time.",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Percent,
    name: "One-Rep Max Calculator",
    description: "Calculate your one-rep max for various strength exercises.",
    color: "bg-primary/10 text-primary",
  },
];

const Categories8 = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover tools
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Powerful calculators and trackers to help you reach your fitness
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex gap-4 items-center mb-4">
                    <div className={`rounded-xl p-3 ${tool.color}`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <motion.div
            key="more-categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 7 * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-primary/20">
              <CardContent className="flex p-8 flex-col items-center text-center h-full justify-center">
                <h3 className="font-semibold text-lg mb-4">More Tools</h3>
                <div className="rounded-full p-3 bg-primary/10 text-primary">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Categories8;
