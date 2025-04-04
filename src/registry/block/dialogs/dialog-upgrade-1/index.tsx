import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component from shadcn
import { CheckCircle, LayoutDashboard } from "lucide-react"; // Icon for the checkmarks

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogUpgrade1A({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Mock logo */}
          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-xl font-semibold">Upgrade to a paid plan</span>
        </div>
      }
      description="Upgrade to a paid plan to unlock more features"
      footer={
        <Button
          className="w-full"
          onClick={() => alert("Upgrade clicked!")}
        >
          Upgrade
        </Button>
      }
    >
      <ul className="space-y-4">
        {[
          "Unlimited projects",
          "Unlimited templates",
          "AI Background removal",
          "AI Image generation",
        ].map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <CheckCircle className="text-blue-500" size={20} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </ReusableDialog>
  );
}

export function DialogUpgrade1B({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Mock logo */}
          <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">Upgrade Your Plan</span>
        </div>
      }
      description={
        <span className=" text-gray-600">
          Unlock premium features and take your experience to the next level.
        </span>
      }
      footer={
        <div className="flex flex-col space-y-2 w-full">
          <Button
            className="w-full"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Premium Features:</h3>
        <ul className="space-y-3">
          {[
            "Unlimited projects",
            "Access to premium templates",
            "AI-powered background removal",
            "High-quality image generation",
          ].map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CheckCircle className="text-green-500" size={20} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </ReusableDialog>
  );
}

export function DialogUpgrade1C({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
    className="text-center"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Mock logo */}
          <div className="h-14 w-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            Upgrade to Premium
          </span>
        </div>
      }
      description={
        <span className=" text-gray-600">
          Get access to exclusive features and enhance your experience.
        </span>
      }
      footer={
        <div className="flex flex-col space-y-3 w-full">
          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Premium Features:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            "Unlimited projects",
            "Premium templates",
            "AI Background removal",
            "High-quality image generation",
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg"
            >
              <CheckCircle className="text-purple-500" size={20} />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </ReusableDialog>
  );
}

export function DialogUpgrade1D({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      className="bg-gray-50"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Mock logo */}
          <div className="h-16 w-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Go Premium Today
          </span>
        </div>
      }
      description={
        <span className="text-gray-700">
          Unlock advanced tools and elevate your productivity.
        </span>
      }
      footer={
        <div className="flex flex-col space-y-4 w-full">
          <Button
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Premium Benefits:
        </h3>
        <ul className="space-y-3">
          {[
            "Priority support",
            "Advanced analytics",
            "Custom branding options",
            "Early access to new features",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CheckCircle className="text-teal-500" size={20} />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </ReusableDialog>
  );
}

export function DialogUpgrade1E({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      className="bg-gradient-to-b from-gray-100 to-gray-50"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Mock logo */}
          <div className="h-14 w-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Unlock Exclusive Access
          </span>
        </div>
      }
      description={
        <span className="text-gray-700">
          Upgrade now to enjoy unparalleled features and benefits.
        </span>
      }
      footer={
        <div className="flex flex-col space-y-3 w-full">
          <Button
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700"
            onClick={() => onOpenChange(false)}
          >
            Not Now
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Why Go Premium?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Exclusive templates",
            "Faster processing",
            "Priority customer support",
            "Early feature access",
            "Enhanced security",
            "Unlimited storage",
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm"
            >
              <CheckCircle className="text-orange-500" size={20} />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </ReusableDialog>
  );
}

