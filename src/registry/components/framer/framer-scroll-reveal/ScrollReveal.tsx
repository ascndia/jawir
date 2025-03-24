"use client";
import React, { ReactNode } from "react";
import { motion, MotionProps, Variants, useInView } from "framer-motion";

export interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  distance = 50,
  duration = 0.6,
  delay = 0,
  once = true,
  className = "",
  ...props
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      case "none":
        return {};
      default:
        return { y: distance };
    }
  };

  const variants: Variants = {
    hidden: { opacity: 0, ...getInitialPosition() },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={`inline-block flex-shrink-0 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
