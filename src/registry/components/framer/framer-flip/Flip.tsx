import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

type FlipAxis = "x" | "y";

interface FlipProps extends MotionProps {
  children: ReactNode;
  axis?: FlipAxis;
  degrees?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const Flip: React.FC<FlipProps> = ({
  children,
  axis = "y",
  degrees = 180,
  duration = 0.6,
  delay = 0,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    initial: {
      rotateX: axis === "x" ? 0 : 0,
      rotateY: axis === "y" ? 0 : 0,
    },
    flip: {
      rotateX: axis === "x" ? degrees : 0,
      rotateY: axis === "y" ? degrees : 0,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="flip"
      variants={variants}
      style={{ perspective: 1200 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
