/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ButtonHTMLAttributes } from "react";
import { Check, LucideCopy } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  className?: string;
  disabled?: boolean;
};

export default function CopyStringButton({
  text = "Example",
  className,
  ...props
}: Props) {
  const [copied, setCopied] = useState(false);
  const handleCopystring = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };
  return (
    <Button className={cn(className)} onClick={handleCopystring} {...props}>
      {copied ? <Check size={20} /> : <LucideCopy size={20} />}
    </Button>
  );
}
