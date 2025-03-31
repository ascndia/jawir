"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const animationConfig = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    },
};

const timelineEvents = [
    { year: "2018", title: "Company Founded", description: "Our journey began with a mission to innovate and lead." },
    { year: "2019", title: "First Product Launched", description: "We introduced our first cutting-edge solution to the market." },
    { year: "2020", title: "Major Funding Secured", description: "Secured Series A funding to accelerate our growth and impact." },
    { year: "2021", title: "Global Expansion", description: "Expanded our reach to international markets, bringing value worldwide." },
    { year: "2022", title: "Award Recognition", description: "Received industry accolades for excellence and innovation." },
    { year: "2023", title: "New Breakthroughs", description: "Launched new features that redefine efficiency and productivity." },
];

export function Test2() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center gap-12"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={animationConfig.item} className="text-center">
              <Badge className="bg-primary text-primary-foreground mb-4">Timeline</Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Our Journey Through the Years
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                A look back at our key milestones and achievements.
              </p>
            </motion.div>
            
            <motion.div 
              variants={animationConfig.container} 
              className="w-full max-w-3xl space-y-8"
            >
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  variants={animationConfig.item} 
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6"
                >
                  <div className="shrink-0 rounded-full bg-primary/10 px-4 py-2 text-primary font-semibold">
                    {event.year}
                  </div>
                  <Card className="flex-1 border-border">
                    <CardContent className="p-6">
                      <h3 className="font-medium text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground mt-1">{event.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div variants={animationConfig.item} className="bg-primary/5 rounded-xl p-6 border border-primary/10 text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">Be a part of our story</h3>
              <p className="text-muted-foreground mb-4">Join us as we continue to innovate and grow.</p>
              <button className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2">
                Get Involved <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
}

