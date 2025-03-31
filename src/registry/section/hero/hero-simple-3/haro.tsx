"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Globe } from "lucide-react"
import { Button } from "@/registry/components/button"

const HeroSimple3 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-block rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                <span>Introducing Our New Platform</span>
              </div>
            </motion.div>
            
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
              variants={itemVariants}
            >
              Build beautiful websites with{" "}
              <span className="text-primary">speed</span> and{" "}
              <span className="text-primary">efficiency</span>
            </motion.h1>
            
            <motion.p
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
              variants={itemVariants}
            >
              A modern UI toolkit for creating stunning user interfaces
              that are accessible, responsive, and customizable.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={itemVariants}
            >
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSimple3