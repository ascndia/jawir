"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/registry/components/button/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/components/form";
import { Textarea } from "@/registry/components/textarea";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message must not exceed 500 characters." }),
});

export default function FormContact() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = () => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast("Success!", {
        description: "Your message has been sent.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-md mx-auto space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...field}
                  value={field.value || ""} // Ensure value is always defined
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help you?</FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  className="min-h-[120px] max-h-[240px]"
                  {...field}
                  value={field.value || ""} // Ensure value is always defined
                />
              </FormControl>
              <FormDescription>
                Please provide as much detail as possible.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
