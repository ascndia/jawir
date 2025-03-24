import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export const Box: React.FC<
  PropsWithChildren<{ gradient?: [string, string]; className?: string }>
> = (props) => {
  const {
    children,
    gradient = ["primary", "secondary"],
    className,
    ...rest
  } = props;

  // Construct gradient classes
  const fromClass = `from-${gradient[0]}-500/20`;
  const toClass = `to-${gradient[1]}-500/20`;

  return (
    <div
      className={cn(
        "flex justify-center p-4 border dark:border-white/30 relative",
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-0 opacity-100 bg-gradient-to-br dark:opacity-50 dark:blur-3xl",
          fromClass,
          toClass
        )}
      />
      {children}
    </div>
  );
};
