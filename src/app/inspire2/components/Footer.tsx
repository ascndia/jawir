"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Integrations", href: "#integrations" },
      { name: "Pricing", href: "#pricing" },
      { name: "Changelog", href: "#" },
      { name: "Roadmap", href: "#" },
      { name: "Mobile App", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Guides", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "Webinars", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Customers", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Security", href: "#" },
      { name: "Legal", href: "#" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "GitHub", href: "#", icon: Github },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  FS
                </span>
              </div>
              <span className="text-xl font-bold">FlowSpace</span>
            </div>
            <p className="text-muted-foreground">
              The all-in-one productivity platform that helps teams collaborate,
              organize, and execute projects with efficiency.
            </p>

            <div className="mt-2 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  123 Productivity Avenue, San Francisco, CA 94107
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  hello@flowspace.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </span>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={`Visit FlowSpace on ${social.name}`}
                    className="rounded-full border border-muted p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t pt-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Stay up to date</h4>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter to get the latest updates and news
                about FlowSpace.
              </p>
              <div className="flex max-w-md flex-col gap-2 sm:flex-row">
                <Input
                  placeholder="Enter your email"
                  className="bg-background"
                  type="email"
                />
                <Button>Subscribe</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:items-end sm:justify-between sm:text-right">
              <div className="flex flex-wrap gap-4 sm:justify-end">
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </a>
                <a
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Data Processing
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} FlowSpace, Inc. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
