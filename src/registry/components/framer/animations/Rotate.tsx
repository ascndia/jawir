import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface RotateProps extends MotionProps {
  children: ReactNode;
  degrees?: number;
  duration?: number;
  delay?: number;
  repeat?: number | boolean;
  className?: string;
}

export const Rotate: React.FC<RotateProps> = ({
  children,
  degrees = 360,
  duration = 1,
  delay = 0,
  repeat = 0,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    rotate: {
      rotate: degrees,
      transition: {
        duration,
        delay,
        repeat: repeat as number,
        repeatType: "loop",
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate="rotate"
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
