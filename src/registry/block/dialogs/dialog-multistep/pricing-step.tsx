"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample currencies - in a real app, this would likely come from an API
const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
]

interface PricingStepProps {
  pricingModel: string
  price: number
  currency: string
  additionalDetails: string
  onPricingModelChange: (model: "hourly" | "fixed" | "tiered") => void
  onPriceChange: (price: number) => void
  onCurrencyChange: (currency: string) => void
  onAdditionalDetailsChange: (details: string) => void
  errors: {
    pricingModel?: string
    price?: string
    currency?: string
  }
}

export function PricingStep({
  pricingModel,
  price,
  currency,
  additionalDetails,
  onPricingModelChange,
  onPriceChange,
  onCurrencyChange,
  onAdditionalDetailsChange,
  errors,
}: PricingStepProps) {
  const selectedCurrency = currencies.find((c) => c.code === currency)

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <Label>Pricing Model</Label>
        <RadioGroup
          value={pricingModel}
          onValueChange={(value) => onPricingModelChange(value as "hourly" | "fixed" | "tiered")}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            <Label htmlFor="hourly" className="cursor-pointer">
              <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
              <RadioGroupItem value="hourly" id="hourly" />
                Hourly Rate
              </div>
            </Label>
            <Label htmlFor="fixed" className="cursor-pointer">
              <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                <RadioGroupItem value="fixed" id="fixed" />
                  Fixed Price
              </div>
            </Label>
            <Label htmlFor="tiered" className="cursor-pointer">
              <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-muted">
                <RadioGroupItem value="tiered" id="tiered" />
                  Tiered Pricing
              </div>
            </Label>
        </RadioGroup>
        {errors.pricingModel && <p className="text-sm text-red-500">{errors.pricingModel}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">
            {pricingModel === "hourly"
              ? "Hourly Rate"
              : pricingModel === "fixed"
              ? "Fixed Price"
              : "Starting Price"}
          </Label>
          <div className="flex overflow-hidden rounded-md border border-input focus-within:ring-2 focus-within:ring-ring">
            <Select value={currency} onValueChange={onCurrencyChange}>
              <SelectTrigger
                id="currency"
                className={`w-24 rounded-none border-0 border-r border-input ${errors.currency ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="$" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price || ""}
              onChange={(e) => onPriceChange(Number.parseFloat(e.target.value) || 0)}
              className={`flex-grow rounded-none border-0 ${errors.price ? "border-red-500" : ""}`}
            />
          </div>
          {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
        </div>
      </div>


      {pricingModel === "tiered" && (
        <div className="p-4 bg-muted rounded-md">
          <p className="text-sm mb-2">
            With tiered pricing, you'll be able to add multiple service tiers with different features and prices after
            creating the service.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="additional-details">Additional Pricing Details (Optional)</Label>
        <Textarea
          id="additional-details"
          placeholder="Add any additional information about your pricing..."
          value={additionalDetails}
          onChange={(e) => onAdditionalDetailsChange(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Set clear pricing expectations for your clients.</p>
        <p>
          {pricingModel === "hourly"
            ? "For hourly rates, specify your rate per hour of work."
            : pricingModel === "fixed"
              ? "For fixed pricing, specify the total cost for the complete service."
              : "For tiered pricing, specify your starting price and you can add tiers later."}
        </p>
      </div>
    </div>
  )
}

