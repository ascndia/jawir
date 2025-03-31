"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/registry/components/carousel";

import {
  Book,
  Coffee,
  Gamepad2,
  Leaf,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import { Card, CardContent } from "@/registry/components/card";
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


const CategoriesCarousel2 = () => {
  return (
    <section className="w-full py-12 px-4 bg-background">
      <div className="container mx-auto">
        <div className="mb-8 text-start">
          <motion.h2
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore More Categories
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover a variety of categories to suit your interests and needs.
          </motion.p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4 p-1">
            {categories.map((category, index) => (
              <CarouselItem key={category.name} className="pl-4 md:basis-1/3 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg"
                >
                  <Card className="h-full border overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center text-center">
                      <div className={`rounded-full p-2.5 ${category.color}`}>
                        <category.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h1 className="text-xl font-medium">{category.name}</h1>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end mt-4 space-x-2">
            <CarouselPrevious className="relative -left-0 top-0 translate-y-0" />
            <CarouselNext className="relative -right-0 top-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CategoriesCarousel2;