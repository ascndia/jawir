"use client";
import React from "react";
import Link from "next/link"; // Import Link from next/link
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/registry/components/sidebar";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Brain,
  Calendar,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    icon: BookOpen,
    path: "/",
  },
  {
    title: "AI Assistant",
    icon: MessageSquare,
    path: "/assistant",
  },
  {
    title: "Super Search",
    icon: Search,
    path: "/super-search",
  },
  {
    title: "Study Materials",
    icon: FileText,
    path: "/materials",
  },
  {
    title: "Practice Quizzes",
    icon: Brain,
    path: "/quizzes",
  },
  {
    title: "Study Plans",
    icon: Calendar,
    path: "/plans",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const AppSidebar = () => {
  const { state, isMobile } = useSidebar();
  const pathname = usePathname(); // Get the current pathname

  return (
    <Sidebar className="border-r border">
      <div
        className={`p-4 ${state === "collapsed" ? "flex justify-center" : ""}`}
      >
        {state === "expanded" ? (
          <>
            {/* Replace text-primary-700 with text-primary */}
            <h1 className="text-2xl font-bold text-foreground">GeniusLearn</h1>
            {/* Replace text-gray-500 with text-muted-foreground */}
            <p className="text-sm text-muted-foreground">AI-Powered Learning</p>
          </>
        ) : (
          // Replace text-primary-700 with text-primary
          <span className="text-2xl font-bold text-primary">GL</span>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          {state === "expanded" && (
            <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.path}
                        className={`flex items-center gap-3 py-2 px-3 rounded-md transition-colors ${
                          isActive
                            ? // Replace bg-primary-100 text-primary-700 with bg-accent text-accent-foreground (or text-primary if preferred)
                              "bg-accent text-accent-foreground"
                            : // Replace text-gray-700 hover:bg-gray-100 with text-muted-foreground hover:bg-accent hover:text-accent-foreground
                              "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                        title={state === "collapsed" ? item.title : undefined}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {state === "expanded" && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="p-4 mt-auto hidden md:block">
        {/* Replace bg-gray-100 text-gray-700 hover:bg-gray-200 with bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground */}
        <SidebarTrigger className="w-full flex items-center justify-center p-2 rounded-md bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground">
          {state === "expanded" ? (
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              <span>Collapse Sidebar</span>
            </>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </SidebarTrigger>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
