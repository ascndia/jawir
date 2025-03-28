"use client";
import { Button } from "@/registry/components/button/select";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureItem {
  text: string;
}

interface HeroImmersiveProps {
  backgroundImage?: string;
  overlayColor?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  features?: FeatureItem[];
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  alignment?: "center" | "left";
  textColor?: "light" | "dark";
  size?: "default" | "large";
  withAnimation?: boolean;
}

const HeroImmersive = ({
  backgroundImage = "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=3540&auto=format&fit=crop",
  overlayColor = "from-black/80 via-black/50 to-black/30",
  heading = "Transform Your Digital Experience",
  subheading = "NEXT GENERATION PLATFORM",
  description = "Our cutting-edge solution helps businesses streamline operations, enhance customer engagement, and drive sustainable growth in today's competitive landscape.",
  features = [
    { text: "Intuitive user interface" },
    { text: "Enterprise-grade security" },
    { text: "24/7 dedicated support" },
  ],
  primaryButton = {
    text: "Get Started",
    url: "#",
  },
  secondaryButton = {
    text: "Learn More",
    url: "#",
  },
  stats = [
    { value: "99%", label: "Customer satisfaction" },
    { value: "24/7", label: "Expert support" },
    { value: "100K+", label: "Active users" },
  ],
  alignment = "center",
  textColor = "light",
  size = "default",
  withAnimation = true,
}: HeroImmersiveProps) => {
  const textColorClass = textColor === "light" ? "text-white" : "text-gray-900";
  const textMutedClass =
    textColor === "light" ? "text-gray-300" : "text-gray-600";

  const contentClass = cn(
    "relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32",
    {
      "text-center": alignment === "center",
      "text-left": alignment === "left",
      "max-w-4xl mx-auto": alignment === "center",
    }
  );

  const headingClass = cn("font-bold tracking-tight", textColorClass, {
    "text-4xl md:text-5xl lg:text-6xl": size === "default",
    "text-5xl md:text-6xl lg:text-7xl": size === "large",
  });

  const MotionWrapper = withAnimation ? motion.div : "div";
  const motionProps = withAnimation
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <section className="relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayColor}`} />
        <img
          src={backgroundImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className={contentClass}>
        <MotionWrapper {...motionProps} className="flex flex-col gap-8">
          {/* Subheading */}
          {subheading && (
            <p
              className={`text-sm font-semibold tracking-wider ${
                textColor === "light" ? "text-primary-300" : "text-primary-600"
              }`}
            >
              {subheading}
            </p>
          )}

          {/* Main Heading */}
          <h1 className={headingClass}>{heading}</h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl ${textMutedClass} max-w-3xl ${
              alignment === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>

          {/* Feature List */}
          <div
            className={`flex flex-wrap gap-4 mt-2 ${
              alignment === "center" ? "justify-center" : "justify-start"
            }`}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2
                  className={`h-5 w-5 ${
                    textColor === "light"
                      ? "text-primary-300"
                      : "text-primary-600"
                  }`}
                />
                <span className={`text-sm font-medium ${textColorClass}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 mt-4 ${
              alignment === "center" ? "justify-center" : "justify-start"
            }`}
          >
            <Button size="lg" className="gap-2">
              {primaryButton.text}
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className={
                textColor === "light"
                  ? "bg-transparent border-white text-white hover:bg-white/10"
                  : ""
              }
            >
              {secondaryButton.text}
            </Button>
          </div>

          {/* Stats */}
          {stats && (
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ${textColorClass}`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    alignment === "center" ? "items-center" : "items-start"
                  }`}
                >
                  <span className="text-3xl md:text-4xl font-bold">
                    {stat.value}
                  </span>
                  <span className={`text-sm ${textMutedClass}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </MotionWrapper>
      </div>

      {/* Optional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent z-[1]"></div>
    </section>
  );
};

export default HeroImmersive;
