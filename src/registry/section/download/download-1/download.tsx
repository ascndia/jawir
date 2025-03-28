"use client";

import React, { useState } from "react";
import { Download, Apple, ArrowRight, AppWindow, Terminal } from "lucide-react";
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
  name: string;
  icon: React.ReactNode;
  version: string;
  size: string;
  downloadUrl: string;
  isRecommended?: boolean;
}

interface DownloadSimpleProps {
  title?: string;
  description?: string;
  className?: string;
  downloadOptions?: {
    windows: DownloadOption;
    mac: DownloadOption;
    linux: DownloadOption;
  };
}

export default function Download1({
  title = "Download Our App",
  description = "Available for all major platforms",
  className,
  downloadOptions = {
    windows: {
      name: "Windows",
      icon: <AppWindow className="h-5 w-5" />,
      version: "v2.4.1",
      size: "64.3 MB",
      downloadUrl: "#windows-download",
      isRecommended: true,
    },
    mac: {
      name: "macOS",
      icon: <Apple className="h-5 w-5" />,
      version: "v2.4.1",
      size: "72.1 MB",
      downloadUrl: "#mac-download",
      isRecommended: true,
    },
    linux: {
      name: "Linux",
      icon: <Terminal className="h-5 w-5" />,
      version: "v2.4.1",
      size: "61.2 MB",
      downloadUrl: "#linux-download",
      isRecommended: true,
    },
  },
}: DownloadSimpleProps) {
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

    setDownloadingFile(option.name);
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
            }.zip`;
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
    <section className={cn("py-12 md:py-16", className)}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{description}</p>

          <div className="mt-8">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
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

              {/* Windows Download */}
              <TabsContent value="windows" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <AppWindow className="mr-2 h-5 w-5" />
                        <h3 className="text-lg font-medium">Windows</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 bg-primary/10 text-primary border-primary/20"
                        >
                          Recommended
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {downloadOptions.windows.version} •{" "}
                        {downloadOptions.windows.size}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleDownload(downloadOptions.windows)}
                      disabled={downloadProgress !== null}
                      className="flex items-center gap-2"
                      size="lg"
                    >
                      <Download className="h-4 w-4" />
                      Download for Windows
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* macOS Download */}
              <TabsContent value="mac" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <Apple className="mr-2 h-5 w-5" />
                        <h3 className="text-lg font-medium">macOS</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 bg-primary/10 text-primary border-primary/20"
                        >
                          Recommended
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {downloadOptions.mac.version} •{" "}
                        {downloadOptions.mac.size}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleDownload(downloadOptions.mac)}
                      disabled={downloadProgress !== null}
                      className="flex items-center gap-2"
                      size="lg"
                    >
                      <Download className="h-4 w-4" />
                      Download for macOS
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Linux Download */}
              <TabsContent value="linux" className="space-y-4">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center">
                        <Terminal className="mr-2 h-5 w-5" />
                        <h3 className="text-lg font-medium">Linux</h3>
                        <Badge
                          variant="outline"
                          className="ml-2 bg-primary/10 text-primary border-primary/20"
                        >
                          Recommended
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {downloadOptions.linux.version} •{" "}
                        {downloadOptions.linux.size}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleDownload(downloadOptions.linux)}
                      disabled={downloadProgress !== null}
                      className="flex items-center gap-2"
                      size="lg"
                    >
                      <Download className="h-4 w-4" />
                      Download for Linux
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Download Progress */}
          {downloadProgress !== null && (
            <div className="mt-6 max-w-md mx-auto">
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
                    Download complete!
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Additional Link */}
          <div className="mt-8">
            <a
              href="#all-versions"
              className="inline-flex items-center text-primary hover:underline"
            >
              View all download options
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
