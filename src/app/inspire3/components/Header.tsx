"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  X,
  BarChart2,
  Briefcase,
  Layers,
  Users,
  Monitor,
} from "lucide-react";

const navigation = [
  {
    name: "Features",
    href: "#features",
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    name: "Workflow",
    href: "#workflow",
    icon: <Layers className="h-5 w-5" />,
  },
  {
    name: "Showcase",
    href: "#showcase",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    name: "Testimonials",
    href: "#testimonials",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "UI Mockups",
    href: "/ui-mockups",
    icon: <Monitor className="h-5 w-5" />,
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 font-bold tracking-tight text-foreground"
          >
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5 0.875C3.83152 0.875 0.875 3.83152 0.875 7.5C0.875 11.1685 3.83152 14.125 7.5 14.125C11.1685 14.125 14.125 11.1685 14.125 7.5C14.125 3.83152 11.1685 0.875 7.5 0.875ZM7.5 1.825C10.6498 1.825 13.175 4.35025 13.175 7.5C13.175 10.6498 10.6498 13.175 7.5 13.175C4.35025 13.175 1.825 10.6498 1.825 7.5C1.825 4.35025 4.35025 1.825 7.5 1.825ZM7.5 4.25C7.5 4.25 6.5 5.5 5 5.5C3.5 5.5 3 4.25 3 4.25C3 4.25 3.75 9 7.5 9C11.25 9 12 4.25 12 4.25C12 4.25 11.5 5.5 10 5.5C8.5 5.5 7.5 4.25 7.5 4.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="fill-primary-foreground"
                ></path>
              </svg>
            </motion.div>
            <span>FusionUI</span>
          </Link>

          <div className="hidden md:flex md:gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:items-center md:gap-2">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up free</Button>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="flex flex-col space-y-6 pt-6">
                <Link
                  href="#"
                  onClick={() => setIsOpen(false)}
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
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" className="justify-start">
                      Log in
                    </Button>
                    <Button className="justify-start">Sign up free</Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
