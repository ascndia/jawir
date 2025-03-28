"use client";

import * as React from "react";
import { Loader2, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";

interface TwoFactorDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onVerify?: (code: string) => void;
  onResendCode?: () => void;
  isLoading?: boolean;
  resendCooldown?: number;
  method?: "app" | "sms" | "email";
  contactInfo?: string;
}

export default function TwoFactorDialog({
  open = false,
  onOpenChange,
  onVerify,
  onResendCode,
  isLoading = false,
  resendCooldown = 60,
  method = "app",
  contactInfo,
}: TwoFactorDialogProps) {
  const [code, setCode] = React.useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = React.useState(0);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (!open) {
      setCode(["", "", "", "", "", ""]);
      setCooldown(0);
      return;
    }

    // Focus the first input when dialog opens
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, [open]);

  React.useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setCode(digits);

      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      onVerify?.(fullCode);
    }
  };

  const handleResendCode = () => {
    onResendCode?.();
    setCooldown(resendCooldown);
  };

  const getMethodText = () => {
    switch (method) {
      case "app":
        return "authentication app";
      case "sms":
        return `phone number${contactInfo ? ` (${contactInfo})` : ""}`;
      case "email":
        return `email${contactInfo ? ` (${contactInfo})` : ""}`;
      default:
        return "authentication method";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>Two-Factor Authentication</DialogTitle>
            <DialogDescription className="mt-1.5">
              Enter the 6-digit code sent to your {getMethodText()}.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Label htmlFor="verification-code" className="sr-only">
            Verification Code
          </Label>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                // ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="h-12 w-12 text-center text-lg"
                autoComplete="one-time-code"
              />
            ))}
          </div>
        </div>

        <div className="mt-2 text-center">
          <Button
            variant="link"
            size="sm"
            onClick={handleResendCode}
            disabled={cooldown > 0 || isLoading}
            className="h-auto p-0 text-xs"
          >
            {cooldown > 0
              ? `Resend code in ${cooldown}s`
              : "Didn't receive a code? Resend"}
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleVerify}
            disabled={code.join("").length !== 6 || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
