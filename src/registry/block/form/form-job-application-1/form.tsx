"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Send, CheckCircle } from "lucide-react";

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
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/components/card/card-shadcn/card";

// Define the form schema with Zod
const jobApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, {
    message: "Please enter a valid phone number.",
  }),
  position: z.string().min(1, { message: "Please select a position." }),
  experience: z
    .string()
    .min(1, { message: "Please select your experience level." }),
  portfolio: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .min(50, { message: "Cover letter must be at least 50 characters." })
    .max(1000, { message: "Cover letter must not exceed 1000 characters." }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to the terms and conditions.",
    }),
  }),
});

// Infer the type from the schema
type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

export default function FormJobApplication1() {
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the form with default values
  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      portfolio: "",
      coverLetter: "",
      agreeToTerms: true,
    },
  });

  // Handle form submission
  const onSubmit = (data: JobApplicationFormValues) => {
    setIsPending(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      setIsPending(false);
      setIsSubmitted(true);
      toast.success("Application submitted!", {
        description: "We'll review your application and get back to you soon.",
        duration: 5000,
      });
    }, 2000);
  };

  // Reset the form
  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Job Application</CardTitle>
        <CardDescription>
          Fill out the form below to apply for a position at our company.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
                <h3 className="text-xl font-medium">Application Submitted!</h3>
                <p className="text-center text-muted-foreground">
                  Thank you for your application. We'll review it and contact
                  you soon.
                </p>
                <Button onClick={handleReset} variant="outline">
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frontend">
                              Frontend Developer
                            </SelectItem>
                            <SelectItem value="backend">
                              Backend Developer
                            </SelectItem>
                            <SelectItem value="fullstack">
                              Full Stack Developer
                            </SelectItem>
                            <SelectItem value="design">
                              UI/UX Designer
                            </SelectItem>
                            <SelectItem value="product">
                              Product Manager
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">
                            Entry Level (0-2 years)
                          </SelectItem>
                          <SelectItem value="mid">
                            Mid Level (2-5 years)
                          </SelectItem>
                          <SelectItem value="senior">
                            Senior (5+ years)
                          </SelectItem>
                          <SelectItem value="lead">
                            Lead/Manager (8+ years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio URL (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourportfolio.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Share a link to your portfolio or GitHub profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're interested in this position and what makes you a great candidate..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Briefly describe your relevant experience and why you're
                        interested in this role.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By submitting this application, you agree to our{" "}
                          <a href="#" className="text-primary underline">
                            privacy policy
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-primary underline">
                            terms of service
                          </a>
                          .
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </CardContent>

          {!isSubmitted && (
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isPending}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
