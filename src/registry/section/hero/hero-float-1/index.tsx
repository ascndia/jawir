import React from 'react';
import { ChevronRight, DollarSign, Shield, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export const HeroFloat1A = () => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-muted opacity-50 -z-10"></div>
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Text content */}
          <div className="lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="bg-primary/10 text-foreground text-sm font-medium py-1 px-3 rounded-full border border-primary/20">
                Financial Freedom Starts Here
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight text-foreground">
              Smart Investments, <br />
              <span className="relative">
                Secure Future
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/30 -z-10"></span>
              </span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-xl">
              Personalized investment strategies and loan solutions to help you achieve your financial goals with confidence and peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn-primary flex items-center group bg-primary text-primary-foreground">
                Get Free Consultation
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="btn-secondary">
                Explore Services
              </Button>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-6 sm:gap-12 text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-3 bg-primary/5 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center">
                <div className="mr-3 bg-primary/5 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span>Certified Advisors</span>
              </div>
            </div>
          </div>

          {/* Right column - Image and floating cards */}
          <div className="lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Financial advisor helping client"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating card 1 */}
            <div className={cn(
              "absolute top-10 -left-10 bg-card p-4 shadow-lg animate-float",
              "rounded-lg md:block hidden"
            )}>
              <div className="flex items-center">
                <div className="bg-primary/20 p-2 rounded-full mr-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Investment Growth</p>
                  <p className="text-xs text-muted-foreground">+27% this year</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 */}
            <div className={cn(
              "absolute -bottom-5 -right-5 bg-card p-4 shadow-lg animate-float",
              "animation-delay-1000 rounded-lg md:block hidden"
            )}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">98%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Client Satisfaction</p>
                  <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                    <div className="w-[98%] h-full bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
