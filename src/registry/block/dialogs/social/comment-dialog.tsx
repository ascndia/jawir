"use client";

import * as React from "react";
import {
  AtSign,
  Image,
  Loader2,
  MoreHorizontal,
  Send,
  Smile,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MinusCircle,
  PlusCircle,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Label } from "@/registry/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { ScrollArea } from "@/registry/components/scroll-area";
import { Separator } from "@/registry/components/separator";
import { Badge } from "@/registry/components/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import { Textarea } from "@/registry/components/textarea";
import { Input } from "@/registry/components/input/input-shadcn/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";

interface CommentAuthor {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
}

interface CommentReaction {
  type: "like" | "dislike";
  count: number;
  userReacted: boolean;
}

interface CommentItem {
  id: string;
  author: CommentAuthor;
  content: string;
  timestamp: string;
  reactions: {
    like: CommentReaction;
    dislike: CommentReaction;
  };
  replies?: CommentItem[];
}

interface CommentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAddComment?: (content: string, parentId?: string) => Promise<void>;
  onReact?: (
    commentId: string,
    reactionType: "like" | "dislike"
  ) => Promise<void>;
  onDeleteComment?: (commentId: string) => Promise<void>;
  onReportComment?: (commentId: string) => void;
  isLoading?: boolean;
  postTitle?: string;
  postAuthor?: CommentAuthor;
  comments?: CommentItem[];
  currentUser?: CommentAuthor;
}

