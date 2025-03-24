import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface ShakeProps extends MotionProps {
  children: ReactNode;
  intensity?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const Shake: React.FC<ShakeProps> = ({
  children,
  intensity = 10,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    shake: {
      x: [0, -intensity, intensity, -intensity, intensity, 0],
      transition: {
        duration,
        delay,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="shake"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
