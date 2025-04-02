"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-20"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/20"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  The productivity platform for high-performing teams
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.2]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Transform how your team
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {" "}
                  works together
                </span>
              </motion.h1>

              <motion.p
                className="max-w-[600px] text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                FlowSpace helps teams organize work, manage projects, and
                achieve milestones with an intuitive, powerful platform designed
                for modern collaboration.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground"
              >
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Book a demo
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-sm">
                Trusted by 10,000+ companies worldwide
              </div>
              <div className="flex flex-wrap items-center gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="text-muted-foreground">
                    <span className="font-semibold">Company {i + 1}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <div className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-xl border bg-card shadow-xl">
              <div className="h-6 border-b bg-muted/40 px-4 py-1">
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 rounded-full bg-destructive/50"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500/50"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="grid grid-cols-6 grid-rows-5 gap-2 p-4">
                  {/* Simulating app UI elements */}
                  <div className="col-span-4 row-span-1 rounded bg-primary/20 p-2"></div>
                  <div className="col-span-2 row-span-1 rounded bg-primary/10 p-2"></div>
                  <div className="col-span-1 row-span-3 rounded bg-primary/15 p-2"></div>
                  <div className="col-span-5 row-span-3 rounded bg-card p-2 shadow-sm">
                    <div className="mb-2 h-3 w-1/2 rounded bg-muted"></div>
                    <div className="mb-4 h-3 w-3/4 rounded bg-muted"></div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="rounded bg-muted p-2">
                          <div className="h-10 rounded-sm bg-background"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-6 row-span-1 rounded bg-primary/10 p-2"></div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 -z-10 h-full w-full rounded-xl border bg-card/50"></div>
            <div className="absolute -right-8 -bottom-8 -z-20 h-full w-full rounded-xl border bg-card/30"></div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {[
            "No credit card required",
            "14-day free trial",
            "Cancel anytime",
            "24/7 support",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
