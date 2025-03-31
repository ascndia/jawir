import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const betweenVerticalVariants = cva(
  "absolute top-0 left-0 w-full h-full flex",
  {
    variants: {
      position: {
        center: "items-center justify-center",
        top: "items-start justify-center",
        bottom: "items-end justify-center",
        left: "items-center justify-start",
        right: "items-center justify-end",
      },
    },
    defaultVariants: {
      position: "center",
    },
  }
);

interface BetweenVerticalProps
  extends VariantProps<typeof betweenVerticalVariants> {
  children: ReactNode; // The middle section
}

const BetweenVertical: React.FC<BetweenVerticalProps> = ({
  children,
  position,
}) => {
  return (
    <div className="relative w-full">
      <div className={betweenVerticalVariants({ position })}>{children}</div>
    </div>
  );
};

export default BetweenVertical;
