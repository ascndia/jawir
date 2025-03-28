"use client";

import * as React from "react";
import {
  Clock,
  Download,
  Eye,
  History,
  MoreVertical,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface FileVersion {
  id: string;
  versionName: string; // e.g., "Version 3", "Current Version"
  timestamp: string; // e.g., "2023-10-26 10:30 AM"
  editor: {
    name: string;
    avatarUrl?: string;
  };
  size?: string; // Optional size difference or absolute size
  isCurrent?: boolean;
}

interface CardVersionHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string;
  versions?: FileVersion[];
  maxHeight?: string;
  onPreviewVersion?: (versionId: string) => void;
  onDownloadVersion?: (versionId: string) => void;
  onRestoreVersion?: (versionId: string) => void; // Optional
}

const defaultVersions: FileVersion[] = [
  {
    id: "v4",
    versionName: "Current Version",
    timestamp: "Today at 11:15 AM",
    editor: { name: "Maria Garcia", avatarUrl: "/images/placeholder.svg" },
    size: "12.8 MB",
    isCurrent: true,
  },
  {
    id: "v3",
    versionName: "Version 3",
    timestamp: "Yesterday at 4:30 PM",
    editor: { name: "Alex Johnson" },
    size: "12.5 MB",
  },
  {
    id: "v2",
    versionName: "Version 2",
    timestamp: "2 days ago at 9:00 AM",
    editor: { name: "Alex Johnson", avatarUrl: "/images/placeholder.svg" },
    size: "11.9 MB",
  },
  {
    id: "v1",
    versionName: "Version 1",
    timestamp: "3 days ago at 2:00 PM",
    editor: { name: "David Lee" },
    size: "10.1 MB",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting5({
  className,
  fileName = "document_final.pdf",
  versions = defaultVersions,
  maxHeight = "350px",
  onPreviewVersion = (id) => console.log("Preview version:", id),
  onDownloadVersion = (id) => console.log("Download version:", id),
  onRestoreVersion = (id) => console.log("Restore version:", id),
  ...props
}: CardVersionHistoryProps) {
  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          <History className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">
            Version History
          </CardTitle>
        </div>
        <CardDescription className="text-sm">
          Review changes made to "{fileName}"
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          <div className="space-y-1 p-4 pt-0">
            {versions.map((version, index) => (
              <div
                key={version.id}
                className={cn(
                  "relative flex items-center justify-between rounded-md p-2 hover:bg-muted/50",
                  version.isCurrent && "bg-muted/50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage
                      src={version.editor.avatarUrl}
                      alt={version.editor.name}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(version.editor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {version.versionName}
                      {version.isCurrent && (
                        <Badge
                          variant="secondary"
                          className="ml-2 px-1.5 py-0.5 text-[10px] font-normal"
                        >
                          Current
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Edited by {version.editor.name} - {version.timestamp}
                      {version.size && ` (${version.size})`}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 flex-shrink-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Version options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                      onClick={() => onPreviewVersion(version.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Preview</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDownloadVersion(version.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    {!version.isCurrent && onRestoreVersion && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onRestoreVersion(version.id)}
                        >
                          <History className="mr-2 h-4 w-4" />
                          <span>Restore this version</span>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
                {index < versions.length - 1 && (
                  <Separator className="absolute bottom-[-2px] left-4 right-4 h-px" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="p-4 border-t">
        <p className="text-xs text-muted-foreground">Older versions may be automatically deleted.</p>
      </CardFooter> */}
    </Card>
  );
}
