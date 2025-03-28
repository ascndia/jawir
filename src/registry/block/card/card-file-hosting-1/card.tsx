"use client";

import * as React from "react";
import {
  ChevronDown,
  Download,
  Eye,
  FileText,
  Link,
  MoreVertical,
  Share2,
  Star,
  Trash2,
  Users,
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface CardFileHostingProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string;
  fileType?: string;
  fileSize?: string;
  lastModified?: string;
  sharedWith?: { name: string; avatarUrl?: string }[];
  isStarred?: boolean;
  previewImageUrl?: string;
}

export function CardFileHosting1({
  className,
  fileName = "document_final_v3.pdf",
  fileType = "PDF Document",
  fileSize = "12.5 MB",
  lastModified = "Yesterday at 4:30 PM",
  sharedWith = [
    { name: "Olivia Martin", avatarUrl: "/images/placeholder.svg" },
    { name: "Ken Adams" },
    { name: "Sophia Loren" },
  ],
  isStarred = false,
  previewImageUrl = "/images/placeholder.svg", // Placeholder image
  ...props
}: CardFileHostingProps) {
  const [starred, setStarred] = React.useState(isStarred);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg leading-tight">
                {fileName}
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {fileType} - {fileSize}
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
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Preview</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Link className="mr-2 h-4 w-4" />
                        <span>Copy link</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Manage access</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {previewImageUrl ? (
            <img
              src={previewImageUrl}
              alt={`Preview of ${fileName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FileText className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
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
