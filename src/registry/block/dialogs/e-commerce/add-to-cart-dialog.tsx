"use client";
import {
  Check,
  ChevronRight,
  Loader2,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator";
import { ScrollArea } from "@/registry/components/scroll-area";

interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
  options?: { name: string; value: string }[];
}

interface AddToCartDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onViewCart?: () => void;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  isLoading?: boolean;
  cartItems?: CartItem[];
  recentlyAddedItem?: CartItem;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  currency?: string;
  freeShippingThreshold?: number;
}

export default function AddToCartDialog({
  open = false,
  onOpenChange,
  onViewCart,
  onCheckout,
  onContinueShopping,
  onUpdateQuantity,
  onRemoveItem,
  isLoading = false,
  cartItems = [],
  recentlyAddedItem,
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  currency = "USD",
  freeShippingThreshold = 100,
}: AddToCartDialogProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);
    onUpdateQuantity?.(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    onRemoveItem?.(itemId);
  };

  const handleViewCart = () => {
    onViewCart?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleCheckout = () => {
    onCheckout?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleContinueShopping = () => {
    onContinueShopping?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Added to Cart</DialogTitle>
              <DialogDescription>
                {recentlyAddedItem ? (
                  <>{recentlyAddedItem.title} has been added to your cart</>
                ) : (
                  <>Item has been added to your cart</>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {recentlyAddedItem && (
          <div className="mt-4 flex items-center gap-4 rounded-lg border p-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
              <img
                src={recentlyAddedItem.image || "/placeholder.svg"}
                alt={recentlyAddedItem.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-medium">{recentlyAddedItem.title}</h4>
              {recentlyAddedItem.variantTitle && (
                <p className="text-sm text-muted-foreground">
                  {recentlyAddedItem.variantTitle}
                </p>
              )}
              {recentlyAddedItem.options &&
                recentlyAddedItem.options.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {recentlyAddedItem.options
                      .map((option) => `${option.name}: ${option.value}`)
                      .join(", ")}
                  </p>
                )}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="font-medium">
                    {formatCurrency(recentlyAddedItem.price)}
                  </span>
                  {recentlyAddedItem.compareAtPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(recentlyAddedItem.compareAtPrice)}
                    </span>
                  )}
                </div>
                <div className="text-sm">Qty: {recentlyAddedItem.quantity}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cart Summary</span>
            <span className="text-sm text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cartItems.length > 0 && (
            <ScrollArea className="max-h-[200px] pr-4">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h5 className="text-sm font-medium">{item.title}</h5>
                      {item.variantTitle && (
                        <p className="text-xs text-muted-foreground">
                          {item.variantTitle}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          disabled={isLoading || item.quantity <= 1}
                          className="h-7 w-7"
                        >
                          <span className="font-bold">-</span>
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                          disabled={isLoading}
                          className="h-7 w-7"
                        >
                          <span className="font-bold">+</span>
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <div className="w-16 text-right text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <Separator />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  formatCurrency(shipping)
                )}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {!hasFreeShipping && amountToFreeShipping > 0 && (
            <div className="rounded-lg bg-primary/10 p-3 text-center text-sm">
              <p>
                Add{" "}
                <span className="font-medium">
                  {formatCurrency(amountToFreeShipping)}
                </span>{" "}
                more to qualify for free shipping!
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(subtotal / freeShippingThreshold) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleContinueShopping}
            className="w-full sm:w-auto"
          >
            Continue Shopping
          </Button>
          <div className="flex flex-1 gap-2">
            <Button
              variant="outline"
              onClick={handleViewCart}
              className="flex-1"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Cart
            </Button>
            <Button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Checkout
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
