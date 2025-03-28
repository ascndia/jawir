"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { BarChart2, Copy, Edit, List, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
// import { toast } from "sonner-react"; // Removed due to import errors

interface LinkItem {
  id: string;
  name?: string; // Optional name/title for the link
  shortUrl: string;
  longUrl: string;
  createdAt: string; // ISO 8601 format string
}

interface CardLinksRecentList1Props {
  recentLinks?: LinkItem[];
  onCopy?: (url: string) => void;
  onViewStats?: (linkId: string) => void;
  onEdit?: (linkId: string) => void;
}

// Helper to format date (simplified)
function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function CardLinksRecentList1({
  recentLinks = [
    {
      id: "l1",
      name: "Summer Sale Campaign",
      shortUrl: "https://sho.rt/sum24",
      longUrl: "https://example.com/summer-sale-2024-landing-page",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "l2",
      shortUrl: "https://sho.rt/blog1",
      longUrl: "https://example.com/blog/latest-post-title",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "l3",
      name: "Newsletter Signup",
      shortUrl: "https://sho.rt/news",
      longUrl: "https://example.com/newsletter",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  onCopy = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        console.log("Link copied:", url); // Fallback to console log
      },
      (err) => {
        console.error("Failed to copy link:", err); // Fallback to console error
      }
    );
  },
  onViewStats = (linkId) => console.log("View stats for:", linkId),
  onEdit = (linkId) => console.log("Edit link:", linkId),
}: CardLinksRecentList1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Links</CardTitle>
          <List className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Your latest shortened links.</CardDescription>
      </CardHeader>
      <CardContent>
        {recentLinks.length > 0 ? (
          <ul className="space-y-4">
            {recentLinks.slice(0, 3).map(
              (
                link,
                index // Show top 3
              ) => (
                <React.Fragment key={link.id}>
                  <li className="flex items-center justify-between gap-4">
                    <div className="flex-1 overflow-hidden">
                      {link.name && (
                        <p
                          className="text-sm font-medium truncate"
                          title={link.name}
                        >
                          {link.name}
                        </p>
                      )}
                      <p
                        className="text-sm text-blue-600 dark:text-blue-400 truncate"
                        title={link.shortUrl}
                      >
                        {link.shortUrl}
                      </p>
                      <p
                        className="text-xs text-muted-foreground truncate"
                        title={link.longUrl}
                      >
                        {link.longUrl}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground mr-2 whitespace-nowrap">
                        {formatRelativeDate(link.createdAt)}
                      </span>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onCopy(link.shortUrl)}
                            >
                              <Copy className="h-4 w-4" />
                              <span className="sr-only">Copy Link</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Copy Short Link</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewStats(link.id)}
                          >
                            <BarChart2 className="mr-2 h-4 w-4" />
                            View Stats
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(link.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onCopy(link.shortUrl)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Short Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onCopy(link.longUrl)}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Original URL
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </li>
                  {index < recentLinks.slice(0, 3).length - 1 && <Separator />}
                </React.Fragment>
              )
            )}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center">
            <List className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No recent links found. Create one!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
