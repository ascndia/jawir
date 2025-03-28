"use client";

import type * as React from "react";
import { CreditCard, Loader2, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator";

interface PaymentItem {
  name: string;
  description?: string;
  amount: number;
}

interface PaymentMethod {
  type: "card" | "paypal" | "bank";
  label: string;
  lastFour?: string;
  expiryDate?: string;
  icon?: React.ReactNode;
}

interface PaymentConfirmationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  items?: PaymentItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  currency?: string;
  paymentMethod?: PaymentMethod;
}

export default function PaymentConfirmationDialog({
  open = false,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
  items = [],
  subtotal = 0,
  tax = 0,
  total = 0,
  currency = "USD",
  paymentMethod = {
    type: "card",
    label: "Credit Card",
    lastFour: "4242",
    expiryDate: "12/25",
    icon: <CreditCard className="h-4 w-4" />,
  },
}: PaymentConfirmationDialogProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
          <DialogDescription>
            Review your order details before completing your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <ul className="space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span>{formatCurrency(item.amount)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Payment Method</CardTitle>
              <CardDescription>
                You'll be charged using this payment method.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  {paymentMethod.icon || <CreditCard className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium">{paymentMethod.label}</p>
                  {paymentMethod.type === "card" && paymentMethod.lastFour && (
                    <p className="text-sm text-muted-foreground">
                      •••• {paymentMethod.lastFour}
                      {paymentMethod.expiryDate &&
                        ` • Expires ${paymentMethod.expiryDate}`}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p>Your payment information is encrypted and secure.</p>
          </div>
        </div>

        <DialogFooter className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${formatCurrency(total)}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
