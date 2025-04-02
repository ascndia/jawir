"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const benefits = [
    "30-day free trial",
    "No credit card required",
    "Cancel anytime",
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

      <div className="container mx-auto relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Design <span className="text-primary">Beautiful</span> Experiences
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-full h-[0.58em] w-full fill-primary/40"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative ml-2">Fast & Easy</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            A complete UI toolkit that empowers designers and developers to
            create stunning interfaces with minimal effort. From prototypes to
            production, we've got you covered.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="group w-full sm:w-auto">
              <span>Get started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View components
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 flex items-center justify-center gap-x-6"
          >
            <ul className="flex flex-wrap items-center justify-center gap-3 gap-y-2">
              {benefits.map((benefit, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-x-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mx-auto mt-16 max-w-6xl px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-2 shadow-2xl">
          <div className="rounded-md bg-black/80 shadow-sm">
            <div className="flex h-8 items-center border-b border-white/10 px-4">
              <div className="flex space-x-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-20 text-center">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 shadow-md"
                    >
                      <div className="mb-3 h-3 w-10 rounded-full bg-primary/30"></div>
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-white/10"></div>
                        <div className="h-2 w-4/5 rounded-full bg-white/10"></div>
                        <div className="h-2 w-2/3 rounded-full bg-white/10"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
