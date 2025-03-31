"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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
    featureItem: {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    },
  };

  const features = [
    {
      title: "Powerful Analytics",
      description: "Gain deep insights with our comprehensive analytics platform.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Team Collaboration",
      description: "Work seamlessly with your team in real-time.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Cloud Integration",
      description: "Connect and synchronize with your favorite cloud services.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "24/7 Support",
      description: "Get help whenever you need with our responsive support team.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "Secure Infrastructure",
      description: "Rest easy with enterprise-grade security protecting your data.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
    {
      title: "API Access",
      description: "Extend functionality with our comprehensive API.",
      icon: <Check className="h-5 w-5 text-primary" />,
    },
  ];
  

export function Test() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="flex flex-col lg:flex-row gap-12 items-start"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={animationConfig.item} className="lg:sticky lg:top-24 lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Just Released
              </div>
              
              <motion.h1 
                variants={animationConfig.item}
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              >
                The smarter way to <span className="text-primary relative">
                  optimize workflows
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9C118.957 4.47226 236.879 3.86015 355 9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary/30"/>
                  </svg>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={animationConfig.item}
                className="text-xl text-muted-foreground"
              >
                Transform how your team works with our all-in-one platform designed to increase productivity and streamline collaboration.
              </motion.p>
              
              <motion.div 
                variants={animationConfig.item}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <Button size="lg" className="gap-2">
                  Get started for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  Schedule a demo
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div variants={animationConfig.item} className="pt-6">
                <p className="text-sm text-muted-foreground mb-4">Trusted by innovative teams worldwide</p>
                <div className="flex flex-wrap gap-6 opacity-70">
                  {["Acme Inc", "Globex", "Stark Industries", "Wayne Enterprises"].map((company, i) => (
                    <div key={i} className="text-foreground font-semibold">{company}</div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={animationConfig.item} 
              className="lg:w-1/2 space-y-8"
            >
              {[0, 1, 2].map((groupIndex) => (
                <motion.div 
                  key={groupIndex}
                  variants={animationConfig.container}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium text-foreground">
                    {groupIndex === 0 ? "Streamline Your Workflow" : 
                     groupIndex === 1 ? "Enhance Collaboration" : 
                     "Maximize Productivity"}
                  </h3>
                  <Card className="overflow-hidden border-border">
                    <CardContent className="p-0">
                      {features.slice(groupIndex * 2, groupIndex * 2 + 2).map((feature, index) => (
                        <motion.div 
                          key={index}
                          variants={animationConfig.featureItem}
                          className={`flex gap-4 p-6 ${index === 0 ? "border-b border-border" : ""}`}
                        >
                          <div className="rounded-full p-2 bg-primary/10 h-10 w-10 flex items-center justify-center shrink-0">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{feature.title}</h4>
                            <p className="text-muted-foreground mt-1">{feature.description}</p>
                            <Button variant="link" className="px-0 h-auto mt-2 font-normal text-primary">
                              Learn more
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              
              <motion.div variants={animationConfig.item} className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                <Badge className="bg-primary text-primary-foreground mb-4">New</Badge>
                <h3 className="text-lg font-medium text-foreground mb-2">Ready to transform your workflow?</h3>
                <p className="text-muted-foreground mb-4">Join thousands of teams already using our platform to improve efficiency.</p>
                <Button size="sm">
                  Start your free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }