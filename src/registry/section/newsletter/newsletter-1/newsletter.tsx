"use client";

import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = () => {
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
    <section id="newsletter">
      <div className="container mx-auto py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Daily <span className="text-primary">Newsletter</span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Subscribe to our newsletter to get the latest updates.
        </p>

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          action={handleSubmit}
        >
          <Input
            placeholder="Enter your email"
            className="bg-muted"
            aria-label="email"
          />
          <Button>
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};
