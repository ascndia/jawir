import { Button } from "@/registry/components/button/select";
import Image from "next/image";
import React from "react";

const Hero = () => (
  <section className="mb-32 border-b pt-32">
    <div className="container">
      <div className="relative pb-16">
        <div className="magicpattern absolute inset-x-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-100"></div>
        <div
          // href="#"
          className="mx-auto flex w-fit items-center gap-2 rounded-lg bg-secondary p-3 sm:rounded-full sm:py-1 sm:pl-1 sm:pr-3"
        >
          <div className="items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hidden sm:block">
            New Release
          </div>
          <p className="flex items-center gap-1 text-sm">
            Get started with our new product release today
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right mt-0.5 size-4 shrink-0"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </p>
        </div>
        <h1 className="mx-auto my-5 max-w-screen-lg text-balance text-center text-3xl md:text-5xl">
          Smart home automation and security system for you
        </h1>
        <p className="mx-auto max-w-screen-md text-center text-sm text-muted-foreground md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia possimus
          fugit ab cumque consequuntur pariatur provident? Nulla consequuntur
          nisi eum!
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg">
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right ml-2 size-4"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </Button>
          <Button size="lg" variant="outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play mr-2 size-4"
            >
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
            Watch Demo
          </Button>
        </div>
        <div className="mt-5 flex justify-center">
          <a
            href="#"
            className="flex items-center gap-1 border-b border-dashed text-sm hover:border-solid hover:border-primary"
          >
            Schedule a call
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right size-3.5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="rounded-t-lg border-x border-t px-1 pt-1">
        <Image
          src="/images/placeholder.jpg"
          alt="placeholder"
          width={1920}
          height={1080}
          className="max-h-80 w-full rounded-t-lg object-cover md:max-h-[430px]"
        />
      </div>
    </div>
  </section>
);

export default Hero;
