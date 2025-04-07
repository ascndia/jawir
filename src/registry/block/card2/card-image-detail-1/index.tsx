"use client";
import React, { useState } from "react";
import { Download, Share2, Trash, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { 
    RefreshCw, 
    ImageOff, 
    Maximize, 
    MoreHorizontal, 
    Copy
  } from "lucide-react";
  import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
  } from "@/components/ui/card";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";
  import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/registry/components/badge";

interface ImageActionBarProps {
  likeCount?: number;
  isBookmarked?: boolean;
  isLiked?: boolean;
  onDownload?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  onBookmark?: (bookmarked: boolean) => void;
  onLike?: (liked: boolean) => void;
  className?: string;
}

const ImageActionBar = ({
  likeCount = 0,
  isBookmarked = false,
  isLiked = false,
  onDownload,
  onShare,
  onDelete,
  onBookmark,
  onLike,
  className
}: ImageActionBarProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [likes, setLikes] = useState(likeCount);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    if (onLike) onLike(newLiked);
    toast.success(newLiked ? "Added to your likes" : "Removed from your likes");
  };

  const handleBookmark = () => {
    const newBookmarked = !bookmarked;
    setBookmarked(newBookmarked);
    if (onBookmark) onBookmark(newBookmarked);
    toast.success(newBookmarked ? "Saved to your bookmarks" : "Removed from your bookmarks");
  };

  const handleDownload = () => {
    if (onDownload) onDownload();
    toast.success("Download started");
  };

  const handleShare = () => {
    if (onShare) onShare();
    toast.success("Share link copied to clipboard");
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    toast.success("Image deleted");
  };

  return (
    <div className={cn("flex justify-between items-center p-2 bg-secondary/30 rounded-lg", className)}>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-md hover:bg-secondary"
          onClick={handleDownload}
        >
          <Download className="h-5 w-5" />
          <span className="sr-only">Download</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-md hover:bg-secondary"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 rounded-md hover:bg-secondary"
          onClick={handleDelete}
        >
          <Trash className="h-5 w-5" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-9 w-9 rounded-md hover:bg-secondary",
            bookmarked && "text-primary"
          )}
          onClick={handleBookmark}
        >
          <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
          <span className="sr-only">Bookmark</span>
        </Button>
        <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
                "h-9 w-9 rounded-md hover:bg-secondary relative",
                liked && "text-primary"
            )}
            onClick={handleLike}
            >
            <Heart className={cn("h-5 w-5", liked && "fill-current")} />
            <span className="sr-only">Like</span>
        </Button>
      </div>
    </div>
  );
};



interface CardImageDetail1AProps {
  image?: {
    id?: string;
    title?: string;
    prompt?: string;
    model?: string;
    style?: string;
    resolution?: string;
    seed?: string;
    timestamp?: string;
    author?: string;
    src?: string; // Added image source property
  };
  onClose?: () => void;
}
const DEFAULT_IMAGE = {
  id: "1",
  title: "Yesterday",
  prompt: "Create an image of yesterday",
  model: "FLUX PRO",
  style: "Artistic",
  resolution: "1:1",
  seed: "91389519530",
  timestamp: "2023-10-01 12:00",
  author: "Rudolf Hess",
  src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
} 
export const CardImageDetail1A = ({ image = DEFAULT_IMAGE, onClose }: CardImageDetail1AProps) => {
  return (
    <Card className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      <CardHeader className="p-4 pb-0">
        {/* Author section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {image.author?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{image.author}</span>
            <span className="text-xs text-muted-foreground">{image.timestamp}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        {/* Image display */}
        {image.src ? (
          <div className="rounded-lg overflow-hidden bg-muted h-64 flex items-center justify-center">
            <img 
              src={image.src} 
              alt={image.title}
              className="max-w-full max-h-full object-cover transition-transform duration-700 ease-in-out hover:scale-[1.03] h-full"
            />
          </div>
        ) : (
          <div className="rounded-lg bg-muted h-64 flex items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" />
          </div>
        )}

        {/* Image title */}
        <div className="bg-secondary/20 p-3 rounded-lg">
          <h3 className="font-medium mb-1">{image.title}</h3>
          
          {/* Prompt */}
          {image.prompt && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-start gap-2">
                <div className="p-1 rounded-md">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </div>
                <Textarea 
                  className="text-sm text-muted-foreground min-h-[80px] resize-none bg-background/50" 
                  value={image.prompt} 
                  readOnly
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <ImageActionBar 
          likeCount={217}
        />

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10">
            <RefreshCw className="h-4 w-4" />
            <span>Remix</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-10">
            <ImageOff className="h-4 w-4" />
            <span>Remove BG</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2 h-10">
            <Maximize className="h-4 w-4" />
            <span>Upscale</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 h-10">
                <MoreHorizontal className="h-4 w-4" />
                <span>More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Share Link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Image metadata */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div>
            <p className="text-muted-foreground">Model</p>
            <p className="font-medium">{image.model || "Ideogram 2.0"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Style</p>
            <p className="font-medium">{image.style || "Design"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Resolution</p>
            <p className="font-medium">{image.resolution || "1:1 (1024 x 1024)"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Rendering</p>
            <p className="font-medium">Default</p>
          </div>
          {image.seed && (
            <div>
              <p className="text-muted-foreground">Seed</p>
              <p className="font-medium">{image.seed}</p>
            </div>
          )}
          <div>
            <p className="text-muted-foreground">Date created</p>
            <p className="font-medium">{image.timestamp}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2">
        <Button className="w-full bg-primary/90 hover:bg-primary flex items-center gap-2 h-12">
          <Share2 className="h-4 w-4" />
          <span>Post to Community</span>
        </Button>
      </CardFooter>
    </Card>
  );
};