import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Button, {
  ButtonProps,
} from "@/registry/components/button/button-shadcn/button";
import { Dribbble, Github, Linkedin, X } from "lucide-react";

const heroVariants = cva("w-full py-12 md:py-24 lg:py-32 xl:py-40", {
  variants: {
    variant: {
      default: "bg-background",
      gradient: "bg-gradient-to-r from-primary/10 to-secondary/10",
      dark: "bg-neutral-900 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface HeroProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryAction?: ButtonProps & { text: string };
  secondaryAction?: ButtonProps & { text: string };
  image?: {
    src: string;
    alt: string;
    position?: "left" | "right" | "background";
  };
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

export default function HeroPortofolio1({
  className,
  variant = "gradient",
  title = "Austino Gea",
  subtitle = "Portofolio",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  primaryAction = {
    text: "Download CV",
  },
  secondaryAction = {
    text: "Contact Me",
  },
  image = {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    alt: "Hero Portofolio 1",
    position: "left",
  },
  socialLinks = {
    github: "https://github.com/austinogea",
    linkedin: "https://www.linkedin.com/in/austinogea",
    twitter: "https://x.com/austinogea",
    dribbble: "https://dribbble.com/austinogea",
  },
  ...props
}: HeroProps) {
  return (
    <section className={cn(heroVariants({ variant, className }))} {...props}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`flex flex-col ${
            image?.position === "left" ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-8`}
        >
          {image?.position !== "background" && image && (
            <div className="md:w-1/2">
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-lg object-cover shadow-xl"
              />
            </div>
          )}

          <div
            className={`${
              image?.position !== "background"
                ? "md:w-1/2"
                : "w-full text-center"
            } space-y-6`}
          >
            {subtitle && (
              <p className="text-lg font-medium text-primary">{subtitle}</p>
            )}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="max-w-[600px] text-lg text-muted-foreground">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-4">
              {primaryAction && (
                <Button {...primaryAction}>{primaryAction.text}</Button>
              )}
              {secondaryAction && (
                <Button variant="outline" {...secondaryAction}>
                  {secondaryAction.text}
                </Button>
              )}
            </div>

            {socialLinks && (
              <div className="flex gap-4 pt-2">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {socialLinks.dribbble && (
                  <a
                    href={socialLinks.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Dribbble className="h-6 w-6" />
                    <span className="sr-only">Dribbble</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
