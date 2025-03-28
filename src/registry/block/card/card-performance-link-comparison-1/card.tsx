"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import Button from "@/registry/components/button/button-shadcn/button";
import { Skeleton } from "@/registry/components/skeleton";
import {
  GitCompareArrows,
  Search,
  MousePointerClick,
  DollarSign,
} from "lucide-react";

interface LinkOption {
  id: string;
  name: string; // Display name for the link
  shortUrl: string;
}

interface LinkStats {
  clicks: number;
  earnings: number;
  ctr: number; // Click-Through Rate percentage
}

interface CardPerformanceLinkComparison1Props {
  linkOptions?: LinkOption[];
  currencySymbol?: string;
  onCompare?: (
    linkId1: string,
    linkId2: string
  ) => Promise<[LinkStats, LinkStats] | { error: string }>;
}

const initialLinks: LinkOption[] = [
  { id: "l1", name: "Summer Sale", shortUrl: "sho.rt/sum24" },
  { id: "l2", name: "Blog Post", shortUrl: "sho.rt/blog1" },
  { id: "l3", name: "Newsletter", shortUrl: "sho.rt/news" },
  { id: "l4", name: "Feature Launch", shortUrl: "sho.rt/featX" },
];

// Mock comparison function
const mockCompare = async (
  linkId1: string,
  linkId2: string
): Promise<[LinkStats, LinkStats] | { error: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 750)); // Simulate delay
  if (!linkId1 || !linkId2 || linkId1 === linkId2) {
    return { error: "Please select two different links to compare." };
  }
  // Generate mock stats
  const generateStats = (): LinkStats => ({
    clicks: Math.floor(Math.random() * 5000) + 100,
    earnings: Math.random() * 100 + 10,
    ctr: Math.random() * 10 + 1,
  });
  return [generateStats(), generateStats()];
};

export default function CardPerformanceLinkComparison1({
  linkOptions = initialLinks,
  currencySymbol = "$",
  onCompare = mockCompare,
}: CardPerformanceLinkComparison1Props) {
  const [link1Id, setLink1Id] = React.useState<string | undefined>(
    linkOptions[0]?.id
  );
  const [link2Id, setLink2Id] = React.useState<string | undefined>(
    linkOptions[1]?.id
  );
  const [comparisonResult, setComparisonResult] = React.useState<
    [LinkStats, LinkStats] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleCompareClick = async () => {
    if (!link1Id || !link2Id || isLoading) return;

    setIsLoading(true);
    setError(null);
    setComparisonResult(null);
    const result = await onCompare(link1Id, link2Id);
    setIsLoading(false);

    if ("error" in result) {
      setError(result.error);
    } else {
      setComparisonResult(result);
    }
  };

  const renderStats = (stats: LinkStats | undefined) => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      );
    }
    if (!stats)
      return <div className="text-sm text-muted-foreground">Select link</div>;
    return (
      <div className="space-y-1 text-sm">
        <p className="flex items-center gap-1">
          <MousePointerClick className="h-3.5 w-3.5 text-muted-foreground" />{" "}
          {stats.clicks.toLocaleString()} Clicks
        </p>
        <p className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />{" "}
          {currencySymbol}
          {stats.earnings.toFixed(2)} Earned
        </p>
        <p className="flex items-center gap-1">
          <GitCompareArrows className="h-3.5 w-3.5 text-muted-foreground" />{" "}
          {stats.ctr.toFixed(1)}% CTR
        </p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Link Comparison</CardTitle>
          <GitCompareArrows className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Compare the performance of two links side-by-side.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Link 1
            </label>
            <Select value={link1Id} onValueChange={setLink1Id}>
              <SelectTrigger aria-label="Select first link">
                <SelectValue placeholder="Select link..." />
              </SelectTrigger>
              <SelectContent>
                {linkOptions.map((link) => (
                  <SelectItem
                    key={link.id}
                    value={link.id}
                    disabled={link.id === link2Id}
                  >
                    {link.name} ({link.shortUrl})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              Link 2
            </label>
            <Select value={link2Id} onValueChange={setLink2Id}>
              <SelectTrigger aria-label="Select second link">
                <SelectValue placeholder="Select link..." />
              </SelectTrigger>
              <SelectContent>
                {linkOptions.map((link) => (
                  <SelectItem
                    key={link.id}
                    value={link.id}
                    disabled={link.id === link1Id}
                  >
                    {link.name} ({link.shortUrl})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>{renderStats(comparisonResult?.[0])}</div>
          <div>{renderStats(comparisonResult?.[1])}</div>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center pt-1">
            {error}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleCompareClick}
          disabled={isLoading || !link1Id || !link2Id || link1Id === link2Id}
        >
          <Search className="mr-2 h-4 w-4" />
          Compare Links
        </Button>
      </CardFooter>
    </Card>
  );
}
