"use client"; // Add "use client" directive

import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Settings, // Added Settings icon
  LifeBuoy, // Added LifeBuoy icon
  LogOut, // Added LogOut icon
} from "lucide-react";
import * as React from "react";

import { Badge } from "@/registry/components/badge";
import { Button } from "@/registry/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { Input } from "@/registry/components/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/components/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip"; // Import Tooltip components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle"; // Adjust path if needed
import { VisuallyHidden } from "@/registry/components/viusally-hidden/visually-hidden-1/visually-hidden";

// Define the navigation links structure
const navLinks = [
  { href: "#", icon: Home, label: "Dashboard", badge: null },
  { href: "#", icon: ShoppingCart, label: "Orders", badge: 6 },
  { href: "#", icon: Package, label: "Products", badge: null },
  { href: "#", icon: Users, label: "Customers", badge: null },
  { href: "#", icon: LineChart, label: "Analytics", badge: null },
];

// Define bottom navigation links structure for the icon sidebar
const bottomNavLinks = [{ href: "#", icon: Settings, label: "Settings" }];

interface LayoutProps {
  children: React.ReactNode;
  // activeRoute?: string;
}

export default function Layout2({
  children /*, activeRoute = '#' */,
}: LayoutProps) {
  const activeRoute = "#"; // Placeholder

  return (
    // Wrap with TooltipProvider for tooltips to work
    <TooltipProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[56px_1fr] lg:grid-cols-[56px_1fr]">
        {/* --- Desktop Icon Sidebar --- */}
        <aside className="hidden h-full flex-col border-r bg-background md:flex">
          {/* Top Section (Logo/Icon) */}
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Your App</span>
            </Link>

            {/* Main Navigation Icons */}
            {navLinks.map((link) => (
              <Tooltip key={link.label + "-desktop"}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      link.href === activeRoute
                        ? "bg-accent text-accent-foreground" // Active style
                        : "text-muted-foreground" // Inactive style
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                    {link.badge && (
                      <Badge className="absolute -top-1 -right-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full p-0 text-[10px]">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>

          {/* Bottom Section (Settings/User) */}
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            {bottomNavLinks.map((link) => (
              <Tooltip key={link.label + "-desktop-bottom"}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${
                      link.href === activeRoute
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <div className="flex flex-col">
          {/* --- Header --- */}
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/* Mobile Sidebar Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden" // Only show on mobile
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              {/* Mobile Sheet Content (Similar to Layout 1) */}
              <SheetContent side="left" className="flex flex-col px-0">
                <VisuallyHidden>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                </VisuallyHidden>
                <div className="border-b px-6 py-3">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span>Your App</span>
                  </Link>
                </div>
                <nav className="grid gap-2 px-4 py-2 text-lg font-medium overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label + "-mobile"}
                      href={link.href}
                      className={`flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                        link.href === activeRoute
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                      {link.badge && (
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
                {/* Mobile Footer (Optional - Example: Settings Link) */}
                <div className="mt-auto border-t p-4">
                  <Link
                    href="#"
                    className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {/* Header Search (Optional) */}
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>

            {/* User Profile Dropdown (Same as Layout 1 enhancement) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <span>Theme</span>
                  <span className="ml-auto">
                    <ModeToggle />
                  </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* --- Page Content --- */}
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
