"use client";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail } from "lucide-react";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import { useState } from "react";
import { toast } from "sonner";

const HeroForm2 = () => {
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
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto relative z-10 px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
              Transform Your Experience Today
            </h1>
            <p className="max-w-[600px] text-gray-200 md:text-xl">
              Join thousands of satisfied customers who have already taken the
              leap. Our platform delivers unmatched value and innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Get Started Now</h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the form below to begin your journey
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="Email Address"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Input
                          type="tel"
                          placeholder="Phone Number (Optional)"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      {isPending ? (
                        <Button disabled className="flex w-full items-center">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="flex w-full items-center"
                        >
                          Submit
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </form>

                  <div className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our Terms of Service and Privacy
                    Policy
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroForm2;
