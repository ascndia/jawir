import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: Date;
  author: string;
  slug: string;
}

interface LatestArticlesProps {
  title?: string;
  description?: string;
  viewAllLink?: string;
  articles?: Article[];
  className?: string;
}

const defaultArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Web Development",
    excerpt:
      "A beginner's guide to modern web development tools and frameworks.",
    imageUrl:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2670&auto=format&fit=crop",
    category: "Development",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    author: "Jamie Wilson",
    slug: "getting-started-web-development",
  },
  {
    id: "2",
    title: "Designing User-Friendly Interfaces",
    excerpt:
      "Learn the principles of creating intuitive and accessible user interfaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2680&auto=format&fit=crop",
    category: "Design",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    author: "Alex Chen",
    slug: "designing-user-friendly-interfaces",
  },
  {
    id: "3",
    title: "Optimizing Website Performance",
    excerpt:
      "Techniques to improve loading times and overall site performance.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Performance",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    author: "Sam Taylor",
    slug: "optimizing-website-performance",
  },
];

export default function LatestArticles3({
  title = "Latest Articles",
  description = "Insights and guides from our team",
  viewAllLink = "#",
  articles = defaultArticles,
  className,
}: LatestArticlesProps) {
  return (
    <section className={cn("py-16 bg-background", className)}>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Link
            href={viewAllLink}
            className="group mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-primary"
          >
            View all articles
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="group">
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="mx-2">•</span>
                    <time dateTime={article.date.toISOString()}>
                      {formatDate(article.date)}
                    </time>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="mt-3 text-sm">
                    <span>By {article.author}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
