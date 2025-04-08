"use client";

import type React from "react";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/registry/components/input/input-shadcn/input";
import {
  Avatar,
  AvatarFallback,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Link from "@/registry/components/link/link-wrapper/link";
import { toast } from "sonner";

export function DialogNewsletter() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("example@you.company");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      setOpen(false);
      toast("Success!", {
        description: "Email has been added to the newsletter.",
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Newsletter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-none">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-12 w-12 mb-4">
            <AvatarFallback className="">UI</AvatarFallback>
          </Avatar>
          <DialogTitle className="text-xl font-semibold mb-2">
            Stay Updated with Latest UI Components
          </DialogTitle>
          <DialogDescription className="mb-6">
            Join our weekly digest featuring carefully curated UI components and
            design patterns from top design engineers.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <Input
              type="email"
              placeholder="you@company.com"
              className="bg-transparent border-gray-500 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
            <p className="text-xs text-center">
              By subscribing you agree to our {""}
              <Link href="#">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
