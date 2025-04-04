"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Filter, Search, SlidersHorizontal, Star, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    features: string[];
    pricing: string[];
  }>({
    categories: [],
    features: [],
    pricing: [],
  });

  // Filter options
  const filterCategories = [
    { id: "analytics", label: "Analytics" },
    { id: "reporting", label: "Reporting" },
    { id: "dashboards", label: "Dashboards" },
    { id: "integrations", label: "Integrations" },
    { id: "ai", label: "AI Tools" },
  ];
  
  const filterFeatures = [
    { id: "real-time", label: "Real-Time Data" },
    { id: "export", label: "Data Export" },
    { id: "api", label: "API Access" },
    { id: "mobile", label: "Mobile App" },
    { id: "custom", label: "Custom Reports" },
  ];
  
  const filterPricing = [
    { id: "free", label: "Free Plan" },
    { id: "starter", label: "Starter" },
    { id: "pro", label: "Pro" },
    { id: "enterprise", label: "Enterprise" },
  ];

  const sortOptions = [
    { id: "relevance", label: "Relevance" },
    { id: "newest", label: "Newest" },
    { id: "popular", label: "Most Popular" },
  ];

  // Helper to toggle filter items
  const toggleFilter = (section: keyof typeof activeFilters, itemId: string) => {
    setActiveFilters(prev => {
      const updated = { ...prev };
      if (updated[section].includes(itemId)) {
        updated[section] = updated[section].filter(id => id !== itemId);
      } else {
        updated[section] = [...updated[section], itemId];
      }
      return updated;
    });
  };

  // Count active filters
  const activeFilterCount = 
    activeFilters.categories.length + 
    activeFilters.features.length + 
    activeFilters.pricing.length;
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      categories: [],
      features: [],
      pricing: [],
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span className="font-bold">ProductX</span>
            </a>
            <nav className="hidden lg:flex gap-6">
              <a href="#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</a>
              <a href="#testimonials" className="text-muted-foreground transition-colors hover:text-foreground">Testimonials</a>
              <a href="#pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</a>
              <a href="#contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container flex flex-col lg:flex-row items-center gap-12">
          <div className="space-y-6 lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold tracking-tight">Transform Your Business with Powerful Analytics</h1>
            <p className="text-xl text-muted-foreground">
              Unlock insights, drive growth, and make data-driven decisions with our powerful analytics platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-video bg-muted rounded-lg shadow-lg overflow-hidden border">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg"></div>
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Search Bar with Filters Section */}
      <section className="py-12 border-b">
        <div className="container">
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-2xl font-semibold">Explore Our Solutions</h2>
            <p className="text-muted-foreground">Find the perfect analytics solution for your business needs</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search analytics solutions..."
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setSearchQuery('')}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear</span>
                  </Button>
                )}
              </div>
              
              {/* Category select */}
              <div className="w-full sm:w-[200px]">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {filterCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Mobile filter trigger */}
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:w-[130px] flex justify-between">
                    <span>Filter</span>
                    <SlidersHorizontal className="ml-2 h-4 w-4" />
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-1">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down your search results</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <ScrollArea className="h-[calc(100vh-180px)]">
                      <div className="space-y-6 pr-6">
                        {/* Categories filter */}
                        <div className="space-y-4">
                          <div className="font-medium">Categories</div>
                          <div className="space-y-2">
                            {filterCategories.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`category-${item.id}`}
                                  checked={activeFilters.categories.includes(item.id)}
                                  onCheckedChange={() => toggleFilter('categories', item.id)}
                                />
                                <Label htmlFor={`category-${item.id}`}>{item.label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Features filter */}
                        <div className="space-y-4">
                          <div className="font-medium">Features</div>
                          <div className="space-y-2">
                            {filterFeatures.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`feature-${item.id}`}
                                  checked={activeFilters.features.includes(item.id)}
                                  onCheckedChange={() => toggleFilter('features', item.id)}
                                />
                                <Label htmlFor={`feature-${item.id}`}>{item.label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        {/* Pricing filter */}
                        <div className="space-y-4">
                          <div className="font-medium">Pricing</div>
                          <div className="space-y-2">
                            {filterPricing.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`pricing-${item.id}`}
                                  checked={activeFilters.pricing.includes(item.id)}
                                  onCheckedChange={() => toggleFilter('pricing', item.id)}
                                />
                                <Label htmlFor={`pricing-${item.id}`}>{item.label}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    <div className="flex items-center justify-between mt-6 pt-6 border-t">
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        disabled={activeFilterCount === 0}
                      >
                        Reset
                      </Button>
                      <Button onClick={() => setIsFiltersOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Active filter display */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.categories.map(id => {
                  const filter = filterCategories.find(c => c.id === id);
                  return filter ? (
                    <Badge key={`cat-${id}`} variant="secondary" className="pl-2 pr-1 py-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => toggleFilter('categories', id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {filter.label} filter</span>
                      </Button>
                    </Badge>
                  ) : null;
                })}
                
                {activeFilters.features.map(id => {
                  const filter = filterFeatures.find(c => c.id === id);
                  return filter ? (
                    <Badge key={`feat-${id}`} variant="secondary" className="pl-2 pr-1 py-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => toggleFilter('features', id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {filter.label} filter</span>
                      </Button>
                    </Badge>
                  ) : null;
                })}
                
                {activeFilters.pricing.map(id => {
                  const filter = filterPricing.find(c => c.id === id);
                  return filter ? (
                    <Badge key={`price-${id}`} variant="secondary" className="pl-2 pr-1 py-1">
                      {filter.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => toggleFilter('pricing', id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {filter.label} filter</span>
                      </Button>
                    </Badge>
                  ) : null;
                })}
                
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                )}
              </div>
            )}
            
            {/* Sort and result count */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">Showing 10 results</p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze data, gain insights, and make better business decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't take our word for it - hear from some of our satisfied customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center font-medium text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-lg border ${plan.featured ? 'border-primary shadow-lg' : 'border-border'} bg-card p-6 text-card-foreground flex flex-col`}
              >
                <div className="mb-4">
                  {plan.featured && <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-2">Most Popular</span>}
                  <h3 className="font-medium text-xl">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`mt-auto w-full ${plan.featured ? '' : 'variant-outline'}`}
                  variant={plan.featured ? 'default' : 'outline'}
                >
                  Choose Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 space-y-4">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions? We're here to help you get started.
              </p>
            </div>
            <div className="space-y-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" placeholder="your.email@example.com" type="email" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="md:w-1/3">
              <div className="flex items-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard">
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span className="font-bold">ProductX</span>
              </div>
              <p className="text-muted-foreground">
                Transforming businesses with powerful analytics solutions since 2025.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
            <p>© 2025 ProductX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sample data for the page
const features = [
  {
    title: "Real-time Analytics",
    description: "Get instant insights with our real-time data processing and analytics dashboard.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart text-primary">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: "Customizable Dashboards",
    description: "Build and customize dashboards tailored to your specific business needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard text-primary">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    title: "AI-Powered Insights",
    description: "Leverage artificial intelligence to discover patterns and predict future trends.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit text-primary">
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
        <path d="M16 8V5c0-1.1.9-2 2-2" />
        <path d="M12 13h4" />
        <path d="M12 18h6a2 2 0 0 1 2 2v1" />
        <path d="M12 8h8" />
        <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
        <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
      </svg>
    ),
  },
  {
    title: "Data Integration",
    description: "Seamlessly connect to all your data sources with our pre-built integrations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database text-primary">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    title: "Automated Reporting",
    description: "Schedule and deliver reports automatically to your team or stakeholders.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-bar-chart text-primary">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M8 18v-1" />
        <path d="M16 18v-3" />
      </svg>
    ),
  },
  {
    title: "Enterprise Security",
    description: "Rest easy with bank-level security and compliance features built-in.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check text-primary">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    quote: "ProductX transformed how we analyze customer data. We've seen a 40% increase in campaign effectiveness since implementing their solution.",
  },
  {
    name: "David Chen",
    role: "Operations Manager",
    quote: "The insights we've gained have streamlined our operations and cut costs by 25%. Their platform is incredibly intuitive to use.",
  },
  {
    name: "Emma Rodriguez",
    role: "E-commerce Owner",
    quote: "As a small business owner, I needed affordable analytics that didn't sacrifice quality. ProductX delivers exactly what I need to grow my business.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "19",
    description: "Perfect for individuals and small teams just getting started.",
    features: [
      "Up to 5 users",
      "Basic analytics dashboard",
      "24-hour data history",
      "Standard support",
      "5 integrations",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "Everything you need for a growing business.",
    features: [
      "Up to 20 users",
      "Advanced analytics dashboard",
      "30-day data history",
      "Priority support",
      "25 integrations",
      "Custom reporting",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "99",
    description: "Advanced features for large organizations.",
    features: [
      "Unlimited users",
      "Full analytics suite",
      "Unlimited data history",
      "24/7 dedicated support",
      "Unlimited integrations",
      "Custom development",
      "On-premises option",
    ],
    featured: false,
  },
];