"use client";

import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import { cn } from "@/lib/utils";

interface DownloadOption {
  platform: string;
  architecture: string;
  downloadUrl: string;
}

interface DownloadList1Props {
  title?: string;
  subtitle?: string;
  version?: string;
  className?: string;
  downloadOptions?: DownloadOption[];
}

export default function DownloadList1({
  title = "Download Cursor",
  subtitle = "Choose your platform to download the latest version of Cursor",
  version = "0.47",
  className,
  downloadOptions = [
    {
      platform: "MACOS",
      architecture: "MAC UNIVERSAL",
      downloadUrl: "#macos-universal",
    },
    {
      platform: "MACOS",
      architecture: "MAC ARM64",
      downloadUrl: "#macos-arm64",
    },
    {
      platform: "MACOS",
      architecture: "MAC X64",
      downloadUrl: "#macos-x64",
    },
    {
      platform: "WINDOWS",
      architecture: "WINDOWS 10/11 (X64)",
      downloadUrl: "#windows-x64",
    },
    {
      platform: "WINDOWS",
      architecture: "WINDOWS 10/11 (ARM64)",
      downloadUrl: "#windows-arm64",
    },
    {
      platform: "LINUX",
      architecture: ".APPIMAGE (X64)",
      downloadUrl: "#linux-x64",
    },
    {
      platform: "LINUX",
      architecture: ".APPIMAGE (ARM64)",
      downloadUrl: "#linux-arm64",
    },
  ],
}: DownloadList1Props) {
  const [downloadProgress, setDownloadProgress] = useState<{
    option: DownloadOption;
    progress: number;
  } | null>(null);

  // Simulate download
  const handleDownload = (option: DownloadOption) => {
    if (downloadProgress !== null) return; // Already downloading

    setDownloadProgress({ option, progress: 0 });

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (!prev) return null;

        if (prev.progress >= 100) {
          clearInterval(interval);

          // Reset after completion
          setTimeout(() => {
            setDownloadProgress(null);

            // Actual download
            const link = document.createElement("a");
            link.href = option.downloadUrl;
            link.download = `cursor-${version}-${option.platform.toLowerCase()}-${option.architecture
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "-")}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 1000);

          return prev;
        }

        return { ...prev, progress: prev.progress + Math.random() * 15 };
      });
    }, 300);
  };

  return (
    <section className={cn("py-8 md:py-12", className)}>
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8">{subtitle}</p>

          <h2 className="text-2xl font-bold mb-6">
            Latest Version ({version})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloadOptions.map((option, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-bold">{option.platform}</span>
                  <span className="text-muted-foreground text-sm">
                    {option.architecture}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(option)}
                  disabled={downloadProgress !== null}
                  className="h-10 w-10"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Download Progress */}
          {downloadProgress !== null && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    Downloading Cursor {version} for{" "}
                    {downloadProgress.option.platform} (
                    {downloadProgress.option.architecture})...
                  </span>
                  <span>
                    {Math.min(Math.round(downloadProgress.progress), 100)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{
                      width: `${Math.min(downloadProgress.progress, 100)}%`,
                    }}
                  />
                </div>
                {downloadProgress.progress >= 100 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                    Download complete! Starting installation...
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
