import React, { ReactNode, RefObject } from "react";
import { BoundingBox, motion, MotionProps, PanInfo } from "framer-motion";

interface DragDropProps extends MotionProps {
  children: ReactNode;
  dragConstraints?: false | Partial<BoundingBox> | RefObject<Element | null>;
  dragElastic?: number;
  dragMomentum?: boolean;
  onDragStart?: () => void;
  onDragEnd?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  onDrop?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  className?: string;
}

export const DragDrop: React.FC<DragDropProps> = ({
  children,
  dragConstraints,
  dragElastic = 0.5,
  dragMomentum = true,
  onDragStart,
  onDragEnd,
  onDrop,
  className = "",
  ...props
}) => {
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (onDragEnd) onDragEnd(event, info);
    if (onDrop) onDrop(event, info);
  };

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={dragElastic}
      dragMomentum={dragMomentum}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
