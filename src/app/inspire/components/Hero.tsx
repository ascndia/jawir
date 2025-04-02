"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-32">
      <div className="absolute inset-0 -z-10 opacity-30">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="20"
                cy="20"
                r="1"
                fill="currentColor"
                className="text-primary/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-primary text-primary-foreground">
              <Star className="mr-1 h-3 w-3" />
              <span>Introducing Inspire</span>
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Design that inspires.
            </span>{" "}
            <br className="hidden sm:inline" />
            Experiences that convert.
          </motion.h1>

          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Elevate your digital presence with our cutting-edge design system.
            Beautiful components, seamless animations, and intuitive interfaces.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 w-full max-w-4xl rounded-3xl border bg-card p-2 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 to-primary/30">
              <motion.div
                className="h-full w-full bg-[url('/placeholder-dashboard.png')] bg-cover bg-center"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
