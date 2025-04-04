import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

export function DashboardLayout({
  children,
  sidebar,
  header,
}: DashboardLayoutProps) {
  return (
        <main className="flex-1 overflow-auto p-4">
          <div className="grid gap-4 md:gap-6">
            {children}
          </div>
        </main>
  );
}