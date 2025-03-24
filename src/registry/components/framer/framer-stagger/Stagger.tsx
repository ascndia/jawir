import React, { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface StaggerProps extends MotionProps {
  children: ReactNode;
  staggerDelay?: number;
  duration?: number;
  initialDelay?: number;
  className?: string;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  initialDelay = 0,
  className = "",
  ...props
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
      },
    },
  };

  // Clone children and wrap each in a motion.div with itemVariants
  const childrenWithMotion = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return <motion.div variants={itemVariants}>{child}</motion.div>;
    }
    return child;
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
      {...props}
    >
      {childrenWithMotion}
    </motion.div>
  );
};
