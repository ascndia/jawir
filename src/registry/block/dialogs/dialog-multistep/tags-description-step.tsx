"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"

// Sample tags - in a real app, this would likely come from an API
const availableTags = [
  "Responsive",
  "Mobile-Friendly",
  "E-commerce",
  "WordPress",
  "React",
  "Next.js",
  "UI/UX",
  "SEO",
  "Performance",
  "Accessibility",
  "Custom",
  "Portfolio",
  "Landing Page",
  "Dashboard",
  "API Integration",
]

interface TagsDescriptionStepProps {
  tags: string[]
  description: string
  onTagsChange: (tags: string[]) => void
  onDescriptionChange: (description: string) => void
  errors: {
    tags?: string
    description?: string
  }
}

export function TagsDescriptionStep({
  tags,
  description,
  onTagsChange,
  onDescriptionChange,
  errors,
}: TagsDescriptionStepProps) {
  const [customTag, setCustomTag] = useState("")

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onTagsChange([...tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag))
  }

  const handleAddCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim())
      setCustomTag("")
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add custom tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddCustomTag()
              }
            }}
          />
          <Button type="button" size="sm" onClick={handleAddCustomTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2">
          <p className="text-sm mb-2">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags
              .filter((tag) => !tags.includes(tag))
              .map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
        {errors.tags && <p className="text-sm text-red-500 mt-2">{errors.tags}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your service in detail..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className={`min-h-[200px] ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Minimum 20 characters</span>
          <span>{description.length} characters</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Add relevant tags to help clients find your service.</p>
        <p>Write a detailed description explaining what you offer, your process, and what makes your service unique.</p>
      </div>
    </div>
  )
}

