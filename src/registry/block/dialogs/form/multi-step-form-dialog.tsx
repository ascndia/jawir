"use client";

import * as React from "react";
import { Check, ChevronRight, Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";
import { Textarea } from "@/registry/components/textarea";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";

interface FormStep {
  id: string;
  title: string;
  description: string;
}

interface MultiStepFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: Record<string, any>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  steps?: FormStep[];
  initialData?: Record<string, any>;
}

export default function MultiStepFormDialog({
  open = false,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
  steps = [
    {
      id: "personal",
      title: "Personal Information",
      description: "Provide your basic personal details",
    },
    {
      id: "contact",
      title: "Contact Information",
      description: "How can we reach you?",
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Tell us about your preferences",
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Review your information before submitting",
    },
  ],
  initialData = {},
}: MultiStepFormDialogProps) {
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [formData, setFormData] =
    React.useState<Record<string, any>>(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isReviewStep = currentStep.id === "review";

  React.useEffect(() => {
    if (open) {
      // Reset to first step when dialog opens
      setCurrentStepIndex(0);
      setFormData(initialData);
      setErrors({});
    }
  }, [open]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep.id) {
      case "personal":
        if (!formData.firstName?.trim()) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName?.trim()) {
          newErrors.lastName = "Last name is required";
        }
        if (!formData.dob) {
          newErrors.dob = "Date of birth is required";
        }
        break;

      case "contact":
        if (!formData.email?.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
        }
        if (!formData.phone?.trim()) {
          newErrors.phone = "Phone number is required";
        }
        break;

      case "preferences":
        if (!formData.preferredContact) {
          newErrors.preferredContact =
            "Please select a preferred contact method";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (isReviewStep) {
      handleSubmit();
      return;
    }

    if (validateStep()) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "personal":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName || ""}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="John"
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName || ""}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="Doe"
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dob">
                Date of Birth <span className="text-destructive">*</span>
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.dob || ""}
                onChange={(e) => updateFormData("dob", e.target.value)}
                className={errors.dob ? "border-destructive" : ""}
              />
              {errors.dob && (
                <p className="text-xs text-destructive">{errors.dob}</p>
              )}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="john.doe@example.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="(123) 456-7890"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main St, City, State, Zip"
                rows={3}
              />
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="preferredContact">
                Preferred Contact Method{" "}
                <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.preferredContact || ""}
                onValueChange={(value) =>
                  updateFormData("preferredContact", value)
                }
                className={
                  errors.preferredContact
                    ? "border-destructive rounded p-1"
                    : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="contact-text" />
                  <Label htmlFor="contact-text">Text Message</Label>
                </div>
              </RadioGroup>
              {errors.preferredContact && (
                <p className="text-xs text-destructive">
                  {errors.preferredContact}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Interests (Select all that apply)</Label>
              <div className="space-y-2">
                {["Technology", "Sports", "Music", "Travel", "Food"].map(
                  (interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${interest.toLowerCase()}`}
                        checked={
                          formData.interests?.includes(interest) || false
                        }
                        onCheckedChange={(checked) => {
                          const currentInterests = formData.interests || [];
                          if (checked) {
                            updateFormData("interests", [
                              ...currentInterests,
                              interest,
                            ]);
                          } else {
                            updateFormData(
                              "interests",
                              currentInterests.filter(
                                (i: string) => i !== interest
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor={`interest-${interest.toLowerCase()}`}>
                        {interest}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="frequency">Communication Frequency</Label>
              <Select
                value={formData.frequency || ""}
                onValueChange={(value) => updateFormData("frequency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "review":
        return (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Personal Information</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">First Name:</dt>
                <dd>{formData.firstName}</dd>
                <dt className="text-muted-foreground">Last Name:</dt>
                <dd>{formData.lastName}</dd>
                <dt className="text-muted-foreground">Date of Birth:</dt>
                <dd>{formData.dob}</dd>
              </dl>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Contact Information</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Email:</dt>
                <dd>{formData.email}</dd>
                <dt className="text-muted-foreground">Phone:</dt>
                <dd>{formData.phone}</dd>
                <dt className="text-muted-foreground">Address:</dt>
                <dd className="col-span-2">
                  {formData.address || "Not provided"}
                </dd>
              </dl>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Preferences</h3>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Preferred Contact:</dt>
                <dd className="capitalize">{formData.preferredContact}</dd>
                <dt className="text-muted-foreground">Interests:</dt>
                <dd>{formData.interests?.join(", ") || "None selected"}</dd>
                <dt className="text-muted-foreground">
                  Communication Frequency:
                </dt>
                <dd className="capitalize">
                  {formData.frequency || "Not specified"}
                </dd>
              </dl>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{currentStep.title}</DialogTitle>
          <DialogDescription>{currentStep.description}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex items-center justify-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                  index < currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : index === currentStepIndex
                    ? "border-2 border-primary bg-background text-foreground"
                    : "border border-muted-foreground/30 bg-background text-muted-foreground"
                }`}
              >
                {index < currentStepIndex ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-10 ${
                    index < currentStepIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4">{renderStepContent()}</div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={isFirstStep ? handleCancel : handleBack}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isFirstStep ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={handleNext}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : isLastStep ? (
              "Submit"
            ) : (
              <>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
