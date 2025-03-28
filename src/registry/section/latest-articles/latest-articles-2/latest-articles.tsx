import { MoveRight } from "lucide-react";
import { Button } from "@/registry/components/button/select";
import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { formatDate } from "@/lib/utils";

interface Author {
  name: string;
  avatar: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: Date;
  author: Author;
  readTime: string;
  slug: string;
}

interface LatestArticlesProps {
  title?: string;
  description?: string;
  viewAllLink?: string;
  articles?: Article[];
  layout?: "grid" | "featured";
  maxArticles?: number;
}

const defaultArticles: Article[] = [
  {
    id: "1",
    title: "How to Optimize Your Website for Better Performance",
    description:
      "Learn essential techniques to improve your website's loading speed and overall performance for better user experience and SEO rankings.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Performance",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    readTime: "5 min read",
    slug: "optimize-website-performance",
  },
  {
    id: "2",
    title: "Building Responsive UIs with Modern CSS Techniques",
    description:
      "Discover how to create beautiful, responsive user interfaces using the latest CSS features like Grid, Flexbox, and Container Queries.",
    imageUrl:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2670&auto=format&fit=crop",
    category: "CSS",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    author: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    readTime: "8 min read",
    slug: "responsive-ui-css-techniques",
  },
  {
    id: "3",
    title: "Introduction to React Server Components",
    description:
      "Explore the revolutionary approach to building React applications with Server Components and how they can improve your app's performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2670&auto=format&fit=crop",
    category: "React",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    author: {
      name: "Emily Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    readTime: "10 min read",
    slug: "react-server-components-intro",
  },
  {
    id: "4",
    title: "Mastering TypeScript: Advanced Types and Patterns",
    description:
      "Take your TypeScript skills to the next level by learning advanced type manipulation, utility types, and design patterns for large-scale applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    category: "TypeScript",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    author: {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    readTime: "12 min read",
    slug: "advanced-typescript-patterns",
  },
  {
    id: "5",
    title: "Building Accessible Web Applications",
    description:
      "Learn how to create web applications that are accessible to everyone by implementing ARIA attributes, semantic HTML, and keyboard navigation.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Accessibility",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    author: {
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    readTime: "8 min read",
    slug: "building-accessible-web-apps",
  },
];

export default function LatestArticles({
  title = "Latest Articles",
  description = "Stay up to date with the latest industry insights and development techniques.",
  viewAllLink = "#",
  articles = defaultArticles,
  layout = "grid",
  maxArticles = 5,
}: LatestArticlesProps) {
  const displayArticles = articles.slice(0, maxArticles);

  return (
    <section className="bg-background py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
          <Link
            href={viewAllLink}
            className="group inline-flex items-center text-primary hover:text-primary/90 mt-4 md:mt-0"
          >
            View all articles
            <MoveRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div
          className={`grid gap-8 ${
            layout === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "lg:grid-cols-2"
          }`}
        >
          {displayArticles.map((article, index) => (
            <article
              key={article.id}
              className={`group relative flex flex-col space-y-4 ${
                layout === "featured" && index === 0
                  ? "lg:col-span-2 lg:flex-row lg:space-x-8 lg:space-y-0"
                  : ""
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-lg ${
                  layout === "featured" && index === 0
                    ? "lg:flex-1 aspect-[16/9]"
                    : "aspect-[16/9]"
                }`}
              >
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className={`flex-1 space-y-4`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="inline-block">
                      <Badge variant="secondary">{article.category}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h3
                      className={`font-bold tracking-tight hover:text-primary/90 ${
                        layout === "featured" && index === 0
                          ? "text-2xl md:text-3xl"
                          : "text-xl"
                      }`}
                    >
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={article.author.avatar}
                      alt={article.author.name}
                    />
                    <AvatarFallback>
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{article.author.name}</p>
                    <p className="text-muted-foreground">{article.readTime}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
