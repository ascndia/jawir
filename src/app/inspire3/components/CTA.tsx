"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-muted/30 py-16 md:py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-background via-background to-muted/60 shadow-xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-12 top-0 h-[150px] w-[300px] bg-primary/30 opacity-20 blur-[100px]"></div>
          <div className="absolute bottom-0 right-12 h-[150px] w-[300px] bg-primary/30 opacity-20 blur-[100px]"></div>

          <div className="relative px-6 py-16 text-center sm:px-12 md:py-24 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  Ready to transform your UI experience?
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Join thousands of designers and developers using our toolkit
                  to build beautiful, functional interfaces in record time.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <Button size="lg" className="group w-full sm:w-auto">
                  <span>Get started for free</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>Star on GitHub</span>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12"
              >
                <p className="flex items-center justify-center text-sm text-muted-foreground">
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <span>Cancel anytime</span>
                  <span className="mx-2">•</span>
                  <span>Free updates</span>
                </p>

                <div className="mt-8 flex items-center justify-center gap-8">
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>Documentation</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>Component library</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
