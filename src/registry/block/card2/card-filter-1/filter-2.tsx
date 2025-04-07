import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export interface GameCategory {
    id: string;
    name: string;
  }
  
  export interface Game {
    id: string;
    title: string;
    description: string;
    image: string;
    rating: number;
    plays: number;
    categoryIds: string[];
    isFeatured?: boolean;
    isTrending?: boolean;
  }
  
export interface SearchFilters {
    query: string;
    categories: string[];
    sort: "popular" | "newest" | "rating";
  }
  
export const CATEGORIES: GameCategory[] = [
    { id: "action", name: "Action" },
    { id: "adventure", name: "Adventure" },
    { id: "arcade", name: "Arcade" },
    { id: "board", name: "Board" },
    { id: "card", name: "Card" },
    { id: "casual", name: "Casual" },
    { id: "educational", name: "Educational" },
    { id: "multiplayer", name: "Multiplayer" },
    { id: "puzzle", name: "Puzzle" },
    { id: "racing", name: "Racing" },
    { id: "role_playing", name: "Role Playing" },
    { id: "simulation", name: "Simulation" },
    { id: "sports", name: "Sports" },
    { id: "strategy", name: "Strategy" },
  ];import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";



const CardFilter2A = () => {
    const [filters, setFilters] = React.useState<SearchFilters>({
        query: "",
        categories: [],
        sort: "popular",
    });
  const handleCategoryToggle = (categoryId: string) => {
    setFilters((prev) => {
      const isSelected = prev.categories.includes(categoryId);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter((id) => id !== categoryId)
          : [...prev.categories, categoryId],
      };
    });
  };

  const handleSortChange = (sort: "popular" | "newest" | "rating") => {
    setFilters((prev) => ({
      ...prev,
      sort,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Filters</CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search games..."
              className="pl-10"
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
            />
          </div>
          
          <div>
            <h3 className="mb-3 text-sm font-medium">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Badge
                  key={category.id}
                  variant={filters.categories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90"
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-3 text-sm font-medium">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.sort === "popular" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange("popular")}
              >
                Most Played
              </Button>
              <Button
                variant={filters.sort === "newest" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange("newest")}
              >
                Newest
              </Button>
              <Button
                variant={filters.sort === "rating" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange("rating")}
              >
                Top Rated
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter>
        <Button  className="w-full" onClick={() => setFilters({ query: "", categories: [], sort: "popular" })}>
            Reset Filters
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardFilter2A;
