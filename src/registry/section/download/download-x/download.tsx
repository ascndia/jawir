"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Apple,
  ArrowRight,
  FileText,
  Shield,
  Cpu,
  AppWindow,
  Terminal,
} from "lucide-react";
import { Button } from "@/registry/components/button/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { Progress } from "@/registry/components/progress";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { cn } from "@/lib/utils";

interface DownloadOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  version: string;
  size: string;
  architecture: string[];
  releaseDate: string;
  downloadUrl: string;
  isRecommended?: boolean;
}

interface DownloadSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
  showSystemDetection?: boolean;
  showReleaseNotes?: boolean;
  releaseNotesUrl?: string;
  downloadOptions?: {
    windows: DownloadOption[];
    mac: DownloadOption[];
    linux: DownloadOption[];
  };
}

export default function DownloadX({
  title = "Download Our App",
  subtitle = "Available for all major platforms",
  description = "Get started with our application today. Choose the version that's right for your operating system.",
  className,
  showSystemDetection = true,
  showReleaseNotes = true,
  releaseNotesUrl = "#release-notes",
  downloadOptions = {
    windows: [
      {
        id: "win-64",
        name: "Windows",
        icon: <AppWindow className="h-5 w-5" />,
        version: "v2.4.1",
        size: "64.3 MB",
        architecture: ["x64"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#windows-download",
        isRecommended: true,
      },
      {
        id: "win-32",
        name: "Windows",
        icon: <AppWindow className="h-5 w-5" />,
        version: "v2.4.1",
        size: "58.7 MB",
        architecture: ["x86"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#windows-download-32",
      },
    ],
    mac: [
      {
        id: "mac-silicon",
        name: "macOS",
        icon: <Apple className="h-5 w-5" />,
        version: "v2.4.1",
        size: "72.1 MB",
        architecture: ["Apple Silicon"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#mac-silicon-download",
        isRecommended: true,
      },
      {
        id: "mac-intel",
        name: "macOS",
        icon: <Apple className="h-5 w-5" />,
        version: "v2.4.1",
        size: "75.8 MB",
        architecture: ["Intel"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#mac-intel-download",
      },
    ],
    linux: [
      {
        id: "linux-deb",
        name: "Linux",
        icon: <Terminal className="h-5 w-5" />,
        version: "v2.4.1",
        size: "61.2 MB",
        architecture: ["x64", "ARM64"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#linux-deb-download",
        isRecommended: true,
      },
      {
        id: "linux-rpm",
        name: "Linux",
        icon: <Terminal className="h-5 w-5" />,
        version: "v2.4.1",
        size: "62.5 MB",
        architecture: ["x64"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#linux-rpm-download",
      },
      {
        id: "linux-appimage",
        name: "Linux",
        icon: <Terminal className="h-5 w-5" />,
        version: "v2.4.1",
        size: "68.9 MB",
        architecture: ["x64"],
        releaseDate: "June 15, 2023",
        downloadUrl: "#linux-appimage-download",
      },
    ],
  },
}: DownloadSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(detectOS());
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  // Detect operating system
  function detectOS() {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.indexOf("win") !== -1) return "windows";
      if (userAgent.indexOf("mac") !== -1) return "mac";
      if (userAgent.indexOf("linux") !== -1) return "linux";
    }
    return "windows"; // Default to Windows
  }

  // Simulate download
  const handleDownload = (option: DownloadOption) => {
    if (downloadProgress !== null) return; // Already downloading

    setDownloadingFile(option.name + " " + option.architecture.join("/"));
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);

          // Reset after completion
          setTimeout(() => {
            setDownloadProgress(null);
            setDownloadingFile(null);

            // Actual download
            const link = document.createElement("a");
            link.href = option.downloadUrl;
            link.download = `${option.name.toLowerCase()}-${
              option.version
            }-${option.architecture.join("-")}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1000);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mt-2 text-xl text-muted-foreground">{subtitle}</p>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="windows"
                  className="flex items-center gap-2"
                >
                  <AppWindow className="h-4 w-4" />
                  <span className="hidden sm:inline">Windows</span>
                </TabsTrigger>
                <TabsTrigger value="mac" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  <span className="hidden sm:inline">macOS</span>
                </TabsTrigger>
                <TabsTrigger value="linux" className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span className="hidden sm:inline">Linux</span>
                </TabsTrigger>
              </TabsList>

              {/* Windows Downloads */}
              <TabsContent value="windows" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <AppWindow className="mr-2 h-5 w-5" /> Windows Downloads
                    </h3>

                    {downloadOptions.windows.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg mb-3",
                          option.isRecommended
                            ? "bg-primary/5 border border-primary/20"
                            : "bg-muted/40"
                        )}
                      >
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <h4 className="font-medium">
                              Windows {option.architecture.join("/")}
                            </h4>
                            {option.isRecommended && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-primary/10 text-primary border-primary/20"
                              >
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.version} • {option.size} • Released{" "}
                            {option.releaseDate}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDownload(option)}
                          disabled={downloadProgress !== null}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* macOS Downloads */}
              <TabsContent value="mac" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Apple className="mr-2 h-5 w-5" /> macOS Downloads
                    </h3>

                    {downloadOptions.mac.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg mb-3",
                          option.isRecommended
                            ? "bg-primary/5 border border-primary/20"
                            : "bg-muted/40"
                        )}
                      >
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <h4 className="font-medium">
                              macOS {option.architecture.join("/")}
                            </h4>
                            {option.isRecommended && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-primary/10 text-primary border-primary/20"
                              >
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.version} • {option.size} • Released{" "}
                            {option.releaseDate}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDownload(option)}
                          disabled={downloadProgress !== null}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Linux Downloads */}
              <TabsContent value="linux" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Terminal className="mr-2 h-5 w-5" /> Linux Downloads
                    </h3>

                    {downloadOptions.linux.map((option) => (
                      <div
                        key={option.id}
                        className={cn(
                          "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg mb-3",
                          option.isRecommended
                            ? "bg-primary/5 border border-primary/20"
                            : "bg-muted/40"
                        )}
                      >
                        <div className="flex-1 mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <h4 className="font-medium">
                              {option.id.includes("deb")
                                ? "Debian/Ubuntu"
                                : option.id.includes("rpm")
                                ? "Fedora/RHEL"
                                : "AppImage"}{" "}
                              ({option.architecture.join("/")})
                            </h4>
                            {option.isRecommended && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-primary/10 text-primary border-primary/20"
                              >
                                Recommended
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {option.version} • {option.size} • Released{" "}
                            {option.releaseDate}
                          </div>
                        </div>

                        <Button
                          onClick={() => handleDownload(option)}
                          disabled={downloadProgress !== null}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Download Progress */}
          {downloadProgress !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 max-w-md mx-auto"
            >
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between text-sm mb-2">
                  <span>Downloading {downloadingFile}...</span>
                  <span>{Math.min(Math.round(downloadProgress), 100)}%</span>
                </div>
                <Progress
                  value={Math.min(downloadProgress, 100)}
                  className="h-2"
                />
                {downloadProgress >= 100 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Download complete! Starting installation...
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Secure Downloads</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                All downloads are verified and digitally signed for your
                security.
              </p>
            </div>

            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-2">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">System Requirements</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Check our documentation for detailed system requirements.
              </p>
            </div>

            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-3 rounded-full bg-primary/10 p-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Release Notes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                View the latest changes and improvements in this version.
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          {showReleaseNotes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <a
                href={releaseNotesUrl}
                className="inline-flex items-center text-primary hover:underline"
              >
                View full release notes
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
