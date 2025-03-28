"use client";

import * as React from "react";
import { MessageSquare, Send, ThumbsUp, User } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
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
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { Textarea } from "@/registry/components/textarea"; // Assuming Textarea exists
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface Comment {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  timestamp: string;
  text: string;
  likes?: number;
  isLiked?: boolean; // For current user interaction
}

interface CardFileCommentsProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string;
  comments?: Comment[];
  currentUser?: {
    name: string;
    avatarUrl?: string;
  };
  maxHeight?: string;
  onPostComment?: (text: string) => void;
  onLikeComment?: (commentId: string) => void;
}

const defaultComments: Comment[] = [
  {
    id: "c1",
    author: { name: "Alex Johnson", avatarUrl: "/images/placeholder.svg" },
    timestamp: "3 hours ago",
    text: "Great work on this section! Just one minor typo on page 5.",
    likes: 2,
    isLiked: false,
  },
  {
    id: "c2",
    author: { name: "Maria Garcia" },
    timestamp: "1 hour ago",
    text: "Thanks, Alex! Typo fixed. Does anyone have feedback on the conclusion?",
    likes: 0,
    isLiked: false,
  },
  {
    id: "c3",
    author: { name: "David Lee", avatarUrl: "/images/placeholder.svg" },
    timestamp: "30 minutes ago",
    text: "The conclusion looks solid to me. Maybe add a sentence about next steps?",
    likes: 5,
    isLiked: true, // Example: current user liked this
  },
];

const defaultCurrentUser = {
  name: "You",
  avatarUrl: "/images/placeholder.svg", // Placeholder
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting8({
  className,
  fileName = "Project Proposal V2.docx",
  comments: initialComments = defaultComments,
  currentUser = defaultCurrentUser,
  maxHeight = "300px",
  onPostComment = (text) => console.log("Post comment:", text),
  onLikeComment = (id) => console.log("Like comment:", id),
  ...props
}: CardFileCommentsProps) {
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState(initialComments); // Manage likes locally for demo

  const handlePostComment = () => {
    if (newComment.trim()) {
      onPostComment(newComment.trim());
      // Optionally add to local state for immediate feedback (demo only)
      // setComments([...comments, { id: `temp-${Date.now()}`, author: currentUser, timestamp: "Just now", text: newComment.trim(), likes: 0, isLiked: false }]);
      setNewComment("");
    }
  };

  const handleLike = (commentId: string) => {
    onLikeComment(commentId);
    // Update local state for demo
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              likes: c.isLiked ? (c.likes || 0) - 1 : (c.likes || 0) + 1,
              isLiked: !c.isLiked,
            }
          : c
      )
    );
  };

  return (
    <Card className={cn("w-full max-w-md", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">Comments</CardTitle>
        </div>
        <CardDescription className="truncate pt-1 text-sm" title={fileName}>
          Discussion on "{fileName}"
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          <div className="space-y-4 p-4 pt-0">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 border">
                  <AvatarImage
                    src={comment.author.avatarUrl}
                    alt={comment.author.name}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(comment.author.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{comment.author.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {comment.text}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleLike(comment.id)}
                          >
                            <ThumbsUp
                              className={cn(
                                "h-3.5 w-3.5",
                                comment.isLiked
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              )}
                            />
                            <span className="sr-only">Like</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{comment.isLiked ? "Unlike" : "Like"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {comment.likes && comment.likes > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {comment.likes}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <div className="flex w-full items-start space-x-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="text-xs">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm"
              rows={2}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handlePostComment}
                disabled={!newComment.trim()}
              >
                <Send className="mr-1.5 h-4 w-4" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
