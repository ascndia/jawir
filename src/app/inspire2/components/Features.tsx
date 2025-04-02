"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Calendar,
  Check,
  Clock,
  LucideIcon,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";

interface FeatureTab {
  value: string;
  label: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  image: string;
}

const featureTabs: FeatureTab[] = [
  {
    value: "projects",
    label: "Project Management",
    icon: Calendar,
    title: "Organize projects with intuitive workspaces",
    description:
      "Manage workloads, set priorities, and track deadlines in a visual project management system designed for clarity and focus.",
    benefits: [
      "Kanban, list, timeline, and calendar views",
      "Customizable workflow automation",
      "Deadline tracking and reminders",
      "Resource allocation and management",
    ],
    image: "/placeholder-dashboard.png",
  },
  {
    value: "collaboration",
    label: "Team Collaboration",
    icon: Users,
    title: "Collaborate seamlessly with your team",
    description:
      "Foster team communication and alignment with real-time collaboration tools that keep everyone in sync regardless of location.",
    benefits: [
      "Real-time document collaboration",
      "Team messaging and discussions",
      "Shared task management",
      "Permission controls and user roles",
    ],
    image: "/placeholder-dashboard.png",
  },
  {
    value: "reporting",
    label: "Analytics & Reporting",
    icon: BarChart3,
    title: "Gain insights with powerful analytics",
    description:
      "Make data-driven decisions with customizable dashboards and reports that visualize team performance and project progress.",
    benefits: [
      "Customizable performance dashboards",
      "Time tracking and utilization reports",
      "Project status and milestone tracking",
      "Exportable reports in multiple formats",
    ],
    image: "/placeholder-dashboard.png",
  },
  {
    value: "automations",
    label: "Workflow Automation",
    icon: Sparkles,
    title: "Automate repetitive tasks and workflows",
    description:
      "Save time and reduce errors by automating routine processes with easy-to-configure workflow rules and triggers.",
    benefits: [
      "No-code automation builder",
      "Task dependencies and triggers",
      "Scheduled actions and notifications",
      "Integration with external tools",
    ],
    image: "/placeholder-dashboard.png",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full bg-muted/30 py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 max-w-[800px] space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              All the tools your team needs in one place
            </h2>
            <p className="text-xl text-muted-foreground">
              FlowSpace combines project management, collaboration, and
              productivity tools in a unified platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-5xl"
          >
            <Tabs defaultValue="projects" className="w-full">
              <div className="mb-8 flex justify-center">
                <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4">
                  {featureTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden md:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {featureTabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="w-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid items-center gap-8 lg:grid-cols-2"
                  >
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold sm:text-3xl">
                        {tab.title}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {tab.description}
                      </p>

                      <ul className="space-y-3">
                        {tab.benefits.map((benefit, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.3 }}
                            className="flex items-start gap-2"
                          >
                            <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                            <span>{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="overflow-hidden rounded-xl border bg-card p-2 shadow-lg">
                      <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-tr from-primary/5 to-primary/20">
                        <div className="h-full w-full bg-[url('/placeholder-dashboard.png')] bg-cover bg-center opacity-80" />
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24 grid gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: Clock,
                title: "Save time",
                description:
                  "Reduce time spent on administrative tasks by up to 40% with our streamlined workflows.",
              },
              {
                icon: MessageSquare,
                title: "Improve communication",
                description:
                  "Keep all project discussions in one place and reduce back-and-forth emails by 60%.",
              },
              {
                icon: Sparkles,
                title: "Boost productivity",
                description:
                  "Teams report an average 32% increase in productivity after implementing FlowSpace.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex flex-col items-center gap-4 rounded-xl border bg-card p-6 text-center shadow-sm"
                >
                  <div className="rounded-full bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
