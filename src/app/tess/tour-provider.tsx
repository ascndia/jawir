"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type TourStep = {
  title: string
  description: string
  target?: string // CSS selector for the element to highlight
  placement?: "top" | "right" | "bottom" | "left"
  image?: string
}

type TourContextType = {
  isOpen: boolean
  currentStep: number
  steps: TourStep[]
  startTour: (steps: TourStep[]) => void
  nextStep: () => void
  prevStep: () => void
  endTour: () => void
  progress: number
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<TourStep[]>([])

  const startTour = (tourSteps: TourStep[]) => {
    setSteps(tourSteps)
    setCurrentStep(0)
    setIsOpen(true)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const endTour = () => {
    setIsOpen(false)
    // We could save the tour completion status to localStorage here
  }

  const progress = steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0

  // Effect to scroll to and highlight the target element
  useEffect(() => {
    if (isOpen && steps[currentStep]?.target) {
      const targetElement = document.querySelector(steps[currentStep].target!)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [isOpen, currentStep, steps])

  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        steps,
        startTour,
        nextStep,
        prevStep,
        endTour,
        progress,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error("useTour must be used within a TourProvider")
  }
  return context
}

