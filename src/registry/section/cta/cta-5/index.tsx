"use client"
import { motion } from "framer-motion";
import { Button } from "@/registry/components/button";
import Link from "next/link";

const CTA5A = () => {
  return (
    <section className="py-12 bg-muted">
        <div className="container mx-auto">
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            >
                <div className="bg-card border rounded-2xl p-8 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-muted-foreground">
                    Ready to join the community?
                    </h2>
                    <p className="text-xl mb-6 max-w-2xl mx-auto text-muted-foreground/80">
                    Sign up now and unlock exclusive features and content tailored just for you.
                    </p>
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/register">Create your account</Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    </section>
  );
};

// Variation B - Split layout with background gradient
const CTA5B = () => {
  return (
    <section className="py-12 bg-muted-foreground">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-accent rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="p-8 md:p-12 md:w-3/5">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Take your business to the next level
                </h2>
                <p className="text-lg mb-6 ">
                  Join thousands of satisfied customers who have transformed their operations with our powerful platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                    <Link href="/start-trial">Start Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/demo">Request Demo</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br bg-primary p-8 md:p-12 md:w-2/5 rounded-l-xl">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Free 14-day trial</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Variation C - Floating card with testimonial
const CTA5C = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="bg-card border rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="md:max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to experience the difference?
                </h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  Join over 10,000+ companies that have transformed their business with our platform.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">10,000+</span> happy customers
                  </div>
                </div>
              </div>
              <div className="flex gap-4  flex-col">
                    <div className="bg-accent/30 rounded-xl p-6 border max-w-lg mx-auto">
                    <div className="flex items-center mb-4">
                        <div className="mr-4">
                        ⭐⭐⭐⭐⭐
                        </div>
                        <div className="text-sm text-muted-foreground">
                        "This platform has completely transformed how we operate. The ROI has been
                        incredible."
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 mr-3"></div>
                        <div>
                        <div className="font-medium text-sm">Sarah Johnson</div>
                        <div className="text-xs text-muted-foreground">CEO, TechCorp</div>
                        </div>
                    </div>
                    </div>
            <div className="flex  gap-3">
                <Button size="lg" asChild className="px-8 py-6 text-lg">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg">
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
              </div>
             
            </div>

            {/* Testimonial */}

          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Variation D - Dark theme with pattern background
const CTA5D = () => {
  return (
    <section className="py-12 bg-muted-foreground">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-black text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10"></div>
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-r from-primary to-secondary blur-2xl opacity-30"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to supercharge your workflow?
              </h2>
              <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
                Join thousands of teams who have already transformed how they work. Start your journey today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                  <Link href="/register">
                    Get Started Free
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                  <Link href="/learn-more">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Watch Demo
                  </Link>
                </Button>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-white/70">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Free 14-day trial
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Variation E - Simple centered with subtle background
const CTA5E = () => {
  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        <div className="bg-accent/20 rounded-xl p-6 md:p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Start your journey today
          </h2>
          <p className=" mb-6 max-w-md mx-auto">
            Join thousands of users who have already taken the first step.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Variation F - Horizontal with icon
const CTA5F = () => {
  return (
    <section className="py-10 bg-muted-foreground">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="border bg-card rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Ready to customize your experience?</h2>
              <p className="">It only takes a few minutes to get started.</p>
            </div>
          </div>
          <Button size="lg" className="md:self-center" asChild>
            <Link href="/customize">Customize Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Variation G - Minimal with border
const CTA5G = () => {
  return (
    <section className="py-10 bg-muted">
      <div className="container mx-auto px-4">
        <div className="border border-primary/20 rounded-lg bg-card p-6 text-center">
          <h2 className="text-xl font-medium mb-4">Need more information?</h2>
          <Button variant="outline" size="default" className="border-primary/30 hover:border-primary" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Variation H - Simple two column
const CTA5H = () => {
  return (
    <section className="py-10 bg-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="bg-card shadow-sm rounded-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          <div className="bg-primary/10 p-6 md:p-8">
            <h2 className="text-lg font-semibold mb-2">For Personal Use</h2>
            <p className="text-sm text-muted-foreground mb-4">Perfect for individuals and small projects</p>
            <Button variant="secondary" size="sm" className="w-full" asChild>
              <Link href="/personal">Learn More</Link>
            </Button>
          </div>
          <div className="bg-primary p-6 md:p-8 text-primary-foreground">
            <h2 className="text-lg font-semibold mb-2">For Teams</h2>
            <p className="text-sm text-primary-foreground/90 mb-4">Advanced features for professional teams</p>
            <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/teams">Get Team Access</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA5I = () => {
    return (
      <section className="py-12 bg-muted">
          <div className="container mx-auto">
              <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              >
                  <div className="bg-card border rounded-2xl p-8 items-center flex flex-col text-center">
                      <h2 className="text-3xl font-bold mb-4 text-muted-foreground">
                      Ready to join the community?
                      </h2>
                      <p className="text-xl mb-6 max-w-2xl mx-auto text-muted-foreground/80">
                      Sign up now and unlock exclusive features and content tailored just for you.
                      </p>
                      <div className="flex  gap-2">
                      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/register">Create your account</Link>
                      </Button>
                      <Button size="lg" className="bg-secondary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/register">See Pricing</Link>
                      </Button>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>
    );
  };

export { CTA5A, CTA5B, CTA5C, CTA5D, CTA5E, CTA5F, CTA5G, CTA5H, CTA5I };
