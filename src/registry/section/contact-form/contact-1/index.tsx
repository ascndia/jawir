"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, ArrowRight, Tag } from 'lucide-react';
import { SelectTrigger, SelectValue, Select, SelectItem, SelectContent } from '@/components/ui/select';

export const Contact1A = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container p-4 lg:p-0 mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl">Ready to Grow Your YouTube Channel?</h2>
          <p className="text-muted-foreground text-lg font-medium mt-4 max-w-2xl mx-auto">
            Get in touch with our team of YouTube marketing experts and start your journey to YouTube success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          <div className="bg-card border p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" className="w-full" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full" required />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="channelUrl" className="block text-sm font-medium text-primary mb-1">
                  YouTube Channel URL (optional)
                </label>
                <Input id="channelUrl" placeholder="https://youtube.com/c/yourchannel" className="w-full" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-primary mb-1">
                  Service You're Interested In
                </label>
                <Select required>
                  <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube-seo">YouTube SEO</SelectItem>
                    <SelectItem value="video-production">Video Production</SelectItem>
                    <SelectItem value="channel-growth">Channel Growth</SelectItem>
                    <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                    <SelectItem value="thumbnails">Thumbnail Design</SelectItem>
                    <SelectItem value="youtube-ads">YouTube Ads</SelectItem>
                    <SelectItem value="content-strategy">Content Strategy</SelectItem>
                    <SelectItem value="community">Community Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                  Your Message
                </label>
                <Textarea id="message" placeholder="Tell us about your goals and challenges..." className="w-full min-h-[120px]" required />
              </div>
              
              <Button type="submit" className="btn-primary w-full">Send Message</Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className=" mb-8">
                Have questions about our YouTube marketing services? Reach out to us directly and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <a href="mailto:info@ytboost.pro" className=" hover:text-primary transition">
                      info@ytboost.pro
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <a href="tel:+1234567890" className=" hover:text-primary transition">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Visit Us</h4>
                    <p className="">123 YouTube Street, San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-secondary rounded-lg text-white">
              <h4 className="text-xl font-bold mb-3">Free Channel Audit</h4>
              <p className="mb-4">Get a free audit of your YouTube channel and discover opportunities for growth.</p>
              <Button className="bg-primary hover:bg-primary-dark text-white inline-flex items-center w-full justify-center">
                <span>Get Free Audit</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// "use client";
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Mail, Phone, MapPin, ArrowRight, Tag } from 'lucide-react';
// import { SelectTrigger, SelectValue, Select, SelectItem, SelectContent } from '@/components/ui/select';

export const Contact1B = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form variation submitted');
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container p-4 lg:p-0 mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl">Grow Your Digital Presence</h2>
          <p className="text-muted-foreground text-lg font-medium mt-4 max-w-2xl mx-auto">
            Connect with our team for expert advice on boosting your online impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          <div className="bg-card border p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Drop Us a Line</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" className="w-full" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" className="w-full" required />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1">
                  Subject
                </label>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 text-primary mr-2" />
                  <Input id="subject" placeholder="Brief subject" className="w-full" required />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="channelUrl" className="block text-sm font-medium text-primary mb-1">
                  YouTube Channel URL (optional)
                </label>
                <Input id="channelUrl" placeholder="https://youtube.com/c/yourchannel" className="w-full" />
              </div>
              
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-primary mb-1">
                  Service You're Interested In
                </label>
                <Select required>
                  <SelectTrigger className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube-seo">YouTube SEO</SelectItem>
                    <SelectItem value="video-production">Video Production</SelectItem>
                    <SelectItem value="channel-growth">Channel Growth</SelectItem>
                    <SelectItem value="analytics">Analytics & Reporting</SelectItem>
                    <SelectItem value="thumbnails">Thumbnail Design</SelectItem>
                    <SelectItem value="youtube-ads">YouTube Ads</SelectItem>
                    <SelectItem value="content-strategy">Content Strategy</SelectItem>
                    <SelectItem value="community">Community Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="Share your ideas and goals..." className="w-full min-h-[120px]" required />
              </div>
              
              <Button type="submit" className="btn-primary w-full">Send Message</Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Reach Out Directly</h3>
              <p className="mb-8">
                Have questions about our services? We’re here to provide answers and guide you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Us</h4>
                    <a href="mailto:info@ytboost.pro" className="hover:text-primary transition">
                      info@ytboost.pro
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Call Us</h4>
                    <a href="tel:+1234567890" className="hover:text-primary transition">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-muted rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Visit Us</h4>
                    <p>123 Digital Avenue, San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-secondary rounded-lg text-white">
              <h4 className="text-xl font-bold mb-3">Complimentary Audit</h4>
              <p className="mb-4">Receive a free audit of your YouTube channel to uncover growth opportunities.</p>
              <Button className="bg-primary hover:bg-primary-dark text-white inline-flex items-center w-full justify-center">
                <span>Get Your Audit</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const Contact1C = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Unique contact form submitted');
  };

  return (
    <section id="contact-unique" className="py-20">
      <div className="container mx-auto p-4 lg:p-0">
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-5xl">Let's Connect Today!</h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto">
            We’re excited to learn more about your project. Fill out the form below, and a member of our team will be in touch shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="p-8 border rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input id="name" placeholder="Enter your full name" className="w-full" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="you@example.com" className="w-full" required />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company (optional)
                </label>
                <Input id="company" placeholder="Your company name" className="w-full" />
              </div>

              <div className="mb-4">
                <label htmlFor="inquiry" className="block text-sm font-medium mb-1">
                  Inquiry Type
                </label>
                <Select required>
                  <SelectTrigger className="w-full rounded-md border px-3 py-2">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea id="message" placeholder="How can we help you?" className="w-full min-h-[120px]" required />
              </div>

              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-3xl font-bold mb-6 ">Get In Touch</h3>
              <p className=" mb-8">
                Prefer to speak directly? Reach out via email, phone, or visit our office.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="h-6 w-6  mr-3" />
                  <a href="mailto:contact@yourcompany.com" className="transition">
                    contact@yourcompany.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6  mr-3" />
                  <a href="tel:+19876543210" className="transition">
                    +1 (987) 654-3210
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6  mr-3" />
                  <p className="">456 Innovation Drive, Tech City</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <Button className="inline-flex items-center w-full justify-center">
                <span>Schedule a Free Consultation</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export const Contact1D = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Simple contact form submitted");
  };

  return (
    <section id="contact-simple" className="py-16 bg-background">
      <div className="container mx-auto p-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="mt-2 text-muted-foreground">We'd love to hear from you</p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
              Name
            </label>
            <Input id="name" placeholder="Your name" className="w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
              Email
            </label>
            <Input id="email" type="email" placeholder="you@example.com" className="w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
              Message
            </label>
            <Textarea id="message" placeholder="Your message" className="w-full min-h-[120px]" required />
          </div>
          <Button type="submit" className="w-full">Send</Button>
        </form>
      </div>
    </section>
  );
};