import { Button } from "@/registry/components/button/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { ArrowRight, Star } from "lucide-react";
import { AspectRatio } from "@/registry/components/aspect-ratio";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatars: Array<{
    image: string;
    fallback: string;
  }>;
}

interface HeroProps {
  badge?: string;
  heading?: string;
  description?: string;
  primaryButton?: {
    text: string;
    url: string;
  };
  secondaryButton?: {
    text: string;
    url: string;
  };
  testimonial?: Testimonial;
  rating?: {
    stars: number;
    count: number;
  };
  images?: {
    main: string;
    secondary: string;
    tertiary: string;
  };
}

const Hero = ({
  badge = "New Release",
  heading = "Build and ship faster with our component library",
  description = "A collection of beautifully crafted components built with React, Tailwind CSS and Shadcn UI. Designed for rapid development and seamless integration.",
  primaryButton = {
    text: "Get Started",
    url: "#",
  },
  secondaryButton = {
    text: "View Demo",
    url: "#",
  },
  testimonial = {
    quote: "This saved us countless development hours",
    author: "Sarah Chen",
    role: "CTO",
    company: "Acme Inc",
    avatars: [
      {
        image: "https://shadcnblocks.com/images/block/avatar-1.webp",
        fallback: "SC",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-2.webp",
        fallback: "JD",
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-3.webp",
        fallback: "MK",
      },
    ],
  },
  rating = {
    stars: 5,
    count: 250,
  },
  images = {
    main: "https://shadcnblocks.com/images/block/placeholder-1.svg",
    secondary: "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
    tertiary: "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
  },
}: HeroProps) => {
  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="flex flex-col gap-6">
            <Badge variant="outline" className="w-fit">
              {badge}
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {heading}
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-[600px]">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button size="lg" className="gap-2">
                {primaryButton.text}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline">
                {secondaryButton.text}
              </Button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-8">
              {/* Testimonial */}
              <div className="flex flex-col gap-3">
                <div className="relative flex -space-x-4">
                  {testimonial.avatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      className="border-2 border-background h-10 w-10"
                    >
                      <AvatarImage src={avatar.image} alt="" />
                      <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="text-sm font-medium">
                    {testimonial.author}, {testimonial.role} @{" "}
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(rating.stars)].map((_, index) => (
                    <Star
                      key={index}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  from {rating.count}+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            {/* Background pattern */}
            <div className="absolute -top-20 -right-20 -z-10 aspect-square h-64 w-64 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>

            <div className="relative rounded-xl border overflow-hidden shadow-lg">
              <AspectRatio ratio={16 / 9}>
                <div className="grid h-full w-full grid-cols-3 grid-rows-2 gap-2 p-2">
                  <div className="col-span-2 row-span-2 overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={images.main}
                      alt="Main preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={images.secondary}
                      alt="Secondary preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border bg-muted">
                    <img
                      src={images.tertiary}
                      alt="Tertiary preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </AspectRatio>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
