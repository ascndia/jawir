"use client";

import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const navigation = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Workflow", href: "#workflow" },
    { name: "Showcase", href: "#showcase" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "Support", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Licenses", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2">
            <Link
              href="#"
              className="flex items-center gap-2 font-bold tracking-tight text-foreground"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M7.5 0.875C3.83152 0.875 0.875 3.83152 0.875 7.5C0.875 11.1685 3.83152 14.125 7.5 14.125C11.1685 14.125 14.125 11.1685 14.125 7.5C14.125 3.83152 11.1685 0.875 7.5 0.875ZM7.5 1.825C10.6498 1.825 13.175 4.35025 13.175 7.5C13.175 10.6498 10.6498 13.175 7.5 13.175C4.35025 13.175 1.825 10.6498 1.825 7.5C1.825 4.35025 4.35025 1.825 7.5 1.825ZM7.5 4.25C7.5 4.25 6.5 5.5 5 5.5C3.5 5.5 3 4.25 3 4.25C3 4.25 3.75 9 7.5 9C11.25 9 12 4.25 12 4.25C12 4.25 11.5 5.5 10 5.5C8.5 5.5 7.5 4.25 7.5 4.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    className="fill-primary-foreground"
                  ></path>
                </svg>
              </div>
              <span>FusionUI</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Beautiful, accessible UI components for modern web applications.
              Design and build with our free and open-source toolkit.
            </p>
            <div className="mt-5 flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Product</h3>
            <ul className="mt-4 space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FusionUI, Inc. All rights
              reserved.
            </p>
            <ul className="flex space-x-6">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
