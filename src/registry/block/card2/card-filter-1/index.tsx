"use client"
import { useState } from "react"
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react"
import {  ChevronRight, CircleCheck,Star,  } from 'lucide-react'
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FilterOption {
  id: string
  label: string
}

interface FilterTagSelectProps {
  title?: string
  categories?: FilterOption[]
  colors?: FilterOption[]
  sizes?: FilterOption[]
  brands?: FilterOption[]
  materials?: FilterOption[]
  occasions?: FilterOption[]
  patterns?: FilterOption[]
  sortOptions?: FilterOption[]
  className?: string
  onApplyFilters?: (filters: {
    categories: string[]
    colors: string[]
    sizes: string[]
    brands: string[]
    materials: string[]
    occasions: string[]
    patterns: string[]
    sort: string | null
  }) => void
}

export function CardFilter1A({
  title = "Filters",
  categories = [
    { id: "shirts", label: "Shirts" },
    { id: "pants", label: "Pants" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
    { id: "outerwear", label: "Outerwear" },
    { id: "dresses", label: "Dresses" },
    { id: "skirts", label: "Skirts" },
    { id: "activewear", label: "Activewear" },
  ],
  colors = [
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "yellow", label: "Yellow" },
    { id: "purple", label: "Purple" },
    { id: "pink", label: "Pink" },
    { id: "orange", label: "Orange" },
    { id: "gray", label: "Gray" },
    { id: "brown", label: "Brown" },
    { id: "navy", label: "Navy" },
  ],
  sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
    { id: "3xl", label: "3XL" },
    { id: "4xl", label: "4XL" },
  ],
  brands = [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "newbalance", label: "New Balance" },
    { id: "underarmour", label: "Under Armour" },
    { id: "asics", label: "Asics" },
    { id: "converse", label: "Converse" },
    { id: "vans", label: "Vans" },
    { id: "fila", label: "Fila" },
    { id: "levis", label: "Levi's" },    
    { id: "jordan", label: "Jordan" },

  ],
  materials = [
    { id: "cotton", label: "Cotton" },
    { id: "polyester", label: "Polyester" },
    { id: "leather", label: "Leather" },
    { id: "denim", label: "Denim" },
    { id: "wool", label: "Wool" },
    { id: "silk", label: "Silk" },
    { id: "linen", label: "Linen" },
    { id: "cashmere", label: "Cashmere" },
    { id: "nylon", label: "Nylon" },
  ],
  occasions = [
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "business", label: "Business" },
    { id: "party", label: "Party" },
    { id: "workout", label: "Workout" },
    { id: "beach", label: "Beach" },
    { id: "wedding", label: "Wedding" },
    { id: "holiday", label: "Holiday" },
    { id: "travel", label: "Travel" },
  ],
  patterns = [
    { id: "solid", label: "Solid" },
    { id: "striped", label: "Striped" },
    { id: "plaid", label: "Plaid" },
    { id: "floral", label: "Floral" },
    { id: "polkadot", label: "Polka Dot" },
    { id: "checkered", label: "Checkered" },
    { id: "geometric", label: "Geometric" },
  ],
  sortOptions = [
    { id: "newest", label: "Newest" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "popular", label: "Most Popular" },
    { id: "rating", label: "Highest Rated" },
  ],
  className,
  onApplyFilters,
}: FilterTagSelectProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([])
  const [selectedSort, setSelectedSort] = useState<string | null>("newest")
  const [isOpen, setIsOpen] = useState(false)

  const getActiveFilterCount = () => {
    return (
      selectedCategories.length +
      selectedColors.length +
      selectedSizes.length +
      selectedBrands.length +
      selectedMaterials.length +
      selectedOccasions.length +
      selectedPatterns.length
    )
  }

  const activeFilterCount = getActiveFilterCount()

  const applyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        categories: selectedCategories,
        colors: selectedColors,
        sizes: selectedSizes,
        brands: selectedBrands,
        materials: selectedMaterials,
        occasions: selectedOccasions,
        patterns: selectedPatterns,
        sort: selectedSort,
      })
    }
    setIsOpen(false)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedBrands([])
    setSelectedMaterials([])
    setSelectedOccasions([])
    setSelectedPatterns([])

    if (onApplyFilters) {
      onApplyFilters({
        categories: [],
        colors: [],
        sizes: [],
        brands: [],
        materials: [],
        occasions: [],
        patterns: [],
        sort: selectedSort,
      })
    }
  }

  // Toggle selection in an array
  const toggleSelection = (current: string[], value: string) => {
    if (current.includes(value)) {
      return current.filter((item) => item !== value)
    } else {
      return [...current, value]
    }
  }

  // Custom tag component that supports multiselect
  const TagMultiSelect = ({
    options,
    values,
    onChange,
    label,
  }: {
    options: FilterOption[]
    values: string[]
    onChange: (values: string[]) => void
    label: string
  }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <Badge
              key={option.id}
              variant={values.includes(option.id) ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1",
                values.includes(option.id) ? "bg-primary text-primary-foreground" : "",
              )}
              onClick={() => onChange(toggleSelection(values, option.id))}
            >
              {option.label}
              {values.includes(option.id) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  // Desktop filter view
  const DesktopFilters = () => (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-full" >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        <Separator />

        {colors.length > 0 && (
          <TagMultiSelect options={colors} values={selectedColors} onChange={setSelectedColors} label="Color" />
        )}

        {sizes.length > 0 && (
          <TagMultiSelect options={sizes} values={selectedSizes} onChange={setSelectedSizes} label="Size" />
        )}

        {categories.length > 0 && (
          <TagMultiSelect
            options={categories}
            values={selectedCategories}
            onChange={setSelectedCategories}
            label="Category"
          />
        )}

        {materials.length > 0 && (
          <TagMultiSelect
            options={materials}
            values={selectedMaterials}
            onChange={setSelectedMaterials}
            label="Material"
          />
        )}

        {occasions.length > 0 && (
          <TagMultiSelect
            options={occasions}
            values={selectedOccasions}
            onChange={setSelectedOccasions}
            label="Occasion"
          />
        )}

        {patterns.length > 0 && (
          <TagMultiSelect options={patterns} values={selectedPatterns} onChange={setSelectedPatterns} label="Pattern" />
        )}

        {brands.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-sm font-medium">
              Brand
            </Label>
            <Select
            
              value={selectedBrands.length === 1 ? selectedBrands[0] : ""}
              onValueChange={(value) => {
                if (value) setSelectedBrands([value])
                else setSelectedBrands([])
              }}
            >
              <SelectTrigger className="w-full" id="brand">
                <SelectValue
                  placeholder={selectedBrands.length > 1 ? `${selectedBrands.length} brands selected` : "Select brand"}
                />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )

  // Mobile filter view (in a sheet/drawer)
  const MobileFilters = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your search with filters</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4 overflow-y-auto max-h-[calc(85vh-10rem)]">
          <div className="space-y-2">
            <Label htmlFor="mobile-sort" className="text-sm font-medium">
              Sort by
            </Label>
            <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
              <SelectTrigger id="mobile-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {colors.length > 0 && (
            <TagMultiSelect options={colors} values={selectedColors} onChange={setSelectedColors} label="Color" />
          )}

          {sizes.length > 0 && (
            <TagMultiSelect options={sizes} values={selectedSizes} onChange={setSelectedSizes} label="Size" />
          )}

          {categories.length > 0 && (
            <TagMultiSelect
              options={categories}
              values={selectedCategories}
              onChange={setSelectedCategories}
              label="Category"
            />
          )}

          {materials.length > 0 && (
            <TagMultiSelect
              options={materials}
              values={selectedMaterials}
              onChange={setSelectedMaterials}
              label="Material"
            />
          )}

          {occasions.length > 0 && (
            <TagMultiSelect
              options={occasions}
              values={selectedOccasions}
              onChange={setSelectedOccasions}
              label="Occasion"
            />
          )}

          {patterns.length > 0 && (
            <TagMultiSelect
              options={patterns}
              values={selectedPatterns}
              onChange={setSelectedPatterns}
              label="Pattern"
            />
          )}

          {brands.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="mobile-brand" className="text-sm font-medium">
                Brand
              </Label>
              <Select
                value={selectedBrands.length === 1 ? selectedBrands[0] : ""}
                onValueChange={(value) => {
                  if (value) setSelectedBrands([value])
                  else setSelectedBrands([])
                }}
              >
                <SelectTrigger id="mobile-brand">
                  <SelectValue
                    placeholder={
                      selectedBrands.length > 1 ? `${selectedBrands.length} brands selected` : "Select brand"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <Button variant="ghost" onClick={clearFilters} disabled={activeFilterCount === 0}>
            Clear all
          </Button>
          <Button onClick={applyFilters}>Show results</Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Render active filter tags for mobile view
  const renderActiveTags = () => {
    const allActiveTags = [
      ...selectedCategories.map((id) => ({
        id,
        label: categories.find((c) => c.id === id)?.label || id,
        type: "category",
      })),
      ...selectedColors.map((id) => ({
        id,
        label: colors.find((c) => c.id === id)?.label || id,
        type: "color",
      })),
      ...selectedSizes.map((id) => ({
        id,
        label: sizes.find((s) => s.id === id)?.label || id,
        type: "size",
      })),
      ...selectedBrands.map((id) => ({
        id,
        label: brands.find((b) => b.id === id)?.label || id,
        type: "brand",
      })),
      ...selectedMaterials.map((id) => ({
        id,
        label: materials.find((m) => m.id === id)?.label || id,
        type: "material",
      })),
      ...selectedOccasions.map((id) => ({
        id,
        label: occasions.find((o) => o.id === id)?.label || id,
        type: "occasion",
      })),
      ...selectedPatterns.map((id) => ({
        id,
        label: patterns.find((p) => p.id === id)?.label || id,
        type: "pattern",
      })),
    ]

    return allActiveTags.map((tag) => (
      <Badge key={`${tag.type}-${tag.id}`} variant="secondary" className="flex items-center gap-1">
        {tag.label}
        <X
          className="h-3 w-3 cursor-pointer"
          onClick={() => {
            switch (tag.type) {
              case "category":
                setSelectedCategories((prev) => prev.filter((id) => id !== tag.id))
                break
              case "color":
                setSelectedColors((prev) => prev.filter((id) => id !== tag.id))
                break
              case "size":
                setSelectedSizes((prev) => prev.filter((id) => id !== tag.id))
                break
              case "brand":
                setSelectedBrands((prev) => prev.filter((id) => id !== tag.id))
                break
              case "material":
                setSelectedMaterials((prev) => prev.filter((id) => id !== tag.id))
                break
              case "occasion":
                setSelectedOccasions((prev) => prev.filter((id) => id !== tag.id))
                break
              case "pattern":
                setSelectedPatterns((prev) => prev.filter((id) => id !== tag.id))
                break
            }
          }}
        />
      </Badge>
    ))
  }

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <DesktopFilters />
      </div>
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <MobileFilters />
          <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Show active filters as tags on mobile */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {renderActiveTags()}
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearFilters}>
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface FilterOption {
  id: string
  label: string
}

interface PriceRange {
  min: number
  max: number
}

interface FilterCardProps {
  title?: string
  categories?: FilterOption[]
  brands?: FilterOption[]
  ratings?: FilterOption[]
  className?: string
  onApplyFilters?: (filters: {
    categories: string[]
    brands: string[]
    rating: string | null
    priceRange: PriceRange
  }) => void
}

export function CardFilter1B({
  title = "Filters",
  categories = [
    { id: "electronics", label: "Electronics" },
    { id: "clothing", label: "Clothing" },
    { id: "books", label: "Books" },
    { id: "home", label: "Home & Kitchen" },
    { id: "toys", label: "Toys & Games" },
  ],
  brands = [
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "sony", label: "Sony" },
  ],
  ratings = [
    { id: "5", label: "5 Stars" },
    { id: "4", label: "4 Stars & Up" },
    { id: "3", label: "3 Stars & Up" },
    { id: "2", label: "2 Stars & Up" },
    { id: "1", label: "1 Star & Up" },
  ],
  className,
  onApplyFilters,
}: FilterCardProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 })
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const [categoryOpen, setCategoryOpen] = useState(true)
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [ratingOpen, setRatingOpen] = useState(true)

  const handleCategoryChange = (id: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  const handleBrandChange = (id: string, checked: boolean) => {
    setSelectedBrands((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)
    setPriceRange((prev) => ({
      ...prev,
      [type]: numValue,
    }))
  }

  const applyFilters = () => {
    const totalFilters =
      selectedCategories.length +
      selectedBrands.length +
      (selectedRating ? 1 : 0) +
      (priceRange.min > 0 || priceRange.max < 1000 ? 1 : 0)

    setActiveFilterCount(totalFilters)

    if (onApplyFilters) {
      onApplyFilters({
        categories: selectedCategories,
        brands: selectedBrands,
        rating: selectedRating,
        priceRange,
      })
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRating(null)
    setPriceRange({ min: 0, max: 1000 })
    setActiveFilterCount(0)

    if (onApplyFilters) {
      onApplyFilters({
        categories: [],
        brands: [],
        rating: null,
        priceRange: { min: 0, max: 1000 },
      })
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {categories.length > 0 && (
          <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Categories</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <ChevronDown className={cn("h-4 w-4 transition-transform", !categoryOpen && "-rotate-90")} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="my-2" />
            <CollapsibleContent>
              <div className="grid gap-2 pt-1">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                    />
                    <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {brands.length > 0 && (
          <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Brands</h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  <ChevronDown className={cn("h-4 w-4 transition-transform", !brandsOpen && "-rotate-90")} />
                </Button>
              </CollapsibleTrigger>
            </div>
            <Separator className="my-2" />
            <CollapsibleContent>
              <div className="grid gap-2 pt-1">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked === true)}
                    />
                    <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal cursor-pointer">
                      {brand.label}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Price Range</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDown className={cn("h-4 w-4 transition-transform", !priceOpen && "-rotate-90")} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator className="my-2" />
          <CollapsibleContent>
            <div className="grid gap-4 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="price-min" className="text-xs">
                    Min
                  </Label>
                  <Input
                    id="price-min"
                    type="number"
                    placeholder="0"
                    value={priceRange.min || ""}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="price-max" className="text-xs">
                    Max
                  </Label>
                  <Input
                    id="price-max"
                    type="number"
                    placeholder="1000"
                    value={priceRange.max || ""}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={ratingOpen} onOpenChange={setRatingOpen}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Rating</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                <ChevronDown className={cn("h-4 w-4 transition-transform", !ratingOpen && "-rotate-90")} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <Separator className="my-2" />
          <CollapsibleContent>
            <RadioGroup value={selectedRating || ""} onValueChange={setSelectedRating} className="grid gap-2 pt-1">
              {ratings.map((rating) => (
                <div key={rating.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.id} id={`rating-${rating.id}`} />
                  <Label htmlFor={`rating-${rating.id}`} className="text-sm font-normal cursor-pointer">
                    {rating.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <Button variant="ghost" size="sm" onClick={clearFilters} disabled={activeFilterCount === 0}>
          <X className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button size="sm" onClick={applyFilters}>
          <Check className="mr-2 h-4 w-4" />
          Apply
        </Button>
      </CardFooter>
    </Card>
  )
}



interface FilterOption {
  id: string
  label: string
}

interface ColorOption extends FilterOption {
  hex: string
}

interface FilterComprehensiveProps {
  title?: string
  categories?: FilterOption[]
  colors?: ColorOption[]
  sizes?: FilterOption[]
  brands?: FilterOption[]
  priceRange?: {
    min: number
    max: number
    step?: number
  }
  ratings?: boolean
  materials?: FilterOption[]
  styles?: FilterOption[]
  features?: FilterOption[]
  availability?: boolean
  sortOptions?: FilterOption[]
  initialVisibleCount?: number
  className?: string
  onApplyFilters?: (filters: {
    categories: string[]
    colors: string[]
    sizes: string[]
    brands: string[]
    priceRange: [number, number]
    rating: number | null
    materials: string[]
    style: string | null
    features: string[]
    inStock: boolean
    sort: string | null
  }) => void
}

export  function CardFilter1C({
  title = "Filters",
  categories = [
    { id: "shirts", label: "Shirts" },
    { id: "pants", label: "Pants" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
    { id: "outerwear", label: "Outerwear" },
    { id: "dresses", label: "Dresses" },
    { id: "skirts", label: "Skirts" },
    { id: "activewear", label: "Activewear" },
    { id: "swimwear", label: "Swimwear" },
    { id: "sleepwear", label: "Sleepwear" },
  ],
  colors = [
    { id: "black", label: "Black", hex: "#000000" },
    { id: "white", label: "White", hex: "#ffffff" },
    { id: "red", label: "Red", hex: "#ff0000" },
    { id: "blue", label: "Blue", hex: "#0000ff" },
    { id: "green", label: "Green", hex: "#00ff00" },
    { id: "yellow", label: "Yellow", hex: "#ffff00" },
    { id: "purple", label: "Purple", hex: "#800080" },
    { id: "pink", label: "Pink", hex: "#ffc0cb" },
    { id: "orange", label: "Orange", hex: "#ffa500" },
    { id: "gray", label: "Gray", hex: "#808080" },
    { id: "brown", label: "Brown", hex: "#a52a2a" },
    { id: "navy", label: "Navy", hex: "#000080" },
  ],
  sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
    { id: "3xl", label: "3XL" },
    { id: "4xl", label: "4XL" },
  ],
  brands = [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "reebok", label: "Reebok" },
    { id: "newbalance", label: "New Balance" },
    { id: "underarmour", label: "Under Armour" },
    { id: "asics", label: "Asics" },
    { id: "converse", label: "Converse" },
    { id: "vans", label: "Vans" },
    { id: "fila", label: "Fila" },
  ],
  priceRange = { min: 0, max: 1000, step: 10 },
  ratings = true,
  materials = [
    { id: "cotton", label: "Cotton" },
    { id: "polyester", label: "Polyester" },
    { id: "leather", label: "Leather" },
    { id: "denim", label: "Denim" },
    { id: "wool", label: "Wool" },
    { id: "silk", label: "Silk" },
    { id: "linen", label: "Linen" },
    { id: "cashmere", label: "Cashmere" },
  ],
  styles = [
    { id: "casual", label: "Casual" },
    { id: "formal", label: "Formal" },
    { id: "business", label: "Business" },
    { id: "party", label: "Party" },
    { id: "workout", label: "Workout" },
    { id: "beach", label: "Beach" },
    { id: "wedding", label: "Wedding" },
  ],
  features = [
    { id: "waterproof", label: "Waterproof" },
    { id: "breathable", label: "Breathable" },
    { id: "lightweight", label: "Lightweight" },
    { id: "stainresistant", label: "Stain Resistant" },
    { id: "quickdry", label: "Quick Dry" },
    { id: "antimicrobial", label: "Antimicrobial" },
    { id: "sustainable", label: "Sustainable" },
    { id: "pockets", label: "With Pockets" },
  ],
  availability = true,
  sortOptions = [
    { id: "newest", label: "Newest" },
    { id: "price-asc", label: "Price: Low to High" },
    { id: "price-desc", label: "Price: High to Low" },
    { id: "popular", label: "Most Popular" },
    { id: "rating", label: "Highest Rated" },
  ],
  initialVisibleCount = 5,
  className,
  onApplyFilters,
}: FilterComprehensiveProps) {
  // Selected filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>([
    priceRange.min,
    priceRange.max,
  ])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [selectedSort, setSelectedSort] = useState<string | null>("newest")
  
  // Expanded states for each filter section
  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    colors: false,
    sizes: false,
    brands: false,
    price: false,
    rating: false,
    materials: false,
    styles: false,
    features: false,
  })
  
  const [isOpen, setIsOpen] = useState(false)

  const getActiveFilterCount = () => {
    let count = 0
    if (selectedCategories.length > 0) count++
    if (selectedColors.length > 0) count++
    if (selectedSizes.length > 0) count++
    if (selectedBrands.length > 0) count++
    if (selectedPriceRange[0] > priceRange.min || selectedPriceRange[1] < priceRange.max) count++
    if (selectedRating !== null) count++
    if (selectedMaterials.length > 0) count++
    if (selectedStyle !== null) count++
    if (selectedFeatures.length > 0) count++
    if (inStockOnly) count++
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  const applyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters({
        categories: selectedCategories,
        colors: selectedColors,
        sizes: selectedSizes,
        brands: selectedBrands,
        priceRange: selectedPriceRange,
        rating: selectedRating,
        materials: selectedMaterials,
        style: selectedStyle,
        features: selectedFeatures,
        inStock: inStockOnly,
        sort: selectedSort,
      })
    }
    setIsOpen(false)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setSelectedBrands([])
    setSelectedPriceRange([priceRange.min, priceRange.max])
    setSelectedRating(null)
    setSelectedMaterials([])
    setSelectedStyle(null)
    setSelectedFeatures([])
    setInStockOnly(false)
    
    if (onApplyFilters) {
      onApplyFilters({
        categories: [],
        colors: [],
        sizes: [],
        brands: [],
        priceRange: [priceRange.min, priceRange.max],
        rating: null,
        materials: [],
        style: null,
        features: [],
        inStock: false,
        sort: selectedSort,
      })
    }
  }

  // Toggle selection in an array
  const toggleSelection = (current: string[], value: string) => {
    if (current.includes(value)) {
      return current.filter(item => item !== value)
    } else {
      return [...current, value]
    }
  }

  // Toggle expanded state for a section
  const toggleExpanded = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    })
  }

  // Format price for display
  const formatPrice = (price: number) => {
    return `$${price}`
  }

  // Custom expandable tag component that supports multiselect
  const ExpandableTagSection = ({ 
    options, 
    values, 
    onChange, 
    label,
    section
  }: { 
    options: FilterOption[], 
    values: string[], 
    onChange: (values: string[]) => void,
    label: string,
    section: keyof typeof expandedSections
  }) => {
    const isExpanded = expandedSections[section]
    const visibleOptions = isExpanded ? options : options.slice(0, initialVisibleCount)
    const hasMore = options.length > initialVisibleCount
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{label}</Label>
          {values.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {values.length}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleOptions.map((option) => (
            <Badge
              key={option.id}
              variant={values.includes(option.id) ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-3 py-1",
                values.includes(option.id) ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={() => onChange(toggleSelection(values, option.id))}
            >
              {option.label}
              {values.includes(option.id) && <X className="ml-1 h-3 w-3" />}
            </Badge>
          ))}
        </div>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs w-full justify-between"
            onClick={() => toggleExpanded(section)}
          >
            {isExpanded ? "Show less" : `Show ${options.length - initialVisibleCount} more`}
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}
      </div>
    )
  }

  // Color swatch selector component
  const ColorSwatchSelector = ({
    colors,
    selectedColors,
    onChange,
    section
  }: {
    colors: ColorOption[],
    selectedColors: string[],
    onChange: (values: string[]) => void,
    section: keyof typeof expandedSections
  }) => {
    const isExpanded = expandedSections[section]
    const visibleColors = isExpanded ? colors : colors.slice(0, initialVisibleCount)
    const hasMore = colors.length > initialVisibleCount

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Color</Label>
          {selectedColors.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedColors.length}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleColors.map((color) => (
            <button
              key={color.id}
              className={cn(
                "w-8 h-8 rounded-full relative",
                selectedColors.includes(color.id) ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-muted"
              )}
              style={{ backgroundColor: color.hex }}
              onClick={() => onChange(toggleSelection(selectedColors, color.id))}
              title={color.label}
            >
              {selectedColors.includes(color.id) && (
                <CircleCheck className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md" />
              )}
              <span className="sr-only">{color.label}</span>
            </button>
          ))}
        </div>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs w-full justify-between"
            onClick={() => toggleExpanded(section)}
          >
            {isExpanded ? "Show less" : `Show ${colors.length - initialVisibleCount} more`}
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}
      </div>
    )
  }

  // Checkbox list component with expand/collapse
  const CheckboxList = ({
    options,
    selectedValues,
    onChange,
    label,
    section
  }: {
    options: FilterOption[],
    selectedValues: string[],
    onChange: (values: string[]) => void,
    label: string,
    section: keyof typeof expandedSections
  }) => {
    const isExpanded = expandedSections[section]
    const visibleOptions = isExpanded ? options : options.slice(0, initialVisibleCount)
    const hasMore = options.length > initialVisibleCount

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{label}</Label>
          {selectedValues.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedValues.length}
            </Badge>
          )}
        </div>
        <div className="grid gap-2">
          {visibleOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`${section}-${option.id}`} 
                checked={selectedValues.includes(option.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...selectedValues, option.id])
                  } else {
                    onChange(selectedValues.filter(id => id !== option.id))
                  }
                }}
              />
              <Label 
                htmlFor={`${section}-${option.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs w-full justify-between"
            onClick={() => toggleExpanded(section)}
          >
            {isExpanded ? "Show less" : `Show ${options.length - initialVisibleCount} more`}
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}
      </div>
    )
  }

  // Radio group component
  const StyleRadioGroup = ({
    options,
    selectedValue,
    onChange,
    label,
    section
  }: {
    options: FilterOption[],
    selectedValue: string | null,
    onChange: (value: string | null) => void,
    label: string,
    section: keyof typeof expandedSections
  }) => {
    const isExpanded = expandedSections[section]
    const visibleOptions = isExpanded ? options : options.slice(0, initialVisibleCount)
    const hasMore = options.length > initialVisibleCount

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">{label}</Label>
          {selectedValue && (
            <Badge variant="secondary" className="text-xs">
              1
            </Badge>
          )}
        </div>
        <RadioGroup 
          value={selectedValue || ""} 
          onValueChange={(value) => onChange(value || null)}
          className="grid gap-2"
        >
          {visibleOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <RadioGroupItem value={option.id} id={`${section}-${option.id}`} />
              <Label 
                htmlFor={`${section}-${option.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {hasMore && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-2 text-xs w-full justify-between"
            onClick={() => toggleExpanded(section)}
          >
            {isExpanded ? "Show less" : `Show ${options.length - initialVisibleCount} more`}
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
        )}
      </div>
    )
  }

  // Star rating selector
  const RatingSelector = ({
    selectedRating,
    onChange
  }: {
    selectedRating: number | null,
    onChange: (rating: number | null) => void
  }) => {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Rating</Label>
          {selectedRating && (
            <Badge variant="secondary" className="text-xs">
              1
            </Badge>
          )}
        </div>
        <div className="grid gap-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={cn(
                "flex items-center space-x-2 py-1 px-2 rounded-md text-sm",
                selectedRating === rating ? "bg-muted" : ""
              )}
              onClick={() => onChange(selectedRating === rating ? null : rating)}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < rating ? "fill-primary text-primary" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span>{rating}+ Stars</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Price range slider
  const PriceRangeSlider = ({
    range,
    value,
    onChange
  }: {
    range: { min: number, max: number, step?: number },
    value: [number, number],
    onChange: (value: [number, number]) => void
  }) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Price Range</Label>
          {(value[0] > range.min || value[1] < range.max) && (
            <Badge variant="secondary" className="text-xs">
              1
            </Badge>
          )}
        </div>
        <Slider
          defaultValue={value}
          min={range.min}
          max={range.max}
          step={range.step || 1}
          value={value}
          onValueChange={(value) => onChange(value as [number, number])}
          className="my-6"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm">{formatPrice(value[0])}</span>
          <span className="text-sm">{formatPrice(value[1])}</span>
        </div>
      </div>
    )
  }

  // Desktop filter view
  const DesktopFilters = () => (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
              className="h-9"
            >
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>
        
        <Separator />
        
        {availability && (
          <div className="flex items-center space-x-2">
            <Switch 
              id="in-stock" 
              checked={inStockOnly}
              onCheckedChange={setInStockOnly}
            />
            <Label htmlFor="in-stock" className="text-sm font-medium cursor-pointer">
              In Stock Only
            </Label>
          </div>
        )}
        
        {priceRange && (
          <PriceRangeSlider 
            range={priceRange}
            value={selectedPriceRange}
            onChange={setSelectedPriceRange}
          />
        )}
        
        {colors.length > 0 && (
          <ColorSwatchSelector 
            colors={colors} 
            selectedColors={selectedColors} 
            onChange={setSelectedColors}
            section="colors"
          />
        )}
        
        {sizes.length > 0 && (
          <ExpandableTagSection 
            options={sizes} 
            values={selectedSizes} 
            onChange={setSelectedSizes}
            label="Size"
            section="sizes"
          />
        )}
        
        {categories.length > 0 && (
          <CheckboxList 
            options={categories} 
            selectedValues={selectedCategories} 
            onChange={setSelectedCategories}
            label="Category"
            section="categories"
          />
        )}
        
        {ratings && (
          <RatingSelector 
            selectedRating={selectedRating}
            onChange={setSelectedRating}
          />
        )}
        
        {materials.length > 0 && (
          <CheckboxList 
            options={materials} 
            selectedValues={selectedMaterials} 
            onChange={setSelectedMaterials}
            label="Material"
            section="materials"
          />
        )}
        
        {styles.length > 0 && (
          <StyleRadioGroup 
            options={styles} 
            selectedValue={selectedStyle} 
            onChange={setSelectedStyle}
            label="Style"
            section="styles"
          />
        )}
        
        {features.length > 0 && (
          <CheckboxList 
            options={features} 
            selectedValues={selectedFeatures} 
            onChange={setSelectedFeatures}
            label="Features"
            section="features"
          />
        )}
        
        {brands.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="brand" className="text-sm font-medium">Brand</Label>
              {selectedBrands.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {selectedBrands.length}
                </Badge>
              )}
            </div>
            <Select 
              value={selectedBrands.length === 1 ? selectedBrands[0] : ""} 
              onValueChange={(value) => {
                if (value) setSelectedBrands([value])
                else setSelectedBrands([])
              }}
            >
              <SelectTrigger id="brand">
                <SelectValue placeholder={selectedBrands.length > 1 
                  ? `${selectedBrands.length} brands selected` 
                  : "Select brand"} 
                />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )

  // Mobile filter view (in a sheet/drawer)
  const MobileFilters = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your search with filters
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4 overflow-y-auto max-h-[calc(85vh-10rem)]">
          <div className="space-y-2">
            <Label htmlFor="mobile-sort" className="text-sm font-medium">Sort by</Label>
            <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
              <SelectTrigger id="mobile-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {availability && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="mobile-in-stock" 
                checked={inStockOnly}
                onCheckedChange={setInStockOnly}
              />
              <Label htmlFor="mobile-in-stock" className="text-sm font-medium cursor-pointer">
                In Stock Only
              </Label>
            </div>
          )}
          
          {priceRange && (
            <PriceRangeSlider 
              range={priceRange}
              value={selectedPriceRange}
              onChange={setSelectedPriceRange}
            />
          )}
          
          {colors.length > 0 && (
            <ColorSwatchSelector 
              colors={colors} 
              selectedColors={selectedColors} 
              onChange={setSelectedColors}
              section="colors"
            />
          )}
          
          {sizes.length > 0 && (
            <ExpandableTagSection 
              options={sizes} 
              values={selectedSizes} 
              onChange={setSelectedSizes}
              label="Size"
              section="sizes"
            />
          )}
          
          {categories.length > 0 && (
            <CheckboxList 
              options={categories} 
              selectedValues={selectedCategories} 
              onChange={setSelectedCategories}
              label="Category"
              section="categories"
            />
          )}
          
          {ratings && (
            <RatingSelector 
              selectedRating={selectedRating}
              onChange={setSelectedRating}
            />
          )}
          
          {materials.length > 0 && (
            <CheckboxList 
              options={materials} 
              selectedValues={selectedMaterials} 
              onChange={setSelectedMaterials}
              label="Material"
              section="materials"
            />
          )}
          
          {styles.length > 0 && (
            <StyleRadioGroup 
              options={styles} 
              selectedValue={selectedStyle} 
              onChange={setSelectedStyle}
              label="Style"
              section="styles"
            />
          )}
          
          {features.length > 0 && (
            <CheckboxList 
              options={features} 
              selectedValues={selectedFeatures} 
              onChange={setSelectedFeatures}
              label="Features"
              section="features"
            />
          )}
          
          {brands.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="mobile-brand" className="text-sm font-medium">Brand</Label>
                {selectedBrands.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedBrands.length}
                  </Badge>
                )}
              </div>
              <Select 
                value={selectedBrands.length === 1 ? selectedBrands[0] : ""} 
                onValueChange={(value) => {
                  if (value) setSelectedBrands([value])
                  else setSelectedBrands([])
                }}
              >
                <SelectTrigger id="mobile-brand">
                  <SelectValue placeholder={selectedBrands.length > 1 
                    ? `${selectedBrands.length} brands selected` 
                    : "Select brand"} 
                  />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
          >
            Clear all
          </Button>
          <Button onClick={applyFilters}>
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )

  // Render active filter tags for mobile view
  const renderActiveTags = () => {
    const allActiveTags = []
    
    if (selectedCategories.length > 0) {
      allActiveTags.push({
        id: 'categories',
        label: `Categories (${selectedCategories.length})`,
        type: 'group'
      })
    }
    
    if (selectedColors.length > 0) {
      allActiveTags.push({
        id: 'colors',
        label: `Colors (${selectedColors.length})`,
        type: 'group'
      })
    }
    
    if (selectedSizes.length > 0) {
      allActiveTags.push({
        id: 'sizes',
        label: `Sizes (${selectedSizes.length})`,
        type: 'group'
      })
    }
    
    if (selectedBrands.length > 0) {
      allActiveTags.push({
        id: 'brands',
        label: `Brands (${selectedBrands.length})`,
        type: 'group'
      })
    }
    
    if (selectedPriceRange[0] > priceRange.min || selectedPriceRange[1] < priceRange.max) {
      allActiveTags.push({
        id: 'price',
        label: `Price: ${formatPrice(selectedPriceRange[0])} - ${formatPrice(selectedPriceRange[1])}`,
        type: 'range'
      })
    }
    
    if (selectedRating !== null) {
      allActiveTags.push({
        id: 'rating',
        label: `${selectedRating}+ Stars`,
        type: 'rating'
      })
    }
    
    if (selectedMaterials.length > 0) {
      allActiveTags.push({
        id: 'materials',
        label: `Materials (${selectedMaterials.length})`,
        type: 'group'
      })
    }
    
    if (selectedStyle !== null) {
      allActiveTags.push({
        id: 'style',
        label: styles.find(s => s.id === selectedStyle)?.label || 'Style',
        type: 'single'
      })
    }
    
    if (selectedFeatures.length > 0) {
      allActiveTags.push({
        id: 'features',
        label: `Features (${selectedFeatures.length})`,
        type: 'group'
      })
    }
    
    if (inStockOnly) {
      allActiveTags.push({
        id: 'inStock',
        label: 'In Stock Only',
        type: 'toggle'
      })
    }

    return allActiveTags.map(tag => (
      <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
        {tag.label}
        <X 
          className="h-3 w-3 cursor-pointer" 
          onClick={() => {
            switch(tag.id) {
              case 'categories':
                setSelectedCategories([])
                break
              case 'colors':
                setSelectedColors([])
                break
              case 'sizes':
                setSelectedSizes([])
                break
              case 'brands':
                setSelectedBrands([])
                break
              case 'price':
                setSelectedPriceRange([priceRange.min, priceRange.max])
                break
              case 'rating':
                setSelectedRating(null)
                break
              case 'materials':
                setSelectedMaterials([])
                break
              case 'style':
                setSelectedStyle(null)
                break
              case 'features':
                setSelectedFeatures([])
                break
              case 'inStock':
                setInStockOnly(false)
                break
            }
          }} 
        />
      </Badge>
    ))
  }

  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <DesktopFilters />
      </div>
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <MobileFilters />
          <Select value={selectedSort || ""} onValueChange={setSelectedSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Show active filters as tags on mobile */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {renderActiveTags()}
            {activeFilterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
import CardFilter2A from "./filter-2"
export { CardFilter2A}