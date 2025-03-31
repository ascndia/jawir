"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/registry/components/button";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All", count: 1245 },
  { name: "Design", count: 235 },
  { name: "Development", count: 189 },
  { name: "Photography", count: 167 },
  { name: "Marketing", count: 203 },
  { name: "Business", count: 156 },
  { name: "Lifestyle", count: 134 },
  { name: "Music", count: 112 },
  { name: "Writing", count: 98 },
  { name: "Education", count: 83 },
  { name: "Cooking", count: 75 },
  { name: "Health", count: 67 },
];

const CategoriesPill2 = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Categories
          </motion.h2>
          <motion.p
            className="text-sm text-muted-foreground mt-2 md:mt-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.length} categories available
          </motion.p>
        </div>

        <div className="overflow-x-auto pb-3 -mx-6 px-6">
          <div className="flex gap-2 min-w-max">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Button
                  variant={
                    activeCategory === category.name ? "default" : "outline"
                  }
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    "px-4 py-2 h-auto rounded-full border flex items-center gap-2 transition-all",
                    activeCategory === category.name
                      ? "shadow-sm"
                      : "hover:bg-muted/50"
                  )}
                >
                  <span>{category.name}</span>
                  <span
                    className={cn(
                      "ml-1 px-1.5 py-0.5 text-xs rounded-full",
                      activeCategory === category.name
                        ? "bg-primary-foreground text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {category.count}
                  </span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="p-10 border rounded-lg bg-muted/20 flex items-center justify-center">
            <p className="text-center text-muted-foreground">
              Content for{" "}
              <span className="font-medium text-foreground">
                {activeCategory}
              </span>{" "}
              category would be displayed here
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesPill2;
