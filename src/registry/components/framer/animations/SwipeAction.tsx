import React, { ReactNode } from "react";
import { motion, MotionProps, PanInfo, useMotionValue } from "framer-motion";

interface SwipeActionProps extends MotionProps {
  children: ReactNode;
  direction?: "x" | "y";
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
}

export const SwipeAction: React.FC<SwipeActionProps> = ({
  children,
  direction = "x",
  threshold = 100,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = "",
  ...props
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = direction === "x" ? info.offset.x : info.offset.y;

    if (direction === "x") {
      if (offset < -threshold && onSwipeLeft) {
        onSwipeLeft();
      } else if (offset > threshold && onSwipeRight) {
        onSwipeRight();
      }
    } else {
      if (offset < -threshold && onSwipeUp) {
        onSwipeUp();
      } else if (offset > threshold && onSwipeDown) {
        onSwipeDown();
      }
    }

    // Reset position
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      drag={direction}
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x, y }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
