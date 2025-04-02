"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const testimonials = [
  {
    quote:
      "This design system has completely transformed how we build products. The components are beautiful, consistent, and the animations add just the right amount of delight.",
    author: "Sarah Johnson",
    role: "Product Designer at Figment",
    avatar: "SJ",
  },
  {
    quote:
      "As a developer, I appreciate how well-structured and thoughtfully built this system is. It's made our development process significantly faster and more enjoyable.",
    author: "Michael Chen",
    role: "Lead Engineer at Codewave",
    avatar: "MC",
  },
  {
    quote:
      "The attention to detail in this design system is remarkable. From the subtle animations to the responsive behavior, everything just works beautifully together.",
    author: "Elena Rodriguez",
    role: "UX Director at Interfacelab",
    avatar: "ER",
  },
  {
    quote:
      "Our conversion rates increased by 38% after implementing this design system. The intuitive interfaces and smooth interactions have significantly improved user engagement.",
    author: "Thomas Wright",
    role: "CEO at ConvertFlow",
    avatar: "TW",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-background py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Hear from the designers and developers who have transformed their
              workflow with our design system
            </p>
          </motion.div>

          <div className="relative h-[300px] w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: -15 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="absolute inset-0"
              >
                <Card className="h-full border-0 bg-card/50 shadow-md">
                  <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <QuoteIcon className="mb-6 h-12 w-12 text-primary/40" />
                    <p className="mb-6 text-xl md:text-2xl italic leading-relaxed">
                      "{testimonials[currentIndex].quote}"
                    </p>
                    <div className="mt-auto flex flex-col items-center">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonials[currentIndex].avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="mt-4">
                        <h4 className="font-medium">
                          {testimonials[currentIndex].author}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-4" : "bg-primary/30"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
