import * as React from "react";
import { ProjectCard } from "./card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Filter, Code2, LayoutTemplate } from "lucide-react";
import Link from "next/link";

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

interface ProjectsShowcaseProps {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: Project[];
  filterOptions?: {
    enabled?: boolean;
    categories?: string[];
  };
  cta?: {
    text: string;
    href: string;
  };
}

export default function ShowcaseProject1({
  title = "My Projects",
  subtitle = "Work",
  description = "A selection of my recent projects.",
  projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack online store with payment integration.",
      tags: ["React", "Node.js", "Stripe"],
      image: {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
        alt: "E-Commerce Platform",
      },
      links: {
        github: "https://github.com/username/ecommerce",
        demo: "https://demo.example.com",
      },
    },
    {
      title: "Task Management App",
      description: "A productivity app with real-time collaboration.",
      tags: ["Next.js", "Firebase", "Tailwind CSS"],
      image: {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
        alt: "Task Management App",
      },
      links: {
        github: "https://github.com/username/taskapp",
        caseStudy: "/projects/taskapp-case-study",
      },
    },
  ],
  filterOptions = { enabled: false },
  cta,
}: ProjectsShowcaseProps) {
  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto  px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          {subtitle && (
            <p className="text-sm font-medium text-primary mb-2">{subtitle}</p>
          )}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-muted-foreground">{description}</p>
          )}
        </div>

        {filterOptions?.enabled && (
          <div className="flex justify-center gap-2 mb-8">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              All
            </Button>
            {filterOptions.categories?.map((category) => (
              <Button key={category} variant="ghost">
                {category}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {cta && (
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href={cta.href}>{cta.text}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
