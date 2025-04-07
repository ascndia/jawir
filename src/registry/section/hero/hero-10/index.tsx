
import React from "react";
import { Button } from "@/components/ui/button";

export const Hero10A = () => {
  return (
    <section className="relative overflow-hidden bg-muted py-20 md:py-32">
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              <span className="">AI-Powered</span> Fashion Discovery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
              Discover your perfect style with our AI-driven fashion platform. Personalized recommendations for consumers and powerful insights for businesses.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button className="transform transition-transform hover:rotate-2" size="lg">
                Discover Styles
              </Button>
              <Button className="transform transition-transform hover:rotate-2"  size="lg" variant="outline">
                For Business
              </Button>
            </div>
          </div>
          <div className="relative h-80 md:h-auto">
            <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-secondary/30 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 bg-secondary/30 rounded-full -z-10 blur-3xl"></div>
            <div className="bg-card p-4 md:p-6 rounded-2xl shadow-lg transform md:rotate-3 transition-transform hover:rotate-0 animate-fade-in max-w-md mx-auto">
              <div className="aspect-[4/5] bg-accent/40 rounded-lg mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center text-foreground/70 font-serif text-lg">
                  Fashion Image Placeholder
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-medium">AI-Recommended Style</h3>
                  <p className="text-sm text-muted-foreground">Based on your preferences</p>
                </div>
                <div className="bg-muted text-foreground text-sm font-medium px-3 py-1 rounded-full">
                  95% Match
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      {/* <div className="absolute top-20 left-10 w-24 h-24 border-2 border-fashion-sage/30 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-fashion-rose-gold/30 rounded-full"></div> */}
    </section>
  );
};

