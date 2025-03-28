"use client";

import * as React from "react";
import {
  Clock,
  Folder,
  MoreVertical,
  Plus,
  Settings,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface TeamMember {
  id: string;
  name: string;
  role: string; // e.g., "Admin", "Editor", "Viewer"
  avatarUrl?: string;
  lastActive?: string; // Optional
}

interface SharedTeamFolder {
  id: string;
  name: string;
  memberCount: number;
  lastActivity: string; // e.g., "Edited 2 hours ago"
}

interface CardTeamOverviewProps extends React.HTMLAttributes<HTMLDivElement> {
  teamName?: string;
  teamMembers?: TeamMember[];
  sharedFolders?: SharedTeamFolder[];
  maxHeightMembers?: string;
  maxHeightFolders?: string;
  onInviteMember?: () => void;
  onManageTeam?: () => void;
  onViewFolder?: (folderId: string) => void;
}

const defaultTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    name: "Alice Wonderland",
    role: "Admin",
    avatarUrl: "/images/placeholder.svg",
    lastActive: "Online",
  },
  {
    id: "tm2",
    name: "Bob The Builder",
    role: "Editor",
    lastActive: "2 hours ago",
  },
  {
    id: "tm3",
    name: "Charlie Chaplin",
    role: "Viewer",
    avatarUrl: "/images/placeholder.svg",
    lastActive: "Yesterday",
  },
  {
    id: "tm4",
    name: "Diana Prince",
    role: "Editor",
    lastActive: "5 minutes ago",
  },
];

const defaultSharedFolders: SharedTeamFolder[] = [
  {
    id: "sf1",
    name: "Marketing Assets",
    memberCount: 4,
    lastActivity: "Alice edited 30 mins ago",
  },
  {
    id: "sf2",
    name: "Sales Reports Q3",
    memberCount: 3,
    lastActivity: "Bob added a file 1 hour ago",
  },
  {
    id: "sf3",
    name: "Development Docs",
    memberCount: 5,
    lastActivity: "Diana commented yesterday",
  },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting16({
  className,
  teamName = "Marketing Team",
  teamMembers = defaultTeamMembers,
  sharedFolders = defaultSharedFolders,
  maxHeightMembers = "150px",
  maxHeightFolders = "150px",
  onInviteMember = () => console.log("Invite member"),
  onManageTeam = () => console.log("Manage team"),
  onViewFolder = (id) => console.log("View folder:", id),
  ...props
}: CardTeamOverviewProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{teamName}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={onInviteMember}>
              <Plus className="mr-1.5 h-4 w-4" />
              Invite
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onManageTeam}
              className="h-8 w-8"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Manage Team</span>
            </Button>
          </div>
        </div>
        <CardDescription className="pt-1 text-sm">
          Overview of team members and shared resources.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Team Members Section */}
        <div>
          <h4 className="mb-2 text-sm font-medium">
            Members ({teamMembers.length})
          </h4>
          <ScrollArea
            style={{ height: maxHeightMembers }}
            className="-mr-4 pr-4"
          >
            <div className="space-y-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={member.avatarUrl} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  {member.lastActive && (
                    <Badge
                      variant={
                        member.lastActive === "Online" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {member.lastActive}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        {/* Shared Folders Section */}
        <div>
          <h4 className="mb-2 text-sm font-medium">
            Shared Folders ({sharedFolders.length})
          </h4>
          <ScrollArea
            style={{ height: maxHeightFolders }}
            className="-mr-4 pr-4"
          >
            <div className="space-y-2">
              {sharedFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50 cursor-pointer"
                  onClick={() => onViewFolder(folder.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium leading-tight">
                        {folder.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {folder.memberCount} members - Last activity:{" "}
                        {folder.lastActivity}
                      </p>
                    </div>
                  </div>
                  {/* Optional: Add a quick action button or indicator */}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="p-4 border-t">
         <Button variant="link" size="sm" className="w-full">Go to Team Settings</Button>
       </CardFooter> */}
    </Card>
  );
}
