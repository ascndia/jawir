"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Github, Twitter } from "lucide-react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: translateY, opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-background" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNwYXJrbGVzIj48cGF0aCBkPSJtMTIgM-KAjTEyIDEwbS0zLjA0LTYuOTTigI0xNC4zOCA3Ljk2bS01LjM0IDIuMDTigI0xNi43MiA4LjAybS01LjM0IDUuOTTigI0xNC4zOCAxNC4wNW0tNi4wNCAxLjk14oCNMTUuOTYgMTYuOTRtLTUuMzYgMi45M-KAjTEyIDE4Ii8+PC9zdmc+')] bg-center opacity-20" />
        </div>
      </motion.div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-[800px] space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl/tight">
              Ready to transform your digital experience?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Join thousands of designers and developers who have already
              started creating beautiful interfaces with our design system.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Button
              size="lg"
              className="group bg-primary text-primary-foreground"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group">
              View Documentation
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <div className="text-muted-foreground">
                Trusted by innovative companies
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex h-8 items-center text-muted-foreground/70"
                  >
                    <span className="text-xl font-semibold">Company {i}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="text-center text-sm text-muted-foreground">
                Follow us on social media for news and updates
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
