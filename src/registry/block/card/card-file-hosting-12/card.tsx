"use client";

import * as React from "react";
import {
  Copy,
  Edit,
  FileText,
  Folder,
  Link2,
  MoreVertical,
  Settings,
  Trash2,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/registry/components/input/input-shadcn/input"; // For displaying the link
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type SharedLinkAccessLevel = "view" | "edit" | "password_protected"; // Example levels

interface SharedLinkItem {
  id: string;
  link: string;
  itemName: string;
  itemType: "file" | "folder";
  accessLevel: SharedLinkAccessLevel;
  createdAt: string;
  expiresAt?: string; // Optional expiration
  viewCount?: number; // Optional stats
}

interface CardSharedLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  sharedLinks?: SharedLinkItem[];
  maxHeight?: string;
  onCopyLink?: (link: string) => void;
  onRevokeLink?: (linkId: string) => void;
  onEditLinkSettings?: (linkId: string) => void; // e.g., change expiry, password, access level
}

const defaultSharedLinks: SharedLinkItem[] = [
  {
    id: "link1",
    link: "https://example.com/s/aBcDeFg1",
    itemName: "Marketing Presentation Q3.pptx",
    itemType: "file",
    accessLevel: "view",
    createdAt: "3 days ago",
    viewCount: 15,
  },
  {
    id: "link2",
    link: "https://example.com/s/hIjKlMn2",
    itemName: "Project Alpha Assets",
    itemType: "folder",
    accessLevel: "edit",
    createdAt: "1 week ago",
    expiresAt: "in 10 days",
    viewCount: 5,
  },
  {
    id: "link3",
    link: "https://example.com/s/oPqRsTu3",
    itemName: "Financial Report Draft.docx",
    itemType: "file",
    accessLevel: "password_protected",
    createdAt: "2 weeks ago",
    viewCount: 2,
  },
];

const getItemIcon = (type: SharedLinkItem["itemType"]) => {
  switch (type) {
    case "file":
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case "folder":
      return <Folder className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

const getAccessLevelBadge = (level: SharedLinkAccessLevel) => {
  switch (level) {
    case "view":
      return <Badge variant="outline">View only</Badge>;
    case "edit":
      return <Badge variant="secondary">Can edit</Badge>;
    case "password_protected":
      return <Badge variant="destructive">Password</Badge>; // Example style
    default:
      return null;
  }
};

export function CardFileHosting12({
  className,
  title = "Shared Links",
  description = "Manage links you've shared for files and folders.",
  sharedLinks = defaultSharedLinks,
  maxHeight = "400px",
  onCopyLink = (link) => console.log("Copy link:", link),
  onRevokeLink = (id) => console.log("Revoke link:", id),
  onEditLinkSettings = (id) => console.log("Edit link settings:", id),
  ...props
}: CardSharedLinksProps) {
  return (
    <Card className={cn("w-full max-w-xl", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Link2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {sharedLinks.length > 0 ? (
            <div className="space-y-3 p-4 pt-0">
              {sharedLinks.map((linkItem) => (
                <div
                  key={linkItem.id}
                  className="rounded-md border p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center space-x-2">
                      <div className="flex-shrink-0">
                        {getItemIcon(linkItem.itemType)}
                      </div>
                      <p
                        className="truncate text-sm font-medium"
                        title={linkItem.itemName}
                      >
                        {linkItem.itemName}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center space-x-2">
                      {getAccessLevelBadge(linkItem.accessLevel)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Link options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => onCopyLink(linkItem.link)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy link</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditLinkSettings(linkItem.id)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => onRevokeLink(linkItem.id)}
                          >
                            <X className="mr-2 h-4 w-4" />
                            <span>Revoke link</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={linkItem.link}
                      readOnly
                      className="flex-1 h-8 text-xs bg-muted border-muted"
                    />
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onCopyLink(linkItem.link)}
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy link</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created {linkItem.createdAt}</span>
                    <div className="flex items-center space-x-3">
                      {linkItem.expiresAt && (
                        <span>Expires {linkItem.expiresAt}</span>
                      )}
                      {linkItem.viewCount !== undefined && (
                        <span>{linkItem.viewCount} views</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No active shared links.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
