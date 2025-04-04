"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon, SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { VisuallyHidden } from "react-aria"

// Placeholder navigation items
const navItems = [
  { href: "/link1", title: "Link 1" },
  { href: "/link2", title: "Link 2" },
  { href: "/link3", title: "Link 3" },
]

export function MainHeader() {
  const isMobile = useIsMobile()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Toggle search dialog
  const toggleSearch = () => setIsSearchOpen((prev) => !prev)

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  // Add keyboard shortcut for search (Cmd+K or Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSearch()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background shadow-sm backdrop-blur">
      <div className="container mx-auto flex p-3 items-center">
        {/* Top Level Content */}
        <div className="flex flex-1 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">jawir</span>
          </Link>
          {/* Right side actions */}
          <div className="flex items-center justify-end space-x-2 md:flex-1">
            {/* Search Button */}
            <Button
              variant="ghost"
              size={isMobile ? "icon" : "default"}
              onClick={toggleSearch}
              className="text-muted-foreground border"
            >
              <SearchIcon className="size-4" />
              <span className="hidden md:inline ml-2">Search...</span>
              <kbd className="pointer-events-none ml-4 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Login/Console Button */}
            <Button asChild variant="secondary">
              <Link href="/login">Console</Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle Menu"
                >
                  <MenuIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <VisuallyHidden>
                    <SheetTitle>Menu</SheetTitle>
                </VisuallyHidden>
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                    <span className="font-bold">jawir</span>
                  </Link>
                </div>
                <div className="flex flex-col p-4 space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground"
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <nav className="hidden border-t border-border md:flex md:flex-1 md:items-center md:justify-start md:gap-4 md:p-2">
        <div className="container mx-auto">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            </div>
          </nav>
      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => console.log("Selected Profile")}>
              Profile
            </CommandItem>
            <CommandItem onSelect={() => console.log("Selected Billing")}>
              Billing
            </CommandItem>
            <CommandItem onSelect={() => console.log("Selected Settings")}>
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  )
}
