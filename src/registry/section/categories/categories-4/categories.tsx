"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/registry/components/card";
import { Button } from "@/registry/components/button";
import { ArrowRightIcon } from "lucide-react";
import {
  Book,
  Coffee,
  Gamepad2,
  Leaf,
  ShoppingBag,
  Utensils,
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
];

const Categories4 = () => {
  return (
    <section className="w-full py-12 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Popular Categories
            </h2>
            <p className="text-muted-foreground mt-1">
              Explore the most trending categories
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 gap-2" variant="outline">
            More Categories
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full border overflow-hidden">
                <CardContent className="p-5 flex items-center">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories4;
