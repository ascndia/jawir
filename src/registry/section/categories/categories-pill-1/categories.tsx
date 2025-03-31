"use client";

import { motion } from "framer-motion";
import { Button } from "@/registry/components/button";
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
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    icon: ShoppingBag,
    name: "Shopping",
    count: 189,
    color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  {
    icon: Leaf,
    name: "Health & Wellness",
    count: 167,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  {
    icon: Utensils,
    name: "Food & Dining",
    count: 203,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    icon: Book,
    name: "Education",
    count: 156,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    icon: Coffee,
    name: "Lifestyle",
    count: 134,
    color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  },
  {
    icon: Palette,
    name: "Art & Design",
    count: 112,
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    icon: Music,
    name: "Music",
    count: 178,
    color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  {
    icon: Film,
    name: "Entertainment",
    count: 225,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  {
    icon: Shirt,
    name: "Fashion",
    count: 136,
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
  {
    icon: Plane,
    name: "Travel",
    count: 157,
    color: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  },
  {
    icon: Home,
    name: "Home & Living",
    count: 129,
    color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
];

const CategoriesPill1 = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10">
          <motion.h2
            className="text-3xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Browse Categories
          </motion.h2>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our wide selection of categories
          </motion.p>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Button
                variant="outline"
                className={`px-4 py-2 h-auto rounded-full ${category.color} border flex items-center gap-2 hover:scale-105 transition-transform`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-background border">
                  {category.count}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPill1;
