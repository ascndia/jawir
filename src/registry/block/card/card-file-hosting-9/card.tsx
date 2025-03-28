"use client";

import * as React from "react";
import {
  Folder,
  Link,
  MoreVertical,
  Share2,
  Star,
  Trash2,
  Users,
  FolderOpen, // Added for Open action
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
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface FolderInfo {
  itemCount: number;
  totalSize: string; // e.g., "1.5 GB"
}

interface CardFolderOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  folderName?: string;
  folderInfo?: FolderInfo;
  lastModified?: string;
  sharedWith?: { name: string; avatarUrl?: string }[];
  isStarred?: boolean;
  onOpen?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
}

const defaultFolderInfo: FolderInfo = {
  itemCount: 45,
  totalSize: "1.5 GB",
};

export function CardFileHosting9({
  className,
  folderName = "Project Documents",
  folderInfo = defaultFolderInfo,
  lastModified = "Yesterday at 8:12 AM",
  sharedWith = [
    { name: "Olivia Martin", avatarUrl: "/images/placeholder.svg" },
    { name: "Ken Adams" },
  ],
  isStarred = true,
  onOpen = () => console.log("Open folder"),
  onShare = () => console.log("Share folder"),
  onDelete = () => console.log("Delete folder"),
  ...props
}: CardFolderOverviewProps) {
  const [starred, setStarred] = React.useState(isStarred);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Folder className="h-6 w-6 text-primary" />
            <div>
              <CardTitle className="text-lg leading-tight">
                {folderName}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {folderInfo.itemCount} items - {folderInfo.totalSize}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setStarred(!starred)}
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        starred
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <span className="sr-only">
                      {starred ? "Unstar" : "Star"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{starred ? "Remove from starred" : "Add to starred"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onOpen}>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={onShare}>
                        {" "}
                        {/* Simplified share */}
                        <Link className="mr-2 h-4 w-4" />
                        <span>Get shareable link</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onShare}>
                        {" "}
                        {/* Simplified share */}
                        <Users className="mr-2 h-4 w-4" />
                        <span>Invite people</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {/* Content could show recent files within the folder, or a preview */}
        <div className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Folder contents preview area
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <div className="mb-3 flex w-full items-center justify-between text-xs text-muted-foreground">
          <span>Last modified: {lastModified}</span>
          {sharedWith && sharedWith.length > 0 && (
            <div className="flex items-center">
              <Users className="mr-1.5 h-3 w-3" />
              <span>Shared</span>
            </div>
          )}
        </div>
        {sharedWith && sharedWith.length > 0 && (
          <div className="flex -space-x-2 overflow-hidden">
            {sharedWith.slice(0, 3).map((user, index) => (
              <TooltipProvider key={index} delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback className="text-[10px]">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {sharedWith.length > 3 && (
              <Avatar className="h-6 w-6 border-2 border-background">
                <AvatarFallback className="text-[10px]">
                  +{sharedWith.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
