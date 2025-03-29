"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/registry/components/sidebar";
import AppSidebar from "./app-sidebar";
import Header from "./site-header";

interface Layout4Props {
  children: React.ReactNode;
}

const Layout4: React.FC<Layout4Props> = ({ children }) => {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const getSavedSidebarState = () => {
    try {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sidebar:state="));

      if (cookieValue) {
        const state = cookieValue.split("=")[1];
        return state === "true";
      }
    } catch (error) {
      console.error("Error getting saved sidebar state:", error);
    }
    return window.innerWidth >= 768;
  };
  return (
    <SidebarProvider defaultOpen={getSavedSidebarState()}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout4;
