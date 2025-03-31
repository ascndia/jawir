"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppWindow, ArrowRight, ArrowUpRight, BarChart3, Calendar, Check, CheckIcon, CheckSquare, ChevronDown, ChevronUp, Code, FileBarChart, FileEdit, LayoutDashboard, Lightbulb, Link, PieChart, Workflow, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Features1A() {
    // Custom animation config for this section
    const showcaseAnimConfig = {
      container: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      },
      item: {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      },
      tabItem: {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
      },
      statsItem: {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      }
    };
  
    // Stats data
    const stats = [
      { value: "93%", label: "Customer Satisfaction" },
      { value: "40x", label: "Productivity Boost" },
      { value: "10k+", label: "Active Users" },
      { value: "99.9%", label: "Uptime Guaranteed" }
    ];
  
    // Tabs data for the interactive feature showcase
    const tabs = [
      {
        title: "Team Collaboration",
        content: {
          heading: "Seamless Team Collaboration",
          description: "Connect your team with powerful tools that make collaboration effortless and efficient.",
          features: [
            "Real-time document editing",
            "Task assignment and tracking",
            "Integrated communication channels",
            "Project timeline visualization"
          ],
          image: "/path/to/collaboration-image.png" // Replace with actual path
        }
      },
      {
        title: "Analytics Dashboard",
        content: {
          heading: "Comprehensive Analytics",
          description: "Gain valuable insights into your operations with our sophisticated analytics tools.",
          features: [
            "Customizable reporting dashboards",
            "Data visualization tools",
            "Performance metrics tracking",
            "Automated report generation"
          ],
          image: "/path/to/analytics-image.png" // Replace with actual path
        }
      },
      {
        title: "Workflow Automation",
        content: {
          heading: "Powerful Automation",
          description: "Streamline repetitive tasks and processes with intelligent workflow automation.",
          features: [
            "Visual workflow builder",
            "Conditional logic and triggers",
            "Integration with third-party services",
            "Activity monitoring and logs"
          ],
          image: "/path/to/automation-image.png" // Replace with actual path
        }
      }
    ];
  
    // State for active tab
    const [activeTab, setActiveTab] = React.useState(0);
  
    return (
      <section className="w-full py-24 lg:py-32 bg-background overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            className="text-center mx-auto mb-16 max-w-[800px]"
            variants={showcaseAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={showcaseAnimConfig.item} className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Powerful Features
            </motion.div>
            <motion.h2 variants={showcaseAnimConfig.item} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
              Everything you need to <span className="text-primary">excel</span>
            </motion.h2>
            <motion.p variants={showcaseAnimConfig.item} className="text-xl text-muted-foreground">
              Our comprehensive suite of tools gives you everything you need to manage projects, 
              collaborate with your team, and drive business growth.
            </motion.p>
          </motion.div>
  
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-24"
            variants={showcaseAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                variants={showcaseAnimConfig.statsItem}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
  
          {/* Interactive Feature Tabs */}
          <motion.div 
            className="relative mb-20"
            variants={showcaseAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Background decoration */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
            
            {/* Tabs navigation */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-10">
              <motion.div variants={showcaseAnimConfig.item} className="md:w-1/3">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Explore Our Platform</h3>
                <div className="space-y-3">
                  {tabs.map((tab, index) => (
                    <motion.button
                      key={index}
                      variants={showcaseAnimConfig.tabItem}
                      onClick={() => setActiveTab(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between ${
                        activeTab === index 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      <span>{tab.title}</span>
                      {activeTab === index && (
                        <CheckIcon className="h-4 w-4" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              
              {/* Tab content */}
              <motion.div 
                variants={showcaseAnimConfig.item} 
                className="md:w-2/3 bg-card border border-border rounded-xl overflow-hidden shadow-lg"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-foreground">{tabs[activeTab].content.heading}</h3>
                        <p className="text-muted-foreground">{tabs[activeTab].content.description}</p>
                        <ul className="space-y-3">
                          {tabs[activeTab].content.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="rounded-full p-1 bg-primary/10 text-primary mt-0.5">
                                <CheckIcon className="h-4 w-4" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className="mt-2" size="sm">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                      <div className="order-first md:order-last mb-6 md:mb-0">
                        <div className="bg-muted rounded-lg aspect-video relative overflow-hidden">
                          {/* This would be your image - using placeholder for now */}
                          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground border-2 border-dashed border-border">
                            Feature {activeTab + 1} Image
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
  
          {/* Call to Action */}
          <motion.div
            variants={showcaseAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 -z-10" />
            <div className="p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <motion.h3 variants={showcaseAnimConfig.item} className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Ready to transform your workflow?
                </motion.h3>
                <motion.p variants={showcaseAnimConfig.item} className="text-muted-foreground text-lg mb-8">
                  Join thousands of teams already using our platform to improve efficiency and drive growth.
                </motion.p>
                <motion.div variants={showcaseAnimConfig.item} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Schedule demo
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
  
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
export function Features1B() {
    // Custom animation config for this section
    const featureAnimConfig = {
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
      featureCard: {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      },
      featureIcon: {
        hidden: { scale: 0.8, opacity: 0 },
        show: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
      }
    };
  
    // Feature categories with expandable sections
    const featureCategories = [
      {
        title: "Productivity Tools",
        description: "Boost your team's efficiency with our integrated productivity suite.",
        icon: <Lightbulb className="h-6 w-6 text-primary" />,
        features: [
          {
            title: "Task Management",
            description: "Create, assign, and track tasks with customizable workflows.",
            icon: <CheckSquare className="h-5 w-5 text-primary" />
          },
          {
            title: "Calendar Integration",
            description: "Sync with popular calendars and manage schedules in one place.",
            icon: <Calendar className="h-5 w-5 text-primary" />
          },
          {
            title: "Document Collaboration",
            description: "Work together on documents with real-time editing and version control.",
            icon: <FileEdit className="h-5 w-5 text-primary" />
          }
        ]
      },
      {
        title: "Analytics & Reporting",
        description: "Get valuable insights with comprehensive analytics tools.",
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        features: [
          {
            title: "Custom Dashboards",
            description: "Create personalized dashboards with the metrics that matter to you.",
            icon: <LayoutDashboard className="h-5 w-5 text-primary" />
          },
          {
            title: "Automated Reports",
            description: "Schedule and distribute reports to stakeholders automatically.",
            icon: <FileBarChart className="h-5 w-5 text-primary" />
          },
          {
            title: "Data Visualization",
            description: "Transform complex data into clear, actionable visualizations.",
            icon: <PieChart className="h-5 w-5 text-primary" />
          }
        ]
      },
      {
        title: "Integration Ecosystem",
        description: "Connect seamlessly with your favorite tools and services.",
        icon: <Link className="h-6 w-6 text-primary" />,
        features: [
          {
            title: "API Access",
            description: "Full API access for custom integrations and workflows.",
            icon: <Code className="h-5 w-5 text-primary" />
          },
          {
            title: "App Marketplace",
            description: "Extend functionality with pre-built integrations.",
            icon: <AppWindow className="h-5 w-5 text-primary" />
          },
          {
            title: "Workflow Automation",
            description: "Create custom automation rules between connected services.",
            icon: <Workflow className="h-5 w-5 text-primary" />
          }
        ]
      }
    ];
  
    // State to track expanded categories
    const [expandedCategory, setExpandedCategory] = React.useState(0);
  
    return (
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <motion.div 
            className="max-w-[800px] mx-auto text-center mb-16"
            variants={featureAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={featureAnimConfig.item} className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Advanced Features
            </motion.div>
            
            <motion.h2 
              variants={featureAnimConfig.item}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Powerful tools for <span className="text-primary relative">
                modern teams
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9C118.957 4.47226 236.879 3.86015 355 9" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary/30"/>
                </svg>
              </span>
            </motion.h2>
            
            <motion.p 
              variants={featureAnimConfig.item}
              className="text-xl text-muted-foreground max-w-[600px] mx-auto"
            >
              Discover how our comprehensive platform can transform your workflow, boost productivity, and drive innovation.
            </motion.p>
          </motion.div>
  
          {/* Feature categories with expandable sections */}
          <motion.div 
            variants={featureAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-16 mb-20"
          >
            {featureCategories.map((category, categoryIndex) => (
              <motion.div 
                key={categoryIndex}
                variants={featureAnimConfig.item}
                className={`rounded-2xl ${
                  expandedCategory === categoryIndex 
                    ? "bg-card border border-border shadow-lg" 
                    : "bg-transparent"
                } transition-all duration-300`}
              >
                <div 
                  className={`p-6 md:p-8 cursor-pointer ${
                    expandedCategory === categoryIndex 
                      ? "border-b border-border" 
                      : ""
                  }`}
                  onClick={() => setExpandedCategory(
                    expandedCategory === categoryIndex ? -1 : categoryIndex
                  )}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      variants={featureAnimConfig.featureIcon}
                      className="rounded-full p-3 bg-primary/10 shrink-0"
                    >
                      {category.icon}
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                          {category.title}
                        </h3>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          {expandedCategory === categoryIndex ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <p className="text-muted-foreground mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedCategory === categoryIndex && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-3 gap-6 p-6 md:p-8">
                        {category.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            variants={featureAnimConfig.featureCard}
                            className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:shadow-sm transition-all duration-200"
                          >
                            <div className="rounded-full p-2 bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                              {feature.icon}
                            </div>
                            <h4 className="text-lg font-medium text-foreground mb-2">
                              {feature.title}
                            </h4>
                            <p className="text-muted-foreground">
                              {feature.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Compare plans section */}
          <motion.div
            variants={featureAnimConfig.container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10" />
            <div className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <motion.div variants={featureAnimConfig.item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-background/80 backdrop-blur-sm">Compare Plans</Badge>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">Find the perfect plan for your team</h3>
                  </div>
                  <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                    View all features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                
                <motion.div variants={featureAnimConfig.item}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Feature comparison</span>
                        <Badge>Most Popular</Badge>
                      </CardTitle>
                      <CardDescription>
                        Select the plan that fits your needs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1"></div>
                        {["Free", "Pro", "Team"].map((plan, i) => (
                          <div key={i} className="text-center font-medium">
                            {plan}
                          </div>
                        ))}
                        
                        {[
                          "Core features", 
                          "Unlimited projects", 
                          "Priority support", 
                          "Advanced analytics", 
                          "Custom integrations"
                        ].map((feature, i) => (
                          <React.Fragment key={i}>
                            <div className="py-4 border-t border-border">{feature}</div>
                            {[
                              i < 2, // Free plan
                              i < 4, // Pro plan
                              true,  // Team plan (all features)
                            ].map((included, j) => (
                              <div key={j} className="py-4 border-t border-border text-center">
                                {included ? (
                                  <Check className="mx-auto h-5 w-5 text-primary" />
                                ) : (
                                  <X className="mx-auto h-5 w-5 text-muted-foreground/50" />
                                )}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mt-6">
                        <div></div>
                        {["Free", "Pro", "Team"].map((plan, i) => (
                          <div key={i} className="flex justify-center">
                            <Button 
                              variant={i === 1 ? "default" : "outline"} 
                              className={i === 1 ? "" : "border-primary/30 text-primary"}
                            >
                              Choose {plan}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }