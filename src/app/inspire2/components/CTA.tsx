"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-primary/10 py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full opacity-20"
        >
          <defs>
            <pattern
              id="dotPattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1"
                fill="currentColor"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to transform your team's workflow?
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl">
              Join thousands of teams who have already boosted their
              productivity with FlowSpace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group h-12 min-w-[180px] bg-primary text-primary-foreground"
            >
              Start your free trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 min-w-[180px]">
              Schedule a demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {[
              "14-day free trial",
              "No credit card required",
              "Cancel anytime",
              "Full feature access",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
            className="relative mx-auto mt-16 max-w-5xl"
          >
            <div className="overflow-hidden rounded-2xl border bg-card shadow-xl">
              <div className="aspect-[16/9]">
                <div className="flex h-full flex-col items-center justify-center p-8">
                  <div className="relative mb-8 text-center">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/30 to-primary blur-sm"></div>
                    <div className="relative rounded-lg bg-card px-6 py-3 font-semibold">
                      Join 10,000+ teams already using FlowSpace
                    </div>
                  </div>

                  <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center justify-center rounded-lg border bg-background p-4 text-center shadow-sm"
                      >
                        <div className="mb-2 h-12 w-12 rounded-full bg-primary/10"></div>
                        <div className="text-sm font-medium">
                          Company {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border bg-muted/50"></div>
            <div className="absolute -bottom-6 -right-6 -z-20 h-full w-full rounded-2xl border bg-muted/30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
