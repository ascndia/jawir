"use client"

import { ArrowLeft, ArrowRight, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useTour } from "./tour-provider"

export function TourDialog() {
  const { isOpen, currentStep, steps, nextStep, prevStep, endTour, progress } = useTour()

  if (!isOpen || steps.length === 0) {
    return null
  }

  const currentTourStep = steps[currentStep]

  return (
    <Dialog  open={isOpen} onOpenChange={(open) => !open && endTour()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{currentTourStep.title}</DialogTitle>
          <DialogDescription>{currentTourStep.description}</DialogDescription>
        </DialogHeader>

        {currentTourStep.image && (
          <div className="relative h-48 w-full overflow-hidden rounded-md">
            <Image
              src={currentTourStep.image || "/placeholder.svg"}
              alt={currentTourStep.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <Progress value={progress} className="h-1" />

        <DialogFooter className="flex flex-row items-center justify-between sm:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={endTour}>
              <X className="mr-1 h-4 w-4" />
              Skip
            </Button>
            <Button size="sm" onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep !== steps.length - 1 && <ArrowRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

