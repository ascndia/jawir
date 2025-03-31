'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { motion } from 'framer-motion';
import { FC } from 'react';
import { ChevronRight, CheckCircle, Zap, Layers, BarChart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const fadeInRight = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Simple Integration',
    description: 'Seamlessly integrate with your existing workflow in minutes.',
    badge: 'Easy',
    details: 'Our platform is designed to fit into your current setup without any hassle. With a few clicks, you can connect and start using our features immediately.',
    mobileTitle: 'Integrate'
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: 'Lightning Fast',
    description: 'Optimized for performance with minimal overhead.',
    badge: 'Fast',
    details: 'Experience rapid response times and efficient resource usage. Our platform is built with performance in mind, ensuring that you can work without interruptions.',
    mobileTitle: 'Speed'
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: 'Fully Customizable',
    description: 'Adapt to your unique needs with extensive customization options.',
    badge: 'Flexible',
    details: 'Tailor the platform to fit your specific requirements. From UI adjustments to advanced settings, you have complete control over your environment.',
    mobileTitle: 'Customize'
  },
  {
    icon: <BarChart className="h-6 w-6 text-primary" />,
    title: 'Advanced Analytics',
    description: 'Gain insights with comprehensive data visualization.',
    badge: 'Powerful',
    details: 'Utilize our advanced analytics tools to monitor performance and gain insights into your workflow. Visualize data trends and make informed decisions based on real-time information.',
    mobileTitle: 'Analytics'
  },
];

