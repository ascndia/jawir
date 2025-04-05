"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const stepContent = [
  {
    title: "Welcome to Origin UI",
    description:
      "Discover a powerful collection of components designed to enhance your development workflow.",
  },
  {
    title: "Customizable Components",
    description:
      "Each component is fully customizable and built with modern web standards in mind.",
  },
  {
    title: "Ready to Start?",
    description:
      "Begin building amazing interfaces with our comprehensive component library.",
  },
  {
    title: "Get Support",
    description:
      "Access our extensive documentation and community resources to make the most of Origin UI.",
  },
];

interface DialogOnboardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function DialogOnboarding1A({ open, onOpenChange }: DialogOnboardingProps) {
  const [step, setStep] = useState(1);

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        onOpenChange(!open);
        setStep(1); // Reset step when dialog is closed
        }}
      open={open}
    >
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-lg"
            src="https://originui.com/dialog-content.png"
            width={382}
            height={216}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">Skip</Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogOnboarding1B({ open, onOpenChange }: DialogOnboardingProps) {
  const [step, setStep] = useState(1);

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        onOpenChange(!open);
        setStep(1); // Reset step when dialog is closed
      }}
      open={open}
    >
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-lg"
            src="https://originui.com/dialog-content.png"
            width={382}
            height={216}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter className="flex gap-2">
              {step > 1 && (
                <Button
                  className="group"
                  type="button"
                  onClick={handlePrevious}
                >
                  <ArrowLeft
                    className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DialogOnboarding1C({ open, onOpenChange }: DialogOnboardingProps) {
  const [step, setStep] = useState(1);

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        onOpenChange(!open);
        setStep(1); // Reset step when dialog is closed
      }}
      open={open}
    >
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-lg"
            src="https://originui.com/dialog-content.png"
            width={382}
            height={216}
            alt="dialog"
          />
        </div>
        <div className="space-y-6 px-6 pb-6 pt-3">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-primary",
                    index + 1 === step ? "bg-primary" : "opacity-20"
                  )}
                />
              ))}
            </div>
            <DialogFooter className="flex gap-2">
              {step > 1 && (
              <>
                <Button
                  className="group"
                  type="button"
                  onClick={handlePrevious}
                >
                  <ArrowLeft
                    className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Previous
                </Button>
                <DialogClose asChild>
                  <Button type="button">Skip</Button>
                </DialogClose>
              </>
              )}
              {step < totalSteps ? (

                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRight
                    className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </Button>


              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



