import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Keep trigger import if needed elsewhere, but header will likely handle it
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginDialog() {
  // Note: The DialogTrigger is usually placed outside this component,
  // wrapping the element that opens the dialog (e.g., the Login button in the header).
  // The Dialog component itself manages the open state internally when controlled this way.
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Log In</DialogTitle>
        <DialogDescription>
          Enter your username and password to log in.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input id="username" placeholder="YourUsername" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input id="password" type="password" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        {/* TODO: Add actual login logic */}
        <Button type="submit">Log In</Button>
      </DialogFooter>
    </DialogContent>
  );
}
