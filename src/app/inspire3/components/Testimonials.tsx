"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content:
      "This UI toolkit has transformed how I build interfaces. The components are beautiful, accessible, and so easy to customize.",
    author: {
      name: "Alex Rivera",
      role: "Senior Frontend Developer",
      avatar: "bg-gradient-to-br from-violet-500 to-purple-700",
      initials: "AR",
    },
    rating: 5,
  },
  {
    content:
      "I've tried several component libraries, but this one stands out. It's developer-friendly while maintaining a high standard of design.",
    author: {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "bg-gradient-to-br from-rose-500 to-red-700",
      initials: "SC",
    },
    rating: 5,
  },
  {
    content:
      "Our team shipped our product redesign in half the time thanks to these ready-to-use components. A game-changer for our workflow.",
    author: {
      name: "Marcus Johnson",
      role: "Product Manager",
      avatar: "bg-gradient-to-br from-cyan-500 to-blue-700",
      initials: "MJ",
    },
    rating: 5,
  },
  {
    content:
      "The animations are smooth, the design is modern, and the accessibility features are top-notch. This is now our go-to for all projects.",
    author: {
      name: "Emily Rodriguez",
      role: "Accessibility Specialist",
      avatar: "bg-gradient-to-br from-amber-500 to-orange-700",
      initials: "ER",
    },
    rating: 4,
  },
  {
    content:
      "I can focus on building features instead of tweaking CSS. The integration with my Next.js app was seamless.",
    author: {
      name: "Jordan Lee",
      role: "Fullstack Developer",
      avatar: "bg-gradient-to-br from-emerald-500 to-green-700",
      initials: "JL",
    },
    rating: 5,
  },
  {
    content:
      "My clients are always impressed with the polished look of my projects. This toolkit makes me look like a design expert.",
    author: {
      name: "Tasha Williams",
      role: "Freelance Developer",
      avatar: "bg-gradient-to-br from-pink-500 to-fuchsia-700",
      initials: "TW",
    },
    rating: 5,
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm"
    >
      <div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-5 w-5",
                i < testimonial.rating
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>
        <p className="mt-4 text-muted-foreground">{testimonial.content}</p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full text-white",
            testimonial.author.avatar
          )}
        >
          <span className="text-sm font-medium">
            {testimonial.author.initials}
          </span>
        </div>
        <div>
          <p className="font-medium text-foreground">
            {testimonial.author.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {testimonial.author.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="bg-muted/30 py-16 md:py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            <span className="mr-1 text-primary">💬</span> Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of satisfied developers and designers who have
            transformed their workflow with our UI toolkit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mx-auto mt-16 flex justify-center"
        >
          <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
            <span className="mr-1 font-medium text-foreground">4.9/5</span> from
            over 1,000 reviews
          </div>
        </motion.div>
      </div>
    </section>
  );
}
