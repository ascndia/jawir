"use client";

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
import {
  Trash2,
  Plus,
  Minus,
  Package,
  CreditCard,
  Truck,
  Shield,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  stock: number;
}

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Classic Chronograph Watch",
      price: 299.99,
      originalPrice: 399.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      color: "Black",
      size: "Standard",
      stock: 5,
    },
    {
      id: "2",
      name: "Sport Diver Watch",
      price: 199.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      color: "Blue",
      size: "Standard",
      stock: 3,
    },
  ]);

  const [shippingMethod, setShippingMethod] = useState<string>("standard");
  const [promoCode, setPromoCode] = useState<string>("");
  const [isCheckingPromoCode, setIsCheckingPromoCode] = useState(false);

  const applyPromoCode = () => {
    setIsCheckingPromoCode(true);
    setTimeout(() => {
        setIsCheckingPromoCode(false);
      toast.success("Promo code applied!");
    }, 1500);
  }

  const shippingMethods: ShippingMethod[] = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimatedDays: "3-5 days",
      description: "Free shipping on orders over $200",
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimatedDays: "1-2 days",
      description: "Priority delivery with tracking",
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    shippingMethods.find((m) => m.id === shippingMethod)?.price || 0;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.stock, item.quantity + change)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Cart Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.color} • {item.size}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
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
                <Select
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                >
                  <SelectTrigger className="h-auto">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent className="h-auto">
                    {shippingMethods.map((method) => (
                      <SelectItem
                        key={method.id}
                        value={method.id}
                        className="h-auto"
                      >
                        {method.name}
                        {/* <div className="flex items-center justify-between text-start">
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.estimatedDays}
                            </div>
                            <div className="font-medium">
                              ${method.price.toFixed(2)}
                            </div>
                          </div>
                        </div> */}
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
                  <Button
                    disabled={isCheckingPromoCode}
                    onClick={applyPromoCode}
                    variant="outline"
                  >
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
        </div>
      </div>
    </div>
  );
}
