"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ServiceNameStep } from "./service-name-step"
import { CategoryStep } from "./category-step"
import { TagsDescriptionStep } from "./tags-description-step"
import { PricingStep } from "./pricing-step"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { z } from "zod"
import { toast } from "sonner"

// Define the form schema for validation
const serviceFormSchema = z.object({
  name: z.string().min(3, "Service name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().min(1, "Please select a subcategory"),
  tags: z.array(z.string()).min(1, "Please select at least one tag"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  pricingModel: z.enum(["hourly", "fixed", "tiered"]),
  price: z.number().min(1, "Price must be greater than 0"),
  currency: z.string().min(1, "Please select a currency"),
  additionalDetails: z.string().optional(),
})

type ServiceFormData = z.infer<typeof serviceFormSchema>

const steps = [
  { id: "name", label: "Service Name" },
  { id: "category", label: "Categories" },
  { id: "tags", label: "Tags & Description" },
  { id: "pricing", label: "Pricing" },
]

export function ServiceFormDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<ServiceFormData>>({
    name: "",
    category: "",
    subcategory: "",
    tags: [],
    description: "",
    pricingModel: "hourly",
    price: 0,
    currency: "USD",
    additionalDetails: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const reset = () => {
    setCurrentStep(0)
    setIsSubmitting(false)
    setFormData({
      name: "",
      category: "",
      subcategory: "",
      tags: [],
      description: "",
      pricingModel: "hourly",
      price: 0,
      currency: "USD",
      additionalDetails: "",
    })
    setErrors({})
  }
  const updateFormData = (data: Partial<ServiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const validateStep = () => {
    try {
      switch (currentStep) {
        case 0:
          z.object({ name: serviceFormSchema.shape.name }).parse(formData)
          break
        case 1:
          z.object({
            category: serviceFormSchema.shape.category,
            subcategory: serviceFormSchema.shape.subcategory,
          }).parse(formData)
          break
        case 2:
          z.object({
            tags: serviceFormSchema.shape.tags,
            description: serviceFormSchema.shape.description,
          }).parse(formData)
          break
        case 3:
          z.object({
            pricingModel: serviceFormSchema.shape.pricingModel,
            price: serviceFormSchema.shape.price,
            currency: serviceFormSchema.shape.currency,
          }).parse(formData)
          break
      }
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          newErrors[path] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true)
      try {
        // Here you would typically send the data to your API
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulating API call
        toast.success("Service created successfully!")
        reset()
        onOpenChange(false)
      } catch (error) {
        console.error("Error submitting form:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInteractOutside = (event: Event) => {
    if (currentStep === 0 && !formData.name) {
      onOpenChange(false)
      setCurrentStep(0)
      return
    }
    if (isSubmitting) {
      event.preventDefault() // Prevent dialog from closing
    } else {
      const confirmClose = window.confirm(
        "Are you sure you want to close the dialog? Your progress will be lost."
      )
      if (!confirmClose) {
        event.preventDefault() // Prevent closing if user cancels
        return
      }
      reset() 
      onOpenChange(false) 
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={handleInteractOutside} className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Service</DialogTitle>
        </DialogHeader>
{/* 
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index < currentStep
                      ? "bg-green-100 border-green-500 text-green-500"
                      : index === currentStep
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-gray-100 border-gray-300 text-gray-500"
                  }`}
                >
                  {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
                </div>
                <span
                  className={`text-xs mt-1 ${index === currentStep ? "text-primary font-medium" : "text-gray-500"}`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div> */}

        <Tabs value={steps[currentStep].id} className="w-full">
          <TabsContent value="name" className="mt-0">
            <ServiceNameStep
              value={formData.name || ""}
              onChange={(name) => updateFormData({ name })}
              error={errors.name}
            />
          </TabsContent>
          <TabsContent value="category" className="mt-0">
            <CategoryStep
              category={formData.category || ""}
              subcategory={formData.subcategory || ""}
              onCategoryChange={(category) => updateFormData({ category, subcategory: "" })}
              onSubcategoryChange={(subcategory) => updateFormData({ subcategory })}
              errors={{ category: errors.category, subcategory: errors.subcategory }}
            />
          </TabsContent>
          <TabsContent value="tags" className="mt-0">
            <TagsDescriptionStep
              tags={formData.tags || []}
              description={formData.description || ""}
              onTagsChange={(tags) => updateFormData({ tags })}
              onDescriptionChange={(description) => updateFormData({ description })}
              errors={{ tags: errors.tags, description: errors.description }}
            />
          </TabsContent>
          <TabsContent value="pricing" className="mt-0">
            <PricingStep
              pricingModel={formData.pricingModel || "hourly"}
              price={formData.price || 0}
              currency={formData.currency || "USD"}
              additionalDetails={formData.additionalDetails || ""}
              onPricingModelChange={(pricingModel) => updateFormData({ pricingModel })}
              onPriceChange={(price) => updateFormData({ price })}
              onCurrencyChange={(currency) => updateFormData({ currency })}
              onAdditionalDetailsChange={(additionalDetails) => updateFormData({ additionalDetails })}
              errors={{
                pricingModel: errors.pricingModel,
                price: errors.price,
                currency: errors.currency,
              }}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0 || isSubmitting}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={isSubmitting}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

