import { useState } from "react";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { Package, Shield, Truck, CreditCard, Loader2 } from "lucide-react";

const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 5.99, estimatedDays: "3-5 days" },
  { id: "express", name: "Express Shipping", price: 12.99, estimatedDays: "1-2 days" },
];

export default function CardOrderSummary() {
  const [shippingMethod, setShippingMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [isCheckingPromoCode, setIsCheckingPromoCode] = useState(false);
  const subtotal = 49.99;
  const shipping = shippingMethod ? shippingMethods.find(m => m.id === shippingMethod)?.price || 0 : 0;
  const total = subtotal + shipping;

  const applyPromoCode = () => {
    setIsCheckingPromoCode(true);
    setTimeout(() => {
      setIsCheckingPromoCode(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Review your order details and shipping information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Shipping Method */}
        <div className="space-y-2">
          <Label>Shipping Method</Label>
          <Select value={shippingMethod} onValueChange={setShippingMethod}>
            <SelectTrigger className="h-auto">
              <SelectValue placeholder="Select shipping method" />
            </SelectTrigger>
            <SelectContent className="h-auto">
              {shippingMethods.map((method) => (
                <SelectItem key={method.id} value={method.id} className="h-auto">
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Promo Code */}
        <div className="space-y-2">
          <Label>Promo Code</Label>
          <div className="flex gap-2">
            <Input onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter promo code" />
            <Button disabled={isCheckingPromoCode} onClick={applyPromoCode} variant="outline">
              {isCheckingPromoCode ? <Loader2 className="h-5 w-5 animate-spin" /> : "Apply"}
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-primary" />
            <span>Free returns within 30 days</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-primary" />
            <span>Fast delivery</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button className="w-full">
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
