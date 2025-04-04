import { SidebarInset, SidebarProvider } from "@/registry/components/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutShadcn1({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
