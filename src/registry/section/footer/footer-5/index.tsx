"use client";
import React from 'react';
import { Youtube, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from "next/link"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export const Footer5A = () => {
    return (
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Jawir</h2>
              <p className="text-muted-foreground mt-2">
                Elevate your YouTube growth with our expert marketing solutions.
              </p>
            </div>
            <div className="flex space-x-6">
              {[Youtube, Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-primary transition">
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
  
          <div className="mt-8 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              { title: "Our Services", links: ["SEO Optimization", "Video Production", "Channel Growth", "Analytics", "Ad Campaigns"] },
              { title: "Resources", links: ["Blog", "Case Studies", "SEO Guide", "Free Tools", "Support"] },
              { title: "Company", links: ["About", "Team", "Careers", "Contact", "Terms & Policies"] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, idx) => (
                    <li key={idx}><a href="#" className="text-muted-foreground hover:text-primary transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Jawir. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  


export const Footer5B = () => {
  return (
    <footer className="bg-background text-foreground py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-4">Jawir</div>
            <p className="text-muted-foreground mb-4">
              Helping creators grow with expert YouTube marketing.
            </p>
            <div className="flex space-x-4">
              {[Youtube, Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="text-muted-foreground hover:text-primary transition">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Services", links: ["YouTube SEO", "Video Production", "Channel Growth", "Analytics & Reporting", "Thumbnail Design", "YouTube Ads"] },
            { title: "Resources", links: ["Blog", "Case Studies", "YouTube SEO Guide", "Free Tools", "FAQ"] },
            { title: "Company", links: ["About Us", "Team", "Careers", "Contact Us", "Privacy Policy", "Terms of Service"] }
          ].map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}><a href="#" className="text-muted-foreground hover:text-primary transition">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jawir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};



export function Footer5C() {
  return (
    <footer className="bg-slate-950 text-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-slate-300 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-slate-300">Subscribe to our newsletter to receive updates and news.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-slate-900 border-slate-800 text-slate-50 placeholder:text-slate-400 focus-visible:ring-slate-400"
                  required
                />
                <Button type="submit" size="icon" className="bg-slate-50 text-slate-950 hover:bg-slate-200">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
              <p className="text-xs text-slate-400">
                By subscribing, you agree to our{" "}
                <Link href="#" className="underline hover:text-slate-300">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-slate-300 hover:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-slate-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


export const Footer5D = () => {
  return (
    <footer className="bg-black py-16 text-white border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <h2 className="text-2xl font-bold mb-4">
              <span className="festival-gradient">jawir</span>
            </h2>
            <p className="text-white/70 mb-6">
              The biggest annual college arts and music festival, celebrating talent and creativity from across campus.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-festival-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-festival-pink transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-festival-blue transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About</a></li>
              <li><a href="#lineup" className="text-white/70 hover:text-white transition-colors">Lineup</a></li>
              <li><a href="#schedule" className="text-white/70 hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#tickets" className="text-white/70 hover:text-white transition-colors">Tickets</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/70">
              <li>info@jawir.edu</li>
              <li>(555) 123-4567</li>
              <li>University Main Campus</li>
              <li>Student Union Building</li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-3">Subscribe to our newsletter for updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-white w-full focus:outline-none focus:ring-1 focus:ring-festival-purple"
              />
              <button className="bg-festival-purple px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} jawir. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

