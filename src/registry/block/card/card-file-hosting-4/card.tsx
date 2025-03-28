"use client";

import * as React from "react";
import { Copy, Link, Plus, Settings, Trash2, Users, X } from "lucide-react";

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
import { Input } from "@/registry/components/input/input-shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import Label from "@/registry/components/label/label-shadcn/label";
import Switch from "@/registry/components/switch/switch-shadcn/switch";

type PermissionLevel = "view" | "edit" | "owner";

interface SharedUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  permission: PermissionLevel;
}

interface CardShareSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string;
  isPublicLinkActive?: boolean;
  publicLink?: string;
  sharedUsers?: SharedUser[];
  onTogglePublicLink?: (active: boolean) => void;
  onCopyLink?: () => void;
  onAddUser?: (email: string, permission: PermissionLevel) => void;
  onRemoveUser?: (userId: string) => void;
  onChangePermission?: (userId: string, permission: PermissionLevel) => void;
}

const defaultUsers: SharedUser[] = [
  {
    id: "user1",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    avatarUrl: "/images/placeholder.svg",
    permission: "edit",
  },
  {
    id: "user2",
    name: "Ken Adams",
    email: "ken.adams@example.com",
    permission: "view",
  },
  {
    id: "user3",
    name: "You",
    email: "current.user@example.com",
    avatarUrl: "/images/placeholder.svg", // Placeholder for current user
    permission: "owner",
  },
];

export function CardFileHosting4({
  className,
  fileName = "Quarterly Report Q2",
  isPublicLinkActive = false,
  publicLink = "https://example.com/share/xyz789",
  sharedUsers = defaultUsers,
  onTogglePublicLink = (active) => console.log("Toggled public link:", active),
  onCopyLink = () => console.log("Copied link"),
  onAddUser = (email, permission) =>
    console.log("Add user:", email, permission),
  onRemoveUser = (userId) => console.log("Remove user:", userId),
  onChangePermission = (userId, permission) =>
    console.log("Change permission:", userId, permission),
  ...props
}: CardShareSettingsProps) {
  const [publicLinkActive, setPublicLinkActive] =
    React.useState(isPublicLinkActive);
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserPermission, setNewUserPermission] =
    React.useState<PermissionLevel>("view");

  const handleTogglePublicLink = (checked: boolean) => {
    setPublicLinkActive(checked);
    onTogglePublicLink(checked);
  };

  const handleAddUser = () => {
    if (newUserEmail) {
      onAddUser(newUserEmail, newUserPermission);
      setNewUserEmail(""); // Clear input after adding
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">Share "{fileName}"</CardTitle>
        <CardDescription>Manage who can access this file.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-4">
        <div className="space-y-3">
          <Label htmlFor="addUser" className="text-sm font-medium">
            Invite people
          </Label>
          <div className="flex space-x-2">
            <Input
              id="addUser"
              type="email"
              placeholder="Enter email address"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="flex-1"
            />
            <Select
              value={newUserPermission}
              onValueChange={(value: PermissionLevel) =>
                setNewUserPermission(value)
              }
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Permission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="view">Can view</SelectItem>
                <SelectItem value="edit">Can edit</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddUser} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add user</span>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">People with access</Label>
          <div className="space-y-2">
            {sharedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {user.name} {user.permission === "owner" && "(You)"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {user.permission !== "owner" ? (
                    <>
                      <Select
                        value={user.permission}
                        onValueChange={(value: PermissionLevel) =>
                          onChangePermission(user.id, value)
                        }
                      >
                        <SelectTrigger className="w-[100px] h-8 text-xs">
                          <SelectValue placeholder="Permission" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">Can view</SelectItem>
                          <SelectItem value="edit">Can edit</SelectItem>
                        </SelectContent>
                      </Select>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onRemoveUser(user.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove access</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove access</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Owner
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="publicLink" className="text-sm font-medium">
              Public Link Access
            </Label>
            <Switch
              id="publicLink"
              checked={publicLinkActive}
              onCheckedChange={handleTogglePublicLink}
            />
          </div>
          {publicLinkActive && (
            <div className="flex space-x-2">
              <Input
                type="text"
                value={publicLink}
                readOnly
                className="flex-1 text-xs"
              />
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={onCopyLink}
                      className="h-9 w-9"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy link</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy public link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {publicLinkActive
              ? "Anyone with the link can view this file."
              : "Only invited people can access this file."}
          </p>
        </div>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="p-4 border-t flex justify-end">
        <Button size="sm">Save Changes</Button>
      </CardFooter> */}
    </Card>
  );
}
