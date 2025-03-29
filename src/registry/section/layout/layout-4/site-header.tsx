"use client";
import React from "react";
import { Button } from "@/registry/components/button";
import { Bell, Search, Menu } from "lucide-react";
import { useSidebar } from "@/registry/components/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { LogOut, User, Settings } from "lucide-react";
import { toast } from "sonner";

const ProfileDropdown = ({
  user = {
    user_metadata: {
      avatar_url: "",
      name: "Fatah Jane",
      user_initials: "FJ",
      user_email: "fatahjane@gmail.com",
    },
  },
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.user_metadata?.avatar_url} alt="User" />
          <AvatarFallback>{user?.user_metadata?.user_initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.user_metadata?.user_email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.user_metadata?.name || "Adaptive Genius User"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const { toggleSidebar, isMobile, state } = useSidebar();

  return (
    <header className="border-b py-3 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Sidebar toggle button - always visible */}
          <Button
            // variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for topics, courses, or questions..."
              className="w-full rounded-full border py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px]">
              3
            </span>
          </Button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
