"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Code, Box, Paintbrush, Rocket } from "lucide-react";

const steps = [
  {
    title: "Design",
    description:
      "Start with pre-built components and customize them to match your brand. No design skills required.",
    icon: Paintbrush,
    color: "bg-pink-500",
  },
  {
    title: "Develop",
    description:
      "Copy and paste code that's clean, accessible and easy to customize to your needs.",
    icon: Code,
    color: "bg-indigo-500",
  },
  {
    title: "Deploy",
    description:
      "Ship to production with confidence, knowing your UI is optimized for all devices.",
    icon: Box,
    color: "bg-amber-500",
  },
  {
    title: "Launch",
    description:
      "Get to market faster with reliable components that your users will love.",
    icon: Rocket,
    color: "bg-emerald-500",
  },
];

export default function Workflow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="workflow" className="bg-muted/30 py-16 md:py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            <span className="mr-1 text-primary">🔄</span> Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple workflow, amazing results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From design to deployment, our streamlined process ensures you can
            build beautiful interfaces without the complexity.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:block" />

          <div className="space-y-8 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:grid md:grid-cols-2 md:gap-8"
              >
                <div
                  className={`md:text-${
                    i % 2 === 0 ? "right" : "left"
                  } pb-10 md:pb-0`}
                >
                  <div
                    className={`flex flex-col ${
                      i % 2 === 0 ? "md:items-end" : ""
                    }`}
                  >
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-sm">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${step.color} text-white`}
                      >
                        <step.icon className="h-4 w-4" />
                      </span>
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-md text-muted-foreground ${
                        i % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:block" />

                {/* Connect line for desktop */}
                <div className="absolute left-1/2 top-0 hidden h-full w-8 -translate-x-1/2 md:block">
                  <div className="absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rotate-45 border border-border bg-background" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-16 flex max-w-md justify-center"
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 text-center shadow-lg">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/20" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-primary/10" />
            <h3 className="relative text-xl font-semibold text-foreground">
              Ready to get started?
            </h3>
            <p className="relative mt-2 text-muted-foreground">
              Join thousands of designers and developers using our UI toolkit.
            </p>
            <motion.div
              className="relative mt-6 flex justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
