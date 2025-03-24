"use client";

import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast("Success!", {
        description: "Email has been added to the newsletter.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section className="bg-background border border-muted rounded-2xl p-8 w-full max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold">Stay in the loop</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Stay up to date with the roadmap progress, announcements, and
            exclusive discounts. Feel free to sign up with your email.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            placeholder="Enter your email"
            className="bg-muted flex-1"
            aria-label="email"
          />
          <Button type="submit" className="px-4 py-2">
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        <hr className="border-muted" />
        <div>
          <h3 className="text-xl font-bold">Join the community for free</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Come hang out with like-minded creators on Discord!
          </p>
          <Button className="mt-3  px-4    flex items-center gap-2">
            <DiscordLogoIcon />
            Join Discord
          </Button>
        </div>
      </div>
    </section>
  );
};
