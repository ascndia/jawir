"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign up for a free trial",
    description:
      "Get started with a 14-day free trial. No credit card required. Experience all features and see how FlowSpace can transform your team's workflow.",
    image: "/placeholder-dashboard.png",
  },
  {
    number: "02",
    title: "Set up your workspace",
    description:
      "Create your team workspace, invite team members, and customize your settings. Our intuitive onboarding will guide you through the process.",
    image: "/placeholder-dashboard.png",
  },
  {
    number: "03",
    title: "Import your projects",
    description:
      "Easily import existing projects or create new ones. Use our templates or start from scratch. Your data is migrated seamlessly.",
    image: "/placeholder-dashboard.png",
  },
  {
    number: "04",
    title: "Start collaborating",
    description:
      "Begin working with your team in real-time. Assign tasks, track progress, and communicate all in one place. Watch productivity soar.",
    image: "/placeholder-dashboard.png",
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <section className="w-full bg-background py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How FlowSpace works
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              Getting started is simple. Follow these steps to transform how
              your team works together.
            </p>
          </div>
        </motion.div>

        <div ref={containerRef} className="relative mt-16">
          <div className="absolute left-[calc(50%-1px)] top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 md:block" />

          <motion.div
            style={{
              opacity,
              scale,
            }}
            className="relative space-y-24 md:space-y-32"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative flex-1 text-center md:text-left">
                  <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {step.number}
                      <span className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-background">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </span>
                    </div>
                    <div className="hidden h-0.5 w-8 bg-primary md:block" />
                  </div>
                  <h3 className="text-2xl font-bold md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="flex w-full max-w-md flex-1 justify-center">
                  <div className="relative overflow-hidden rounded-xl border bg-card shadow-md">
                    <div className="aspect-video w-full overflow-hidden">
                      <div className="h-full w-full bg-[url('/placeholder-dashboard.png')] bg-cover bg-center">
                        <div className="flex h-full items-center justify-center bg-gradient-to-tr from-background/30 to-background/0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                            <span className="text-lg font-bold">
                              {step.number}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
