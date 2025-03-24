import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva("px-4 py-1 rounded-full cursor-pointer select-none", {
  variants: {
    variant: {
      default: "bg-gray-500/20",
      primary: "bg-foreground/20",
      purple: "bg-purple-500/20",
      success: "bg-green-500/20",
      warning: "bg-yellow-500/20",
      danger: "bg-red-500/20",
      info: "bg-blue-500/20",
      ghost: "bg-transparent hover:bg-gray-500/10 transition-colors",
      outline: "bg-transparent border border-gray-500/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const textVariants = cva(
  "bg-clip-text animate-background-shine text-transparent font-medium text-sm",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(110deg,#6b7280,45%,#d1d5db,55%,#6b7280)] bg-[length:250%_100%]",
        default:
          "bg-[linear-gradient(110deg,#6b7280,45%,#d1d5db,55%,#6b7280)] bg-[length:250%_100%]",
        purple:
          "bg-[linear-gradient(110deg,#6d28d9,45%,#c4b5fd,55%,#6d28d9)] bg-[length:250%_100%]",
        success:
          "bg-[linear-gradient(110deg,#16a34a,45%,#86efac,55%,#16a34a)] bg-[length:250%_100%]",
        warning:
          "bg-[linear-gradient(110deg,#ca8a04,45%,#fef08a,55%,#ca8a04)] bg-[length:250%_100%]",
        danger:
          "bg-[linear-gradient(110deg,#dc2626,45%,#fca5a5,55%,#dc2626)] bg-[length:250%_100%]",
        info: "bg-[linear-gradient(110deg,#2563eb,45%,#93c5fd,55%,#2563eb)] bg-[length:250%_100%]",
        ghost:
          "bg-[linear-gradient(110deg,#3f3f46,45%,#a1a1aa,55%,#3f3f46)] bg-[length:250%_100%]",
        outline:
          "bg-[linear-gradient(110deg,#475569,45%,#94a3b8,55%,#475569)] bg-[length:250%_100%]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof badgeVariants> {
  title: string;
}

const Badge = ({
  title = "Choose a badge",
  variant = "purple",
}: Partial<Props>) => {
  return (
    <div className={badgeVariants({ variant })}>
      <div className={textVariants({ variant })}>{title}</div>
    </div>
  );
};
export { badgeVariants };
export default Badge;
