import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function BlogLayout({ children, sidebar }: BlogLayoutProps) {
  return (
    <div className="container max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main content area */}
        <main className="lg:col-span-9">
          {children}
        </main>
        
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-8 space-y-6">
            {sidebar || (
              <>
                {/* Recent Posts */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="space-y-1">
                            <h4 className="text-sm font-medium hover:underline cursor-pointer">
                              Sample Blog Post {i + 1}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </p>
                            {i < 4 && <Separator className="my-2" />}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {["Technology", "Design", "Business", "Tutorial", "News"].map(
                        (category, i) => (
                          <li
                            key={i}
                            className="text-sm hover:text-primary transition-colors cursor-pointer"
                          >
                            {category}
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "JavaScript",
                        "UI/UX",
                        "Tailwind",
                        "Next.js",
                        "CSS",
                        "TypeScript",
                      ].map((tag, i) => (
                        <span
                          key={i}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}


