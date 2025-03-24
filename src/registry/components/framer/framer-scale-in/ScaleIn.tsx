import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface ScaleInProps extends MotionProps {
  children: ReactNode;
  initialScale?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  children,
  initialScale = 0.5,
  duration = 0.5,
  delay = 0,
  className = "",
  ...props
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, scale: initialScale },
    visible: {
      opacity: 1,
      scale: 1,
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
