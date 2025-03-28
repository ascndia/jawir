"use client";

import * as React from "react";
import { Star, MessageSquare, User, Save, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { Textarea } from "@/registry/components/textarea";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group"; // Assuming standard path
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import { cn } from "@/lib/utils";

interface ReviewFormData {
  rating: number; // e.g., 1-5
  title?: string;
  comment: string;
  reviewerName?: string; // Optional, could be pre-filled if user is logged in
}

interface CardFormReview1Props {
  productName?: string; // Name of the product being reviewed
  initialData?: Partial<ReviewFormData>;
  onSubmit?: (data: ReviewFormData) => Promise<boolean | void> | boolean | void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  maxRating?: number;
}

export function CardFormReview1({
  productName = "the product",
  initialData = {},
  onSubmit,
  onCancel,
  title = `Review ${productName}`,
  description = "Share your thoughts with other customers.",
  submitButtonText = "Submit Review",
  successMessage = "Thank you for your review!",
  errorMessage = "Failed to submit review. Please try again.",
  className,
  maxRating = 5,
}: CardFormReview1Props) {
  const [formData, setFormData] = React.useState<ReviewFormData>({
    rating: initialData.rating ?? 0, // Default to 0 or maybe maxRating? Let's use 0.
    title: initialData.title ?? "",
    comment: initialData.comment ?? "",
    reviewerName: initialData.reviewerName ?? "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rating: parseInt(value, 10) }));
    setSubmitStatus("idle");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !onSubmit ||
      isSubmitting ||
      formData.rating === 0 ||
      formData.comment.trim() === ""
    )
      return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await onSubmit(formData);
      if (result !== false) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          rating: 0,
          title: "",
          comment: "",
          reviewerName: "", // Keep name if pre-filled? Depends on use case.
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Review submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form
    setFormData({
      rating: initialData.rating ?? 0,
      title: initialData.title ?? "",
      comment: initialData.comment ?? "",
      reviewerName: initialData.reviewerName ?? "",
    });
    setSubmitStatus("idle");
    setIsSubmitting(false);
    console.log("Cancelled review submission");
  };

  const isFormValid = formData.rating > 0 && formData.comment.trim() !== "";

  return (
    <Card className={cn("w-full max-w-lg", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pb-6">
          {submitStatus === "success" && (
            <Alert
              variant="default"
              className="bg-success/10 border-success/50 text-success-foreground"
            >
              <Info className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Your Rating *</Label>
            <RadioGroup
              value={String(formData.rating)}
              onValueChange={handleRatingChange}
              className="flex space-x-1"
              aria-label="Product rating"
            >
              {[...Array(maxRating)].map((_, i) => {
                const ratingValue = i + 1;
                const isFilled =
                  (hoverRating ?? formData.rating) >= ratingValue;
                return (
                  <Label
                    key={ratingValue}
                    htmlFor={`rating-${ratingValue}`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(null)}
                  >
                    <RadioGroupItem
                      value={String(ratingValue)}
                      id={`rating-${ratingValue}`}
                      className="peer sr-only"
                      disabled={isSubmitting}
                    />
                    <Star
                      className={cn(
                        "h-6 w-6 transition-colors",
                        isFilled
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted stroke-muted-foreground"
                      )}
                    />
                    <span className="sr-only">{`${ratingValue} star${
                      ratingValue > 1 ? "s" : ""
                    }`}</span>
                  </Label>
                );
              })}
            </RadioGroup>
            {formData.rating === 0 &&
              submitStatus === "idle" && ( // Show hint only if not rated yet and not submitting/error
                <p className="text-xs text-destructive">
                  Please select a rating.
                </p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-title">Review Title (Optional)</Label>
            <Input
              id="review-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Excellent product!"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-comment">Your Comment *</Label>
            <Textarea
              id="review-comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Share your experience with the product..."
              rows={4}
              required
              disabled={isSubmitting}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reviewer-name">Your Name (Optional)</Label>
            <Input
              id="reviewer-name"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleChange}
              placeholder="Displayed publicly (e.g., John D.)"
              disabled={isSubmitting}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Submitting..." : submitButtonText}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormReview1;