export function DialogUpgrade1F({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      headerAlignment="left"
      onOpenChange={onOpenChange}
      title="Upgrade to Pro"
      description="Unlock premium features and take your experience to the next level."
      footer={
        <div className="flex space-x-2 justify-start w-full">
          <Button
          >
            Upgrade
          </Button>
          <Button
            variant="outline"
          >
            Compare Plan
          </Button>

        </div>
      }
    >
    </ReusableDialog>
  );
}


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function DialogUpgrade1G({ open, onOpenChange }: Props) {
  const [selectedPlan, setSelectedPlan] = React.useState<string>("yearly");

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-800">Elevate Your Development</span>
          <span className="text-sm text-gray-600">Everything you need to build exceptional interfaces</span>
        </div>
      }
      className="!max-w-lg"
      footer={
        <Button
          className="w-full"
          onClick={() => alert(`Selected Plan: ${selectedPlan}`)}
        >
          Pay Now →
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Plan Selection */}
        <div className="border rounded-lg">
          <RadioGroup
          className="gap-0"
            value={selectedPlan}
            onValueChange={setSelectedPlan}
          >
            <label className="flex items-center  p-4 justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="yearly" checked={selectedPlan === "yearly"} />
                <span className="font-medium text-gray-800">Yearly</span>
              </div>
              <span className="text-gray-800 font-semibold">$89/year</span>
            </label>
            <Separator/>
            <label className="flex items-center  p-4 justify-between cursor-pointer">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="monthly" checked={selectedPlan === "monthly"} />
                <span className="font-medium text-gray-800">Monthly</span>
              </div>
              <span className="text-gray-800 font-semibold">$19/month</span>
            </label>
          </RadioGroup>
          <Separator/>
          <p className="text-sm text-gray-600 p-4">
            Need a custom solution?{" "}
            <a href="#" className="text-blue-500 underline">
              Contact us
            </a>{" "}
            about enterprise.
          </p>
        </div>


        {/* What's Included */}
        <div className="p-4 bg-gray-50 border rounded-lg">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">What's Included</h3>
          <ul className="space-y-2">
            {[
              "Access to all premium components and templates",
              "Advanced theming and customization tools",
              "Priority support and dedicated assistance",
              "Early access to new features and components",
              "Unlimited projects and commercial usage",
            ].map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ReusableDialog>
  );
}


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogUpgrade1H({ open, onOpenChange }: Props) {
  const [selectedPlan, setSelectedPlan] = React.useState<string>("monthly");

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Get real fans faster</span>
        </div>
      }
      description="Want to reach more real fans and grow a much bigger and better fan community? Go PRO now!"
      footer={
        <div className="flex justify-between items-center w-full pt-4">
          <div className="flex items-end">
            <span className="text-3xl font-bold text-gray-800">$8</span>
            <span className="text-sm text-gray-600">/mo (billed monthly)</span>
          </div>
          <Button
            className="bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => alert(`Selected Plan: ${selectedPlan}`)}
          >
            Upgrade to Pro
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Plan Selection */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Select your plan</h3>
          <RadioGroup
            value={selectedPlan}
            onValueChange={setSelectedPlan}
            className="flex items-center"
          >
            <label className="flex flex-1 items-center space-x-2 cursor-pointer border rounded-xl p-2">
              <RadioGroupItem value="monthly" checked={selectedPlan === "monthly"} />
                <span className="font-medium text-gray-800">Monthly</span>
              </label>
              <label className="flex flex-1 items-center space-x-2 cursor-pointer border rounded-xl p-2">
                <RadioGroupItem value="annual" checked={selectedPlan === "annual"} />
                <span className="font-medium text-gray-800">Annual</span>
                <span className="text-xs bg-gray-200 text-gray-600 px-2  py-1 rounded-full ml-auto">
                  BEST VALUE
                </span>
              </label>
            </RadioGroup>
        </div>

        {/* What You Get */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-4">What you get</h3>
          <ul className="space-y-2">
            {[
              "Grow fans and followers on multiple social platforms",
              "Promote more content with email automation",
              "Showcase your content to thousands of fans in New Finds",
            ].map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-sm text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ReusableDialog>
  );
}

export function DialogUpgrade1I({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div>
          <h2 className="text-xl font-bold">Get Started with a v0 Team Plan</h2>
        </div>
      }
      description={
        <span className="text-text-secondary">
          In order to use v0 with <span className="font-semibold">ascndia's projects</span>, you must start a v0 Team plan.
        </span>
      }
      className="!max-w-md"
      footer={
        <div className="flex gap-2 justify-between items-center w-full">
          <Button
          className="flex-1"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            onClick={() => alert("Team Plan Started!")}
          >
            Start a Team Plan
          </Button>
        </div>
      }
    >
    <div className="space-y-4">
      {/* Plan Details */}
      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold text-foreground">Team</h3>
        <div className="flex items-center gap-1">
          <p className="text-2xl font-bold text-foreground">$30</p>
          <p className="text-sm text-muted-foreground">/user/month</p>
        </div>
        <h4 className="mt-4 text-sm font-semibold text-foreground">For fast-moving teams:</h4>
        <ul className="space-y-2 mt-2">
          {[
            "Everything in Premium",
            "Even higher messaging limits",
            "Centralized billing on Vercel",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <CheckCircle className="text-primary" size={16} />
              <span className="text-sm text-muted-foreground">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn More */}
      <p className="text-sm text-muted-foreground">
        Learn more by visiting our{" "}
        <a href="#" className="text-primary underline">
          pricing page
        </a>
        .
      </p>
    </div>

    </ReusableDialog>
  );
}

export function DialogUpgrade1J({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <LayoutDashboard className="text-primary" size={24} />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Upgrade to Pro for Advanced Features
          </h2>
        </div>
      }
      description={
        <span className="text-sm text-muted-foreground text-center">
          Get access to premium features and tools to enhance your experience.
          Upgrade now to unlock the full potential of our platform.
          <br />
        </span>
      }
      className="!max-w-sm"
      footer={
        <div className="flex flex-col space-y-2 w-full">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade
          </Button>
          <Button
            variant="outline"
            className="w-full text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Back
          </Button>
        </div>
      }
    />
  );
}