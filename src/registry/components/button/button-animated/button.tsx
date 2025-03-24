import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import ShadcnButton from "@/registry/components/button/button-shadcn/button";
import { cn } from "@/lib/utils";

// Only keep this for the animation container
const outerDivVariants = cva("relative overflow-hidden", {
  variants: {
    rounded: {
      full: "rounded-full before:rounded-full",
      md: "rounded-md before:rounded-md",
      lg: "rounded-lg before:rounded-lg",
      xl: "rounded-xl before:rounded-xl",
      "2xl": "rounded-2xl before:rounded-2xl",
      "3xl": "rounded-3xl before:rounded-3xl",
      sm: "rounded-sm before:rounded-sm",
      xs: "rounded-xs before:rounded-xs",
      base: "rounded before:rounded",
    },
  },
  defaultVariants: {
    rounded: "base",
  },
});

// Update the innerSpanVariants with negative z-index
const innerSpanVariants = cva(
  [
    "absolute inset-[-1000%] m-auto block -z-10", // Add negative z-index
  ],
  {
    variants: {
      animation: {
        pulse: "animate-pulse",
        "spin-fast": "animate-[spin_2s_linear_infinite]",
        "spin-slow": "animate-[spin_8s_linear_infinite]",
        spin: "animate-[spin_4s_linear_infinite]",
      },
      gradient: {
        sunrise: "text-black font-bold",
        ocean:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#a1c4fd_0%,#c2e9fb_50%,#a1c4fd_100%)] ",
        candy:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#ff9a9e_0%,#fad0c4_50%,#fad0c4_90%,#ff9a9e_100%)] ",
        forest:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#85d797_0%,#1a806b_50%,#85d797_100%)] ",
        sunset:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#fe5d75_0%,#f5af19_50%,#fe5d75_100%)] ",
        nebula:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#A77BFE_0%,#8860D0_50%,#A77BFE_100%)] ",
        default:
          "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] ",
      },
    },
    compoundVariants: [
      {
        animation: "spin",
        gradient: "sunrise",
        className: "duration-4s ease-linear",
      },
    ],
    defaultVariants: {
      animation: "spin",
      gradient: "forest",
    },
  }
);

// Simplified to only contain text color styling based on gradient
const textStyleVariants = cva("relative", {
  variants: {
    gradient: {
      sunrise: "text-black font-bold",
      ocean: "text-black font-bold",
      candy: "text-black font-bold",
      forest: "text-black font-bold",
      sunset: "text-black font-bold",
      nebula: "text-white font-bold",
      default: "text-white font-bold",
    },
  },
  defaultVariants: {
    gradient: "default",
  },
});

export interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: "full" | "md" | "lg" | "xl" | "2xl" | "3xl" | "sm" | "xs" | "base";
  asChild?: boolean;
  animation?: "spin" | "pulse" | "spin-slow" | "spin-fast" | "spin";
  gradient?:
    | "sunrise"
    | "ocean"
    | "candy"
    | "default"
    | "forest"
    | "sunset"
    | "nebula";
}

const Button = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      rounded = "lg",
      gradient = "default",
      animation = "spin",
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <ShadcnButton
        className={cn(
          outerDivVariants({ rounded }),
          textStyleVariants({ gradient }),
          "isolate", // Create a new stacking context
          className
        )}
        ref={ref}
        {...props}
      >
        {gradient && (
          <span className={cn(innerSpanVariants({ gradient, animation }))} />
        )}
        {props.children || "Button"}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
