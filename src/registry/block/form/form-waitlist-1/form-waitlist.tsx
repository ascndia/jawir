"use client";
import { useState, useEffect } from "react";
import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function FormWaitlist() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast("Success!", {
        description: "You have been added to the waitlist.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <form action={handleSubmit} className="w-full space-y-4 mb-8">
      <div className="flex gap-1 border rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-error"
          className="w-full border-0 bg-transparent shadow-none focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Get Notified"
          )}
        </Button>
      </div>
    </form>
  );
}
