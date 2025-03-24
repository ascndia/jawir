import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

type Direction = "left" | "right" | "top" | "bottom";

interface SlideInProps extends MotionProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = "left",
  distance = 50,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  const getInitialPosition = (dir: Direction) => {
    switch (dir) {
      case "left":
        return { x: -distance, y: 0 };
      case "right":
        return { x: distance, y: 0 };
      case "top":
        return { x: 0, y: -distance };
      case "bottom":
        return { x: 0, y: distance };
      default:
        return { x: -distance, y: 0 };
    }
  };

  const variants: Variants = {
    hidden: { opacity: 0, ...getInitialPosition(direction) },
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
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
