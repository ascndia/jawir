import { Button } from "@/registry/components/button/select";
import { Input } from "@/registry/components/input/input-shadcn/input";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

interface SearchSuggestion {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface HeroSearch3Props {
  title?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  suggestions?: SearchSuggestion[];
}

const HeroSearch3 = ({
  title = "Discover what's possible",
  subtitle = "Powerful search to find exactly what you need",
  searchPlaceholder = "Type your search query...",
  suggestions = [
    { text: "Popular", icon: <Sparkles className="h-3 w-3" /> },
    { text: "Getting started" },
    { text: "Templates" },
    { text: "Components" },
    { text: "Documentation" },
  ],
}: HeroSearch3Props) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20 py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            New search experience
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {subtitle}
          </p>

          {/* Search container with shadow and border */}
          <div className="relative bg-background rounded-2xl shadow-lg border border-border/50 p-2 transition-all duration-300 hover:shadow-xl">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Search className="h-5 w-5" />
              </div>
              <Input
                type="text"
                className="pl-12 pr-4 py-6 h-14 text-lg w-full rounded-xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={searchPlaceholder}
              />
              <div className="absolute top-1/2 right-3 -translate-y-1/2">
                <Button size="sm" className="rounded-lg px-4 h-10">
                  Search
                </Button>
              </div>
            </div>

            {/* Search Suggestion Pills */}
            <div className="mt-4 mb-2 flex flex-wrap justify-center gap-2 px-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={suggestion.onClick}
                  className="inline-flex items-center rounded-full bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                >
                  {suggestion.icon && (
                    <span className="mr-1.5">{suggestion.icon}</span>
                  )}
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-sm text-muted-foreground">
            <p>Trusted by over 10,000+ users worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch3;
