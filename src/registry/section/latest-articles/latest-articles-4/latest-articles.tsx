import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: Date;
  author: string;
  slug: string;
  featured?: boolean;
}

interface LatestArticlesBentoProps {
  title?: string;
  description?: string;
  viewAllLink?: string;
  articles?: Article[];
  className?: string;
}

const defaultArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt:
      "Explore emerging trends and technologies shaping the future of web development.",
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    category: "Development",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    author: "Alex Chen",
    slug: "future-web-development-2024",
    featured: true,
  },
  {
    id: "2",
    title: "Designing for Accessibility: Best Practices",
    excerpt:
      "Learn how to create inclusive digital experiences that work for everyone.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Design",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    author: "Maya Johnson",
    slug: "designing-for-accessibility",
  },
  {
    id: "3",
    title: "Introduction to TypeScript for React Developers",
    excerpt:
      "A beginner-friendly guide to using TypeScript with React applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
    category: "TypeScript",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    author: "David Wilson",
    slug: "typescript-for-react-developers",
  },
  {
    id: "4",
    title: "Building Performant Animations with Framer Motion",
    excerpt:
      "Tips and techniques for creating smooth, efficient animations in React.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    category: "Animation",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    author: "Sarah Parker",
    slug: "performant-animations-framer-motion",
  },
  {
    id: "5",
    title: "The Complete Guide to CSS Grid Layouts",
    excerpt: "Master CSS Grid to create complex, responsive layouts with ease.",
    imageUrl:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2670&auto=format&fit=crop",
    category: "CSS",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    author: "Michael Brown",
    slug: "complete-guide-css-grid",
  },
];

export default function LatestArticles4({
  title = "Latest Articles",
  description = "Discover our most recent insights and guides",
  viewAllLink = "/blog",
  articles = defaultArticles,
  className,
}: LatestArticlesBentoProps) {
  // Separate featured article from the rest
  const featuredArticle =
    articles.find((article) => article.featured) || articles[0];
  const regularArticles = articles
    .filter((article) => article.id !== featuredArticle.id)
    .slice(0, 4);

  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground max-w-2xl">{description}</p>
          </div>
          <Link
            href={viewAllLink}
            className="group mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary"
          >
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Article - Takes up 2 columns */}
          <div className="md:col-span-2 group">
            <Link href={`/blog/${featuredArticle.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl mb-4">
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="font-medium">
                    {featuredArticle.category}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <time dateTime={featuredArticle.date.toISOString()}>
                    {formatDate(featuredArticle.date)}
                  </time>
                  <span className="mx-2">•</span>
                  <span>By {featuredArticle.author}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {featuredArticle.title}
                </h3>
                <p className="text-muted-foreground line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* Regular Articles */}
          {regularArticles.map((article) => (
            <div key={article.id} className="group">
              <Link href={`/blog/${article.slug}`} className="block h-full">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg mb-3">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Badge variant="outline" className="mr-2 text-xs">
                    {article.category}
                  </Badge>
                  <time dateTime={article.date.toISOString()}>
                    {formatDate(article.date)}
                  </time>
                </div>
                <h3 className="text-lg font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline">
            {/* <Link href={viewAllLink}> */}
            Browse all articles
            <ArrowRight className="ml-2 h-4 w-4" />
            {/* </Link> */}
          </Button>
        </div>
      </div>
    </section>
  );
}
