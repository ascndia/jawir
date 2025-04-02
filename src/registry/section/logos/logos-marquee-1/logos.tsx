"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/marquee/marquee-shadcn/marquee";
import { Card } from "@/components/ui/card";

interface LogoType {
  name: string;
  logo: string;
  className?: string;
}

interface LogosMarquee1Props {
  title?: string;
  subtitle?: string;
  rows?: number;
  logos?: LogoType[];
  className?: string;
}

const defaultLogos: LogoType[] = [
  {
    name: "Vercel",
    logo: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
    className: "h-7 w-auto",
  },
  {
    name: "Tailwind",
    logo: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Supabase",
    logo: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
    className: "h-6 w-auto",
  },
  {
    name: "Figma",
    logo: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
    className: "h-5 w-auto",
  },
  {
    name: "Astro",
    logo: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
    className: "h-6 w-auto",
  },
  {
    name: "Next.js",
    logo: "https://shadcnblocks.com/images/block/logos/nextjs-wordmark.svg",
    className: "h-6 w-auto",
  },
  {
    name: "React",
    logo: "https://shadcnblocks.com/images/block/logos/react-wordmark.svg",
    className: "h-6 w-auto",
  },
];

export const LogosMarquee1A = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  rows = 3,
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  const rowSpeeds = [
    { duration: "40s", repeat: 4 },
    { duration: "30s", repeat: 5 },
    { duration: "50s", repeat: 3 },
  ];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container mx-auto mb-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-8">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const speed = rowSpeeds[rowIndex % rowSpeeds.length];

          return (
            <div key={rowIndex} className="relative">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-background to-transparent z-10" />

              <Marquee
                reverse={!isEven}
                pauseOnHover
                // className={`[--duration:${speed.duration}]`}
                // repeat={speed.repeat}
              >
                {logos.map((logo, logoIndex) => (
                  <div
                    key={`${rowIndex}-${logoIndex}`}
                    className="flex items-center justify-center mx-8 h-12"
                  >
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={120}
                      height={48}
                      className={cn(
                        "opacity-70 hover:opacity-100 transition-opacity",
                        logo.className
                      )}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const LogosMarquee1B = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  rows = 4,
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  const rowSpeeds = [
    { duration: "40s", repeat: 4 },
    { duration: "30s", repeat: 5 },
    { duration: "40s", repeat: 5 },
    { duration: "50s", repeat: 3 },
  ];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container mx-auto mb-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="space-y-0">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const speed = rowSpeeds[rowIndex % rowSpeeds.length];

          return (
            <div key={rowIndex} className="relative">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-background to-transparent z-10" />

              <Marquee
                reverse={!isEven}
                pauseOnHover
                // className={`[--duration:${speed.duration}]`}
                // repeat={speed.repeat}
              >
                {logos.map((logo, logoIndex) => (
                  <Card
                    key={`${rowIndex}-${logoIndex}`}
                    className="flex items-center px-6 py-4 rounded-full"
                  >
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={120}
                      height={48}
                      className={cn(
                        "opacity-70 hover:opacity-100 transition-opacity",
                        logo.className
                      )}
                    />
                  </Card>
                ))}
              </Marquee>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const LogosMarquee1C = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  logos = defaultLogos,
  rows = 3,
  className,
}: LogosMarquee1Props) => {
  const rowSpeeds = [
    { duration: "40s", repeat: 4 },
    { duration: "30s", repeat: 5 },
    { duration: "40s", repeat: 5 },
    { duration: "50s", repeat: 3 },
  ];
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/3 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
            <div className="border-l-4 border-primary pl-4 py-2">
              <p className="text-muted-foreground italic">
                "These partnerships have helped us build a platform that scales
                with enterprise needs while maintaining the highest standards of
                performance."
              </p>
            </div>
            <ul className="space-y-2">
              {[
                "Trusted by Fortune 500 companies",
                "Supporting millions of users worldwide",
                "Enterprise-grade reliability and security",
                "World-class technical support",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <Card className="relative w-full lg:w-2/3 py-12 overflow-hidden rounded-3xl">
            {Array.from({ length: rows }).map((_, rowIndex) => {
              const isEven = rowIndex % 2 === 0;
              const speed = rowSpeeds[rowIndex % rowSpeeds.length];

              return (
                <div key={rowIndex} className="relative">
                  {/* Gradient overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-background to-transparent z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-background to-transparent z-10" />

                  <Marquee
                    reverse={!isEven}
                    pauseOnHover
                    // className={`[--duration:${speed.duration}]`}
                    // repeat={speed.repeat}
                  >
                    {logos.map((logo, logoIndex) => (
                      <Card
                        key={`${rowIndex}-${logoIndex}`}
                        className="flex items-center px-6 py-4 rounded"
                      >
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={120}
                          height={48}
                          className={cn(
                            "opacity-70 hover:opacity-100 transition-opacity",
                            logo.className
                          )}
                        />
                      </Card>
                    ))}
                  </Marquee>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </section>
  );
};

export const LogosMarquee1D = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  rows = 4,
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  const rowSpeeds = [
    { duration: "40s", repeat: 4 },
    { duration: "30s", repeat: 5 },
    { duration: "40s", repeat: 5 },
    { duration: "50s", repeat: 3 },
  ];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container mx-auto mb-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <Card className="relative mx-auto container py-12 overflow-hidden rounded-3xl ">
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const isEven = rowIndex % 2 === 0;
          const speed = rowSpeeds[rowIndex % rowSpeeds.length];

          return (
            <div key={rowIndex} className="relative">
              {/* Gradient overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-background to-transparent z-10" />

              <Marquee
                reverse={!isEven}
                pauseOnHover
                // className={`[--duration:${speed.duration}]`}
                // repeat={speed.repeat}
              >
                {logos.map((logo, logoIndex) => (
                  <Card
                    key={`${rowIndex}-${logoIndex}`}
                    className="flex items-center px-6 py-4 rounded"
                  >
                    <Image
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      width={120}
                      height={48}
                      className={cn(
                        "opacity-70 hover:opacity-100 transition-opacity",
                        logo.className
                      )}
                    />
                  </Card>
                ))}
              </Marquee>
            </div>
          );
        })}
      </Card>
    </section>
  );
};

export const LogosMarquee1E = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  return (
    <section className={cn("py-16 bg-primary/20", className)}>
      <div className="container mx-auto">
        <Marquee>
          {logos.map((logo, logoIndex) => (
            <div
              key={`${logoIndex}`}
              className="flex items-center justify-center mx-8 h-12"
            >
              <Image
                src={logo.logo}
                alt={`${logo.name} logo`}
                width={120}
                height={64}
                className={cn(logo.className)}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export const LogosMarquee1F = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-5xl h-[60vh] max-h-[500px] relative perspective-[1000px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full transform-style-3d animate-[spin_30s_linear_infinite]">
                {logos.map((logo, index) => {
                  const angle = index * (360 / logos.length);
                  const radius = 40; // % of container

                  return (
                    <div
                      key={index}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-24 flex items-center justify-center"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(${radius}vh)`,
                      }}
                    >
                      <Card className="w-full h-full flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg">
                        <Image
                          src={logo.logo}
                          alt={`${logo.name} logo`}
                          width={120}
                          height={48}
                          className={cn(
                            "opacity-80 transition-opacity",
                            logo.className
                          )}
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {logos.map((logo, index) => (
              <div key={index} className="h-12 flex items-center">
                <Image
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={40}
                  className={cn(
                    "opacity-50 hover:opacity-100 transition-opacity",
                    logo.className
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* <div className="relative px-6 py-16 text-center sm:px-12 md:py-24 lg:px-24">
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
</div> */
}
