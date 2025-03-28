"use client";

import * as React from "react";
import { User, Home, MapPin, Globe, Phone, Save } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select"; // Assuming standard path

// Example country list - replace with a more comprehensive list or fetch dynamically
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  // Add more countries as needed
];

interface AddressData {
  fullName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface CardFormShipping1Props {
  initialData?: Partial<AddressData>;
  onSave?: (data: AddressData) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
}

export function CardFormShipping1({
  initialData = {},
  onSave,
  onCancel,
  title = "Shipping Address",
  description = "Enter the address where you want your order delivered.",
}: CardFormShipping1Props) {
  const [formData, setFormData] = React.useState<AddressData>({
    fullName: initialData.fullName ?? "",
    address1: initialData.address1 ?? "",
    address2: initialData.address2 ?? "",
    city: initialData.city ?? "",
    state: initialData.state ?? "",
    postalCode: initialData.postalCode ?? "",
    country: initialData.country ?? countries[0]?.code ?? "", // Default to first country or empty
    phone: initialData.phone ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof AddressData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      // Basic validation could be added here
      onSave(formData);
    }
    console.log("Saving shipping address:", formData);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form to initial data
    setFormData({
      fullName: initialData.fullName ?? "",
      address1: initialData.address1 ?? "",
      address2: initialData.address2 ?? "",
      city: initialData.city ?? "",
      state: initialData.state ?? "",
      postalCode: initialData.postalCode ?? "",
      country: initialData.country ?? countries[0]?.code ?? "",
      phone: initialData.phone ?? "",
    });
    console.log("Cancelled shipping address edit");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="fullName">
            <User className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address1">
            <Home className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Address Line 1
          </Label>
          <Input
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="123 Main St"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address2">
            Address Line 2{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">
            <MapPin className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            City
          </Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Anytown"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State / Province</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="CA"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="90210"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">
            <Globe className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Country
          </Label>
          <Select
            name="country"
            value={formData.country}
            onValueChange={(value) => handleSelectChange("country", value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="phone">
            <Phone className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Phone Number{" "}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
          <p className="text-xs text-muted-foreground">
            May be used for delivery questions.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Address
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardFormShipping1;
