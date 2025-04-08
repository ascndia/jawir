"use client";

import * as React from "react";
import { Globe, Image, Loader2, Lock, Users, Video, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface PostCreationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: {
    content: string;
    media: File[];
    privacy: "public" | "friends" | "private";
    location?: string;
    tags?: string[];
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  user?: {
    name: string;
    avatar?: string;
    username?: string;
  };
}

export default function PostCreationDialog({
  open = false,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false,
  user = {
    name: "John Doe",
    avatar: "",
    username: "johndoe",
  },
}: PostCreationDialogProps) {
  const [content, setContent] = React.useState("");
  const [media, setMedia] = React.useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = React.useState<string[]>([]);
  const [mediaType, setMediaType] = React.useState<"image" | "video" | null>(
    null
  );
  const [privacy, setPrivacy] = React.useState<
    "public" | "friends" | "private"
  >("public");
  const [location, setLocation] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (!open) {
      // Reset form when dialog closes
      setContent("");
      setMedia([]);
      setMediaUrls([]);
      setMediaType(null);
      setPrivacy("public");
      setLocation("");
      setTags([]);
      setTagInput("");
      setErrors({});
    } else {
      // Focus textarea when dialog opens
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [open]);

  React.useEffect(() => {
    // Create object URLs for preview images/videos
    const urls = media.map((file) => URL.createObjectURL(file));
    setMediaUrls(urls);

    // Cleanup function to revoke object URLs
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [media]);

  const handleMediaUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    // If already have media of a different type, show error
    if (mediaType && mediaType !== type && media.length > 0) {
      setErrors((prev) => ({
        ...prev,
        media: `You can't mix images and videos in the same post`,
      }));
      return;
    }

    const newFiles = Array.from(e.target.files);

    // Validate file types
    const validTypes =
      type === "image"
        ? ["image/jpeg", "image/png", "image/gif", "image/webp"]
        : ["video/mp4", "video/webm", "video/quicktime"];

    const invalidFiles = newFiles.filter(
      (file) => !validTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        media: `One or more files are not valid ${type} formats`,
      }));
      return;
    }

    // Limit to 10 media files total
    if (media.length + newFiles.length > 10) {
      setErrors((prev) => ({
        ...prev,
        media: `You can upload a maximum of 10 ${type}s`,
      }));
      return;
    }

    // Check file sizes (limit to 10MB for images, 100MB for videos)
    const maxSize = type === "image" ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
    const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        media: `One or more files exceed the size limit (${
          type === "image" ? "10MB" : "100MB"
        })`,
      }));
      return;
    }

    setMedia((prev) => [...prev, ...newFiles]);
    setMediaType(type);

    if (errors.media) {
      const newErrors = { ...errors };
      delete newErrors.media;
      setErrors(newErrors);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);

    const newMediaUrls = [...mediaUrls];
    URL.revokeObjectURL(newMediaUrls[index]);
    newMediaUrls.splice(index, 1);
    setMediaUrls(newMediaUrls);

    if (newMedia.length === 0) {
      setMediaType(null);
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      // Remove @ or # if present
      const formattedTag = tagInput.trim().replace(/^[@#]/, "");

      if (formattedTag && !tags.includes(formattedTag)) {
        setTags((prev) => [...prev, formattedTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!content.trim() && media.length === 0) {
      newErrors.content = "Please enter some text or add media to your post";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit?.({
      content,
      media,
      privacy,
      location: location.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const getPrivacyIcon = () => {
    switch (privacy) {
      case "public":
        return <Globe className="h-4 w-4" />;
      case "friends":
        return <Users className="h-4 w-4" />;
      case "private":
        return <Lock className="h-4 w-4" />;
    }
  };

  const getPrivacyText = () => {
    switch (privacy) {
      case "public":
        return "Public";
      case "friends":
        return "Friends";
      case "private":
        return "Only me";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, photos, or videos with your network
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-hidden">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user.name}</p>
              <div className="flex items-center gap-1 text-xs">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 px-2 text-xs"
                  onClick={() => {
                    // Open privacy selector
                  }}
                >
                  {getPrivacyIcon()}
                  <span>{getPrivacyText()}</span>
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="mt-4 max-h-[calc(90vh-250px)]">
            <div className="space-y-4 pr-4">
              <Textarea
                ref={textareaRef}
                placeholder={`What's on your mind, ${user.name.split(" ")[0]}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`min-h-[120px] resize-none text-base ${
                  errors.content ? "border-destructive" : ""
                }`}
              />
              {errors.content && (
                <p className="text-xs text-destructive">{errors.content}</p>
              )}

              {mediaUrls.length > 0 && (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {mediaUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-md border bg-muted"
                      >
                        {mediaType === "image" ? (
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Post image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <video
                            src={url}
                            className="h-full w-full object-cover"
                            controls
                          />
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveMedia(index)}
                          className="absolute right-1 top-1 h-6 w-6 rounded-full"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove media</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  {errors.media && (
                    <p className="text-xs text-destructive">{errors.media}</p>
                  )}
                </div>
              )}

              <Tabs defaultValue="media" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="media">Media</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="mt-4 space-y-4">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Image className="h-4 w-4" />
                      <span>Add Photos</span>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleMediaUpload(e, "image")}
                        className="hidden"
                      />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Video className="h-4 w-4" />
                      <span>Add Video</span>
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleMediaUpload(e, "video")}
                        className="hidden"
                      />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can upload up to 10 photos (max 10MB each) or a video
                    (max 100MB)
                  </p>
                </TabsContent>

                <TabsContent value="tags" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tag-input">Tag People or Topics</Label>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                        >
                          <span>{tag}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTag(tag)}
                            className="h-4 w-4 rounded-full p-0 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove tag</span>
                          </Button>
                        </div>
                      ))}
                      <Input
                        id="tag-input"
                        placeholder="Type a name or topic and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Tag friends or topics with @ or # (e.g., @johndoe or
                      #nature)
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location-input">Add Location</Label>
                    <Input
                      id="location-input"
                      placeholder="Where are you?"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Add your current location or a place related to your post
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Privacy Settings</Label>
                <RadioGroup
                  value={privacy}
                  onValueChange={(value) =>
                    setPrivacy(value as "public" | "friends" | "private")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="privacy-public" />
                    <Label
                      htmlFor="privacy-public"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      <div>
                        <span className="font-medium">Public</span>
                        <p className="text-xs text-muted-foreground">
                          Anyone on or off this platform
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friends" id="privacy-friends" />
                    <Label
                      htmlFor="privacy-friends"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      <div>
                        <span className="font-medium">Friends</span>
                        <p className="text-xs text-muted-foreground">
                          Only people who follow you
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="privacy-private" />
                    <Label
                      htmlFor="privacy-private"
                      className="flex items-center gap-2"
                    >
                      <Lock className="h-4 w-4" />
                      <div>
                        <span className="font-medium">Only me</span>
                        <p className="text-xs text-muted-foreground">
                          Only you can see this post
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto"
            disabled={isLoading || (!content.trim() && media.length === 0)}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
