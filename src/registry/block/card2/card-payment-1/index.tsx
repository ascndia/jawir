"use client"

import { useState } from "react"
import { CreditCard, Banknote, QrCode, LucideIcon } from 'lucide-react'
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const paymentOptions: { value: string; label: string; icon: LucideIcon }[] = [
  {
    value: "cash",
    label: "Cash",
    icon: Banknote,
  },
  {
    value: "card",
    label: "Card",
    icon: CreditCard,
  },
  {
    value: "scan",
    label: "Scan",
    icon: QrCode,
  },
]

export function CardPayment1A() {
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <h3 className="text-base font-medium">Payment Method</h3>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="flex gap-2"
        >
          {paymentOptions.map(({ value, label, icon: Icon }) => (
            <div className="flex-1" key={value}>
              <div
                className={cn(
                  "border rounded-md p-3 flex items-center justify-center gap-2 cursor-pointer",
                  paymentMethod === value
                    ? "border-teal-500 text-teal-600 bg-teal-50"
                    : "border-gray-200 bg-gray-50"
                )}
              >
                <RadioGroupItem value={value} id={value} className="sr-only" />
                <Label htmlFor={value} className="flex items-center gap-2 cursor-pointer">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
