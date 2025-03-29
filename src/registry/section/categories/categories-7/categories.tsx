"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/registry/components/card";
import { Button } from "@/registry/components/button";
import { ArrowRightIcon } from "lucide-react";

const categories = [
  {
    name: "Fashion",
    description: "Latest trends and styles",
    count: 245,
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Technology",
    description: "Gadgets and innovations",
    count: 189,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
  },
  {
    name: "Home & Living",
    description: "Interior design and decor",
    count: 167,
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Travel",
    description: "Destinations and adventures",
    count: 203,
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Food & Dining",
    description: "Recipes and restaurants",
    count: 156,
    image:
      "https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    name: "Fitness",
    description: "Workouts and wellness",
    count: 134,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80",
  },
];

const Categories7 = () => {
  return (
    <section className="w-full py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">
              Explore Categories
            </h2>
            <p className="text-muted-foreground max-w-md">
              Discover our curated collection of categories to find exactly what
              you're looking for
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 gap-2">
            View All Categories
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border shadow-sm h-full">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center"
                    whileHover={{ opacity: 1 }}
                  >
                    <Button variant="secondary" size="sm" className="gap-1">
                      Explore
                      <ArrowRightIcon className="w-3 h-3" />
                    </Button>
                  </motion.div>
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {category.count}
                    </div>
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

export default Categories7;
