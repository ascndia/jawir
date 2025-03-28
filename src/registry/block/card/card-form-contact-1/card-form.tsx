"use client";

import * as React from "react";
import { User, Mail, MessageSquare, Send, Info } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";

interface ContactFormData {
  name: string;
  email: string;
  subject?: string; // Made optional
  message: string;
}

interface CardFormContact1Props {
  initialData?: Partial<ContactFormData>;
  onSubmit?: (
    data: ContactFormData
  ) => Promise<boolean | void> | boolean | void; // Allow async submission
  onCancel?: () => void;
  title?: string;
  description?: string;
  subjectOptions?: string[];
  showSubject?: boolean;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function CardFormContact1({
  initialData = {},
  onSubmit,
  onCancel,
  title = "Contact Us",
  description = "Have questions? Fill out the form below and we'll get back to you.",
  subjectOptions = ["General Inquiry", "Support Request", "Feedback", "Sales"],
  showSubject = true,
  submitButtonText = "Send Message",
  successMessage = "Your message has been sent successfully!",
  errorMessage = "An error occurred. Please try again later.",
}: CardFormContact1Props) {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: initialData.name ?? "",
    email: initialData.email ?? "",
    subject:
      initialData.subject ?? (showSubject ? subjectOptions[0] : undefined),
    message: initialData.message ?? "",
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
    setSubmitStatus("idle"); // Reset status on change
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await onSubmit(formData);
      if (result !== false) {
        setSubmitStatus("success");
        // Optionally clear form on success
        setFormData({
          name: "",
          email: "",
          subject: showSubject ? subjectOptions[0] : undefined,
          message: "",
        });
      } else {
        // Allow onSubmit to signal failure without throwing error
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
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
      name: initialData.name ?? "",
      email: initialData.email ?? "",
      subject:
        initialData.subject ?? (showSubject ? subjectOptions[0] : undefined),
      message: initialData.message ?? "",
    });
    setSubmitStatus("idle");
    setIsSubmitting(false);
    console.log("Cancelled contact form");
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" && // Basic email format check could be added
    formData.message.trim() !== "";

  return (
    <Card className="w-full max-w-lg">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                <User className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                <Mail className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          {showSubject && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                name="subject"
                value={formData.subject}
                onValueChange={handleSelectChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="message">
              <MessageSquare className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              required
              disabled={isSubmitting}
              className="min-h-[120px]"
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
            {isSubmitting ? "Sending..." : submitButtonText}
            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormContact1;
