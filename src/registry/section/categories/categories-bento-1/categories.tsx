"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/registry/components/card";
import React from "react";
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
  ChevronRight,
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
    name: "Film",
    count: 178,
    color: "bg-cyan-500/10 text-cyan-500",
  },
];

const CategoriesBento1 = () => {
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
            Explore Categories
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our wide range of categories to find exactly what you're
            looking for
          </motion.p>
        </div>

        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-fr"
          style={{
            gridTemplateAreas: `
                 'a a b c'
                 'a a d e'
                 'f g h i'
               `,
          }}
        >
          {/* Feature Category - Gaming */}
          <motion.div
            style={{ gridArea: "a" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-primary/20">
              <CardContent className="flex flex-col h-full p-8 relative">
                <div className="absolute top-8 left-8">
                  <div className={`rounded-full p-4 ${categories[0].color}`}>
                    {React.createElement(categories[0].icon, {
                      className: "w-8 h-8",
                    })}
                  </div>
                </div>
                <div className="flex flex-col justify-end h-full pb-6 pt-16">
                  <h3 className="font-bold text-2xl mb-2">
                    {categories[0].name}
                  </h3>
                  <p className="text-muted-foreground">
                    {categories[0].count} items
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other categories with different layouts */}
          {[1, 2, 3, 4, 5, 6, 7].map((index) => {
            const category = categories[index];
            const gridArea = ["b", "c", "d", "e", "f", "g"][index - 1];
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                style={{ gridArea }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300">
                  <CardContent className="flex flex-col items-center text-center h-full justify-center p-4 md:p-6">
                    <div className={`rounded-full p-3 ${category.color} mb-3`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h3 className="font-semibold text-base md:text-lg">
                      {category.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* More Categories Item */}
          <motion.div
            style={{ gridArea: "i" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 8 * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="h-full"
          >
            <Card className="h-full overflow-hidden border hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-primary/5 to-primary/20">
              <CardContent className="flex flex-col items-center text-center h-full justify-center p-4 md:p-6">
                <h3 className="font-semibold text-base md:text-lg mb-3">
                  More Categories
                </h3>
                <div className="rounded-full p-3 bg-primary/10 text-primary">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesBento1;
