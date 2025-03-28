import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Github, ExternalLink, Eye, Code, ArrowRight } from "lucide-react";
import Button, {
  ButtonProps,
} from "@/registry/components/button/button-shadcn/button";
import Link from "next/link";

const projectCardVariants = cva(
  "group rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-border",
        elevated: "border-transparent shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Project {
  title: string;
  description: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  links?: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
}

interface ProjectCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof Project>,
    VariantProps<typeof projectCardVariants>,
    Project {}
export function ProjectCard({
  className,
  variant,
  title,
  description,
  tags = [],
  image,
  links = {},
  ...props
}: ProjectCardProps) {
  return (
    <div className={cn(projectCardVariants({ variant, className }))} {...props}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {links.github && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={links.github} target="_blank" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {links.demo && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={links.demo} target="_blank" aria-label="Live Demo">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {links.caseStudy && (
            <Button variant="outline" size="sm" className="ml-auto" asChild>
              <Link href={links.caseStudy}>
                Case Study <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
