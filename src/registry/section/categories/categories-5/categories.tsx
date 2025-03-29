"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/registry/components/card";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { Book, ShoppingBag, Leaf, Gamepad2, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    icon: ShoppingBag,
    name: "Shopping",
    count: 428,
    color: "bg-indigo-500/10 text-indigo-500",
    subcategories: [
      { name: "Fashion", count: 182 },
      { name: "Electronics", count: 96 },
      { name: "Home Goods", count: 84 },
      { name: "Beauty", count: 66 },
    ],
  },
  {
    icon: Leaf,
    name: "Health & Wellness",
    count: 356,
    color: "bg-emerald-500/10 text-emerald-500",
    subcategories: [
      { name: "Fitness", count: 124 },
      { name: "Nutrition", count: 87 },
      { name: "Mental Health", count: 76 },
      { name: "Meditation", count: 69 },
    ],
  },
  {
    icon: Utensils,
    name: "Food & Dining",
    count: 312,
    color: "bg-amber-500/10 text-amber-500",
    subcategories: [
      { name: "Restaurants", count: 142 },
      { name: "Recipes", count: 98 },
      { name: "Cooking Tips", count: 72 },
    ],
  },
  {
    icon: Gamepad2,
    name: "Entertainment",
    count: 487,
    color: "bg-primary/10 text-primary",
    subcategories: [
      { name: "Gaming", count: 215 },
      { name: "Movies", count: 143 },
      { name: "Music", count: 129 },
    ],
  },
  {
    icon: Book,
    name: "Education",
    count: 276,
    color: "bg-blue-500/10 text-blue-500",
    subcategories: [
      { name: "Online Courses", count: 124 },
      { name: "Tutorials", count: 87 },
      { name: "Research", count: 65 },
    ],
  },
];

const Categories5 = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <section className="w-full py-12 px-6 ">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-medium mb-8 tracking-tight">Categories</h2>

        <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.name);

            return (
              <div key={category.name} className="overflow-hidden">
                <motion.div
                  layout
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Card
                    className={cn(
                      "border shadow overflow-hidden",
                      isExpanded && "pb-0"
                    )}
                  >
                    <CardContent
                      className={cn("pt-6 px-0", isExpanded && "pb-0")}
                      onClick={() => toggleCategory(category.name)}
                    >
                      <div
                        className={cn(
                          "flex items-center px-4 cursor-pointer",
                          isExpanded && "pb-4"
                        )}
                      >
                        <div
                          className={`rounded-full p-2 ${category.color} mr-4 flex-shrink-0`}
                        >
                          <category.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-medium text-sm">
                            {category.name}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {category.count} items
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {isExpanded ? (
                            <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t"
                          >
                            <div className="p-3 bg-muted/40">
                              <div className="flex flex-col gap-2">
                                {category.subcategories.map((subcategory) => (
                                  <motion.div
                                    key={subcategory.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-2 rounded-md hover:bg-muted transition-colors cursor-pointer"
                                  >
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">
                                        {subcategory.name}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {subcategory.count}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories5;
