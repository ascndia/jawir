"use client";

import { CalendarIcon, Check, MoveRight, PhoneCall } from "lucide-react";
import { Button } from '@/registry/components/button/select';
import { Input } from '@/registry/components/input/input-shadcn/input';
import { Label } from '@/registry/components/label';
import { Textarea } from '@/registry/components/textarea';
import { Loader2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/components/popover";
import { Calendar } from "@/registry/components/calendar";
import { Card } from "@/registry/components/card/card-shadcn/card";


const ContactForm = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
      const handleSubmit = () => {
        //   e.preventDefault()
          setIsSubmitting(true);
          setTimeout(() => {
              toast.success("Success!", {
                  description: "Your message has been sent.",
                  duration: 5000,
              });
              setIsSubmitting(false);
          }, 1500);
      };
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <Badge>Contact</Badge>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Something new
                </h4>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Easy to use</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Fast and reliable</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Beautiful and modern</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
          </div>

          <div className="justify-center flex items-center">
            <Card className="flex flex-col border p-8 gap-4">
              <p>Book a meeting</p>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full max-w-sm justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">Upload resume</Label>
                <Input id="picture" type="file" />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full gap-4"
                type="submit"
                size="lg"
                >
                {isSubmitting ? (
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                ) : (
                    <>
                    {"Book the meeting"} <MoveRight className="w-4 h-4" />
                    </>
                )}
                </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;