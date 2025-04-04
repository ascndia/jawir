import React from "react";
import { BlogLayout } from "@/registry/section/layout-content/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LayoutShadcn1 from "@/registry/section/layout/layout-shadcn-1/layout";

// Sample blog data
const featuredPosts = [
  {
    id: 1,
    title: "Getting Started with Tailwind CSS in 2023",
    excerpt: "Learn how to set up and optimize Tailwind CSS for your next project with these practical tips and tricks.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    date: "Jun 12, 2023",
    category: "Tutorial",
    readTime: "8 min read",
    author: "Sarah Johnson",
    authorImage: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    title: "Building Modern UIs with Shadcn Components",
    excerpt: "Explore how to create beautiful, accessible interfaces using the powerful Shadcn component library.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    date: "May 28, 2023",
    category: "Design",
    readTime: "6 min read",
    author: "Michael Chen",
    authorImage: "https://i.pravatar.cc/40?img=2",
  },
];

const recentPosts = [
  {
    id: 3,
    title: "The Future of React Server Components",
    excerpt: "An in-depth look at how React Server Components are changing the way we build web applications.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    date: "Jun 5, 2023",
    category: "Technology",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Mastering TypeScript for Better Code Quality",
    excerpt: "Discover how TypeScript can help you write more maintainable and error-free code.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    date: "May 22, 2023",
    category: "Tutorial",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Optimizing Performance in Next.js Applications",
    excerpt: "Learn practical strategies to improve the speed and performance of your Next.js applications.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2023",
    category: "Performance",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Creating Accessible Web Forms with React",
    excerpt: "Best practices for building inclusive and user-friendly forms in your React applications.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
    date: "May 8, 2023",
    category: "Accessibility",
    readTime: "6 min read",
  },
];

const sidebar = (
  <div className="space-y-6">
    {/* Recent Posts */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Posts</h3>
      <div className="space-y-3">
        {recentPosts.slice(0, 3).map((post) => (
          <div key={post.id} className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={post.image}
                alt={post.title} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-sm line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Categories */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Categories</h3>
      <div className="space-y-2">
        {["Tutorial", "Design", "Technology", "Performance", "Accessibility", "Frontend", "Backend"].map((category, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm group-hover:text-primary transition-colors">{category}</span>
            <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
              {[8, 5, 12, 4, 6, 9, 3][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Tags */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Popular Tags</h3>
      <div className="flex flex-wrap gap-2">
        {["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript", "UI/UX", "Accessibility", 
          "Performance", "CSS", "API", "Node.js", "Figma"].map((tag, i) => (
          <Badge key={i} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
    
    {/* Social Links */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Follow Us</h3>
      <div className="flex gap-3">
        {[
          { name: "Twitter", icon: "𝕏" },
          { name: "GitHub", icon: "📂" },
          { name: "LinkedIn", icon: "💼" },
          { name: "Instagram", icon: "📷" },
        ].map((social, i) => (
          <div 
            key={i} 
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            title={social.name}
          >
            {social.icon}
          </div>
        ))}
      </div>
    </div>
    
    {/* Featured Ad/Promo */}
    <div className="border rounded-lg p-4 bg-muted/50">
      <h3 className="text-sm font-medium mb-2">Featured Resource</h3>
      <p className="text-xs text-muted-foreground mb-3">Unlock the secrets to modern web development with our comprehensive guide.</p>
      <Button variant="default" size="sm" className="w-full">Download Free</Button>
    </div>
  </div>
);

export default function BlogHomePage() {
  return (
    <LayoutShadcn1>

    <BlogLayout sidebar={sidebar}>
      <div className="space-y-8">
        {/* Hero Section with Featured Posts */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight mb-6">Featured Articles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48 md:h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold leading-tight hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-3">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{post.author}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Latest Articles Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Latest Articles</h2>
            <Tabs defaultValue="all" className="w-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="technology">Tech</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover aspect-video md:aspect-square"
                    />
                  </div>
                  <div className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Badge variant="outline" className="rounded-sm px-1 py-0">
                          {post.category}
                        </Badge>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-3">
                      <Button size="sm" variant="outline">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline" className="gap-2">
              <span>Load More</span>
              <span>↓</span>
            </Button>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
                  <p className="text-primary-foreground/80">
                    Get the latest posts delivered right to your inbox
                  </p>
                </div>
                <div className="flex w-full md:w-auto gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-3 py-2 rounded-md bg-background text-foreground w-full md:w-auto min-w-[200px]"
                  />
                  <Button variant="secondary">Subscribe</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </BlogLayout>
  </LayoutShadcn1>
  );
}