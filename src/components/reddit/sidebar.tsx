import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Flame, Rocket } from 'lucide-react';

export default function RedditSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feeds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Flame className="mr-2 h-4 w-4" />
          Popular
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Rocket className="mr-2 h-4 w-4" />
          All
        </Button>
      </CardContent>

      {/* Placeholder for Communities/Topics */}
      <CardHeader className="mt-4 border-t pt-4">
        <CardTitle>Communities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          r/AskRedditClone
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          r/TechnologyClone
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          r/FunnyClone
        </Button>
        <Button variant="link" className="w-full justify-start text-sm">
          See more...
        </Button>
      </CardContent>

      {/* Placeholder for Create Post */}
      <CardContent className="mt-4 border-t pt-4">
        <Button className="w-full">Create Post</Button>
      </CardContent>
    </Card>
  );
}
