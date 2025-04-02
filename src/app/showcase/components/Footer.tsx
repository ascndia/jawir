"use client";

import Link from "next/link";
import { Twitter, Github, Heart } from "lucide-react";

const navigation = {
  main: [
    { name: "Home", href: "/showcase" },
    { name: "Components", href: "#components" },
    { name: "Examples", href: "#examples" },
    { name: "GitHub", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: Github,
    },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/10">
      <div className="container mx-auto px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
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
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex justify-center gap-x-6 md:justify-start">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-muted-foreground md:text-left">
            <span>Made with </span>
            <Heart className="inline-block h-3 w-3 text-red-500" />
            <span> using shadcn/ui, Tailwind CSS, and Framer Motion</span>
          </p>
          <p className="mt-2 text-center text-xs leading-5 text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UI Showcase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
