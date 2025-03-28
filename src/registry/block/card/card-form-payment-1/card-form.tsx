"use client";

import * as React from "react";
import { CreditCard, Calendar, Lock, User, Save } from "lucide-react";

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
import { cn } from "@/lib/utils"; // Assuming utils path

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string; // Format MM/YY
  cvc: string;
}

interface CardFormPayment1Props {
  initialData?: Partial<PaymentFormData>;
  onSave?: (data: PaymentFormData) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

// Basic input formatting helpers (could be more robust)
const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const parts = [];
  for (let i = 0; i < cleaned.length; i += 4) {
    parts.push(cleaned.substring(i, i + 4));
  }
  return parts.join(" ").trim();
};

const formatExpiryDate = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 3) {
    return `${cleaned.substring(0, 2)} / ${cleaned.substring(2, 4)}`;
  }
  return cleaned;
};

export function CardFormPayment1({
  initialData = {},
  onSave,
  onCancel,
  title = "Payment Details",
  description = "Enter your credit card information.",
}: CardFormPayment1Props) {
  const [formData, setFormData] = React.useState<PaymentFormData>({
    cardNumber: initialData.cardNumber
      ? formatCardNumber(initialData.cardNumber)
      : "",
    cardName: initialData.cardName ?? "",
    expiryDate: initialData.expiryDate
      ? formatExpiryDate(initialData.expiryDate)
      : "",
    cvc: initialData.cvc ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4); // Allow 3 or 4 digits
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSave = () => {
    if (onSave) {
      // Add validation logic here before saving
      const cleanedData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        expiryDate: formData.expiryDate.replace(/\s|\//g, ""),
      };
      onSave(cleanedData);
    }
    console.log("Saving payment details:", formData); // Log formatted data for review
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form
    setFormData({
      cardNumber: initialData.cardNumber
        ? formatCardNumber(initialData.cardNumber)
        : "",
      cardName: initialData.cardName ?? "",
      expiryDate: initialData.expiryDate
        ? formatExpiryDate(initialData.expiryDate)
        : "",
      cvc: initialData.cvc ?? "",
    });
    console.log("Cancelled payment details edit");
  };

  // Basic validation check example
  const isValid =
    formData.cardNumber.replace(/\s/g, "").length >= 13 && // Basic length check
    formData.cardName.trim() !== "" &&
    formData.expiryDate.replace(/\s|\//g, "").length === 4 &&
    formData.cvc.length >= 3;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">
            <CreditCard className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Card Number
          </Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            maxLength={19} // 16 digits + 3 spaces
            inputMode="numeric"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardName">
            <User className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Name on Card
          </Label>
          <Input
            id="cardName"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">
              <Calendar className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM / YY"
              maxLength={7} // MM / YY
              inputMode="numeric"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">
              <Lock className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              CVC / CVV
            </Label>
            <Input
              id="cvc"
              name="cvc"
              value={formData.cvc}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              inputMode="numeric"
              required
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Your payment details are securely processed.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isValid}>
          <Save className="mr-2 h-4 w-4" />
          Save Payment Method
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardFormPayment1;
