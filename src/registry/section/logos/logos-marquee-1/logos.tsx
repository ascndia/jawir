"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Marquee from "@/registry/components/marquee/marquee-shadcn/marquee";

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

const LogosMarquee1 = ({
  title = "Trusted by these companies",
  subtitle = "Used by the world's leading companies",
  rows = 3,
  logos = defaultLogos,
  className,
}: LogosMarquee1Props) => {
  // Create arrays for each row with different speeds
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

export default LogosMarquee1;
