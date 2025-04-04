import React from 'react';
import RedditHeader from './header'; // Import the header
import RedditSidebar from './sidebar'; // Import the sidebar

interface RedditLayoutProps {
  children: React.ReactNode;
  sidebarContent?: React.ReactNode; // Add optional sidebar content prop
}

export default function RedditLayout({ children, sidebarContent }: RedditLayoutProps) { // Destructure the new prop
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-card p-4">
        <RedditHeader /> {/* Use the header component */}
      </header>

      <div className="container mx-auto flex max-w-7xl gap-6 p-6">
        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Sidebar */}
        <aside className="hidden w-72 flex-shrink-0 md:block">
          <div className="sticky top-[calc(theme(spacing.4)_+_65px)]"> {/* Adjust sticky positioning if needed */}
            {/* Render specific sidebar content if provided, otherwise default */}
            {sidebarContent ? sidebarContent : <RedditSidebar />}
          </div>
        </aside>
      </div>
    </div>
  );
}
