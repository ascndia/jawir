"use client";

import * as React from "react";
import {
  Search,
  Filter,
  CalendarDays,
  Tag,
  ListFilter,
  RotateCcw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { cn } from "@/lib/utils";

// Example data - replace with actual data sources
const categories = [
  { id: "tech", name: "Technology" },
  { id: "health", name: "Healthcare" },
  { id: "finance", name: "Finance" },
  { id: "edu", name: "Education" },
];
const statuses = [
  { id: "published", name: "Published" },
  { id: "draft", name: "Draft" },
  { id: "archived", name: "Archived" },
];
const tags = [
  { id: "react", name: "React" },
  { id: "typescript", name: "TypeScript" },
  { id: "ai", name: "AI" },
  { id: "nodejs", name: "Node.js" },
  { id: "ux", name: "UX Design" },
];

interface SearchFormData {
  keywords: string;
  category: string; // Assuming single select for simplicity
  status: string[]; // Allow multiple statuses
  tags: string[]; // Allow multiple tags
  startDate: string;
  endDate: string;
}

interface CardFormSearch1Props {
  initialData?: Partial<SearchFormData>;
  onSearch?: (data: SearchFormData) => void;
  onReset?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

const defaultInitialData: SearchFormData = {
  keywords: "",
  category: "all",
  status: [],
  tags: [],
  startDate: "",
  endDate: "",
};

export function CardFormSearch1({
  initialData = {},
  onSearch,
  onReset,
  title = "Advanced Search",
  description = "Refine your search using multiple criteria.",
  className,
}: CardFormSearch1Props) {
  const [formData, setFormData] = React.useState<SearchFormData>({
    ...defaultInitialData,
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    field: "status" | "tags",
    itemId: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const currentItems = prev[field] || [];
      if (checked) {
        return { ...prev, [field]: [...currentItems, itemId] };
      } else {
        return { ...prev, [field]: currentItems.filter((id) => id !== itemId) };
      }
    });
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(formData);
    }
    console.log("Performing search with:", formData);
  };

  const handleReset = () => {
    setFormData(defaultInitialData);
    if (onReset) {
      onReset();
    }
    console.log("Search form reset");
  };

  return (
    <Card className={cn("w-full max-w-2xl", className)}>
      <CardHeader>
        <CardTitle>
          <Filter className="mr-2 inline-block h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="keywords">
            <Search className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
            Keywords
          </Label>
          <Input
            id="keywords"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="Search by title, content..."
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              name="category"
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDate">
              <CalendarDays className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">
              <CalendarDays className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate} // Basic validation
            />
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label className="flex items-center">
              <ListFilter className="mr-2 h-4 w-4 text-muted-foreground" />
              Status
            </Label>
            <div className="space-y-2 rounded-md border p-4">
              {statuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.id}`}
                    checked={formData.status.includes(status.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "status",
                        status.id,
                        Boolean(checked)
                      )
                    }
                  />
                  <Label
                    htmlFor={`status-${status.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {status.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center">
              <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
              Tags
            </Label>
            <div className="space-y-2 rounded-md border p-4 max-h-40 overflow-y-auto">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag.id}`}
                    checked={formData.tags.includes(tag.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("tags", tag.id, Boolean(checked))
                    }
                  />
                  <Label
                    htmlFor={`tag-${tag.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {tag.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button variant="ghost" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" />
          Apply Search
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardFormSearch1;
