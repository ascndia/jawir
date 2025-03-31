"use client";
import Link from "next/link"; // Or your router's Link component
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import * as React from "react"; // Import React

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
import { VisuallyHidden } from "@/registry/components/visually-hidden/visually-hidden-1/visually-hidden";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";

// Define the navigation links structure
const navLinks = [
  { href: "#", icon: Home, label: "Dashboard", badge: null },
  { href: "#", icon: ShoppingCart, label: "Orders", badge: 6 },
  { href: "#", icon: Package, label: "Products", badge: null },
  { href: "#", icon: Users, label: "Customers", badge: null },
  { href: "#", icon: LineChart, label: "Analytics", badge: null },
];

interface LayoutProps {
  children: React.ReactNode;
  // Add other props like active route if needed
  // activeRoute?: string;
}

export default function Layout1({
  children /*, activeRoute = '#' */,
}: LayoutProps) {
  // In a real app, you'd get the activeRoute from your router (e.g., usePathname in Next.js)
  const activeRoute = "#"; // Placeholder

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Your App</span>
            </Link>

            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-3 items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label + "-desktop"}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    link.href === activeRoute
                      ? "bg-muted" // Active link style
                      : "" // Inactive link style
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {link.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {/* Optional Icon: <Rocket className="h-4 w-4" /> */}
              Upgrade Account
            </Link>
          </div>
          <div className="px-4">
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>
                  Contact our support team or visit the help center.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="px-4 pb-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader>
                <CardTitle>Upgrade Plan</CardTitle>
                <CardDescription>
                  Unlock more features and enhance your experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
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
            <VisuallyHidden>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
            </VisuallyHidden>

            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="mb-4 flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span>Your App</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label + "-mobile"}
                    href={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all hover:text-foreground ${
                      link.href === activeRoute
                        ? "bg-muted text-foreground" // Mobile active style
                        : "text-muted-foreground" // Mobile inactive style
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
              <div className="mt-auto p-4 border-t">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {/* Optional Icon: <Rocket className="h-4 w-4" /> */}
                  Upgrade Account
                </Link>
              </div>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                    <CardDescription>
                      Contact our support team or visit the help center.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade Plan</CardTitle>
                    <CardDescription>
                      Unlock more features and enhance your experience.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>

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
          {/* <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* Use Avatar instead of Button with Icon */}
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  {/* Add user image source if available */}
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>
                    {/* Placeholder Initials */}
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* Display User Info */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Group related items */}
              <DropdownMenuItem>
                {/* Add Icon (optional) */}
                {/* <User className="mr-2 h-4 w-4" /> */}
                <span>Profile</span>
                {/* Optional: <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* <CreditCard className="mr-2 h-4 w-4" /> */}
                <span>Billing</span>
                {/* Optional: <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {/* <Settings className="mr-2 h-4 w-4" /> */}
                <span>Settings</span>
                {/* Optional: <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Theme Toggle within the dropdown */}
              <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <span>Theme</span>
                <span className="ml-auto">
                  <ModeToggle />
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {/* <LifeBuoy className="mr-2 h-4 w-4" /> */}
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                {/* <Cloud className="mr-2 h-4 w-4" /> */}
                <span>API</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              // Add onClick handler for logout functionality
              // onClick={() => console.log("Logout clicked")}
              >
                {/* <LogOut className="mr-2 h-4 w-4" /> */}
                <span>Log out</span>
                {/* Optional: <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
