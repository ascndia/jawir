"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const cuisines = [
  "Mexican",
  "Italian",
  "Chinese",
  "Japanese",
  "Indian",
  "Greek",
  "French",
  "Spanish",
  "Turkish",
  "Lebanese",
  "Vietnamese",
  "Korean",
  "Argentinian",
  "Peruvian",
  "Ethiopian",
  "Nigerian",
  "German",
  "British",
  "Irish",
  "Swedish",
  "Danish",
  "Polish",
  "Hungarian",
  "Portuguese",
];

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

export default function CuisineSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCuisine = (cuisine: string) => {
    setSelected((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <div className="py-32 ">
      <h1 className="text-white text-3xl font-semibold mb-12 text-center">
        What are your favorite cuisines?
      </h1>
      <div className="max-w-[570px] mx-auto">
        <motion.div
          className="flex flex-wrap gap-3 overflow-visible"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.5,
          }}
        >
          {cuisines.map((cuisine) => {
            const isSelected = selected.includes(cuisine);
            return (
              <motion.button
                key={cuisine}
                onClick={() => toggleCuisine(cuisine)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isSelected
                    ? "var(--tw-bg-primary)"
                    : "var(--tw-bg-secondary)",
                }}
                whileHover={{
                  backgroundColor: isSelected
                    ? "var(--tw-bg-primary)"
                    : "var(--tw-bg-secondary)",
                }}
                whileTap={{
                  backgroundColor: isSelected
                    ? "var(--tw-bg-primary-dark)"
                    : "var(--tw-bg-secondary-dark)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 0.5,
                  backgroundColor: { duration: 0.1 },
                }}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full text-base font-medium
                  whitespace-nowrap overflow-hidden ring-1 ring-inset
                  ${
                    isSelected
                      ? "text-primary ring-primary/12"
                      : "text-secondary ring-secondary/6"
                  }
                `}
              >
                <motion.div
                  className="relative flex items-center"
                  animate={{
                    width: isSelected ? "auto" : "100%",
                    paddingRight: isSelected ? "1.5rem" : "0",
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span>{cuisine}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                          mass: 0.5,
                        }}
                        className="absolute right-0"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary  flex items-center justify-center">
                          <Check
                            className="w-3 h-3 text-primary-dark"
                            strokeWidth={1.5}
                          />
                        </div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
