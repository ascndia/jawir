"use client";

import * as React from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/registry/components/label";
import { Input } from "@/registry/components/input";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { Separator } from "@/registry/components/separator";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: PlanFeature[];
  popular?: boolean;
}

interface SubscriptionUpgradeDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUpgrade?: (planId: string, billingCycle: "monthly" | "yearly") => void;
  onCancel?: () => void;
  isLoading?: boolean;
  currentPlanId?: string;
  plans?: Plan[];
  currency?: string;
}

export default function SubscriptionUpgradeDialog({
  open = false,
  onOpenChange,
  onUpgrade,
  onCancel,
  isLoading = false,
  currentPlanId = "basic",
  plans = [
    {
      id: "basic",
      name: "Basic",
      description: "Essential features for individuals",
      price: {
        monthly: 9,
        yearly: 90,
      },
      features: [
        { name: "Up to 5 projects", included: true },
        { name: "1 GB storage", included: true },
        { name: "Basic analytics", included: true },
        { name: "24/7 support", included: false },
        { name: "Advanced security", included: false },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Perfect for professionals and small teams",
      price: {
        monthly: 19,
        yearly: 190,
      },
      features: [
        { name: "Unlimited projects", included: true },
        { name: "10 GB storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "24/7 support", included: true },
        { name: "Advanced security", included: false },
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      price: {
        monthly: 49,
        yearly: 490,
      },
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced security", included: true },
      ],
    },
  ],
  currency = "USD",
}: SubscriptionUpgradeDialogProps) {
  const [selectedPlanId, setSelectedPlanId] = React.useState<string>("");
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">(
    "monthly"
  );
  const [paymentStep, setPaymentStep] = React.useState<"plan" | "payment">(
    "plan"
  );

  // Payment form state
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardName, setCardName] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  React.useEffect(() => {
    if (open) {
      // Set the next tier as default selected plan
      const currentPlanIndex = plans.findIndex(
        (plan) => plan.id === currentPlanId
      );
      const nextPlanIndex = Math.min(currentPlanIndex + 1, plans.length - 1);
      setSelectedPlanId(plans[nextPlanIndex].id);
      setPaymentStep("plan");
    } else {
      // Reset form state when dialog closes
      setCardNumber("");
      setCardName("");
      setExpiryDate("");
      setCvv("");
    }
  }, [open, currentPlanId, plans]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleContinue = () => {
    setPaymentStep("payment");
  };

  const handleUpgrade = () => {
    onUpgrade?.(selectedPlanId, billingCycle);
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  const selectedPlan =
    plans.find((plan) => plan.id === selectedPlanId) || plans[0];
  const isCurrentPlan = selectedPlanId === currentPlanId;
  const yearlyDiscount = Math.round(
    (1 - selectedPlan.price.yearly / (selectedPlan.price.monthly * 12)) * 100
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upgrade Your Subscription</DialogTitle>
          <DialogDescription>
            Choose a plan that works best for you and your team.
          </DialogDescription>
        </DialogHeader>

        {paymentStep === "plan" ? (
          <>
            <div className="mt-4">
              <Tabs
                defaultValue="monthly"
                value={billingCycle}
                onValueChange={(value) =>
                  setBillingCycle(value as "monthly" | "yearly")
                }
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Select a Plan</h3>
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">
                      Yearly
                      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Save {yearlyDiscount}%
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="monthly" className="mt-4 space-y-4">
                  <RadioGroup
                    value={selectedPlanId}
                    onValueChange={handlePlanSelect}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    {plans.map((plan) => (
                      <Label
                        key={plan.id}
                        htmlFor={`plan-${plan.id}-monthly`}
                        className={`flex cursor-pointer flex-col rounded-lg border p-4 ${
                          plan.id === selectedPlanId
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent"
                        } ${plan.popular ? "relative" : ""}`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2 right-4 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                            Popular
                          </span>
                        )}
                        <RadioGroupItem
                          value={plan.id}
                          id={`plan-${plan.id}-monthly`}
                          className="sr-only"
                        />
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-lg font-medium">
                            {plan.name}
                          </span>
                          {plan.id === currentPlanId && (
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        <div className="mt-auto">
                          <div className="mb-2">
                            <span className="text-2xl font-bold">
                              {formatCurrency(plan.price.monthly)}
                            </span>
                            <span className="text-muted-foreground">
                              /month
                            </span>
                          </div>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                {feature.included ? (
                                  <Check className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                  <Check className="mr-2 h-4 w-4 text-muted-foreground opacity-30" />
                                )}
                                <span
                                  className={
                                    feature.included
                                      ? ""
                                      : "text-muted-foreground"
                                  }
                                >
                                  {feature.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </TabsContent>

                <TabsContent value="yearly" className="mt-4 space-y-4">
                  <RadioGroup
                    value={selectedPlanId}
                    onValueChange={handlePlanSelect}
                    className="grid gap-4 md:grid-cols-3"
                  >
                    {plans.map((plan) => (
                      <Label
                        key={plan.id}
                        htmlFor={`plan-${plan.id}-yearly`}
                        className={`flex cursor-pointer flex-col rounded-lg border p-4 ${
                          plan.id === selectedPlanId
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-accent"
                        } ${plan.popular ? "relative" : ""}`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2 right-4 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                            Popular
                          </span>
                        )}
                        <RadioGroupItem
                          value={plan.id}
                          id={`plan-${plan.id}-yearly`}
                          className="sr-only"
                        />
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-lg font-medium">
                            {plan.name}
                          </span>
                          {plan.id === currentPlanId && (
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        <div className="mt-auto">
                          <div className="mb-2">
                            <span className="text-2xl font-bold">
                              {formatCurrency(plan.price.yearly / 12)}
                            </span>
                            <span className="text-muted-foreground">
                              /month
                            </span>
                          </div>
                          <p className="mb-2 text-sm text-muted-foreground">
                            Billed annually as{" "}
                            {formatCurrency(plan.price.yearly)}
                          </p>
                          <ul className="space-y-2 text-sm">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                {feature.included ? (
                                  <Check className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                  <Check className="mr-2 h-4 w-4 text-muted-foreground opacity-30" />
                                )}
                                <span
                                  className={
                                    feature.included
                                      ? ""
                                      : "text-muted-foreground"
                                  }
                                >
                                  {feature.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleContinue}
                className="w-full sm:w-auto"
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Continue"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{selectedPlan.name} Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      {billingCycle === "monthly"
                        ? `${formatCurrency(selectedPlan.price.monthly)}/month`
                        : `${formatCurrency(selectedPlan.price.yearly)}/year`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setPaymentStep("plan")}
                  >
                    Change
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Payment Method</h3>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                        className="pl-10"
                      />
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input
                      id="card-name"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) =>
                          setExpiryDate(formatExpiryDate(e.target.value))
                        }
                        maxLength={5}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      {selectedPlan.name} Plan ({billingCycle})
                    </span>
                    <span>
                      {billingCycle === "monthly"
                        ? formatCurrency(selectedPlan.price.monthly)
                        : formatCurrency(selectedPlan.price.yearly)}
                    </span>
                  </div>

                  {billingCycle === "yearly" && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Yearly discount ({yearlyDiscount}%)</span>
                      <span>
                        -
                        {formatCurrency(
                          selectedPlan.price.monthly * 12 -
                            selectedPlan.price.yearly
                        )}
                      </span>
                    </div>
                  )}

                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      {billingCycle === "monthly"
                        ? formatCurrency(selectedPlan.price.monthly)
                        : formatCurrency(selectedPlan.price.yearly)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => setPaymentStep("plan")}
                className="w-full sm:w-auto"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                onClick={handleUpgrade}
                className="w-full sm:w-auto"
                disabled={
                  !cardNumber || !cardName || !expiryDate || !cvv || isLoading
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Upgrade Now`
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
