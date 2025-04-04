import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog'; // Import Dialog components
import LoginDialog from './login-dialog'; // Import the LoginDialog component

export default function RedditHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* Logo Placeholder */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary"></div> {/* Simple logo placeholder */}
        <span className="text-lg font-bold">RedditClone</span>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-xl mx-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search RedditClone" className="pl-10" />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
        {/* Corrected Bell Button */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {/* Login Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </DialogTrigger>
          <LoginDialog /> {/* Render the dialog content */}
        </Dialog>
        <Button size="sm">Sign Up</Button> {/* Signup button remains for now */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
