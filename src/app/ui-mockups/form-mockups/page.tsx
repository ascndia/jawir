"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormMockup, FormField, FormFieldProps } from "../components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sliders,
  Copy,
  CopyCheck,
  ArrowLeft,
  FileText,
  Plus,
  Trash2,
} from "lucide-react";

export default function FormMockupsPage() {
  // State for mockup configuration
  const [title, setTitle] = useState("Contact Form");
  const [subtitle, setSubtitle] = useState("We'd love to hear from you");
  const [submitText, setSubmitText] = useState("Submit");
  const [footerText, setFooterText] = useState("");
  const [width, setWidth] = useState<
    "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  >("md");
  const [layout, setLayout] = useState<"single" | "two-column">("single");
  const [bgGradient, setBgGradient] = useState("from-purple-950 to-violet-900");
  const [fields, setFields] = useState<FormFieldProps[]>([
    { label: "Full Name", required: true },
    { label: "Email", type: "text", required: true },
    { label: "Subject", type: "select", placeholder: "Select a subject" },
    {
      label: "Message",
      type: "textarea",
      description: "Please be as detailed as possible",
    },
  ]);
  const [copied, setCopied] = useState(false);

  // Function to add a new field
  const addField = () => {
    setFields([...fields, { label: `Field ${fields.length + 1}` }]);
  };

  // Function to remove a field
  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Function to update a field
  const updateField = (
    index: number,
    updatedField: Partial<FormFieldProps>
  ) => {
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, ...updatedField } : field
      )
    );
  };

  // Function to copy code
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate code for current mockup configuration
  const generateCode = () => {
    return `<FormMockup
  title="${title}"
  subtitle="${subtitle}"
  submitText="${submitText}"
  ${footerText ? `footerText="${footerText}"` : ""}
  width="${width}"
  layout="${layout}"
  bgGradient="bg-gradient-to-br ${bgGradient}"
  fields={[
    ${fields
      .map((field) => {
        const props = Object.entries(field)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => {
            if (typeof value === "string") return `${key}: "${value}"`;
            return `${key}: ${value}`;
          })
          .join(", ");
        return `{ ${props} }`;
      })
      .join(",\n    ")}
  ]}
/>`;
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Link
          href="/ui-mockups"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to UI Mockups</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
          <span className="mr-1 text-primary">📝</span> Form Mockups
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          Form Mockup Builder
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Create beautiful, customizable form mockups for your UI designs
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Form Configuration
              </CardTitle>
              <CardDescription>
                Customize the form mockup settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Form Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-subtitle">Subtitle</Label>
                  <Input
                    id="form-subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Form Description"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="submit-text">Submit Button Text</Label>
                  <Input
                    id="submit-text"
                    value={submitText}
                    onChange={(e) => setSubmitText(e.target.value)}
                    placeholder="Submit"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Input
                    id="footer-text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    placeholder="Optional footer text"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="form-width">Form Width</Label>
                  <Select
                    value={width}
                    onValueChange={(v) => setWidth(v as any)}
                  >
                    <SelectTrigger id="form-width">
                      <SelectValue placeholder="Select width" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">Extra Small</SelectItem>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                      <SelectItem value="2xl">2XL</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-layout">Layout</Label>
                  <Select
                    value={layout}
                    onValueChange={(v) => setLayout(v as any)}
                  >
                    <SelectTrigger id="form-layout">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Column</SelectItem>
                      <SelectItem value="two-column">Two Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-gradient">Background Gradient</Label>
                <Select value={bgGradient} onValueChange={setBgGradient}>
                  <SelectTrigger id="bg-gradient">
                    <SelectValue placeholder="Select gradient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="from-purple-950 to-violet-900">
                      Purple (Default)
                    </SelectItem>
                    <SelectItem value="from-blue-950 to-indigo-900">
                      Blue / Indigo
                    </SelectItem>
                    <SelectItem value="from-slate-900 to-slate-800">
                      Slate
                    </SelectItem>
                    <SelectItem value="from-zinc-900 to-zinc-800">
                      Zinc
                    </SelectItem>
                    <SelectItem value="from-stone-900 to-stone-800">
                      Stone
                    </SelectItem>
                    <SelectItem value="from-neutral-900 to-neutral-950">
                      Neutral
                    </SelectItem>
                    <SelectItem value="from-fuchsia-950 to-pink-900">
                      Fuchsia / Pink
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Form Fields
              </CardTitle>
              <CardDescription>
                Add, remove, and configure form fields
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={addField}
                  className="inline-flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Field
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card key={index} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeField(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CardContent className="p-4">
                      <div className="grid gap-4 pt-2">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Field Label</Label>
                            <Input
                              value={field.label || ""}
                              onChange={(e) =>
                                updateField(index, { label: e.target.value })
                              }
                              placeholder="Label"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Field Type</Label>
                            <Select
                              value={field.type || "text"}
                              onValueChange={(value) =>
                                updateField(index, { type: value as any })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="textarea">
                                  Textarea
                                </SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="checkbox">
                                  Checkbox
                                </SelectItem>
                                <SelectItem value="toggle">Toggle</SelectItem>
                                <SelectItem value="file">
                                  File Upload
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {(field.type === "text" ||
                          field.type === "textarea" ||
                          field.type === "select" ||
                          field.type === "file") && (
                          <div className="space-y-2">
                            <Label>Placeholder</Label>
                            <Input
                              value={field.placeholder || ""}
                              onChange={(e) =>
                                updateField(index, {
                                  placeholder: e.target.value,
                                })
                              }
                              placeholder="Placeholder text"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Input
                            value={field.description || ""}
                            onChange={(e) =>
                              updateField(index, {
                                description: e.target.value,
                              })
                            }
                            placeholder="Helper text below the field"
                          />
                        </div>

                        {field.type === "textarea" && (
                          <div className="space-y-2">
                            <Label>Height (px)</Label>
                            <Input
                              type="number"
                              value={field.height || 80}
                              onChange={(e) =>
                                updateField(index, {
                                  height: parseInt(e.target.value),
                                })
                              }
                              placeholder="Height in pixels"
                            />
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`required-${index}`}
                            checked={field.required || false}
                            onCheckedChange={(checked) =>
                              updateField(index, { required: checked })
                            }
                          />
                          <Label htmlFor={`required-${index}`}>
                            Required field
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="rounded-md bg-muted p-4">
            <div className="flex justify-between">
              <Label className="text-xs text-muted-foreground">
                Component Code
              </Label>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => copyCode(generateCode())}
              >
                {copied ? (
                  <CopyCheck className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
            <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap text-xs">
              {generateCode()}
            </pre>
          </div>
        </div>

        <div className="sticky top-4 space-y-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto px-2 pb-2 pt-0">
              <FormMockup
                title={title}
                subtitle={subtitle}
                submitText={submitText}
                footerText={footerText || undefined}
                width={width}
                layout={layout}
                bgGradient={`bg-gradient-to-br ${bgGradient}`}
                fields={fields}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          Form Templates
        </h2>

        <Tabs defaultValue="contact">
          <TabsList className="mb-8">
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="checkout">Checkout</TabsTrigger>
            <TabsTrigger value="survey">Survey</TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FormMockup
                title="Contact Us"
                subtitle="We'd love to hear from you"
                submitText="Send Message"
                fields={[
                  { label: "Full Name", required: true },
                  { label: "Email", required: true },
                  {
                    label: "Subject",
                    type: "select",
                    placeholder: "Select a subject",
                  },
                  {
                    label: "Message",
                    type: "textarea",
                    description: "Please be as detailed as possible",
                  },
                ]}
              />
              <FormMockup
                title="Get in Touch"
                subtitle="Our team will get back to you within 24 hours"
                submitText="Submit Request"
                bgGradient="bg-gradient-to-br from-blue-950 to-indigo-900"
                fields={[
                  { label: "First Name", containerClassName: "sm:col-span-1" },
                  { label: "Last Name", containerClassName: "sm:col-span-1" },
                  { label: "Email Address", required: true },
                  { label: "Phone Number" },
                  { label: "How did you hear about us?", type: "select" },
                  { label: "Your Message", type: "textarea" },
                ]}
                layout="two-column"
                width="lg"
              />
            </div>
          </TabsContent>

          <TabsContent value="signup" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FormMockup
                title="Create an Account"
                subtitle="Join thousands of users today"
                submitText="Sign Up"
                footerText={
                  <>
                    Already have an account?{" "}
                    <span className="text-primary">Sign in</span>
                  </>
                }
                bgGradient="bg-gradient-to-br from-stone-900 to-stone-800"
                fields={[
                  { label: "Email Address", required: true },
                  {
                    label: "Password",
                    required: true,
                    description: "Must be at least 8 characters",
                  },
                  { label: "Confirm Password", required: true },
                  {
                    label: "I agree to the Terms of Service",
                    type: "checkbox",
                  },
                ]}
              />
              <FormMockup
                title="Join Our Platform"
                subtitle="Start your free trial today"
                submitText="Get Started"
                footerText="No credit card required"
                bgGradient="bg-gradient-to-br from-fuchsia-950 to-pink-900"
                fields={[
                  { label: "First Name", containerClassName: "md:col-span-1" },
                  { label: "Last Name", containerClassName: "md:col-span-1" },
                  { label: "Work Email", required: true },
                  { label: "Company Name" },
                  { label: "Password", required: true },
                  {
                    label: "Receive product updates and news",
                    type: "checkbox",
                  },
                ]}
                layout="two-column"
              />
            </div>
          </TabsContent>

          <TabsContent value="login" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FormMockup
                title="Sign In"
                subtitle="Welcome back"
                submitText="Log In"
                footerText={
                  <>
                    Don't have an account?{" "}
                    <span className="text-primary">Sign up</span>
                  </>
                }
                bgGradient="bg-gradient-to-br from-zinc-900 to-zinc-800"
                width="sm"
                fields={[
                  { label: "Email", required: true },
                  { label: "Password", required: true },
                  { label: "Remember me", type: "checkbox" },
                ]}
              />
              <FormMockup
                title="Welcome Back"
                subtitle="Log in to your account"
                submitText="Continue"
                footerText={
                  <>
                    <span className="text-primary">Forgot password?</span>
                  </>
                }
                bgGradient="bg-gradient-to-br from-slate-900 to-slate-800"
                width="sm"
                fields={[
                  { label: "Email or username", required: true },
                  { label: "Password", required: true },
                  {
                    label: "Stay signed in",
                    type: "toggle",
                    description: "We'll keep you logged in for 30 days",
                  },
                ]}
              />
            </div>
          </TabsContent>

          <TabsContent value="checkout" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FormMockup
                title="Checkout"
                subtitle="Complete your purchase"
                submitText="Pay Now"
                footerText="Your payment is secure and encrypted"
                width="lg"
                bgGradient="bg-gradient-to-br from-neutral-900 to-neutral-950"
                fields={[
                  { label: "Email", required: true },
                  { label: "Card Information", required: true },
                  { label: "Name on Card", required: true },
                  { label: "Billing Address", required: true },
                  { label: "City", containerClassName: "md:col-span-1" },
                  {
                    label: "State/Province",
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "ZIP / Postal Code",
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "Country",
                    type: "select",
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "Save this card for future purchases",
                    type: "checkbox",
                  },
                ]}
                layout="two-column"
              />
              <FormMockup
                title="Shipping Information"
                submitText="Continue to Payment"
                width="lg"
                bgGradient="bg-gradient-to-br from-blue-950 to-indigo-900"
                fields={[
                  { label: "Full Name", required: true },
                  { label: "Street Address", required: true },
                  { label: "Apartment, suite, etc.", required: false },
                  {
                    label: "City",
                    required: true,
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "State",
                    required: true,
                    type: "select",
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "ZIP Code",
                    required: true,
                    containerClassName: "md:col-span-1",
                  },
                  {
                    label: "Phone Number",
                    required: true,
                    containerClassName: "md:col-span-1",
                  },
                  { label: "Save this address", type: "checkbox" },
                ]}
                layout="two-column"
              />
            </div>
          </TabsContent>

          <TabsContent value="survey" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <FormMockup
                title="Customer Feedback"
                subtitle="Help us improve our product"
                submitText="Submit Feedback"
                width="lg"
                bgGradient="bg-gradient-to-br from-purple-950 to-violet-900"
                fields={[
                  {
                    label: "How would you rate your experience?",
                    type: "select",
                    required: true,
                  },
                  {
                    label: "What did you like most about our product?",
                    type: "textarea",
                  },
                  { label: "What could we improve?", type: "textarea" },
                  {
                    label: "Would you recommend us to a friend?",
                    type: "select",
                  },
                  {
                    label: "Email (Optional)",
                    description: "We'll only use this to follow up if needed",
                  },
                ]}
              />
              <FormMockup
                title="Product Survey"
                subtitle="Tell us what you think"
                submitText="Complete Survey"
                width="lg"
                bgGradient="bg-gradient-to-br from-stone-900 to-stone-800"
                fields={[
                  { label: "Age Group", type: "select", required: true },
                  {
                    label: "How often do you use our product?",
                    type: "select",
                    required: true,
                  },
                  {
                    label: "Which features do you use most?",
                    type: "textarea",
                  },
                  {
                    label: "Do you find our product easy to use?",
                    type: "toggle",
                  },
                  {
                    label:
                      "Would you be interested in beta testing new features?",
                    type: "toggle",
                  },
                  { label: "Any additional comments", type: "textarea" },
                  {
                    label: "Contact me about future surveys",
                    type: "checkbox",
                  },
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <div className="mt-4">
          <Button asChild variant="outline" className="mr-4">
            <Link href="/ui-mockups">Back to UI Mockups</Link>
          </Button>
          <Button asChild>
            <Link href="/inspire3">Return to Landing Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
