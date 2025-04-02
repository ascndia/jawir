"use client";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IntegrationIcon {
  name: string;
  icon: string;
  color: string;
}

const integrationIcons: IntegrationIcon[] = [
  { name: "Slack", icon: "slack", color: "#4A154B" },
  { name: "Google Drive", icon: "google-drive", color: "#0F9D58" },
  { name: "Microsoft Teams", icon: "microsoft-teams", color: "#6264A7" },
  { name: "GitHub", icon: "github", color: "#24292E" },
  { name: "Jira", icon: "jira", color: "#0052CC" },
  { name: "Dropbox", icon: "dropbox", color: "#0061FF" },
  { name: "Zoom", icon: "zoom", color: "#2D8CFF" },
  { name: "Notion", icon: "notion", color: "#000000" },
  { name: "Asana", icon: "asana", color: "#FC636B" },
  { name: "Figma", icon: "figma", color: "#F24E1E" },
  { name: "HubSpot", icon: "hubspot", color: "#FF7A59" },
  { name: "Zendesk", icon: "zendesk", color: "#03363D" },
  { name: "Intercom", icon: "intercom", color: "#0177CC" },
  { name: "Zapier", icon: "zapier", color: "#FF4A00" },
  { name: "Gmail", icon: "gmail", color: "#EA4335" },
  { name: "Outlook", icon: "outlook", color: "#0078D4" },
  { name: "Trello", icon: "trello", color: "#0079BF" },
  { name: "Monday", icon: "monday", color: "#FF3D57" },
];

export default function Integrations() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
      },
    },
  };

  return (
    <section
      id="integrations"
      className="relative w-full bg-muted/50 py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>

      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Integrate with your favorite tools
            </h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              FlowSpace connects with over 100+ tools you already use, enabling
              a seamless workflow without switching between apps.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9"
        >
          {integrationIcons.map((integration, i) => (
            <motion.div
              key={integration.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex justify-center"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-xl border bg-card p-2 shadow-sm"
                      style={{
                        boxShadow: `0 4px 14px 0 ${integration.color}15`,
                      }}
                    >
                      <div
                        className="h-10 w-10 rounded-md"
                        style={{ backgroundColor: `${integration.color}25` }}
                      >
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-xs font-semibold">
                            {integration.name.substring(0, 2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{integration.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <p className="text-muted-foreground">
            Plus many more integrations available through our API and Zapier
            connection.
          </p>
          <div className="mt-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Request an integration
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 rounded-xl border bg-card/50 p-8 shadow-lg"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold">Developer API</h3>
              <p className="text-muted-foreground">
                Build custom integrations and extend FlowSpace functionality
                with our comprehensive API and webhooks system.
              </p>
              <div className="inline-flex items-center text-primary">
                <span className="font-medium">Explore API documentation</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border bg-muted/20">
              <div className="flex h-8 items-center border-b bg-muted/50 px-4">
                <div className="flex items-center space-x-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-destructive/70"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
                </div>
              </div>
              <div className="overflow-auto p-4">
                <pre className="text-xs text-muted-foreground">
                  <code>{`// Example API request
fetch('https://api.flowspace.com/v1/projects', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
