"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FlagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/registry/components/button";

type TourStep = {
  title: string;
  description: string;
  image: React.ReactNode;
};

interface TourDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TourDialog = ({ open = true, onOpenChange }: TourDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps: TourStep[] = [
    {
      title: "Plan with work items",
      description:
        "The work item is the building block of the Plane. Most concepts in Plane are either associated with issues and their properties.",
      image: (
        <div className="relative w-full h-[400px] rounded-lg p-4 overflow-hidden">
          <div className="absolute top-2 left-2 right-2 flex items-center gap-2 bg-card p-2 rounded-md">
            <FlagIcon className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">Pulse Product Roadmap</span>
            <div className="ml-2 px-2 py-0.5 bg-muted rounded text-xs">96</div>
            <span className="ml-auto text-xs text-muted-foreground">
              Public
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-card rounded-md p-4 border">
              <div className="flex items-center gap-2">
                <ClipboardListIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Idea</span>
                <div className="ml-1 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs">
                  9
                </div>
                <div className="ml-auto flex gap-1">
                  <button className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-muted">
                    <span className="sr-only">Move</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 2C7.77614 2 8 1.77614 8 1.5C8 1.22386 7.77614 1 7.5 1C7.22386 1 7 1.22386 7 1.5C7 1.77614 7.22386 2 7.5 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M7.5 8C7.77614 8 8 7.77614 8 7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8 13.5C8 13.7761 7.77614 14 7.5 14C7.22386 14 7 13.7761 7 13.5C7 13.2239 7.22386 13 7.5 13C7.77614 13 8 13.2239 8 13.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <button className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-muted">
                    <span className="sr-only">Add</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 2.75H7V7H2.75V8H7V12.25H8V8H12.25V7H8V2.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-2 rounded bg-muted/50">
                  <div className="text-xs text-muted-foreground">ROADM-43</div>
                  <div className="font-medium">Predefined custom themes</div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded bg-muted text-xs">
                      Idea
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-[10px]">
                        O
                      </div>
                      <span>November</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">
                        Q
                      </div>
                      <span>Q4</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <span className="text-xs">Jan 17, 2024</span>
                      <span>•</span>
                      <span className="text-xs">Feb 02, 2024</span>
                    </div>
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-muted/70 flex items-center justify-center text-[10px] ring-2 ring-background">
                        J
                      </div>
                      <div className="w-6 h-6 rounded-full bg-muted/50 flex items-center justify-center text-[10px] ring-2 ring-background">
                        A
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded-full bg-muted/70 w-6 text-center text-xs">
                    4
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-md p-4 border">
              <div className="flex items-center gap-2">
                <ClipboardCheckIcon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Todo</span>
                <div className="ml-1 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs">
                  10
                </div>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-2 rounded bg-muted/50">
                  <div className="text-xs text-muted-foreground">ROADM-14</div>
                  <div className="font-medium">Message search</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Organize work with powerful views",
      description:
        "Organize your work with customizable views including Kanban boards, lists, and calendars to track progress.",
      image: (
        <div className="relative w-full h-[400px] rounded-lg p-4 overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
              <div className="bg-card rounded-md p-3 border shadow-sm">
                <h3 className="font-medium text-sm">To Do</h3>
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    Setup onboarding
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    Implement authentication
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-md p-3 border shadow-sm">
                <h3 className="font-medium text-sm">In Progress</h3>
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    Customize themes
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-md p-3 border shadow-sm">
                <h3 className="font-medium text-sm">Done</h3>
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    Project setup
                  </div>
                  <div className="p-2 bg-muted/50 rounded text-xs">
                    Initial design
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Collaborate with your team",
      description:
        "Share ideas, assign tasks, track progress and keep everyone aligned on project goals.",
      image: (
        <div className="relative w-full h-[400px] rounded-lg p-4 overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <div className="bg-card rounded-lg shadow-sm p-5 w-full max-w-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
                  <span className="font-medium">TS</span>
                </div>
                <div>
                  <div className="font-medium">Team Standup</div>
                  <div className="text-xs text-muted-foreground">
                    Daily at 10:00 AM
                  </div>
                </div>
                <div className="ml-auto flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 ring-2 ring-background"></div>
                  <div className="w-8 h-8 rounded-full bg-secondary/20 ring-2 ring-background"></div>
                  <div className="w-8 h-8 rounded-full bg-warning/20 ring-2 ring-background"></div>
                  <div className="w-8 h-8 rounded-full bg-destructive/20 ring-2 ring-background"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-warning/20"></div>
                    <div className="text-sm font-medium">Alex</div>
                    <div className="text-xs text-muted-foreground">
                      10:05 AM
                    </div>
                  </div>
                  <p className="mt-1 text-sm">
                    Completed the theme customization feature. Ready for review.
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                    <div className="text-sm font-medium">Jordan</div>
                    <div className="text-xs text-muted-foreground">
                      10:07 AM
                    </div>
                  </div>
                  <p className="mt-1 text-sm">
                    I'll take a look at it today and provide feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange?.(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl overflow-hidden [&>button]:hidden">
        <div className="flex gap-4">
          <div className="w-12 shrink-0 flex flex-col items-center justify-center gap-2">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full cursor-pointer transition-colors",
                  index === currentStep ? "bg-primary" : "bg-muted"
                )}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>

          <motion.div
            key={currentStep}
            className="flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {currentTourStep.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                {currentTourStep.description}
              </DialogDescription>
            </DialogHeader>

            <div className="my-6">{currentTourStep.image}</div>

            <DialogFooter className="flex justify-end items-center border-t pt-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-1"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Previous
                </Button>
                <Button onClick={handleNext} className="gap-1">
                  {currentStep === tourSteps.length - 1 ? (
                    "Get Started"
                  ) : (
                    <>
                      Next
                      <ArrowRightIcon className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TourDialog;
