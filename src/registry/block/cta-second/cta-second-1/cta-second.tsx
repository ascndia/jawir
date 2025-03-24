/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PropsWithChildren } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import { cn } from "@/lib/utils";

export default function CTASecond({
  children,
  className,
  ...props
}: PropsWithChildren<{
  buttonComponent?: React.ComponentType<any>;
  className?: string;
}>) {
  return (
    <Button className={cn(className, "group")} {...props}>
      {children || "View demo"}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </Button>
  );
}
