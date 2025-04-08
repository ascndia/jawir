"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Heart,
  Loader2,
  MinusCircle,
  PlusCircle,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Label } from "@/registry/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { ScrollArea } from "@/registry/components/scroll-area";
import { Separator } from "@/registry/components/separator";
import { Badge } from "@/registry/components/badge";
import React from "react";
import { Textarea } from "@/registry/components/textarea";

interface ReportReason {
  id: string;
  label: string;
  description?: string;
  requiresDetails?: boolean;
}

interface ReportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: { reasonId: string; details?: string }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  contentType?: "post" | "comment" | "user" | "message";
  contentAuthor?: string;
  reportReasons?: ReportReason[];
}

export default function ReportDialog({
  open = false,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
  contentType = "post",
  contentAuthor = "Jane Smith",
  reportReasons = [
    {
      id: "spam",
      label: "Spam",
      description: "Posting unwanted commercial content or repetitive messages",
    },
    {
      id: "harassment",
      label: "Harassment or bullying",
      description: "Threatening, intimidating, or humiliating others",
      requiresDetails: true,
    },
    {
      id: "hate-speech",
      label: "Hate speech or symbols",
      description:
        "Attacking people based on race, ethnicity, national origin, religion, etc.",
      requiresDetails: true,
    },
    {
      id: "false-information",
      label: "False information",
      description: "Content that contains false or misleading information",
    },
    {
      id: "violence",
      label: "Violence or dangerous organizations",
      description: "Promoting violence or supporting dangerous organizations",
      requiresDetails: true,
    },
    {
      id: "intellectual-property",
      label: "Intellectual property violation",
      description: "Copyright or trademark infringement",
      requiresDetails: true,
    },
    {
      id: "other",
      label: "Something else",
      description: "Issue not listed above",
      requiresDetails: true,
    },
  ],
}: ReportDialogProps) {
  const [selectedReasonId, setSelectedReasonId] = React.useState<string>("");
  const [details, setDetails] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (!open) {
      // Reset form when dialog closes
      setSelectedReasonId("");
      setDetails("");
      setErrors({});
    }
  }, [open]);

  const selectedReason = React.useMemo(() => {
    return reportReasons.find((reason) => reason.id === selectedReasonId);
  }, [selectedReasonId, reportReasons]);

  const handleReasonChange = (value: string) => {
    setSelectedReasonId(value);

    // Clear details if the new reason doesn't require them
    const reason = reportReasons.find((r) => r.id === value);
    if (!reason?.requiresDetails) {
      setDetails("");
    }

    // Clear errors
    if (errors.reason) {
      const newErrors = { ...errors };
      delete newErrors.reason;
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedReasonId) {
      newErrors.reason = "Please select a reason for reporting";
    }

    if (selectedReason?.requiresDetails && !details.trim()) {
      newErrors.details = "Please provide more details about this report";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit?.({
      reasonId: selectedReasonId,
      details: details.trim() || undefined,
    });
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const getContentTypeText = () => {
    switch (contentType) {
      case "post":
        return "post";
      case "comment":
        return "comment";
      case "user":
        return "profile";
      case "message":
        return "message";
      default:
        return "content";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <Flag className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>Report {contentType}</DialogTitle>
            <DialogDescription className="mt-1.5">
              Tell us why you want to report this {getContentTypeText()} by{" "}
              {contentAuthor}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-base">
              Why are you reporting this {getContentTypeText()}?
            </Label>
            <RadioGroup
              value={selectedReasonId}
              onValueChange={handleReasonChange}
              className="space-y-3"
            >
              {reportReasons.map((reason) => (
                <div key={reason.id} className="flex items-start space-x-2">
                  <RadioGroupItem
                    value={reason.id}
                    id={`reason-${reason.id}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`reason-${reason.id}`}
                    className="flex flex-col items-start justify-start"
                  >
                    <span className="font-medium">{reason.label}</span>
                    {reason.description && (
                      <span className="text-sm text-muted-foreground">
                        {reason.description}
                      </span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.reason && (
              <p className="text-xs text-destructive">{errors.reason}</p>
            )}
          </div>

          {selectedReason?.requiresDetails && (
            <div className="space-y-2">
              <Label htmlFor="report-details">
                Additional details
                <span className="text-destructive"> *</span>
              </Label>
              <Textarea
                id="report-details"
                placeholder="Please provide specific details about why you're reporting this content..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className={errors.details ? "border-destructive" : ""}
              />
              {errors.details ? (
                <p className="text-xs text-destructive">{errors.details}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Your report will be kept confidential
                </p>
              )}
            </div>
          )}

          <Separator />

          <div className="rounded-lg bg-muted p-3 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-warning" />
              <div>
                <p className="font-medium">Important</p>
                <p className="text-muted-foreground">
                  False reports may result in account restrictions. We take all
                  reports seriously and will review this content according to
                  our community guidelines.
                </p>
              </div>
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
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
