import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogReminder1A({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <span className="text-white font-bold text-lg">!</span>
          </div>
          <span className="text-2xl font-bold text-gray-800">
            Trial Expiring Soon
          </span>
        </div>
      }
      description={
        <span className="text-gray-700">
          Your free trial is ending in 3 days. Upgrade now to continue enjoying premium features without interruption.
        </span>
      }
      footer={
        <div className="flex flex-col space-y-3 w-full">
          <Button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
            onClick={() => alert("Upgrade clicked!")}
          >
            Upgrade Now
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700"
            onClick={() => onOpenChange(false)}
          >
            Remind Me Later
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Why Upgrade?
        </h3>
        <ul className="space-y-3">
          {[
            "Unlimited access to premium features",
            "Priority customer support",
            "Exclusive templates and tools",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="text-blue-500">✔</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </ReusableDialog>
  );
}

export function DialogReminder1B({ open, onOpenChange }: Props) {
    return (
      <ReusableDialog
        className="bg-gradient-to-br from-purple-50 to-pink-50"
        open={open}
        onOpenChange={onOpenChange}
        headerAlignment="left"
        title={
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">⏰</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Time is running out!
            </span>
          </div>
        }
        description={
          <span className="text-gray-700 mt-2">
            Your trial ends tomorrow. Upgrade now to maintain access to all premium features.
          </span>
        }
        footer={
          <div className="flex flex-row space-x-3 w-full">
            <Button
              className="flex-1  bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
              onClick={() => alert("Upgrade clicked!")}
            >
              Upgrade Now
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700"
              onClick={() => onOpenChange(false)}
            >
              Maybe Later
            </Button>
          </div>
        }
      >
        <div className="space-y-5 mt-2">
          <div className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm">
            <h3 className="text-md font-medium text-gray-800 mb-3">
              What you'll lose without premium:
            </h3>
            <ul className="space-y-2">
              {[
                "Advanced analytics and reporting",
                "Collaborative workspace features",
                "Unlimited project storage",
                "24/7 priority support"
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-pink-500 text-lg">•</span>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-center text-sm text-gray-500">
            Upgrade today and get 20% off your first 3 months!
          </p>
        </div>
      </ReusableDialog>
    );
  }