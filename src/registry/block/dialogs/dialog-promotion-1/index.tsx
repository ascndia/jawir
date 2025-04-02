"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/registry/components/dialog/dialog-shadcn/dialog";
import { Button } from "@/registry/components/button/select";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export function DialogPromotion1A({
    open,
    onOpenChange,
}: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) {

  return (
    <div>
      <Button onClick={() => onOpenChange?.(true)}>View Premium Offer</Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Left content section - takes 3/5 on medium screens */}
            <div className="p-6 md:col-span-3">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-bold">Upgrade to Premium</DialogTitle>
                <DialogDescription className="text-base mt-2">
                  Take your experience to the next level with our premium plan. Get access to all features and unlock your full potential.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 my-6">
                <h4 className="text-sm font-medium">Premium benefits include:</h4>
                <ul className="space-y-3">
                  {[
                    "Unlimited access to all premium features",
                    "Priority customer support 24/7",
                    "Advanced analytics and reporting tools",
                    "Custom branding options for your projects",
                    "Collaboration tools for your entire team",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
                <Button 
                  onClick={() => onOpenChange?.(false)} 
                  variant="default" 
                  className="w-full sm:w-auto"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => onOpenChange?.(false)} 
                  variant="outline" 
                  className="w-full sm:w-auto"
                >
                  Continue with Free Plan
                </Button>
              </DialogFooter>
            </div>

            {/* Right image section - takes 2/5 on medium screens */}
            <div className="hidden md:block md:col-span-2 bg-muted relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/ComfyUI_0001.png"
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
    </div>
  );
}