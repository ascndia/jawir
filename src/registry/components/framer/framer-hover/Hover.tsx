import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface HoverProps extends MotionProps {
  children: ReactNode;
  scale?: number;
  y?: number;
  rotate?: number;
  duration?: number;
  className?: string;
}

export const Hover: React.FC<HoverProps> = ({
  children,
  scale = 1.05,
  y = 0,
  rotate = 0,
  duration = 0.3,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    initial: { scale: 1, y: 0, rotate: 0 },
    hover: {
      scale,
      y,
      rotate,
      transition: {
        duration,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
