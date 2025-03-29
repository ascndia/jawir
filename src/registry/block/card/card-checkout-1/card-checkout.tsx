import { cn } from "@/lib/utils";
import { Button } from "@/registry/components/button/select";
import { ArrowUpRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface Card09Props {
  orderDetails?: {
    itemName: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: {
    code: string;
    amount: number;
  };
  total?: number;
  currency?: string;
  onCheckout?: () => void;
}

const defaultOrderDetails = [
  {
    itemName: "Premium Plan",
    quantity: 1,
    unitPrice: 99.99,
  },
  {
    itemName: "Extra Storage",
    quantity: 1,
    unitPrice: 19.99,
  },
  {
    itemName: "Priority Support",
    quantity: 1,
    unitPrice: 49.99,
  },
];

export default function Card09({
  orderDetails = defaultOrderDetails,
  subtotal = defaultOrderDetails.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  ),
  tax = subtotal * 0.08, // 8% default tax
  shipping = 0,
  discount = {
    code: "WELCOME10",
    amount: subtotal * 0.1, // 10% discount
  },
  total = subtotal + tax + shipping - discount.amount,
  currency = "USD",
}: Card09Props) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className={cn("w-full min-w-sm ")}>
      <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Order Summary
          </CardTitle>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {orderDetails.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-3 space-y-6">
        {/* Order Items */}
        <div className="space-y-4">
          {orderDetails.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {item.itemName}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                </p>
              </div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {formatPrice(subtotal)}
            </span>
          </div>

          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Shipping</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {formatPrice(shipping)}
              </span>
            </div>
          )}

          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Tax</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {formatPrice(tax)}
              </span>
            </div>
          )}

          {discount && (
            <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
              <span>Discount ({discount.code})</span>
              <span>-{formatPrice(discount.amount)}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4 p-6 pt-0">
        <div className="flex justify-between items-center w-full pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Total
          </span>
          <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {formatPrice(total)}
          </span>
        </div>

        <Button className="w-full">
          Proceed to Checkout
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
