import React from "react";
import { motion, MotionProps } from "framer-motion";

interface DrawSVGProps extends MotionProps {
  pathLength?: number;
  pathSpacing?: number;
  pathOffset?: number;
  duration?: number;
  delay?: number;
  repeat?: number | boolean;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  viewBox?: string;
  width?: string | number;
  height?: string | number;
  path: string;
}

export const DrawSVG: React.FC<DrawSVGProps> = ({
  pathLength = 0,
  pathSpacing = 0,
  pathOffset = 0,
  duration = 2,
  delay = 0,
  repeat = 0,
  className = "",
  strokeWidth = 2,
  stroke = "currentColor",
  fill = "none",
  viewBox = "0 0 100 100",
  width = "100%",
  height = "100%",
  path,
  ...props
}) => {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      {...props}
    >
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          pathOffset: 0,
          transition: {
            duration,
            delay,
            repeat: repeat as number,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
      />
    </motion.svg>
  );
};
