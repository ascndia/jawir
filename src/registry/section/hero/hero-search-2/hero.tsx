import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { GalleryVerticalEnd, Search } from "lucide-react";
import Link from "next/link";

interface SearchSuggestion {
  text: string;
  onClick?: () => void;
}

interface HeroSearch2Props {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  suggestions?: SearchSuggestion[];
}

const HeroSearch2 = ({
  title = "Find what you're looking for",
  subtitle = "Your AI-powered search assistant",
  searchPlaceholder = "Search for anything...",
  suggestions = [
    { text: "Getting started" },
    { text: "Pricing plans" },
    { text: "Features" },
    { text: "Documentation" },
    { text: "API reference" },
  ],
}: HeroSearch2Props) => {
  return (
    <section className="min-h-[70vh] flex flex-col pb-6">
      <div className="flex-grow py-24 lg:py-32 flex flex-col justify-center">
        <div className="mt-0 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex justify-center items-center">
            {/* Logo */}
            <Link
              href="#"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Acme Inc.
            </Link>
            {/* End Logo */}
          </div>
          <h1 className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">{subtitle}</p>
        </div>
        {/* Search */}
        <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Input
              type="text"
              className="p-4 py-6 block w-full rounded-full"
              placeholder={searchPlaceholder}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <Button size="sm" variant="ghost" className="rounded-full">
                <Search className="shrink-0 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search Suggestion Pills */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={suggestion.onClick}
                className="inline-flex items-center rounded-full border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
          {/* End Search Suggestion Pills */}
        </div>
        {/* End Search */}
      </div>
    </section>
  );
};

export default HeroSearch2;
