"use client";

import * as React from "react";
import { FileClock, FilePlus2, FileText, Folder } from "lucide-react";

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
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";

interface ActivityItem {
  id: string;
  type: "upload" | "edit" | "share" | "comment";
  fileName: string;
  fileTypeIcon?: React.ElementType;
  timestamp: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
}

interface CardRecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  activities?: ActivityItem[];
  maxHeight?: string;
}

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "upload",
    fileName: "Project Proposal V2.docx",
    fileTypeIcon: FileText,
    timestamp: "2 hours ago",
    user: { name: "Alex Johnson", avatarUrl: "/images/placeholder.svg" },
  },
  {
    id: "2",
    type: "edit",
    fileName: "Marketing Budget Q3.xlsx",
    fileTypeIcon: FileText,
    timestamp: "5 hours ago",
    user: { name: "Maria Garcia" },
  },
  {
    id: "3",
    type: "share",
    fileName: "Design Assets",
    fileTypeIcon: Folder,
    timestamp: "Yesterday",
    user: { name: "David Lee", avatarUrl: "/images/placeholder.svg" },
  },
  {
    id: "4",
    type: "comment",
    fileName: "User Flow Diagram.fig",
    fileTypeIcon: FileText,
    timestamp: "2 days ago",
    user: { name: "Sophia Loren" },
  },
  {
    id: "5",
    type: "upload",
    fileName: "Onboarding Presentation.pptx",
    fileTypeIcon: FileText,
    timestamp: "3 days ago",
    user: { name: "Ken Adams", avatarUrl: "/images/placeholder.svg" },
  },
];

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "upload":
      return <FilePlus2 className="h-4 w-4 text-blue-500" />;
    case "edit":
      return <FileClock className="h-4 w-4 text-orange-500" />;
    // Add other cases for share, comment etc. if needed
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

const getActivityText = (activity: ActivityItem) => {
  switch (activity.type) {
    case "upload":
      return `uploaded ${activity.fileName}`;
    case "edit":
      return `edited ${activity.fileName}`;
    case "share":
      return `shared ${activity.fileName}`;
    case "comment":
      return `commented on ${activity.fileName}`;
    default:
      return `interacted with ${activity.fileName}`;
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting3({
  className,
  title = "Recent Activity",
  description = "Latest updates on your files and folders.",
  activities = defaultActivities,
  maxHeight = "300px",
  ...props
}: CardRecentActivityProps) {
  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          <div className="space-y-4 p-4 pt-0">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage
                    src={activity.user.avatarUrl}
                    alt={activity.user.name}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(activity.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.name}</span>{" "}
                    {getActivityText(activity)}
                  </p>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    {activity.fileTypeIcon && (
                      <activity.fileTypeIcon className="h-3 w-3" />
                    )}
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                {index < activities.length - 1 && (
                  <Separator className="absolute bottom-0 left-4 right-4" /> // This might need adjustment based on layout
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      {/* Optional Footer for "View All" button */}
      {/* <CardFooter className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full">View All Activity</Button>
      </CardFooter> */}
    </Card>
  );
}
