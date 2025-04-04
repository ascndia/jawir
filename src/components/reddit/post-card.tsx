"use client"; // This component uses client-side state
import React, { useState } from 'react'; // Import useState
import Link from 'next/link'; // Import Link for navigation
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Share, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes

interface PostCardProps {
  id: number; // Keep id prop
  community: string;
  author: string;
  timeAgo: string;
  title: string;
  contentPreview?: string;
  imageUrl?: string;
  upvotes: number;
  commentCount: number;
}

type VoteType = 'up' | 'down' | null;

export default function PostCard({
  id, // Destructure id
  community,
  author,
  timeAgo,
  title,
  contentPreview,
  imageUrl,
  upvotes: initialUpvotes, // Rename prop to avoid conflict with state
  commentCount,
}: PostCardProps) {
  // State for client-side voting simulation
  const [currentUpvotes, setCurrentUpvotes] = useState(initialUpvotes);
  const [voteStatus, setVoteStatus] = useState<VoteType>(null);

  const handleVote = (type: 'up' | 'down') => {
    let newUpvotes = currentUpvotes;
    let newVoteStatus: VoteType = null;

    if (type === 'up') {
      if (voteStatus === 'up') { // Click upvote again to remove vote
        newUpvotes -= 1;
        newVoteStatus = null;
      } else {
        newUpvotes = initialUpvotes + 1; // Calculate based on initial + 1
        if (voteStatus === 'down') newUpvotes += 1; // Add another if switching from downvote
        newVoteStatus = 'up';
      }
    } else { // type === 'down'
      if (voteStatus === 'down') { // Click downvote again to remove vote
        newUpvotes += 1;
        newVoteStatus = null;
      } else {
        newUpvotes = initialUpvotes - 1; // Calculate based on initial - 1
        if (voteStatus === 'up') newUpvotes -= 1; // Subtract another if switching from upvote
        newVoteStatus = 'down';
      }
    }
    // Ensure votes don't go below 0 if needed, though Reddit allows negative
    // newUpvotes = Math.max(0, newUpvotes);

    setCurrentUpvotes(newUpvotes);
    setVoteStatus(newVoteStatus);
    // TODO: In a real app, send this vote change to the backend
  };

  const postUrl = `/r/${community}/comments/${id}`;
  return (
    <Card className="flex overflow-hidden hover:border-primary/50 transition-colors duration-150">
      {/* Vote Section */}
      <div className="flex flex-col items-center bg-muted p-2 w-10 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className={cn('h-auto p-1', voteStatus === 'up' ? 'text-primary hover:text-primary' : 'text-muted-foreground hover:text-foreground')}
          onClick={() => handleVote('up')}
        >
          <ArrowBigUp className={cn('h-5 w-5', voteStatus === 'up' ? 'fill-primary' : '')} />
        </Button>
        <span className={cn(
          "my-1 text-xs font-semibold",
          voteStatus === 'up' && 'text-primary',
          voteStatus === 'down' && 'text-blue-600' // Example downvote color
        )}>
          {currentUpvotes}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className={cn('h-auto p-1', voteStatus === 'down' ? 'text-blue-600 hover:text-blue-600' : 'text-muted-foreground hover:text-foreground')}
          onClick={() => handleVote('down')}
        >
          <ArrowBigDown className={cn('h-5 w-5', voteStatus === 'down' ? 'fill-blue-600' : '')} />
        </Button>
      </div>

      {/* Post Content Section */}
      <div className="flex-1 p-4">
        <CardHeader className="p-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="h-5 w-5">
              {/* Placeholder community icon */}
              <AvatarFallback>{community.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-foreground">r/{community}</span>
            <span>•</span>
            <span>Posted by u/{author}</span>
            <span>{timeAgo}</span>
          </div>
          <Link href={postUrl} className="block hover:text-primary">
             <CardTitle className="mt-2 text-lg">{title}</CardTitle>
          </Link>
        </CardHeader>
        {/* Link wrapper for content makes clicking body go to post */}
        <Link href={postUrl} className="block mt-2 p-0">
        <CardContent className="p-0">
          {contentPreview && <p className="text-sm text-muted-foreground">{contentPreview}</p>}
          {imageUrl && (
            <div className="mt-2 overflow-hidden rounded-md">
              <img src={imageUrl} alt={title} className="max-h-96 w-full object-cover" />
            </div>
          )}
        </CardContent> {/* Add the missing closing tag */}
        </Link>
        <CardFooter className="mt-3 p-0">
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
            {/* Link comment button to post detail page */}
            <Link href={postUrl}>
              <Button variant="ghost" size="sm" className="h-auto p-1 hover:bg-muted/50">
                <MessageSquare className="mr-1 h-4 w-4" />
                {commentCount} Comments
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="h-auto p-1 hover:bg-muted/50">
              <Share className="mr-1 h-4 w-4" />
              Share {/* TODO: Implement Share Dialog */}
            </Button>
            <Button variant="ghost" size="sm" className="h-auto p-1 hover:bg-muted/50">
              <Bookmark className="mr-1 h-4 w-4" />
              Save {/* TODO: Implement Save functionality */}
            </Button>
            {/* TODO: Add other actions like hide, report */}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
