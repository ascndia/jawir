"use client";

import * as React from "react";
import { Ticket, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { cn } from "@/lib/utils";

interface DiscountFormData {
  discountCode: string;
}

interface CardFormDiscount1Props {
  initialCode?: string;
  onSubmit?: (
    data: DiscountFormData
  ) =>
    | Promise<{ success: boolean; message?: string } | void>
    | { success: boolean; message?: string }
    | void;
  onRemove?: () => Promise<void> | void; // Optional: Handler to remove applied discount
  appliedDiscount?: { code: string; description: string } | null; // Info about currently applied discount
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  submitButtonText?: string;
  removeButtonText?: string;
  successMessage?: string; // Default success message if onSubmit doesn't provide one
  errorMessage?: string; // Default error message if onSubmit doesn't provide one
  className?: string;
}

export function CardFormDiscount1({
  initialCode = "",
  onSubmit,
  onRemove,
  appliedDiscount = null,
  title = "Apply Discount Code",
  description = "Have a discount code? Enter it below.",
  inputPlaceholder = "Enter code",
  submitButtonText = "Apply",
  removeButtonText = "Remove",
  successMessage = "Discount applied successfully!",
  errorMessage = "Invalid or expired discount code.",
  className,
}: CardFormDiscount1Props) {
  const [discountCode, setDiscountCode] = React.useState(initialCode);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isRemoving, setIsRemoving] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message: string | null;
  }>({ type: "idle", message: null });

  React.useEffect(() => {
    // Reset input if a discount is already applied externally
    if (appliedDiscount) {
      setDiscountCode("");
      setStatus({ type: "success", message: appliedDiscount.description });
    } else {
      setStatus({ type: "idle", message: null });
    }
  }, [appliedDiscount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value.toUpperCase()); // Often codes are uppercase
    setStatus({ type: "idle", message: null }); // Reset status on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !onSubmit ||
      isSubmitting ||
      isRemoving ||
      !discountCode ||
      appliedDiscount
    )
      return;

    setIsSubmitting(true);
    setStatus({ type: "idle", message: null });

    try {
      const result = await onSubmit({ discountCode });
      if (result && result.success) {
        setStatus({
          type: "success",
          message: result.message || successMessage,
        });
        // Parent component should update appliedDiscount prop
      } else {
        setStatus({ type: "error", message: result?.message || errorMessage });
      }
    } catch (error) {
      console.error("Discount code submission error:", error);
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove || isRemoving || isSubmitting || !appliedDiscount) return;

    setIsRemoving(true);
    setStatus({ type: "idle", message: null });

    try {
      await onRemove();
      // Parent component should update appliedDiscount prop to null
      setDiscountCode(""); // Clear input after removal
    } catch (error) {
      console.error("Discount code removal error:", error);
      // Optionally show an error message for removal failure
      setStatus({ type: "error", message: "Failed to remove discount." });
    } finally {
      setIsRemoving(false);
    }
  };

  const isLoading = isSubmitting || isRemoving;

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && !appliedDiscount && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-3">
          {!appliedDiscount ? (
            <div className="flex space-x-2">
              <div className="flex-1 space-y-1">
                <Label htmlFor="discount-code" className="sr-only">
                  Discount Code
                </Label>
                <Input
                  id="discount-code"
                  name="discountCode"
                  value={discountCode}
                  onChange={handleChange}
                  placeholder={inputPlaceholder}
                  disabled={isLoading}
                  aria-describedby="discount-status"
                />
              </div>
              <Button
                type="submit"
                disabled={!discountCode || isLoading}
                aria-label="Apply discount code"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  submitButtonText
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-md border border-input bg-background p-3">
              <div className="flex items-center space-x-2">
                <Ticket className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <p className="font-medium">{appliedDiscount.code}</p>
                  <p className="text-muted-foreground">
                    {appliedDiscount.description}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                disabled={isLoading}
                aria-label={`Remove discount code ${appliedDiscount.code}`}
              >
                {isRemoving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  removeButtonText
                )}
              </Button>
            </div>
          )}

          <div id="discount-status" aria-live="polite">
            {status.type === "success" &&
              !appliedDiscount && ( // Show temporary success only if not showing appliedDiscount state
                <p className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  {status.message}
                </p>
              )}
            {status.type === "error" && (
              <p className="flex items-center text-sm text-destructive">
                <AlertTriangle className="mr-2 h-4 w-4" />
                {status.message}
              </p>
            )}
          </div>
        </CardContent>
        {/* Footer can be removed if not needed */}
        {/* <CardFooter>
          <p className="text-xs text-muted-foreground">Discounts applied at checkout.</p>
        </CardFooter> */}
      </form>
    </Card>
  );
}

export default CardFormDiscount1;
