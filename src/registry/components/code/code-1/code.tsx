import React from "react";
import { cn } from "@/lib/utils";
interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

const Code: React.FC<CodeProps> = ({ children, className }) => {
  return (
    <code
      className={cn(
        "bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
};

export default Code;
