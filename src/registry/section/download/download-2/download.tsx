"use client";

import React, { useState, useEffect } from "react";
import { Download, Apple, AppWindow, Terminal, Smartphone } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import { Progress } from "@/registry/components/progress";
import { cn } from "@/lib/utils";

interface DownloadMinimalProps {
  title?: string;
  description?: string;
  className?: string;
  backgroundColor?: string;
  textColor?: string;
  platforms?: {
    id: string;
    name: string;
    icon: React.ReactNode;
    downloadUrl: string;
    requirements?: string;
  }[];
}

export default function Download2({
  title = "Download",
  description = "Install the app and sign in to get started.",
  className,
  backgroundColor = "bg-background",
  textColor = "text-foreground",
  platforms = [
    {
      id: "macos",
      name: "macOS",
      icon: <Apple className="h-10 w-10" />,
      downloadUrl: "#macos-download",
    },
    {
      id: "ios",
      name: "iOS",
      icon: <Apple className="h-10 w-10" />,
      downloadUrl: "#ios-download",
    },
    {
      id: "windows",
      name: "Windows",
      icon: <AppWindow className="h-10 w-10" />,
      downloadUrl: "#windows-download",
      requirements: "Requires Windows 10 or later.",
    },
    {
      id: "linux",
      name: "Linux",
      icon: <Terminal className="h-10 w-10" />,
      downloadUrl: "#linux-download",
    },
    {
      id: "android",
      name: "Android",
      icon: <Smartphone className="h-10 w-10" />,
      downloadUrl: "#android-download",
    },
  ],
}: DownloadMinimalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  // Detect OS on component mount
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("win") !== -1) {
      setSelectedPlatform("windows");
    } else if (userAgent.indexOf("mac") !== -1) {
      setSelectedPlatform("macos");
    } else if (userAgent.indexOf("linux") !== -1) {
      setSelectedPlatform("linux");
    } else if (userAgent.indexOf("android") !== -1) {
      setSelectedPlatform("android");
    } else if (
      userAgent.indexOf("iphone") !== -1 ||
      userAgent.indexOf("ipad") !== -1
    ) {
      setSelectedPlatform("ios");
    } else {
      // Default to Windows if we can't detect
      setSelectedPlatform("windows");
    }
  }, []);

  // Simulate download
  const handleDownload = () => {
    if (!selectedPlatform || downloadProgress !== null) return;

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

            // Actual download
            const platform = platforms.find((p) => p.id === selectedPlatform);
            if (platform) {
              const link = document.createElement("a");
              link.href = platform.downloadUrl;
              link.download = `app-${platform.name.toLowerCase()}.zip`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }, 1000);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const selectedPlatformData = platforms.find((p) => p.id === selectedPlatform);

  return (
    <section
      className={cn("py-16 md:py-24", backgroundColor, textColor, className)}
    >
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">{description}</p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-lg cursor-pointer transition-colors",
                  selectedPlatform === platform.id
                    ? "bg-primary/10 border-2 border-primary"
                    : "bg-muted/50 border-2 border-transparent hover:bg-muted"
                )}
              >
                <div className="mb-3 text-primary">{platform.icon}</div>
                <span className="font-medium">{platform.name}</span>
              </div>
            ))}
          </div>

          {selectedPlatformData && (
            <div className="mt-12">
              <Button
                onClick={handleDownload}
                disabled={downloadProgress !== null}
                className="px-8 py-6 text-lg"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download for {selectedPlatformData.name}
              </Button>

              {selectedPlatformData.requirements && (
                <p className="mt-4 text-sm text-muted-foreground">
                  {selectedPlatformData.requirements}
                </p>
              )}
            </div>
          )}

          {/* Download Progress */}
          {downloadProgress !== null && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between text-sm mb-2">
                  <span>Downloading...</span>
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
        </div>
      </div>
    </section>
  );
}