export default function CommentDialog({
  open = false,
  onOpenChange,
  onAddComment,
  onReact,
  onDeleteComment,
  onReportComment,
  isLoading = false,
  postTitle = "Amazing sunset at the beach",
  postAuthor = {
    id: "user1",
    name: "Jane Smith",
    username: "janesmith",
    avatar: "",
  },
  comments = [
    {
      id: "comment1",
      author: {
        id: "user2",
        name: "Alex Johnson",
        username: "alexj",
        avatar: "",
      },
      content: "This is absolutely stunning! Where was this taken?",
      timestamp: "2023-06-15T14:30:00Z",
      reactions: {
        like: { type: "like", count: 12, userReacted: false },
        dislike: { type: "dislike", count: 0, userReacted: false },
      },
      replies: [
        {
          id: "reply1",
          author: {
            id: "user1",
            name: "Jane Smith",
            username: "janesmith",
            avatar: "",
          },
          content: "Thank you! It was taken at Malibu Beach in California.",
          timestamp: "2023-06-15T15:05:00Z",
          reactions: {
            like: { type: "like", count: 3, userReacted: true },
            dislike: { type: "dislike", count: 0, userReacted: false },
          },
        },
      ],
    },
    {
      id: "comment2",
      author: {
        id: "user3",
        name: "Sam Wilson",
        username: "samw",
        avatar: "",
      },
      content:
        "The colors in this photo are incredible. What camera did you use?",
      timestamp: "2023-06-15T16:45:00Z",
      reactions: {
        like: { type: "like", count: 8, userReacted: false },
        dislike: { type: "dislike", count: 1, userReacted: false },
      },
    },
  ],
  currentUser = {
    id: "current-user",
    name: "John Doe",
    username: "johndoe",
    avatar: "",
  },
}: CommentDialogProps) {
  const [commentText, setCommentText] = React.useState("");
  const [replyText, setReplyText] = React.useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [mentionQuery, setMentionQuery] = React.useState("");
  const [showMentions, setShowMentions] = React.useState(false);

  const commentInputRef = React.useRef<HTMLTextAreaElement>(null);
  const replyInputRefs = React.useRef<
    Record<string, HTMLTextAreaElement | null>
  >({});

  // Mock list of users for mentions
  const users = [
    { id: "user1", name: "Jane Smith", username: "janesmith" },
    { id: "user2", name: "Alex Johnson", username: "alexj" },
    { id: "user3", name: "Sam Wilson", username: "samw" },
    { id: "user4", name: "Emily Davis", username: "emilyd" },
    { id: "user5", name: "Michael Brown", username: "michaelb" },
  ];

  const filteredUsers = React.useMemo(() => {
    if (!mentionQuery.trim()) return [];

    return users
      .filter(
        (user) =>
          user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(mentionQuery.toLowerCase())
      )
      .slice(0, 5);
  }, [mentionQuery, users]);

  React.useEffect(() => {
    if (open) {
      // Focus comment input when dialog opens
      setTimeout(() => {
        commentInputRef.current?.focus();
      }, 100);
    } else {
      // Reset state when dialog closes
      setCommentText("");
      setReplyText({});
      setReplyingTo(null);
      setSubmitting(false);
      setMentionQuery("");
      setShowMentions(false);
    }
  }, [open]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentText(value);

    // Check for mention
    const lastAtSignIndex = value.lastIndexOf("@");
    if (lastAtSignIndex !== -1 && lastAtSignIndex > value.lastIndexOf(" ")) {
      const query = value.slice(lastAtSignIndex + 1);
      setMentionQuery(query);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const handleReplyChange = (commentId: string, value: string) => {
    setReplyText((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleInsertMention = (username: string) => {
    const lastAtSignIndex = commentText.lastIndexOf("@");
    if (lastAtSignIndex !== -1) {
      const newText = commentText.slice(0, lastAtSignIndex) + `@${username} `;
      setCommentText(newText);
    }

    setShowMentions(false);
    setMentionQuery("");
    commentInputRef.current?.focus();
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || submitting) return;

    setSubmitting(true);

    try {
      await onAddComment?.(commentText);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (parentId: string) => {
    const reply = replyText[parentId];
    if (!reply?.trim() || submitting) return;

    setSubmitting(true);

    try {
      await onAddComment?.(reply, parentId);
      setReplyText((prev) => ({
        ...prev,
        [parentId]: "",
      }));
      setReplyingTo(null);
    } catch (error) {
      console.error("Failed to add reply:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReact = async (
    commentId: string,
    reactionType: "like" | "dislike"
  ) => {
    if (submitting) return;

    try {
      await onReact?.(commentId, reactionType);
    } catch (error) {
      console.error("Failed to react to comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (submitting) return;

    try {
      await onDeleteComment?.(commentId);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const renderComment = (comment: CommentItem, isReply = false) => {
    const isCurrentUserAuthor = comment.author.id === currentUser.id;

    return (
      <div key={comment.id} className={`space-y-2 ${isReply ? "ml-12" : ""}`}>
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={comment.author.avatar}
              alt={comment.author.name}
            />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-medium">{comment.author.name}</span>
                {comment.author.username && (
                  <span className="text-xs text-muted-foreground">
                    {" "}
                    @{comment.author.username}
                  </span>
                )}
                <span className="ml-2 text-xs text-muted-foreground">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {isCurrentUserAuthor ? (
                    <DropdownMenuItem
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => onReportComment?.(comment.id)}
                    >
                      Report
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm">{comment.content}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 ${
                    comment.reactions.like.userReacted ? "text-primary" : ""
                  }`}
                  onClick={() => handleReact(comment.id, "like")}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                {comment.reactions.like.count > 0 && (
                  <span className="text-xs">
                    {comment.reactions.like.count}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-7 w-7 ${
                    comment.reactions.dislike.userReacted
                      ? "text-destructive"
                      : ""
                  }`}
                  onClick={() => handleReact(comment.id, "dislike")}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="sr-only">Dislike</span>
                </Button>
                {comment.reactions.dislike.count > 0 && (
                  <span className="text-xs">
                    {comment.reactions.dislike.count}
                  </span>
                )}
              </div>

              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => {
                    setReplyingTo(
                      replyingTo === comment.id ? null : comment.id
                    );
                    if (replyingTo !== comment.id) {
                      setTimeout(() => {
                        replyInputRefs.current[comment.id]?.focus();
                      }, 100);
                    }
                  }}
                >
                  Reply
                </Button>
              )}
            </div>
          </div>
        </div>

        {replyingTo === comment.id && (
          <div className="ml-12 mt-2 flex gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                // ref={(el) => (replyInputRefs.current[comment.id] = el)}
                placeholder={`Reply to ${comment.author.name}...`}
                value={replyText[comment.id] || ""}
                onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                className="min-h-[60px] resize-none"
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyText[comment.id]?.trim() || submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                      Replying...
                    </>
                  ) : (
                    "Reply"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4 pt-2">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            Join the conversation about "{postTitle}" by {postAuthor.name}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1 pr-4">
            {comments.length === 0 ? (
              <div className="flex h-32 flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">No comments yet</p>
                <p className="text-sm text-muted-foreground">
                  Be the first to share your thoughts
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => renderComment(comment))}
              </div>
            )}
          </ScrollArea>

          <Separator className="my-4" />

          <div className="relative">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  ref={commentInputRef}
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={handleCommentChange}
                  className="min-h-[80px] resize-none"
                />

                {showMentions && filteredUsers.length > 0 && (
                  <div className="absolute bottom-full left-12 z-10 mb-1 w-[calc(100%-3rem)] rounded-md border bg-background shadow-md">
                    <div className="p-1">
                      {filteredUsers.map((user) => (
                        <Button
                          key={user.id}
                          variant="ghost"
                          className="w-full justify-start px-2 py-1 text-sm"
                          onClick={() => handleInsertMention(user.username)}
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                              <span>{user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                @{user.username}
                              </span>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Smile className="h-4 w-4" />
                      <span className="sr-only">Add emoji</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Image className="h-4 w-4" />
                      <span className="sr-only">Add image</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <AtSign className="h-4 w-4" />
                      <span className="sr-only">Mention someone</span>
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
