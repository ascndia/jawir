"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle, ArrowRight, Building, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
    "Unlimited access to all premium features",
    "Priority customer support 24/7",
    "Advanced analytics and reporting tools",
    "Custom branding options for your projects",
    "Collaboration tools for your entire team",
  ];

export function DialogPromotion1A({
    open,
    onOpenChange,
}: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-4 gap-0">
            {/* Left content section - takes 2/4 on medium screens */}
            <div className="p-6 md:col-span-2">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-bold">Upgrade to Premium</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  Take your experience to the next level with our premium plan. Get access to all features and unlock your full potential.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-6">
                <h4 className="text-sm font-medium">Premium benefits include:</h4>
                <ul className="space-y-3">
                  {features.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <DialogFooter className="flex-col sm:flex-col mt-6 !gap-2">
                <Button
                  onClick={() => onOpenChange?.(false)} 
                  variant="default" 
                  className="w-full"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => onOpenChange?.(false)} 
                  variant="outline" 
                  className="w-full"
                >
                  Continue with Free Plan
                </Button>
              </DialogFooter>
            </div>

            {/* Right image section - takes 2/4 on medium screens */}
            <div className="hidden md:block md:col-span-2 bg-muted relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="https://content-management-files.canva.com/ba8d7ee6-3df0-4596-8e8f-044a305c4d3d/78697aa1-1660-42f3-9399-2b85512e9582.png"
                  alt="Premium product visualization"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}


export function DialogPromotion1B({
    open,
    onOpenChange,
    }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = React.useState<"team" | "individual">("team");

  const teamBenefits = [
    "Unlimited access for your entire team",
    "Centralized team management dashboard",
    "Advanced collaboration tools",
    "Custom team workspaces",
    "Priority enterprise support 24/7",
  ];

  const individualBenefits = [
    "Unlimited personal projects",
    "Advanced personal analytics",
    "Premium templates library access",
    "Personal cloud storage (100GB)",
    "Priority support via email",
  ];

  const getTitle = () => {
    return mode === "team" 
      ? "Team Premium Plan" 
      : "Individual Premium Plan";
  };

  const getDescription = () => {
    return mode === "team"
      ? "Empower your team with advanced collaboration tools and dedicated support."
      : "Upgrade your personal experience with premium features tailored for individuals.";
  };

  const getBenefits = () => {
    return mode === "team" ? teamBenefits : individualBenefits;
  };

  const getImageSrc = () => {
    return mode === "team" 
      ? "https://content-management-files.canva.com/ba8d7ee6-3df0-4596-8e8f-044a305c4d3d/78697aa1-1660-42f3-9399-2b85512e9582.png" 
      : "https://static.canva.com/web/images/5718ed57618dbb1bd6e2fab9ef023722.png";
  };

  const getPricingUrl = () => {
    return mode === "team" 
      ? "/pricing?plan=team" 
      : "/pricing?plan=individual";
  };

  return (

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-4 gap-0">
            {/* Left content section - takes 2/4 on medium screens */}
            <div className="p-6 md:col-span-2">
              <DialogHeader className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Button 
                    variant={mode === "team" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMode("team")}
                    className="rounded-full flex items-center gap-1.5"
                  >
                    <Building className="h-3.5 w-3.5" />
                    Team
                  </Button>
                  <Button 
                    variant={mode === "individual" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setMode("individual")}
                    className="rounded-full flex items-center gap-1.5"
                  >
                    <User className="h-3.5 w-3.5" />
                    Individual
                  </Button>
                </div>

                <DialogTitle className="text-2xl font-bold">{getTitle()}</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {getDescription()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-6">
                <h4 className="text-sm font-medium">Premium benefits include:</h4>
                <ul className="space-y-3">
                  {getBenefits().map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <DialogFooter className="flex-col sm:flex-col mt-6 !gap-2">
                <Button 
                  onClick={() => window.location.href = getPricingUrl()} 
                  variant="default" 
                  className="w-full sm:w-auto"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => setMode(mode === "team" ? "individual" : "team")} 
                  variant="outline" 
                  className="w-full sm:w-auto"
                >
                  {mode === "team" ? "Switch to Individual" : "Switch to Team"}
                </Button>
              </DialogFooter>
            </div>

            {/* Right image section - takes 2/4 on medium screens */}
            <div className="hidden md:block md:col-span-2 bg-muted relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={getImageSrc()}
                  alt={`${mode} premium visualization`}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}


export function DialogPromotion1C({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const features = [
    {
      title: "All Design Assets",
      description: "Unlimited access to all design assets, including templates, graphics, and more.",
    },
    {
      title: "New Assets Added Daily",
      description: "Get access to our growing library of design assets, with new assets added daily.",
    },
    {
      title: "Commercial Use",
      description: "Use our design assets for personal or commercial projects, with no restrictions.",
    },
  ];
  const plans = [
    {
      label: "Team Plan",
      title: "For teams and businesses",
      price: "$299/month",
    },
    {
      label: "Individual Plan",
      title: "For individuals",
      price: "$89/month",
    },
  ];
  const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-4 gap-0">
          {/* Left content section */}
          <div className="p-6 md:col-span-2">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold">Pro Access</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Design better and spend less time without restricting creative freedom.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-6">
              {features.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">{detail.title}</h4>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <RadioGroup
              onValueChange={(value) => setSelectedPlan(value)} // Replace with your handler
              className="grid grid-cols-2 gap-3"
            >
              {plans.map((plan, index) => (
                <label
                  key={index}
                  htmlFor={`plan-${index}`}
                  className={`border rounded-lg p-4 cursor-pointer transition ${
                    selectedPlan === plan.title
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-muted"
                  }`}
                >
                  <RadioGroupItem
                    id={`plan-${index}`}
                    value={plan.title}
                    className="hidden"
                  />
                  <Badge
                    variant={plan.label === "Team Plan" ? "default" : "outline"}
                    className="text-xs font-medium"
                  >
                    {plan.label}
                  </Badge>
                  <h4
                    className={`text-lg font-bold mt-1 ${
                      selectedPlan === plan.title ? "text-primary" : ""
                    }`}
                  >
                    {plan.title}
                  </h4>
                  <p className="text-sm mt-1">{plan.price}</p>
                </label>
              ))}
            </RadioGroup>

            <DialogFooter className="flex-col sm:flex-row mt-4 gap-2">
              <Button
                onClick={() => onOpenChange?.(false)}
                variant="default"
                className="w-full"
              >
                Start 30 day trial
              </Button>
            </DialogFooter>
          </div>

          {/* Right image section */}
          <div className="hidden md:block md:col-span-2 bg-muted relative">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="https://content-management-files.canva.com/ba8d7ee6-3df0-4596-8e8f-044a305c4d3d/78697aa1-1660-42f3-9399-2b85512e9582.png"
                alt="Pro Access visualization"
                fill
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}