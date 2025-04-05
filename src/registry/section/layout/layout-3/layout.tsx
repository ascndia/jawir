"use client";

import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PanelRightOpen, // Icon to toggle right sidebar
  Search,
  ShoppingCart,
  Users,
  X, // Icon to close right sidebar (optional)
} from "lucide-react";
import * as React from "react"; // Import React and useState

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
import { ScrollArea } from "@/registry/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/components/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle"; // Adjust path if needed
import { VisuallyHidden } from "@/registry/components/visually-hidden/visually-hidden-1/visually-hidden";

// Define the navigation links structure (same as layout-1)
const navLinks = [
  { href: "#", icon: Home, label: "Dashboard", badge: null },
  { href: "#", icon: ShoppingCart, label: "Orders", badge: 6 },
  { href: "#", icon: Package, label: "Products", badge: null },
  { href: "#", icon: Users, label: "Customers", badge: null },
  { href: "#", icon: LineChart, label: "Analytics", badge: null },
];

interface LayoutProps {
  children: React.ReactNode;
  //   rightSidebarContent?: React.ReactNode; // Optional prop for right sidebar content
  defaultRightSidebarOpen?: boolean; // Optional prop to set initial state
  // activeRoute?: string;
}

export default function Layout3({
  children,
  //   rightSidebarContent, // Content for the right sidebar
  defaultRightSidebarOpen = true, // Default to closed
}: /*, activeRoute = '#' */
LayoutProps) {
  const activeRoute = "#"; // Placeholder
  // State to control the visibility of the right sidebar
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(
    defaultRightSidebarOpen
  );

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

          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label + "-desktop"}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground ${
                    link.href === activeRoute ? "bg-muted " : ""
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
          </ScrollArea>

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
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>

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
              <ScrollArea className="flex-1 py-2">
                <nav className="grid gap-2 px-4 text-lg font-medium">
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
              </ScrollArea>
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
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="ml-2" // Add some margin
            >
              <PanelRightOpen className="h-5 w-5" />
              <span className="sr-only">Toggle secondary sidebar</span>
            </Button>
          }
        </header>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background">
            {children}
          </main>
          {isRightSidebarOpen && (
            <aside className="w-72 border-l bg-muted/40 lg:block hidden overflow-y-auto">
              <div className="flex items-center justify-between border-b p-4 h-14 lg:h-[60px]">
                <h3 className="font-semibold">Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRightSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>
              {/* <div className="p-4">{}</div> */}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}

const meta = {
  id: "layout-3",
  name: "Layout 3",
  title: "Layout 3",
  slug: "layout-3",
  component: Layout3,
  demo: null,
};
export { meta };