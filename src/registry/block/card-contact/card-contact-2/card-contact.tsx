"use client";
import { Button } from "@/registry/components/button/select";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import { Textarea } from "@/registry/components/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CardContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Success!", {
        description: "Your inquiry has been sent.",
        duration: 5000,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-8 text-xl font-semibold">Fill in the form</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 lg:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="Enter your first name" />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" id="lastname" placeholder="Enter your last name" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input type="tel" id="phone" placeholder="Enter your phone" />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Details</Label>
              <Textarea id="message" placeholder="Tell us about your project" rows={4} />
            </div>
          </div>

          <div className="mt-6 grid">
            <Button disabled={isSubmitting} className="w-full" type="submit" size="lg">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send inquiry"}
            </Button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm text-muted-foreground">
              We&apos;ll get back to you in 1-2 business days.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
