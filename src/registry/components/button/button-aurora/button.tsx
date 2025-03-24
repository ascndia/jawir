"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import ShadcnButton from "../button-shadcn/button";

interface AuroraButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  glowClassName?: string;
}

export default function Button({
  className,
  children,
  glowClassName,
  ...props
}: AuroraButtonProps) {
  return (
    <div className="relative w-full inline-block group">
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-md transition-all",
          "group-hover:opacity-100 group-hover:blur-sm-lg",
          glowClassName
        )}
      />
      <ShadcnButton className={cn(className, "relative w-full")} {...props}>
        {children}
      </ShadcnButton>
    </div>
  );
}

{
  /* <button
        className={cn(
          "relative rounded-lg bg-slate-950/90 px-4 py-2",
          "text-slate-100 shadow-xl",
          "transition-all hover:bg-slate-950/70",
          "group border border-slate-800",
          className
        )}
        {...props}
      >
        {children}
      </button> */
}
