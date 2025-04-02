"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const showcaseItems = [
  {
    category: "dashboards",
    items: [
      {
        title: "Analytics Dashboard",
        description:
          "Data visualization with real-time charts and interactive elements.",
        image: "bg-gradient-to-br from-violet-500 to-purple-700",
        new: true,
      },
      {
        title: "Marketing Hub",
        description: "Campaign management and performance tracking dashboard.",
        image: "bg-gradient-to-br from-cyan-500 to-blue-600",
      },
      {
        title: "E-Commerce Store",
        description:
          "Product showcase with cart, checkout, and inventory management.",
        image: "bg-gradient-to-br from-emerald-500 to-teal-700",
      },
    ],
  },
  {
    category: "components",
    items: [
      {
        title: "Form Components",
        description:
          "Comprehensive collection of form elements with validation patterns.",
        image: "bg-gradient-to-br from-amber-500 to-orange-600",
        new: true,
      },
      {
        title: "Navigation Elements",
        description:
          "Headers, sidebars, and navigation components for all device sizes.",
        image: "bg-gradient-to-br from-rose-500 to-red-700",
      },
      {
        title: "Data Tables",
        description:
          "Sortable, filterable tables with pagination and row actions.",
        image: "bg-gradient-to-br from-sky-500 to-indigo-600",
      },
    ],
  },
  {
    category: "layouts",
    items: [
      {
        title: "Landing Pages",
        description:
          "Conversion-focused layouts with hero sections and call-to-actions.",
        image: "bg-gradient-to-br from-fuchsia-500 to-pink-600",
        new: true,
      },
      {
        title: "App Layouts",
        description:
          "Application shells with responsive sidebar and top navigation.",
        image: "bg-gradient-to-br from-green-500 to-emerald-700",
      },
      {
        title: "Admin Interfaces",
        description:
          "Complete admin panel layouts with all necessary components.",
        image: "bg-gradient-to-br from-blue-500 to-indigo-700",
      },
    ],
  },
];

function ShowcaseCard({ item, index }: { item: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
    >
      <div className="relative aspect-video overflow-hidden">
        <div className={cn("absolute inset-0", item.image)} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-xl bg-white/10 backdrop-blur" />
        </div>
        {item.new && (
          <Badge className="absolute right-3 top-3" variant="default">
            New
          </Badge>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="showcase" className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm">
            <span className="mr-1 text-primary">🎨</span> Showcase
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Beautiful UI examples, ready to use
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our collection of pre-designed interfaces and components to
            kickstart your next project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="dashboards" className="mx-auto w-full max-w-5xl">
            <div className="mb-8 flex justify-center">
              <TabsList>
                <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="layouts">Layouts</TabsTrigger>
              </TabsList>
            </div>

            {showcaseItems.map((category) => (
              <TabsContent key={category.category} value={category.category}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, i) => (
                    <ShowcaseCard key={i} item={item} index={i} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
