"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import { Scissors, PlusCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

// import  from "@/registry/components/sonner"; // Assuming sonner is used for toast notifications - might need correction again

interface CardActionQuickShorten1Props {
  onShorten?: (
    longUrl: string
  ) => Promise<{ shortUrl: string } | { error: string }>; // Async function to handle shortening
  placeholder?: string;
}

export default function CardActionQuickShorten1({
  onShorten = async (longUrl) => {
    // Default mock function
    console.log("Shortening:", longUrl);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    if (!longUrl || !longUrl.startsWith("http")) {
      return {
        error: "Please enter a valid URL starting with http:// or https://",
      };
    }
    // Simulate success
    return {
      shortUrl: `https://sho.rt/${Math.random().toString(36).substring(2, 8)}`,
    };
  },
  placeholder = "https://example.com/very/long/url/to/shorten",
}: CardActionQuickShorten1Props) {
  const [longUrl, setLongUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  //   const { toast } = useToast(); // Assuming this path is correct now or needs fixing later

  const handleShortenClick = async () => {
    if (!longUrl || isLoading) return;

    setIsLoading(true);
    setResultUrl(null); // Clear previous result
    const result = await onShorten(longUrl);
    setIsLoading(false);

    if ("shortUrl" in result) {
      setResultUrl(result.shortUrl);
      setLongUrl(""); // Clear input on success
      toast("Link shortened successfully!", {
        description: result.shortUrl,
      });
    } else {
      toast("Error shortening link", {
        description: result.error,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLongUrl(event.target.value);
    setResultUrl(null); // Clear result when input changes
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quick Shorten</CardTitle>
          <Scissors className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Paste a long URL to create a short link instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="longUrlInput" className="sr-only">
          Long URL
        </Label>
        <Input
          id="longUrlInput"
          placeholder={placeholder}
          value={longUrl}
          onChange={handleInputChange}
          disabled={isLoading}
          aria-label="Long URL to shorten"
        />
        {resultUrl && (
          <div className="mt-2 text-sm text-green-600 dark:text-green-400">
            Shortened: <span className="font-semibold">{resultUrl}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleShortenClick}
          disabled={isLoading || !longUrl}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PlusCircle className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Shortening..." : "Shorten Link"}
        </Button>
      </CardFooter>
    </Card>
  );
}
