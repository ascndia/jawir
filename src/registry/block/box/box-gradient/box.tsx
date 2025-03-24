import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const Box: React.FC<
  PropsWithChildren<{
    gradient?: [string, string];
    className?: string;
    rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
  }>
> = (props) => {
  const {
    children,
    gradient = ["#3b82f6", "#10b981"], // Default colors (blue and green)
    className,
    rounded = "md",
    ...rest
  } = props;

  // CSS gradient style
  const gradientStyle = {
    background: `linear-gradient(to bottom right, ${gradient[0]}33, ${gradient[1]}33)`, // 33 is 20% opacity in hex
    position: "absolute" as "absolute",
    inset: 0,
    zIndex: 0,
  };

  return (
    <div
      className={cn(
        "flex justify-center p-4 border dark:border-white/30 relative",
        `rounded-${rounded}`,
        className
      )}
      {...rest}
    >
      <div
        style={gradientStyle}
        className={cn("dark:opacity-50 dark:blur-3xl", `rounded-${rounded}`)}
      />
      {children}
    </div>
  );
};
