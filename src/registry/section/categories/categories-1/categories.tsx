"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/registry/components/card";
import {
  Book,
  Coffee,
  Gamepad2,
  Leaf,
  ShoppingBag,
  Utensils,
  Palette,
  Music,
  Film,
  Shirt,
  Plane,
  Home,
} from "lucide-react";

const categories = [
  {
    icon: Gamepad2,
    name: "Gaming",
    count: 245,
    color: "bg-primary/10 text-primary",
  },
  {
    icon: ShoppingBag,
    name: "Shopping",
    count: 189,
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    icon: Leaf,
    name: "Health & Wellness",
    count: 167,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Utensils,
    name: "Food & Dining",
    count: 203,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Book,
    name: "Education",
    count: 156,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Coffee,
    name: "Lifestyle",
    count: 134,
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    icon: Palette,
    name: "Art & Design",
    count: 112,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    icon: Music,
    name: "Music",
    count: 178,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Film,
    name: "Entertainment",
    count: 225,
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Shirt,
    name: "Fashion",
    count: 136,
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: Plane,
    name: "Travel",
    count: 157,
    color: "bg-sky-500/10 text-sky-500",
  },
  {
    icon: Home,
    name: "Home & Living",
    count: 129,
    color: "bg-orange-500/10 text-orange-500",
  },
];

const Categories1 = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Categories
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our wide range of categories to find exactly what you're
            looking for
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className={`rounded-full p-3 ${category.color} mb-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.count} items
                  </p>
                  <div className="mt-auto pt-4">
                    <motion.button
                      className="text-sm font-medium text-primary hover:underline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Browse {category.name}
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories1;
