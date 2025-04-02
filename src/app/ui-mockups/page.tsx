"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import UIMockup, { MockupItem } from "./components/UIMockup";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Sliders,
  Monitor,
  Code,
  Layout,
  CopyCheck,
  Copy,
  ArrowLeft,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function UIMockupsPage() {
  // State for mockup configuration
  const [title, setTitle] = useState("My Application");
  const [showControls, setShowControls] = useState(true);
  const [showChrome, setShowChrome] = useState(true);
  const [itemsCount, setItemsCount] = useState(8);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [bgGradient, setBgGradient] = useState(
    "from-neutral-900 to-neutral-950"
  );
  const [copied, setCopied] = useState(false);

  // Function to copy code
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate code for current mockup configuration
  const generateCode = () => {
    return `<UIMockup
  title="${title}"
  showWindowControls={${showControls}}
  showBrowserChrome={${showChrome}}
  itemsPerRow={${itemsPerRow}}
  bgGradient="bg-gradient-to-br ${bgGradient}"
/>`;
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Link
          href="/inspire3"
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
          <span className="mr-1 text-primary">💻</span> UI Mockups
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          Beautiful UI Mockups
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Reusable, customizable UI mockups for your presentations,
          documentation, or landing pages.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Mockup Configuration
              </CardTitle>
              <CardDescription>
                Customize your UI mockup with these settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Window Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter window title"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="show-controls" className="flex-1">
                    Window Controls
                  </Label>
                  <Switch
                    id="show-controls"
                    checked={showControls}
                    onCheckedChange={setShowControls}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="show-chrome" className="flex-1">
                    Browser Chrome
                  </Label>
                  <Switch
                    id="show-chrome"
                    checked={showChrome}
                    onCheckedChange={setShowChrome}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="items-count">Items Count</Label>
                  <Select
                    value={itemsCount.toString()}
                    onValueChange={(v) => setItemsCount(parseInt(v))}
                  >
                    <SelectTrigger id="items-count">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 6, 8, 9, 12].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="items-per-row">Items Per Row</Label>
                  <Select
                    value={itemsPerRow.toString()}
                    onValueChange={(v) => setItemsPerRow(parseInt(v))}
                  >
                    <SelectTrigger id="items-per-row">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <SelectItem key={n} value={n.toString()}>
                          {n} {n === 1 ? "column" : "columns"}
                        </SelectItem>
                      ))}
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
                    <SelectItem value="from-neutral-900 to-neutral-950">
                      Dark (Default)
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
                    <SelectItem value="from-gray-900 to-gray-800">
                      Gray
                    </SelectItem>
                    <SelectItem value="from-blue-950 to-indigo-900">
                      Blue / Indigo
                    </SelectItem>
                    <SelectItem value="from-purple-950 to-violet-900">
                      Purple / Violet
                    </SelectItem>
                    <SelectItem value="from-fuchsia-950 to-pink-900">
                      Fuchsia / Pink
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap text-xs">
                  {generateCode()}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border border-border p-6">
            <h2 className="mb-4 text-lg font-medium text-foreground">
              Preview
            </h2>
            <UIMockup
              title={title || undefined}
              showWindowControls={showControls}
              showBrowserChrome={showChrome}
              bgGradient={`bg-gradient-to-br ${bgGradient}`}
              itemsPerRow={itemsPerRow}
              mockupItems={Array.from({ length: itemsCount }).map((_, i) => (
                <MockupItem key={i} delay={0.2 + i * 0.05} />
              ))}
            />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          More Examples
        </h2>

        <Tabs defaultValue="standard">
          <TabsList className="mb-8">
            <TabsTrigger value="standard" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Standard</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Code</span>
            </TabsTrigger>
            <TabsTrigger value="form" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Forms</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Layout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-8">
            <UIMockup
              title="Dashboard Overview"
              bgGradient="bg-gradient-to-br from-slate-900 to-slate-800"
              itemsPerRow={4}
            />
          </TabsContent>

          <TabsContent value="code" className="space-y-8">
            <UIMockup
              title="Code Editor"
              bgGradient="bg-gradient-to-br from-zinc-900 to-zinc-800"
              itemsPerRow={1}
            >
              <div className="mx-auto max-w-4xl text-left">
                <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-6">
                  <div className="flex items-center gap-2 text-xs text-blue-400">
                    <span>function</span>
                    <span className="text-yellow-300">createMockup</span>
                    <span className="text-white/70">(</span>
                    <span className="text-orange-300">options</span>
                    <span className="text-white/70">)</span>
                    <span className="text-white/70">{" {"}</span>
                  </div>
                  <div className="ml-4 text-xs text-white/80">
                    <div className="mb-1">
                      <span className="text-purple-400">const</span>
                      <span className="ml-1 text-blue-300">mockup</span>
                      <span className="ml-1 text-white/70">=</span>
                      <span className="ml-1 text-blue-300">document</span>
                      <span className="text-white/70">.</span>
                      <span className="text-yellow-300">createElement</span>
                      <span className="text-white/70">(</span>
                      <span className="text-green-300">'div'</span>
                      <span className="text-white/70">);</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-blue-300">mockup</span>
                      <span className="text-white/70">.</span>
                      <span className="text-blue-300">className</span>
                      <span className="ml-1 text-white/70">=</span>
                      <span className="ml-1 text-green-300">'ui-mockup'</span>
                      <span className="text-white/70">;</span>
                    </div>
                    <div className="mb-1">
                      <span className="text-purple-400">return</span>
                      <span className="ml-1 text-blue-300">mockup</span>
                      <span className="text-white/70">;</span>
                    </div>
                  </div>
                  <div className="text-xs text-white/70">{"}"}</div>
                </div>
              </div>
            </UIMockup>
          </TabsContent>

          <TabsContent value="form" className="space-y-8">
            <div className="mb-4 text-center">
              <Button
                asChild
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                <Link href="/ui-mockups/form-mockups">
                  <span>Go to Form Mockup Builder</span>
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                Use our advanced Form Mockup Builder to create customizable form
                mockups
              </p>
            </div>

            <UIMockup
              title="Sign Up Form"
              bgGradient="bg-gradient-to-br from-purple-950 to-violet-900"
              itemsPerRow={1}
            >
              <div className="mx-auto max-w-md">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="mb-6 text-left">
                    <h3 className="text-xl font-semibold text-white">
                      Create an account
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      Fill in the form below to get started
                    </p>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    {/* Name fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 text-left">
                        <div className="text-sm font-medium text-white/70">
                          First name
                        </div>
                        <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                      </div>
                      <div className="space-y-2 text-left">
                        <div className="text-sm font-medium text-white/70">
                          Last name
                        </div>
                        <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Email address
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                      <div className="text-xs text-white/40">
                        We'll never share your email with anyone else.
                      </div>
                    </div>

                    {/* Password field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Password
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                      <div className="text-xs text-white/40">
                        Password must be at least 8 characters long.
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center space-x-2 text-left">
                      <div className="h-4 w-4 rounded border border-white/20 bg-white/5"></div>
                      <div className="text-sm text-white/60">
                        I agree to the Terms of Service and Privacy Policy
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-6">
                    <div className="h-10 w-full rounded-md bg-primary text-center">
                      <div className="py-2 font-medium text-primary-foreground">
                        Create account
                      </div>
                    </div>
                  </div>

                  {/* Sign in link */}
                  <div className="mt-4 text-center text-sm text-white/60">
                    Already have an account?{" "}
                    <span className="text-primary">Sign in</span>
                  </div>
                </div>
              </div>
            </UIMockup>

            <UIMockup
              title="Contact Form"
              bgGradient="bg-gradient-to-br from-blue-950 to-indigo-900"
              itemsPerRow={1}
            >
              <div className="mx-auto max-w-md">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="mb-6 text-left">
                    <h3 className="text-xl font-semibold text-white">
                      Contact Us
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      We'd love to hear from you
                    </p>
                  </div>

                  {/* Form fields */}
                  <div className="space-y-4">
                    {/* Name field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Full name
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Email
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                    </div>

                    {/* Subject dropdown */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Subject
                      </div>
                      <div className="flex h-10 items-center justify-between rounded-md border border-white/10 bg-white/5 px-3">
                        <span className="text-sm text-white/40">
                          Select a subject
                        </span>
                        <svg
                          className="h-4 w-4 text-white/40"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Message
                      </div>
                      <div className="h-32 rounded-md border border-white/10 bg-white/5 px-3 py-2"></div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="mt-6">
                    <div className="h-10 w-full rounded-md bg-primary text-center">
                      <div className="py-2 font-medium text-primary-foreground">
                        Send message
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UIMockup>

            <UIMockup
              title="Profile Settings"
              bgGradient="bg-gradient-to-br from-stone-900 to-stone-800"
              itemsPerRow={1}
            >
              <div className="mx-auto max-w-2xl">
                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-white">
                        Profile Settings
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        Update your account information
                      </p>
                    </div>
                    <div className="flex h-10 w-20 items-center justify-center rounded-md bg-primary">
                      <span className="text-sm font-medium text-primary-foreground">
                        Save
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Profile picture section */}
                    <div className="space-y-4 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Profile picture
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-white/10"></div>
                        <div className="space-y-2">
                          <div className="h-8 w-24 rounded-md border border-white/10 bg-white/5 text-center">
                            <span className="text-xs text-white/60">
                              Change
                            </span>
                          </div>
                          <div className="h-8 w-24 rounded-md border border-white/10 bg-white/5 text-center">
                            <span className="text-xs text-white/60">
                              Remove
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Username field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Username
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                      <div className="text-xs text-white/40">
                        This is your public display name.
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Email
                      </div>
                      <div className="h-10 rounded-md border border-white/10 bg-white/5 px-3"></div>
                    </div>

                    {/* Bio field */}
                    <div className="space-y-2 text-left">
                      <div className="text-sm font-medium text-white/70">
                        Bio
                      </div>
                      <div className="h-24 rounded-md border border-white/10 bg-white/5 px-3 py-2"></div>
                      <div className="text-xs text-white/40">
                        Write a short introduction about yourself.
                      </div>
                    </div>

                    {/* Toggle options */}
                    <div className="col-span-full space-y-4 border-t border-white/10 pt-4 text-left">
                      <div className="text-sm font-medium text-white">
                        Notification settings
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white/70">
                            Email notifications
                          </div>
                          <div className="text-xs text-white/40">
                            Receive emails about your account activity.
                          </div>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary p-1">
                          <div className="ml-auto h-4 w-4 rounded-full bg-white"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white/70">
                            Marketing emails
                          </div>
                          <div className="text-xs text-white/40">
                            Receive emails about new features and updates.
                          </div>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-white/10 p-1">
                          <div className="h-4 w-4 rounded-full bg-white/60"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </UIMockup>
          </TabsContent>

          <TabsContent value="layout" className="space-y-8">
            <UIMockup
              title="Website Layout"
              bgGradient="bg-gradient-to-br from-blue-950 to-indigo-900"
              showWindowControls={true}
            >
              <div className="grid gap-6">
                <div className="h-12 rounded-lg border border-white/10 bg-white/5"></div>
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="md:col-span-3">
                    <div className="grid gap-6">
                      <div className="aspect-video rounded-lg border border-white/10 bg-white/5"></div>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="h-32 rounded-lg border border-white/10 bg-white/5"></div>
                        <div className="h-32 rounded-lg border border-white/10 bg-white/5"></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full rounded-lg border border-white/10 bg-white/5"></div>
                </div>
                <div className="h-12 rounded-lg border border-white/10 bg-white/5"></div>
              </div>
            </UIMockup>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Use these mockups to showcase your application or product in a
          professional way.
        </p>
        <div className="mt-4">
          <Button asChild>
            <Link href="/inspire3">Return to Landing Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
