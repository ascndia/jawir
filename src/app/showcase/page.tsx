"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Layout,
  Palette,
  Layers,
  Box,
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Define our showcase items
const showcaseItems = [
  {
    category: "landing",
    items: [
      {
        title: "FusionUI Landing",
        description:
          "Modern landing page for a UI component library with animated sections.",
        image: "bg-gradient-to-br from-indigo-500 to-purple-700",
        link: "/inspire3",
        new: true,
      },
      {
        title: "SaaS Productivity",
        description:
          "Business-focused landing page for a SaaS productivity tool.",
        image: "bg-gradient-to-br from-cyan-500 to-blue-600",
        link: "/inspire2",
      },
      {
        title: "Creative Agency",
        description:
          "Visually stunning landing page for a creative design agency.",
        image: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
        link: "/inspire",
      },
    ],
  },
  {
    category: "components",
    items: [
      {
        title: "Hero Sections",
        description:
          "Collection of attention-grabbing hero sections with various designs.",
        image: "bg-gradient-to-br from-amber-500 to-orange-600",
        link: "/hero",
      },
      {
        title: "Feature Displays",
        description: "Different ways to showcase your product's features.",
        image: "bg-gradient-to-br from-emerald-500 to-teal-700",
        link: "/features-demo",
      },
      {
        title: "Card Layouts",
        description: "Various card designs for different use cases.",
        image: "bg-gradient-to-br from-sky-500 to-indigo-600",
        link: "/card",
      },
    ],
  },
  {
    category: "layouts",
    items: [
      {
        title: "Dashboard Layouts",
        description: "Admin dashboard layouts with sidebar navigation.",
        image: "bg-gradient-to-br from-rose-500 to-red-700",
        link: "/sidebar-demo",
      },
      {
        title: "Pricing Tables",
        description: "Various pricing table designs with different styles.",
        image: "bg-gradient-to-br from-green-500 to-emerald-700",
        link: "#",
      },
      {
        title: "Content Layouts",
        description: "Blog and content-focused layout designs.",
        image: "bg-gradient-to-br from-blue-500 to-indigo-700",
        link: "#",
      },
    ],
  },
];

function ShowcaseCard({ item }: { item: any }) {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm"
    >
      <Link href={item.link} className="block">
        <div className="relative aspect-video overflow-hidden">
          <div className={`absolute inset-0 ${item.image}`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
              <Layout className="h-8 w-8 text-white" />
            </div>
          </div>
          {item.new && (
            <Badge className="absolute right-3 top-3" variant="default">
              New
            </Badge>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ShowcasePage() {
  const [category, setCategory] = useState("landing");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />

          <div className="container mx-auto relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
                <span className="mr-1 text-primary">🎨</span> Design Showcase
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                UI Component <span className="text-primary">Showcase</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                A collection of beautiful UI components, layouts, and landing
                pages built with shadcn/ui, Tailwind CSS, and Framer Motion
                animations.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" className="group">
                  <span>Browse components</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  <span>View source</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Explore our designs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Browse through our collection of UI components and landing page
                designs
              </p>
            </div>

            <Tabs
              defaultValue="landing"
              className="mx-auto w-full max-w-5xl"
              onValueChange={setCategory}
            >
              <div className="mb-8 flex justify-center">
                <TabsList>
                  <TabsTrigger
                    value="landing"
                    className="flex items-center gap-2"
                  >
                    <Layout className="h-4 w-4" />
                    <span>Landing Pages</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="components"
                    className="flex items-center gap-2"
                  >
                    <Layers className="h-4 w-4" />
                    <span>Components</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="layouts"
                    className="flex items-center gap-2"
                  >
                    <Box className="h-4 w-4" />
                    <span>Layouts</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {showcaseItems.map((categoryData) => (
                <TabsContent
                  key={categoryData.category}
                  value={categoryData.category}
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryData.items.map((item, i) => (
                      <ShowcaseCard key={i} item={item} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-background via-background to-muted/60 shadow-xl">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              <div className="absolute left-12 top-0 h-[150px] w-[300px] bg-primary/30 opacity-20 blur-[100px]"></div>
              <div className="absolute bottom-0 right-12 h-[150px] w-[300px] bg-primary/30 opacity-20 blur-[100px]"></div>

              <div className="relative px-6 py-16 text-center sm:px-12 md:py-24 lg:px-24">
                <div className="mx-auto max-w-3xl">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Need a custom component?
                  </h2>
                  <p className="mt-6 text-lg text-muted-foreground">
                    If you're looking for a specific component or layout that's
                    not in our showcase, let us know and we'll add it to our
                    collection.
                  </p>
                  <div className="mt-10 flex justify-center">
                    <Button size="lg" className="group">
                      <span>Request a component</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
