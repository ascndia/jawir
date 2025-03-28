"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Send, Smile, Meh, Frown } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/registry/components/button/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/components/form";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Textarea } from "@/registry/components/textarea";
import { Slider } from "@/registry/components/slider";

// Define the form schema with Zod
const feedbackSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  sentiment: z.number().min(0).max(100),
  feedback: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters." })
    .max(500, { message: "Feedback must not exceed 500 characters." }),
});

// Infer the type from the schema
type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export default function FormFeedback1() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "",
      sentiment: 50,
      feedback: "",
    },
  });

  // Get the current sentiment value to display the appropriate emoji
  const sentimentValue = form.watch("sentiment");

  // Get emoji based on sentiment value
  const getEmoji = () => {
    if (sentimentValue <= 33) return <Frown className="h-8 w-8 text-red-500" />;
    if (sentimentValue <= 66) return <Meh className="h-8 w-8 text-amber-500" />;
    return <Smile className="h-8 w-8 text-green-500" />;
  };

  // Get sentiment label based on value
  const getSentimentLabel = () => {
    if (sentimentValue <= 33) return "Disappointed";
    if (sentimentValue <= 66) return "Neutral";
    return "Satisfied";
  };

  // Handle form submission
  const onSubmit = (data: FeedbackFormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Feedback data:", data);
      setIsSubmitting(false);
      form.reset();
      toast.success("Feedback submitted!", {
        description: "Thank you for sharing your thoughts with us.",
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-sm border">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">How was your experience?</h2>
        <p className="text-muted-foreground text-sm">
          Your feedback helps us improve our service
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sentiment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Satisfaction</FormLabel>
                <div className="flex flex-col items-center mb-2">
                  {getEmoji()}
                  <span className="text-sm font-medium mt-1">
                    {getSentimentLabel()}
                  </span>
                </div>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Not satisfied</span>
                  <span>Very satisfied</span>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Feedback</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what you liked or how we can improve..."
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-right text-xs">
                  {field.value.length}/500 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Feedback
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
