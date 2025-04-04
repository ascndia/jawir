import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Community } from '@/lib/reddit-mock-data'; // Import the type

interface CommunityHeaderProps {
  community: Community;
}

export default function CommunityHeader({ community }: CommunityHeaderProps) {
  return (
    <div>
      {/* Banner Image */}
      <div className="h-32 bg-muted">
        {community.banner && (
          <img
            src={community.banner}
            alt={`${community.name} banner`}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Header Info */}
      <div className="bg-card px-4 pb-4">
        <div className="flex items-end gap-4 -mt-8">
          <Avatar className="h-20 w-20 border-4 border-card bg-background">
            {community.icon && <AvatarImage src={community.icon} alt={community.name} />}
            <AvatarFallback className="text-3xl">
              {community.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="py-2">
            <h1 className="text-2xl font-bold">r/{community.name}</h1>
            <p className="text-sm text-muted-foreground">
              {community.memberCount.toLocaleString()} members
            </p>
          </div>
          <Button className="ml-4">Join</Button> {/* TODO: Add join/leave logic */}
        </div>
        <p className="mt-2 text-sm">{community.description}</p>
      </div>
    </div>
  );
}
