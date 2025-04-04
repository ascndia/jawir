import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Community } from '@/lib/reddit-mock-data'; // Import the type
import { Separator } from '@/components/ui/separator';

interface CommunityInfoProps {
  community: Community;
}

export default function CommunityInfo({ community }: CommunityInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Community</CardTitle>
        <CardDescription>{community.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span>Members</span>
          <span>{community.memberCount.toLocaleString()}</span>
        </div>
        {/* Add creation date if available */}
        <Separator className="my-3" />
        {community.rules && community.rules.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Rules</h4>
            <ol className="list-decimal space-y-1 pl-4 text-xs">
              {community.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ol>
          </div>
        )}
        <Separator className="my-3" />
        <Button className="w-full">Create Post</Button> {/* Placeholder */}
      </CardContent>
    </Card>
  );
}
