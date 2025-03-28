"use client";

import React, { useState } from "react";
import { Button } from "@/registry/components/button/select";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

interface CTAProps {
  heading?: string;
  description?: string;
  features?: string[];
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
}

const CTA = ({
  heading = "Take your project to the next level",
  description = "Our platform provides everything you need to build beautiful, modern interfaces that stand out from the competition.",
  features = [
    "Fully customizable components",
    "Responsive design out of the box",
    "Seamless integration with your workflow",
  ],
  buttons = {
    primary: {
      text: "Get Started",
      url: "#",
    },
    secondary: {
      text: "View Demo",
      url: "#",
    },
  },
  image = {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    alt: "Team collaborating on a project",
  },
}: CTAProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-primary/90 to-secondary/90 p-8 md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {heading}
                </h2>
                <p className="text-lg text-white/90 max-w-md">{description}</p>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 rounded-full bg-white/20 p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    size="lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {buttons?.primary?.text}
                    <ArrowRight
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </Button>
                  <Button size="lg">{buttons?.secondary?.text}</Button>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
