"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would likely come from an API
const categories = [
  {
    id: "design",
    name: "Design",
    subcategories: [
      { id: "logo", name: "Logo Design" },
      { id: "web", name: "Web Design" },
      { id: "ui-ux", name: "UI/UX Design" },
      { id: "graphic", name: "Graphic Design" },
    ],
  },
  {
    id: "development",
    name: "Development",
    subcategories: [
      { id: "web-dev", name: "Web Development" },
      { id: "mobile", name: "Mobile Development" },
      { id: "desktop", name: "Desktop Applications" },
      { id: "api", name: "API Development" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    subcategories: [
      { id: "social", name: "Social Media Marketing" },
      { id: "seo", name: "SEO" },
      { id: "content", name: "Content Marketing" },
      { id: "email", name: "Email Marketing" },
    ],
  },
  {
    id: "writing",
    name: "Writing & Translation",
    subcategories: [
      { id: "articles", name: "Articles & Blog Posts" },
      { id: "translation", name: "Translation" },
      { id: "copywriting", name: "Copywriting" },
      { id: "technical", name: "Technical Writing" },
    ],
  },
]

interface CategoryStepProps {
  category: string
  subcategory: string
  onCategoryChange: (category: string) => void
  onSubcategoryChange: (subcategory: string) => void
  errors: {
    category?: string
    subcategory?: string
  }
}

export function CategoryStep({
  category,
  subcategory,
  onCategoryChange,
  onSubcategoryChange,
  errors,
}: CategoryStepProps) {
  const selectedCategory = categories.find((c) => c.id === category)

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="category">Main Category</Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger id="category" className={errors.category ? "border-red-500" : "w-full"}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subcategory">Subcategory</Label>
        <Select value={subcategory} onValueChange={onSubcategoryChange} disabled={!selectedCategory}>
          <SelectTrigger id="subcategory" className={errors.subcategory ? "border-red-500" : "w-full"}>
            <SelectValue placeholder="Select a subcategory" />
          </SelectTrigger>
          <SelectContent>
            {selectedCategory?.subcategories.map((subcat) => (
              <SelectItem key={subcat.id} value={subcat.id}>
                {subcat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subcategory && <p className="text-sm text-red-500">{errors.subcategory}</p>}
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Select the most appropriate category and subcategory for your service.</p>
        <p>This helps clients find your service when browsing or searching.</p>
      </div>
    </div>
  )
}

