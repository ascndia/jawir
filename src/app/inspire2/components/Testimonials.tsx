"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  companyLogo?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Since implementing FlowSpace, our team's productivity has increased by 32%. The ability to see real-time updates across projects has eliminated communication bottlenecks and helped us deliver projects 20% faster.",
    author: "Sarah Johnson",
    role: "Director of Operations",
    company: "TechVision Inc",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "FlowSpace has completely transformed how our design and development teams collaborate. The intuitive interface and powerful automation features have reduced our admin work by 40%, giving us more time to focus on creating exceptional products.",
    author: "Michael Chen",
    role: "Head of Product",
    company: "Designly",
    avatar: "MC",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "As a remote team spread across 5 countries, FlowSpace has been a game-changer for us. The real-time collaboration features and seamless integrations with our existing tools have made our workflow incredibly smooth and efficient.",
    author: "Elena Rodriguez",
    role: "Engineering Manager",
    company: "GlobalTech",
    avatar: "ER",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "We evaluated several productivity platforms before choosing FlowSpace. It's not just the features that impressed us, but the incredible customer support and constant product improvements. Our team adopted the platform with minimal training.",
    author: "Thomas Wright",
    role: "CEO",
    company: "Startup Ventures",
    avatar: "TW",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) {
        nextTestimonial();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [dragging]);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!dragging) return;

    let currentX;
    if ("touches" in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = startX - currentX;
    if (diff > 50) {
      nextTestimonial();
      setDragging(false);
    } else if (diff < -50) {
      prevTestimonial();
      setDragging(false);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

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
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-6 w-6 fill-primary text-primary"
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Trusted by innovative teams worldwide
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              Hear from our customers about how FlowSpace has transformed their
              workflows and boosted productivity.
            </p>
          </div>
        </motion.div>

        <div
          className="relative mt-12 px-12"
          ref={containerRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-4xl"
              >
                <Card className="border-0 bg-muted/20 shadow-sm">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center gap-6 text-center">
                      <Quote className="h-12 w-12 text-primary/40" />
                      <p className="text-xl md:text-2xl leading-relaxed">
                        "{testimonials[activeIndex].quote}"
                      </p>
                      <div className="mt-6">
                        <Avatar className="h-16 w-16 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {testimonials[activeIndex].avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="mt-4">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            {Array.from({
                              length: testimonials[activeIndex].rating,
                            }).map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                          <h4 className="text-lg font-semibold">
                            {testimonials[activeIndex].author}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[activeIndex].role},{" "}
                            {testimonials[activeIndex].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 grid gap-8 rounded-xl border bg-card/50 p-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {[
            { label: "Customer satisfaction", value: "98%" },
            { label: "Average productivity increase", value: "32%" },
            { label: "Implementation time", value: "< 1 week" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold">{stat.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-lg border bg-muted/30 p-6 md:p-8"
        >
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold md:text-2xl">
                Ready to see the results for yourself?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Join thousands of teams who have transformed their workflow with
                FlowSpace.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <Button className="w-full md:w-auto bg-primary text-primary-foreground">
                Start free trial
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