const HowItWork1A= () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="space-y-12"
        >
          <motion.div 
            variants={fadeInUp} 
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our streamlined process makes implementation simple and effective.
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerChildren}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
              >
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <div className="rounded-full bg-primary/10 p-2">
                        {feature.icon}
                      </div>
                      <Badge variant="outline" className="bg-secondary/10">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeInUp} className="text-center">
            <Button asChild size="lg" className="gap-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
              >
                Learn more
                <ChevronRight className="h-4 w-4" />
              </motion.a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWork1B = () => {
    return (
      <section className={"py-16 bg-primary/20 "}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="space-y-12"
          >
            <motion.div 
              variants={fadeIn} 
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A simple four-step process to transform your workflow
              </p>
            </motion.div>
            
            {/* Desktop view: Timeline with tabs */}
            <motion.div variants={fadeIn} className="hidden md:block">
              <Tabs defaultValue="0" className="w-full">
                <div className="flex items-center justify-center mb-8">
                  <TabsList className="grid grid-cols-4 w-full max-w-3xl">
                    {features.map((step, index) => (
                      <TabsTrigger 
                        key={index} 
                        value={index.toString()}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex flex-col items-center gap-2 py-3"
                      >
                        <div className="rounded-full bg-muted p-2">
                          {step.icon}
                        </div>
                        <span>{step.title}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {features.map((step, index) => (
                  <TabsContent 
                    key={index} 
                    value={index.toString()}
                    className="focus-visible:outline-none mt-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card >
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div className="space-y-4">
                              <h3 className="text-2xl font-bold">{step.title}</h3>
                              <p className="text-muted-foreground">{step.description}</p>
                              <p>{step.details}</p>
                            </div>
                            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-6 aspect-video flex items-center justify-center">
                              <div className="text-4xl text-primary">
                                {step.icon}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
            
            {/* Mobile view: Accordion */}
            <motion.div variants={fadeIn} className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                {features.map((step, index) => (
                  <AccordionItem key={index} value={index.toString()}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          {step.icon}
                        </div>
                        <span>{step.mobileTitle}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 px-2">
                        <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground mb-2">{step.description}</p>
                        <p className="text-sm">{step.details}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
            
            <motion.div 
              variants={fadeInRight} 
              className="text-center"
            >
              <Button asChild size="lg" className="gap-2">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                >
                  Get started
                  <ChevronRight className="h-4 w-4" />
                </motion.a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
};

const HowItWork1C = () => {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                How It Works
              </h2>
              <p className="max-w-[600px] text-muted-foreground mx-auto">
                Get started in just three simple steps
              </p>
            </div>
            
            <Card >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center mb-4">
                        <span className="text-4xl font-bold text-primary mr-4">
                          {index + 1}
                        </span>
                        {index < features.length - 1 && (
                          <div className="hidden md:block flex-grow">
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      {index < features.length - 1 && (
                        <Separator className="md:hidden my-4" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Button size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    );
  };

  
const HowItWork1D = () => {
    return (
      <section className="py-16 bg-primary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12">
            <div className="text-center max-w-[800px] mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-3 text-foreground">
                How It Works
              </h2>
              <p className="text-muted-foreground md:text-lg">
                We've simplified the complex to deliver a seamless experience from start to finish.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="h-full group">
                    <CardHeader className="flex items-center gap-4">
                      <div className="bg-muted/50 rounded-full p-2 inline-block">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl font-medium group-hover:text-primary transition-colors duration-200">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {feature.description}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" size="lg" className="group">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  };

const HowItWork1E = () => {
  return (
    <section className={`py-12 bg-background`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            Get Started in Four Simple Steps
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-center text-muted-foreground max-w-2xl">
            Our streamlined process makes getting started quick and easy, with no technical knowledge required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {features.map((item, index) => (
            <div 
              key={index}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg p-6 h-full flex flex-col"
              >
                <div className="flex items-center mb-4">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                    {index+1}
                  </span>
                  {index < features.length - 1 && (
                    <div className="hidden lg:block absolute left-[80%] top-10 transform -translate-y-1/2">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="gap-2">
            Start Now
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};


const HowItWork1F = () => {
  return (
    <section className="py-16 bg-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground inline-flex items-center gap-2">
              How It Works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Follow these steps to transform your workflow
            </p>
          </div>
          
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-xl">
                      {index + 1}
                    </div>
                    {index < features.length - 1 && (
                    <div className="hidden md:block h-full w-1 bg-border/60 absolute top-12 bottom-0 left-6 -mb-6 transform translate-x-px"></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-grow">
                    <Card className="overflow-hidden border-none shadow-sm">
                      <CardHeader className="bg-muted/30 pb-3 flex flex-row items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          {feature.icon}
                        </div>
                        <div className="flex-grow">
                          <CardTitle className="text-xl">{feature.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="bg-secondary/10">
                          {feature.badge}
                        </Badge>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="mb-2">{feature.description}</p>
                        <p className="text-sm text-muted-foreground">{feature.details}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="default" size="lg" className="group">
              Get Started Now
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWork1G = () => {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground mb-4">
              How It Works
            </h2>
            <p className="mx-auto max-w-[800px] text-muted-foreground md:text-lg">
              Our platform simplifies your workflow in four easy steps
            </p>
          </div>
  
          <div className="relative mt-16 mb-16">
            {/* Connection line */}
            {/* <div className="hidden md:block absolute top-1/7 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2 z-0"></div> */}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {features.slice(0, 3).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative z-10 group"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Step number with icon */}
                    <div className="mb-4 relative">
                      <div className="w-16 h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <div className="text-primary group-hover:text-white transition-colors duration-300">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Title and description */}
                    <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                    
                    {/* Expandable details */}
                    <div className="overflow-hidden mt-3">
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        whileHover={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs text-muted-foreground/80 bg-muted/30 p-3 rounded-md"
                      >
                        {feature.details}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    );
  };
  
  const HowItWork1H = () => {
    return (
      <section className="py-16 bg-primary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                  How It <span className="text-primary">Works</span>
                </h2>
                <p className="mt-3 text-muted-foreground">
                  A simplified approach to enhance your workflow
                </p>
              </div>
              <Button variant="outline" className="md:self-end">
                Watch Demo
              </Button>
            </div>
            
            <div className="relative">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="mb-8 last:mb-0"
                >
                  <div className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}>
                    {/* Icon side */}
                    <div className={`hidden md:block w-1/3 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 p-4">
                        <div className="transform scale-150 text-primary">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Content side */}
                    <div className="w-full md:w-2/3">
                      <Card className="overflow-hidden transition-all hover:shadow-md">
                        <div className="relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 p-2">
                                {feature.icon}
                              </div>
                              <div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="rounded-sm">
                                    Step {index + 1}
                                  </Badge>
                                  <Badge variant="outline" className="bg-primary/5">
                                    {feature.badge}
                                  </Badge>
                                </div>
                                <h3 className="text-xl font-medium mt-2">
                                  {feature.title}
                                </h3>
                              </div>
                            </div>
                            <p className="mb-4">{feature.description}</p>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="details" className="border-none">
                                <AccordionTrigger className="py-2 text-sm text-primary hover:no-underline">
                                  Learn more
                                </AccordionTrigger>
                                <AccordionContent className="text-sm text-muted-foreground">
                                  {feature.details}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  {/* Connector */}
                  {index < features.length - 1 && (
                    <div className="hidden md:flex justify-center my-4">
                      <div className="w-0.5 h-10 bg-border"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg">
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export { HowItWork1A, HowItWork1B, HowItWork1C, HowItWork1D, HowItWork1E, HowItWork1F, HowItWork1G, HowItWork1H };