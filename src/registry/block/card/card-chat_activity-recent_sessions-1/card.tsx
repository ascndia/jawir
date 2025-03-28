"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import {
  ScrollArea,
  ScrollBar,
} from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { MessageSquare, Clock, FileText, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  pdfName: string;
  lastMessageSnippet: string;
  lastActivity: Date;
  unreadCount?: number;
}

interface CardChatActivityRecentSessionsProps {
  sessions?: ChatSession[];
  className?: string;
  maxHeight?: string; // e.g., "h-[400px]"
  onSelectSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
}

// Helper function to format relative time
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return `Yesterday`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export default function CardChatActivityRecentSessions1({
  sessions = [
    // Default mock data
    {
      id: "chat1",
      pdfName: "Annual Report 2024.pdf",
      lastMessageSnippet: "What were the key financial highlights?",
      lastActivity: new Date(Date.now() - 120000),
      unreadCount: 2,
    },
    {
      id: "chat2",
      pdfName: "Project Proposal - AI Integration.pdf",
      lastMessageSnippet: "Can you summarize the implementation timeline?",
      lastActivity: new Date(Date.now() - 3600000 * 3),
    },
    {
      id: "chat3",
      pdfName: "Meeting Notes - Q1 Review.pdf",
      lastMessageSnippet: "Okay, I'll draft the follow-up email.",
      lastActivity: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: "chat4",
      pdfName: "Onboarding Guide.pdf",
      lastMessageSnippet: "Where can I find the section on benefits?",
      lastActivity: new Date(Date.now() - 86400000 * 5),
      unreadCount: 0,
    },
  ],
  className,
  maxHeight = "h-[400px]",
  onSelectSession,
  onDeleteSession,
}: CardChatActivityRecentSessionsProps) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Recent Chat Sessions</CardTitle>
        <CardDescription>
          Continue your conversations or review past interactions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className={maxHeight}>
          <div className="space-y-0">
            {sessions.map((session, index) => (
              <React.Fragment key={session.id}>
                <button
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  onClick={() => onSelectSession?.(session.id)}
                  aria-label={`Select chat session for ${session.pdfName}`}
                >
                  <div className="flex min-w-0 flex-1 items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      {/* Placeholder - ideally use a PDF icon or similar */}
                      <AvatarFallback>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium leading-none">
                        {session.pdfName}
                      </p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {session.lastMessageSnippet}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex flex-col items-end space-y-1 text-xs text-muted-foreground">
                    <span>{formatRelativeTime(session.lastActivity)}</span>
                    {session.unreadCount && session.unreadCount > 0 ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {session.unreadCount}
                      </span>
                    ) : (
                      <div className="h-5 w-5" /> // Placeholder for alignment
                    )}
                  </div>
                  {/* Optional: Add delete button on hover/focus */}
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 h-7 w-7 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering onSelectSession
                      onDeleteSession?.(session.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button> */}
                </button>
                {index < sessions.length - 1 && <Separator />}
              </React.Fragment>
            ))}
            {sessions.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No recent chat sessions found.
              </div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
      {/* Optional Footer for "View All" */}
      {/* <CardFooter className="p-2 border-t">
        <Button variant="link" size="sm" className="w-full">View All Sessions</Button>
      </CardFooter> */}
    </Card>
  );
}
