"use client";

import * as React from "react";
import { Loader2, MessageSquare, Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Textarea } from "@/registry/components/textarea";
import { Label } from "@/registry/components/label";

interface RatingDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { rating: number; feedback: string }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  maxRating?: number;
  feedbackRequired?: boolean;
  feedbackPlaceholder?: string;
  itemName?: string;
}

export default function RatingDialog({
  open = false,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
  title = "Rate Your Experience",
  description = "Tell us about your experience",
  maxRating = 5,
  feedbackRequired = false,
  feedbackPlaceholder = "Share your thoughts (optional)",
  itemName,
}: RatingDialogProps) {
  const [rating, setRating] = React.useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
  const [feedback, setFeedback] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setRating(null);
      setHoveredRating(null);
      setFeedback("");
    }
  }, [open]);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number | null) => {
    setHoveredRating(value);
  };

  const handleSubmit = () => {
    if (rating === null) return;
    if (feedbackRequired && !feedback.trim()) return;

    onSubmit?.({ rating, feedback });
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const getFeedbackPrompt = () => {
    if (!rating) return "Select a rating above";

    if (rating <= 2) {
      return "We're sorry to hear that. Please let us know what went wrong.";
    } else if (rating === 3) {
      return "Thanks for your feedback. How can we improve?";
    } else {
      return "Thanks for your positive feedback! Any additional comments?";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {itemName ? `${description} with ${itemName}` : description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center">
          <div className="mb-4 flex items-center justify-center">
            {Array.from({ length: maxRating }).map((_, index) => {
              const starValue = index + 1;
              const isFilled = (hoveredRating || rating || 0) >= starValue;

              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRatingClick(starValue)}
                  onMouseEnter={() => handleRatingHover(starValue)}
                  onMouseLeave={() => handleRatingHover(null)}
                  className={`h-10 w-10 ${
                    isFilled ? "text-warning" : "text-muted-foreground"
                  }`}
                >
                  <Star
                    className="h-8 w-8"
                    fill={isFilled ? "currentColor" : "none"}
                  />
                  <span className="sr-only">
                    Rate {starValue} out of {maxRating}
                  </span>
                </Button>
              );
            })}
          </div>

          {rating !== null && (
            <p className="mb-4 text-center text-sm font-medium">
              {rating === 1
                ? "Poor"
                : rating === 2
                ? "Fair"
                : rating === 3
                ? "Good"
                : rating === 4
                ? "Very Good"
                : "Excellent"}
            </p>
          )}

          <div className="w-full space-y-2">
            <Label htmlFor="feedback" className="text-sm">
              {getFeedbackPrompt()}
              {feedbackRequired && <span className="text-destructive"> *</span>}
            </Label>
            <div className="relative">
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={feedbackPlaceholder}
                rows={4}
                className="resize-none pr-8"
                disabled={rating === null || isLoading}
              />
              <MessageSquare className="absolute bottom-3 right-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto"
            disabled={
              rating === null ||
              (feedbackRequired && !feedback.trim()) ||
              isLoading
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Feedback"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
