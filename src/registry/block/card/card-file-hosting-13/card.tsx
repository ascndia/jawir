"use client";

import * as React from "react";
import {
  Copy,
  Link2,
  MoreVertical,
  PlusCircle,
  Settings,
  Trash2,
  UploadCloud,
  Clock,
  FolderInput, // Icon for file requests
  X, // Added
  Check, // Added
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import {
  Dialog, // Using Dialog for creating/editing requests
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label"; // Assuming Label exists
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import Switch from "@/registry/components/switch/switch-shadcn/switch"; // Assuming Switch exists
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface FileRequestItem {
  id: string;
  requestLink: string;
  targetFolderName: string;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string; // Optional expiration
  filesReceived?: number; // Optional count
}

interface CardFileRequestProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  fileRequests?: FileRequestItem[];
  maxHeight?: string;
  onCreateRequest?: (folderName: string, settings: any) => void; // Simplified settings
  onToggleRequestActive?: (requestId: string, isActive: boolean) => void;
  onCopyRequestLink?: (link: string) => void;
  onDeleteRequest?: (requestId: string) => void;
  onEditRequestSettings?: (requestId: string) => void;
}

const defaultFileRequests: FileRequestItem[] = [
  {
    id: "req1",
    requestLink: "https://example.com/request/xYzAbC1",
    targetFolderName: "Client Submissions Q3",
    isActive: true,
    createdAt: "4 days ago",
    filesReceived: 8,
  },
  {
    id: "req2",
    requestLink: "https://example.com/request/dEfGhI2",
    targetFolderName: "Job Applications - Design",
    isActive: true,
    createdAt: "2 weeks ago",
    expiresAt: "in 5 days",
    filesReceived: 25,
  },
  {
    id: "req3",
    requestLink: "https://example.com/request/jKlMnOp3",
    targetFolderName: "Event Photos Upload",
    isActive: false, // Example of inactive link
    createdAt: "1 month ago",
    filesReceived: 150,
  },
];

export function CardFileHosting13({
  className,
  title = "File Requests",
  description = "Manage links for others to upload files to your folders.",
  fileRequests = defaultFileRequests,
  maxHeight = "380px",
  onCreateRequest = (folder, settings) =>
    console.log("Create request:", folder, settings),
  onToggleRequestActive = (id, active) =>
    console.log("Toggle active:", id, active),
  onCopyRequestLink = (link) => console.log("Copy link:", link),
  onDeleteRequest = (id) => console.log("Delete request:", id),
  onEditRequestSettings = (id) => console.log("Edit settings:", id),
  ...props
}: CardFileRequestProps) {
  // Local state for dialog example
  const [newRequestFolder, setNewRequestFolder] = React.useState("");

  const handleCreateRequest = () => {
    // In a real app, you'd likely pass more settings from the dialog
    if (newRequestFolder) {
      onCreateRequest(newRequestFolder, {
        isActive: true /* other settings */,
      });
      setNewRequestFolder(""); // Reset after creation
      // Close dialog would happen here via its own state management
    }
  };

  return (
    <Card className={cn("w-full max-w-xl", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FolderInput className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-1.5 h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New File Request</DialogTitle>
                <DialogDescription>
                  Choose a folder where others can upload files.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="folderName" className="text-right">
                    Folder Name
                  </Label>
                  <Input
                    id="folderName"
                    value={newRequestFolder}
                    onChange={(e) => setNewRequestFolder(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., Project Submissions"
                  />
                </div>
                {/* Add more settings here: expiration, password, etc. */}
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateRequest}
                  disabled={!newRequestFolder}
                >
                  Create Link
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {fileRequests.length > 0 ? (
            <div className="space-y-3 p-4 pt-0">
              {fileRequests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-md border p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="truncate text-sm font-medium"
                      title={request.targetFolderName}
                    >
                      For: {request.targetFolderName}
                    </p>
                    <div className="flex flex-shrink-0 items-center space-x-2">
                      <Badge
                        variant={request.isActive ? "secondary" : "outline"}
                      >
                        {request.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Request options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() =>
                              onCopyRequestLink(request.requestLink)
                            }
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            <span>Copy link</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onToggleRequestActive(
                                request.id,
                                !request.isActive
                              )
                            }
                          >
                            {/* Icon changes based on state */}
                            {request.isActive ? (
                              <X className="mr-2 h-4 w-4" />
                            ) : (
                              <Check className="mr-2 h-4 w-4" />
                            )}
                            <span>
                              {request.isActive ? "Deactivate" : "Activate"}
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditRequestSettings(request.id)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => onDeleteRequest(request.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete request</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={request.requestLink}
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
                            onClick={() =>
                              onCopyRequestLink(request.requestLink)
                            }
                          >
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copy link</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy request link</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created {request.createdAt}</span>
                    <div className="flex items-center space-x-3">
                      {request.expiresAt && (
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          Expires {request.expiresAt}
                        </span>
                      )}
                      {request.filesReceived !== undefined && (
                        <span>{request.filesReceived} files received</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No active file requests.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
