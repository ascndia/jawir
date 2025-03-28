"use client";

import React from "react";
import { Button } from "@/registry/components/button/select";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface Hero8Props {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

const Hero8 = ({
  title = "Build beautiful experiences",
  subtitle = "That make a difference",
  description = "Create stunning interfaces with our modern component library. Designed for developers who value simplicity and performance.",
  ctaButton = {
    text: "Get Started",
    url: "#",
  },
  secondaryButton = {
    text: "Learn More",
    url: "#",
  },
  image = {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern workspace with computer",
  },
}: Hero8Props) => {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm md:text-base font-medium text-primary mb-3">
                {subtitle}
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                {title}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="group">
                {ctaButton.text}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                {secondaryButton.text}
              </Button>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background/5 mix-blend-overlay"></div>
          </div>
        </div>
      </div>

      {/* Abstract background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero8;
