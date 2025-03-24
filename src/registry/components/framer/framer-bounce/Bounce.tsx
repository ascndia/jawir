import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface BounceProps extends MotionProps {
  children: ReactNode;
  strength?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const Bounce: React.FC<BounceProps> = ({
  children,
  strength = 0.2,
  duration = 0.8,
  delay = 0,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1 + strength, 1 - strength / 2, 1 + strength / 4, 1],
      transition: {
        duration,
        delay,
        times: [0, 0.3, 0.6, 0.8, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
