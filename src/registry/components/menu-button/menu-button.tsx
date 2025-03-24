import React, { forwardRef } from "react";

import { Button } from "@/registry/components/button/select";
import { cn } from "@/lib/utils";

export const MenuButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <Button
      //   ref={ref}
      //   variant="ghost"
      className={cn("h-full border bg-accent", className)}
      {...props}
    >
      {props.children}
    </Button>
  );
});

MenuButton.displayName = "MenuButton";
