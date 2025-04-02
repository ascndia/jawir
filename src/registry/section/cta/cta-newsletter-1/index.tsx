"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const CTANewsletter1A = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/40 py-12 px-4 text-center"
    >
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-3">Stay Inspired & Save</h2>
        <p className=" mb-6">
          Subscribe to get exclusive travel deals straight to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-white border px-4 py-2 rounded-md text-black"
          />
          <Button className="bg-secondary hover:bg-secondary-hover text-white px-4 py-2">
            Subscribe
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

const CTANewsletter1B = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="py-16"
    >
      <div className="container p-12 rounded-xl bg-gradient-to-r from-primary to-primary/70 mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg opacity-90 mb-6">
            Get weekly travel inspiration, insider tips, and exclusive offers delivered
            directly to your inbox.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl">
          <Input
            type="email"
            placeholder="Your email address"
            className="mb-4 bg-white/80 text-primary border-0 shadow-inner"
          />
          <Button className="w-full bg-background text-primary hover:bg-background/90 font-semibold">
            Subscribe Now
          </Button>
          <p className="text-xs mt-3 opacity-75 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const CTANewsletter1C = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background border border-primary/20 shadow-lg py-12 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Newsletter
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Travel Smarter, Not Harder
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Subscribe to our newsletter and get the best travel deals, hidden gems,
            and expert advice you won't find anywhere else.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-3 p-2 bg-muted rounded-lg">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow md:flex-1 border-0 bg-transparent"
          />
          <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            Get Updates
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates.
        </p>
      </div>
    </motion.section>
  );
};

const CTANewsletter1D = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-secondary/10 py-16 px-4"
    >
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-secondary/20 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <motion.div
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Let's make your <span className="text-primary">next journey</span> unforgettable
              </h2>
              <p className="text-muted-foreground mb-4">
                Join our travel-loving community and receive personalized recommendations,
                seasonal deals, and inspiring stories from around the world.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:col-span-2 bg-background shadow-xl rounded-xl p-6"
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="font-medium text-lg mb-4">Sign up for our newsletter</h3>
            <Input
              type="email"
              placeholder="Email address"
              className="mb-3 border-muted-foreground/20"
            />
            <Input
              type="text"
              placeholder="First name (optional)"
              className="mb-5 border-muted-foreground/20"
            />
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
              Subscribe
            </Button>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>No spam, we promise. Unsubscribe anytime.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export { CTANewsletter1A, CTANewsletter1B, CTANewsletter1C, CTANewsletter1D };
