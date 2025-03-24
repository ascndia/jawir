import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/registry/components/card/card-shadcn/card";
import { formatDate } from "@/lib/utils";

export interface BlogPostProps {
  title?: string;
  excerpt?: string;
  imageUrl?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  date?: string | Date;
  slug?: string;
}

export default function CardBlogPost({
  title = "Getting Started with React Server Components",
  excerpt = "Learn how React Server Components work and how they can improve your application's performance by reducing the client-side JavaScript bundle.",
  imageUrl = "https://kzmisnorfny76w7204z4.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  author = {
    name: "Sarah Dayan",
    avatar: "/images/avatar.jpg",
  },
  date = new Date(),
  slug = "slug",
}: BlogPostProps) {
  const formattedDate = date instanceof Date ? formatDate(date) : date;

  const authorInitials = author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden h-full flex flex-col pt-0 min-w-xs max-w-sm">
      <div className="relative aspect-video overflow-hidden">
        <Link href={`/blog/${slug}`}>
          <Image
            src={imageUrl || "/placeholder.svg?height=400&width=600"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>
      <CardHeader className="p-4 pb-0">
        <Link href={`/blog/${slug}`} className="hover:underline">
          <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{authorInitials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author.name}</span>
        </div>
        <time
          dateTime={formattedDate}
          className="text-sm text-muted-foreground"
        >
          {formattedDate}
        </time>
      </CardFooter>
    </Card>
  );
}
