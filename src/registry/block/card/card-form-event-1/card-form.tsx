"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  FileText,
  Save,
  Info,
} from "lucide-react";

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
import { Calendar } from "@/registry/components/calendar"; // Assuming standard path
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/components/popover"; // Assuming standard path
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import { cn } from "@/lib/utils";

interface EventFormData {
  title: string;
  description?: string;
  location?: string;
  eventDate?: Date;
  eventTime?: string; // Format HH:MM (24-hour)
}

interface CardFormEvent1Props {
  initialData?: Partial<EventFormData>;
  onSubmit?: (data: EventFormData) => Promise<boolean | void> | boolean | void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export function CardFormEvent1({
  initialData = {},
  onSubmit,
  onCancel,
  title = "Create New Event",
  description = "Fill in the details for your event.",
  submitButtonText = "Create Event",
  successMessage = "Event created successfully!",
  errorMessage = "Failed to create event. Please try again.",
  className,
}: CardFormEvent1Props) {
  const [formData, setFormData] = React.useState<EventFormData>({
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    location: initialData.location ?? "",
    eventDate: initialData.eventDate,
    eventTime: initialData.eventTime ?? "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("idle");
  };

  const handleDateChange = (date?: Date) => {
    setFormData((prev) => ({ ...prev, eventDate: date }));
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isSubmitting || formData.title.trim() === "") return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await onSubmit(formData);
      if (result !== false) {
        setSubmitStatus("success");
        // Reset form on success
        setFormData({
          title: "",
          description: "",
          location: "",
          eventDate: undefined,
          eventTime: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Event creation error:", error);
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
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      location: initialData.location ?? "",
      eventDate: initialData.eventDate,
      eventTime: initialData.eventTime ?? "",
    });
    setSubmitStatus("idle");
    setIsSubmitting(false);
    console.log("Cancelled event creation");
  };

  const isFormValid = formData.title.trim() !== ""; // Basic validation

  return (
    <Card className={cn("w-full max-w-xl", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
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
            <Label htmlFor="event-title">Event Title</Label>
            <Input
              id="event-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Team Building Workshop"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="event-date">
                <CalendarIcon className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.eventDate && "text-muted-foreground"
                    )}
                    disabled={isSubmitting}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.eventDate ? (
                      format(formData.eventDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.eventDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">
                <Clock className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Time (Optional)
              </Label>
              <Input
                id="event-time"
                name="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-location">
              <MapPin className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Location (Optional)
            </Label>
            <Input
              id="event-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Conference Room A or Online"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-description">
              <FileText className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Description (Optional)
            </Label>
            <Textarea
              id="event-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the event..."
              rows={4}
              disabled={isSubmitting}
              className="min-h-[100px]"
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
            {isSubmitting ? "Creating..." : submitButtonText}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormEvent1;
