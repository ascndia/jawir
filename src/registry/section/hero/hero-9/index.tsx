"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero9A = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 rounded-full bg-primary-foreground opacity-10 -mr-20"></div>
          <div className="absolute bottom-0 left-1/4 w-32 h-32 rounded-full bg-primary-foreground opacity-10 -mb-10"></div>

          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Welcome to Our Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Join us to explore a world of opportunities and connect with like-minded individuals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9B = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="bg-card text-card-foreground rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative z-10 max-w-xl md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Transform Your Digital Experience
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Our platform provides cutting-edge solutions to help your business thrive in the digital landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="default" asChild>
                <Link href="/demo">Request Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-[300px]">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-foreground opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Placeholder for image - replace src with actual image */}
                <div className="w-full h-full bg-accent/20 rounded-xl flex items-center justify-center">
                  <span className="text-muted-foreground">Product Image</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9C = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="bg-background border rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Elevate Your Business
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of satisfied customers who have transformed their operations with our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                <Link href="/start">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Customer satisfaction</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-muted-foreground">Active users</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9D = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="bg-black text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-3xl opacity-20"></div>
          
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-sm font-semibold bg-white/10 text-white px-3 py-1 rounded-full mb-6">NEW RELEASE</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The Future of Web Development is Here
            </h1>
            <p className="text-xl mb-8 text-white/80">
              Experience unprecedented development speed and performance with our next-generation toolkit.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 border-0" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10" asChild>
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9E = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="rounded-3xl relative overflow-hidden shadow-xl h-[600px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Video background placeholder */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <span className="text-white/50">Video Background</span>
            </div>
          </div>
          
          <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-sm rounded-full mb-4">PREMIUM EXPERIENCE</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Immersive Digital Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                Experience our cutting-edge platform designed to transform how you interact with technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-white/90" asChild>
                  <Link href="/watch">Watch Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/contact">Schedule Call</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9F = () => {
    return (
      <section className="py-12 bg-muted px-4">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-br from-background to-muted rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Innovative Solutions
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></span>
                </span>{" "}
                for Modern Businesses
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore our suite of powerful tools designed to help your business grow and succeed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  title: "Analytics",
                  desc: "Powerful insights for data-driven decisions",
                  color: "from-blue-500 to-cyan-400"
                },
                {
                  title: "Automation",
                  desc: "Streamline your workflow and save time",
                  color: "from-purple-500 to-pink-400"
                },
                {
                  title: "Integration",
                  desc: "Seamlessly connect with your favorite tools",
                  color: "from-amber-500 to-orange-400"
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className={`w-12 h-12 rounded-lg mb-4 bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <span className="text-white text-xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-muted-foreground">{card.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                <Link href="/solutions">Explore All Solutions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

const Hero9G = () => {
  return (
    <section className="py-20 bg-muted px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="rounded-3xl bg-card  p-8 md:p-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="mb-6 inline-block bg-primary/10 px-3 py-1 rounded-md text-primary font-medium">
                Minimalist • Elegant • Professional
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                We build <span className="text-primary typing-text">beautiful</span> digital experiences.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10">
                Our team of experts is dedicated to creating exceptional digital solutions 
                tailored to your specific needs and goals.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                <Button size="lg" variant="default" className="rounded-full px-8" asChild>
                  <Link href="/portfolio">View Our Work</Link>
                </Button>
                <Link href="/process" className="flex items-center text-foreground font-medium hover:text-primary transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-background border flex items-center justify-center mr-4 group-hover:border-primary transition-colors">
                    <div className="w-3 h-3 border-t-2 border-r-2 rotate-45 border-current transform translate-x-[-2px]"></div>
                  </div>
                  Our Process
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Hero9H = () => {
  return (
    <section className="py-12 bg-muted px-4">
      <div className="container mx-auto">
        <motion.div
          className="bg-card rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg flex flex-col lg:flex-row items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Content */}
          <div className="relative z-10 max-w-xl lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              Now Available
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Business in Your Pocket
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Manage your entire operation from anywhere with our powerful mobile application. Stay connected and in control.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Button size="lg" variant="default" className="gap-2" asChild>
                <Link href="/app-store">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  App Store
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <Link href="/play-store">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                  </svg>
                  Play Store
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"></div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">4,000+</span> active users this month
              </p>
            </div>
          </div>
          
          {/* Right Content - Mobile Device Frame */}
          <div className="lg:w-1/2 flex justify-center">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {/* Phone frame */}
              <div className="w-[280px] h-[570px] bg-black rounded-[40px] p-3 shadow-xl border-[8px] border-gray-800">
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary rounded-[32px] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl"></div>
                  
                  {/* App content placeholder */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex-1 p-4 flex items-center justify-center">
                      <span className="text-white text-lg font-medium">App Screenshot</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export { Hero9A, Hero9B, Hero9C, Hero9D, Hero9E, Hero9F, Hero9G, Hero9H };