"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CreditCard,
  User,
  Package,
  CheckCircle,
  Loader2,
  Calendar,
} from "lucide-react";

import { Button } from "@/registry/components/button/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/components/form";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Checkbox } from "@/registry/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";

// Define schemas for each step
const planSchema = z.object({
  plan: z.enum(["basic", "pro", "enterprise"], {
    required_error: "Please select a subscription plan",
  }),
  billingCycle: z.enum(["monthly", "yearly"], {
    required_error: "Please select a billing cycle",
  }),
});

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number")
    .optional(),
});

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^[0-9]{16}$/, "Card number must be 16 digits"),
  cardholderName: z.string().min(2, "Please enter the cardholder name"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "Please use MM/YY format"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
  savePaymentInfo: z.boolean().optional(),
});

// Combine all schemas
const subscriptionFormSchema = z.object({
  ...planSchema.shape,
  ...personalInfoSchema.shape,
  ...paymentSchema.shape,
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

// Pricing data
const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    features: ["5 Projects", "Basic Analytics", "24/7 Support"],
  },
  {
    id: "pro",
    name: "Professional",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    features: [
      "Unlimited Projects",
      "Advanced Analytics",
      "Priority Support",
      "Custom Domains",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    features: [
      "Unlimited Everything",
      "Dedicated Account Manager",
      "Custom Integrations",
      "SLA Guarantee",
    ],
  },
];

export default function FormSubscription1() {
  const [step, setStep] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize form with all fields from the combined schema
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      plan: "pro",
      billingCycle: "monthly",
      fullName: "",
      email: "",
      company: "",
      phoneNumber: "",
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
      savePaymentInfo: false,
      termsAccepted: true,
    },
    mode: "onChange",
  });

  // Get values for displaying selected plan details
  const selectedPlan = form.watch("plan");
  const selectedBillingCycle = form.watch("billingCycle");
  const selectedPlanData = pricingPlans.find(
    (plan) => plan.id === selectedPlan
  );

  // Handle next step
  const handleNext = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger(["plan", "billingCycle"]);
    } else if (step === 2) {
      isValid = await form.trigger([
        "fullName",
        "email",
        "company",
        "phoneNumber",
      ]);
    }

    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  // Handle form submission
  const onSubmit = (data: SubscriptionFormValues) => {
    setIsPending(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Subscription data:", data);
      setIsPending(false);
      setIsComplete(true);
      toast.success("Subscription successful!", {
        description: `You are now subscribed to the ${selectedPlanData?.name} plan.`,
        duration: 5000,
      });
    }, 2000);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  // Get price based on selected plan and billing cycle
  const getPrice = () => {
    if (!selectedPlanData) return "0";

    const price =
      selectedBillingCycle === "monthly"
        ? selectedPlanData.monthlyPrice
        : selectedPlanData.yearlyPrice;

    return price.toFixed(2);
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isComplete ? "Subscription Complete" : "Choose Your Subscription"}
        </CardTitle>
        <CardDescription>
          {isComplete
            ? "Thank you for subscribing to our service."
            : "Select a plan that works best for you."}
        </CardDescription>

        {!isComplete && (
          <div className="mt-4">
            <div className="flex justify-between">
              <div
                className={`flex items-center ${
                  step >= 1 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                  <Package className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm font-medium">Plan</span>
              </div>
              <div className="flex-1 border-t border-muted mx-4 mt-4" />
              <div
                className={`flex items-center ${
                  step >= 2 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                  <User className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm font-medium">Details</span>
              </div>
              <div className="flex-1 border-t border-muted mx-4 mt-4" />
              <div
                className={`flex items-center ${
                  step >= 3 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-current">
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="ml-2 text-sm font-medium">Payment</span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pb-6">
            {isComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-medium">Subscription Confirmed!</h3>
                <p className="text-center text-muted-foreground max-w-md">
                  You have successfully subscribed to the{" "}
                  {selectedPlanData?.name} plan. You will be charged $
                  {getPrice()}{" "}
                  {selectedBillingCycle === "monthly"
                    ? "per month"
                    : "per year"}
                  .
                </p>
                <div className="mt-4 p-4 bg-muted/50 rounded-lg w-full max-w-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium">
                      {selectedPlanData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Billing:</span>
                    <span className="font-medium capitalize">
                      {selectedBillingCycle}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">${getPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Next billing date:
                    </span>
                    <span className="font-medium">
                      {new Date(
                        Date.now() +
                          (selectedBillingCycle === "monthly" ? 30 : 365) *
                            24 *
                            60 *
                            60 *
                            1000
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    form.reset();
                    setStep(1);
                    setIsComplete(false);
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Start Over
                </Button>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="billingCycle"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Billing Cycle</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="monthly" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Monthly
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="yearly" />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    Yearly (Save 15%)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="plan"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Subscription Plan</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                              >
                                {pricingPlans.map((plan) => (
                                  <FormItem key={plan.id} className="space-y-0">
                                    <FormControl>
                                      <RadioGroupItem
                                        value={plan.id}
                                        className="sr-only"
                                        id={`plan-${plan.id}`}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={`plan-${plan.id}`}
                                      className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${
                                        field.value === plan.id
                                          ? "border-primary bg-primary/5"
                                          : "border-muted hover:border-muted-foreground/50"
                                      } ${
                                        plan.recommended
                                          ? "ring-2 ring-primary/20"
                                          : ""
                                      }`}
                                    >
                                      {plan.recommended && (
                                        <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full self-start mb-2">
                                          Recommended
                                        </span>
                                      )}
                                      <span className="font-medium text-lg">
                                        {plan.name}
                                      </span>
                                      <span className="text-2xl font-bold mt-1">
                                        $
                                        {field.value === plan.id &&
                                        selectedBillingCycle === "monthly"
                                          ? plan.monthlyPrice.toFixed(2)
                                          : plan.yearlyPrice.toFixed(2)}
                                        <span className="text-sm font-normal text-muted-foreground">
                                          /
                                          {selectedBillingCycle === "monthly"
                                            ? "mo"
                                            : "yr"}
                                        </span>
                                      </span>
                                      <ul className="mt-3 space-y-2 text-sm">
                                        {plan.features.map((feature, i) => (
                                          <li
                                            key={i}
                                            className="flex items-center"
                                          >
                                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                            {feature}
                                          </li>
                                        ))}
                                      </ul>
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              Selected Plan: {selectedPlanData?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground capitalize">
                              {selectedBillingCycle} billing
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${getPrice()}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedBillingCycle === "monthly"
                                ? "per month"
                                : "per year"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="you@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 000-0000"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">
                              Selected Plan: {selectedPlanData?.name}
                            </h3>
                            <p className="text-sm text-muted-foreground capitalize">
                              {selectedBillingCycle} billing
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${getPrice()}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedBillingCycle === "monthly"
                                ? "per month"
                                : "per year"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="1234 5678 9012 3456"
                                    {...field}
                                    onChange={(e) => {
                                      const formatted = formatCardNumber(
                                        e.target.value
                                      );
                                      e.target.value = formatted;
                                      field.onChange(
                                        formatted.replace(/\s/g, "")
                                      );
                                    }}
                                    maxLength={19}
                                  />
                                  <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardholderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="MM/YY"
                                      {...field}
                                      onChange={(e) => {
                                        const formatted = formatExpiryDate(
                                          e.target.value
                                        );
                                        e.target.value = formatted;
                                        field.onChange(formatted);
                                      }}
                                      maxLength={5}
                                    />
                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="123"
                                    {...field}
                                    maxLength={4}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="savePaymentInfo"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Save payment information for future purchases
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I agree to the{" "}
                                  <a
                                    href="#"
                                    className="text-primary underline"
                                  >
                                    terms and conditions
                                  </a>{" "}
                                  and{" "}
                                  <a
                                    href="#"
                                    className="text-primary underline"
                                  >
                                    privacy policy
                                  </a>
                                </FormLabel>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </CardContent>

          {!isComplete && (
            <CardFooter className="flex justify-between border-t px-6 py-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isPending}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div> // Empty div to maintain layout
              )}

              {step < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Complete Subscription</>
                  )}
                </Button>
              )}
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
