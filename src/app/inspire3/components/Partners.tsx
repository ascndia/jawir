"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Mock company logos using CSS and SVG
const companies = [
  {
    name: "Acme Inc",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Globex",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 12C22 6.48 17.52 2 12 2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Soylent Corp",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Initech",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 8V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 12H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Umbrella",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 2V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 18V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 12L18 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 12L2 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Massive Dynamic",
    logo: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M2 12H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 2V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17 3.33782C15.5294 5.55089 14 8.55089 14 12C14 15.4491 15.5294 18.4491 17 20.6622"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 3.33782C8.47059 5.55089 10 8.55089 10 12C10 15.4491 8.47059 18.4491 7 20.6622"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto text-center"
        >
          <h2 className="text-xl font-medium text-foreground md:text-2xl">
            Trusted by companies worldwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the leading companies already using our UI toolkit
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <div className="grid grid-cols-2 justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
            {companies.map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-md border border-border bg-card p-3 text-muted-foreground">
                  {company.logo}
                </div>
                <span className="text-sm text-muted-foreground">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
