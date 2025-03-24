import React, { ReactNode } from "react";
import { motion, MotionProps, Variants, AnimatePresence } from "framer-motion";

type TransitionType = "fade" | "slide" | "scale" | "flip";

interface PageTransitionProps extends MotionProps {
  children: ReactNode;
  type?: TransitionType;
  isPresent: boolean; // Indicates if page should be shown
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = "fade",
  isPresent,
  direction = "left",
  duration = 0.5,
  className = "",
  ...props
}) => {
  const getVariants = (): Variants => {
    switch (type) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration } },
          exit: { opacity: 0, transition: { duration } },
        };
      case "slide":
        const offset = 100;
        let x = 0;
        let y = 0;

        if (direction === "left") x = offset;
        else if (direction === "right") x = -offset;
        else if (direction === "up") y = offset;
        else if (direction === "down") y = -offset;

        return {
          initial: { opacity: 0, x, y },
          animate: { opacity: 1, x: 0, y: 0, transition: { duration } },
          exit: { opacity: 0, x: -x, y: -y, transition: { duration } },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1, transition: { duration } },
          exit: { opacity: 0, scale: 1.2, transition: { duration } },
        };
      case "flip":
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { opacity: 1, rotateY: 0, transition: { duration } },
          exit: { opacity: 0, rotateY: -90, transition: { duration } },
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration } },
          exit: { opacity: 0, transition: { duration } },
        };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={getVariants()}
          className={className}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
