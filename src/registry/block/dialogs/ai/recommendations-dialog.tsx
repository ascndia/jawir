"use client";

import * as React from "react";
import {
  ArrowRight,
  Loader2,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { Badge } from "@/registry/components/badge";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  image?: string;
  action?: {
    label: string;
    url: string;
  };
}

interface RecommendationsDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSelect?: (recommendation: Recommendation) => void;
  onFeedback?: (recommendationId: string, isPositive: boolean) => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  recommendations?: Recommendation[];
  categories?: string[];
}

export default function RecommendationsDialog({
  open = false,
  onOpenChange,
  onSelect,
  onFeedback,
  isLoading = false,
  title = "Personalized Recommendations",
  description = "Based on your activity, we think you might like these",
  recommendations = [
    {
      id: "rec1",
      title: "Advanced Data Visualization",
      description:
        "Learn how to create interactive charts and graphs for your data.",
      category: "Courses",
      tags: ["Data", "Visualization", "Beginner Friendly"],
      image: "/placeholder.svg?height=100&width=200",
      action: {
        label: "View Course",
        url: "#",
      },
    },
    {
      id: "rec2",
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning concepts and algorithms.",
      category: "Courses",
      tags: ["AI", "ML", "Intermediate"],
      image: "/placeholder.svg?height=100&width=200",
      action: {
        label: "View Course",
        url: "#",
      },
    },
    {
      id: "rec3",
      title: "Data Science Weekly",
      description: "Stay updated with the latest trends in data science.",
      category: "Newsletters",
      tags: ["Data Science", "Weekly Updates"],
      image: "/placeholder.svg?height=100&width=200",
      action: {
        label: "Subscribe",
        url: "#",
      },
    },
    {
      id: "rec4",
      title: "AI Research Papers",
      description:
        "Collection of recent research papers in artificial intelligence.",
      category: "Resources",
      tags: ["Research", "AI", "Academic"],
      image: "/placeholder.svg?height=100&width=200",
      action: {
        label: "Browse Papers",
        url: "#",
      },
    },
    {
      id: "rec5",
      title: "Python for Data Analysis",
      description: "Master data analysis using Python and popular libraries.",
      category: "Courses",
      tags: ["Python", "Data Analysis", "Intermediate"],
      image: "/placeholder.svg?height=100&width=200",
      action: {
        label: "View Course",
        url: "#",
      },
    },
  ],
  categories = ["All", "Courses", "Resources", "Newsletters"],
}: RecommendationsDialogProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [feedbackGiven, setFeedbackGiven] = React.useState<
    Record<string, boolean>
  >({});

  const filteredRecommendations = React.useMemo(() => {
    if (activeCategory === "All") {
      return recommendations;
    }
    return recommendations.filter((rec) => rec.category === activeCategory);
  }, [activeCategory, recommendations]);

  const handleSelect = (recommendation: Recommendation) => {
    onSelect?.(recommendation);
  };

  const handleFeedback = (recommendationId: string, isPositive: boolean) => {
    setFeedbackGiven((prev) => ({
      ...prev,
      [recommendationId]: isPositive,
    }));
    onFeedback?.(recommendationId, isPositive);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="All"
          value={activeCategory}
          onValueChange={setActiveCategory}
        >
          <TabsList className="mb-4 w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {isLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredRecommendations.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <p className="text-lg font-medium">
                    No recommendations found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We couldn't find any recommendations in this category
                  </p>
                </div>
              ) : (
                filteredRecommendations.map((recommendation) => (
                  <Card key={recommendation.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {recommendation.title}
                          </CardTitle>
                          <CardDescription>
                            {recommendation.description}
                          </CardDescription>
                        </div>
                        {recommendation.image && (
                          <img
                            src={recommendation.image || "/placeholder.svg"}
                            alt={recommendation.title}
                            className="h-16 w-24 rounded-md object-cover"
                          />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      {recommendation.tags &&
                        recommendation.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {recommendation.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleFeedback(recommendation.id, true)
                          }
                          disabled={
                            feedbackGiven[recommendation.id] !== undefined
                          }
                          className={
                            feedbackGiven[recommendation.id] === true
                              ? "text-success"
                              : ""
                          }
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="sr-only">Like</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleFeedback(recommendation.id, false)
                          }
                          disabled={
                            feedbackGiven[recommendation.id] !== undefined
                          }
                          className={
                            feedbackGiven[recommendation.id] === false
                              ? "text-destructive"
                              : ""
                          }
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span className="sr-only">Dislike</span>
                        </Button>
                      </div>
                      {recommendation.action && (
                        <Button
                          size="sm"
                          onClick={() => handleSelect(recommendation)}
                          className="gap-1"
                        >
                          {recommendation.action.label}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
