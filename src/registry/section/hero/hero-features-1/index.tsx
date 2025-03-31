"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Animation configuration
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

// Features data
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

export function HeroFeatures1A() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          variants={animationConfig.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={animationConfig.item} className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              New Features
            </div>
            <motion.h2 
              variants={animationConfig.item}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground"
            >
              Transform Your Workflow
            </motion.h2>
            <motion.p 
              variants={animationConfig.item}
              className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Our platform helps you streamline your processes and boost productivity with 
              cutting-edge tools designed for modern teams.
            </motion.p>
            <motion.div variants={animationConfig.item} className="space-y-4">
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.slice(0, 4).map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center gap-2"
                    variants={animationConfig.featureItem}
                  >
                    {feature.icon}
                    <span className="text-foreground">{feature.title}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={animationConfig.item} className="mx-auto lg:order-last">
            <Card className="border border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl text-card-foreground">Feature Spotlight</CardTitle>
                <CardDescription className="text-card-foreground/70">
                  Discover what makes our platform stand out
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {features.slice(2).map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex gap-4 items-start"
                    variants={animationConfig.featureItem}
                  >
                    <div className="rounded-full p-2 bg-primary/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function HeroFeatures1B() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center text-center space-y-4 mb-12"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="border-primary/20 text-primary px-4 py-2">
              Introducing New Features
            </Badge>
            <motion.h1 
              variants={animationConfig.item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              Elevate Your Business <span className="text-primary">Workflow</span>
            </motion.h1>
            <motion.p 
              variants={animationConfig.item}
              className="max-w-[750px] text-lg md:text-xl text-muted-foreground"
            >
              Streamline operations and boost productivity with our innovative platform tailored for forward-thinking teams.
            </motion.p>
            <motion.div 
              variants={animationConfig.item}
              className="flex flex-col sm:flex-row gap-4 mt-2"
            >
              <Button size="lg" className="px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                View Demo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
  
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={index}
                variants={animationConfig.item}
                className="relative"
              >
                <Card className="h-full border-border hover:border-primary/50 transition-all duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
  
          <motion.div 
            className="mt-24 relative bg-background rounded-3xl"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10" />
            <Card className="border-none bg-transparent shadow-none overflow-hidden">
              <CardContent className="p-6 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <motion.div variants={animationConfig.item} className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      Why teams choose our platform
                    </h3>
                    <p className="text-muted-foreground">
                      Join thousands of organizations that trust our solution to optimize their workflows and drive innovation.
                    </p>
                    <ul className="space-y-3">
                      {features.slice(3).map((feature, index) => (
                        <motion.li 
                          key={index} 
                          variants={animationConfig.featureItem}
                          className="flex items-center gap-3"
                        >
                          <div className="bg-primary/10 rounded-full p-1.5">
                            {feature.icon}
                          </div>
                          <span className="font-medium text-foreground">{feature.title}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button className="mt-4">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
  
                  <motion.div 
                    variants={animationConfig.item} 
                    className="bg-card border border-border rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="font-medium text-lg text-foreground">Feature Highlights</h4>
                        <p className="text-sm text-muted-foreground">Latest platform capabilities</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">New</Badge>
                    </div>
                    <div className="space-y-4">
                      {features.slice(0, 3).map((feature, index) => (
                        <motion.div 
                          key={index}
                          variants={animationConfig.featureItem}
                          className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="bg-primary/10 rounded-full p-2 self-start">
                            {feature.icon}
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground">{feature.title}</h5>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  export function HeroFeatures1C() {
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

  export function HeroFeatures1D() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent/40">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.h1 
              variants={animationConfig.item}
              className="text-3xl md:text-5xl font-bold text-foreground"
            >
              Empower Your Business
            </motion.h1>
            <motion.p 
              variants={animationConfig.item}
              className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Simplify your work, increase productivity, and drive innovation.
            </motion.p>
            <motion.div 
              variants={animationConfig.item}
              className="mt-8 flex justify-center gap-4"
            >
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <motion.div 
                key={index}
                variants={animationConfig.item}
                className="flex items-start gap-3"
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  export function HeroFeatures1E() {
    return (
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            variants={animationConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={animationConfig.item} className="md:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Boost Your Productivity
              </h1>
              <p className="text-muted-foreground">
                Discover innovative tools designed to make your team more efficient and collaborative.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Try for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={animationConfig.container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {features.slice(0, 4).map((feature, index) => (
                <motion.div
                  key={index}
                  variants={animationConfig.item}
                  className="flex items-center gap-3 p-4 border rounded-lg border-border"
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground">{feature.title}</h5>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }
