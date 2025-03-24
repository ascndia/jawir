import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface PulseProps extends MotionProps {
  children: ReactNode;
  scale?: number;
  duration?: number;
  repeat?: number | boolean;
  className?: string;
}

export const Pulse: React.FC<PulseProps> = ({
  children,
  scale = 1.05,
  duration = 1,
  repeat = Infinity,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    pulse: {
      scale: [1, scale, 1],
      transition: {
        duration,
        repeat: repeat as number,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
