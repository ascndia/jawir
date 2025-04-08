"use client";

import * as React from "react";
import {
  CalendarIcon,
  Check,
  Filter,
  Loader2,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Calendar } from "@/registry/components/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";

import { ScrollArea } from "@/registry/components/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
import { Separator } from "@/registry/components/separator";
import { Badge } from "@/registry/components/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/components/popover";
import { Slider } from "@/registry/components/slider";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  type: "checkbox" | "radio" | "range" | "date" | "search" | "select";
  label: string;
  options?: FilterOption[];
  range?: {
    min: number;
    max: number;
    step?: number;
    unit?: string;
  };
  dateRange?: boolean;
  searchPlaceholder?: string;
  expanded?: boolean;
}

interface FilterDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApplyFilters?: (filters: Record<string, any>) => void;
  onResetFilters?: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  filterGroups?: FilterGroup[];
  initialFilters?: Record<string, any>;
}

export default function FilterDialog({
  open = false,
  onOpenChange,
  onApplyFilters,
  onResetFilters,
  isLoading = false,
  title = "Filter Data",
  description = "Refine your results with advanced filters",
  filterGroups = [
    {
      id: "category",
      type: "checkbox",
      label: "Category",
      options: [
        { id: "electronics", label: "Electronics", count: 245 },
        { id: "clothing", label: "Clothing", count: 186 },
        { id: "home", label: "Home & Kitchen", count: 132 },
        { id: "books", label: "Books", count: 87 },
        { id: "sports", label: "Sports & Outdoors", count: 65 },
      ],
      expanded: true,
    },
    {
      id: "price",
      type: "range",
      label: "Price Range",
      range: {
        min: 0,
        max: 1000,
        step: 10,
        unit: "$",
      },
    },
    {
      id: "rating",
      type: "radio",
      label: "Rating",
      options: [
        { id: "5", label: "5 Stars" },
        { id: "4", label: "4+ Stars" },
        { id: "3", label: "3+ Stars" },
        { id: "2", label: "2+ Stars" },
        { id: "1", label: "1+ Stars" },
      ],
    },
    {
      id: "date",
      type: "date",
      label: "Date Added",
      dateRange: true,
    },
    {
      id: "brand",
      type: "search",
      label: "Brand",
      searchPlaceholder: "Search brands...",
      options: [
        { id: "apple", label: "Apple", count: 42 },
        { id: "samsung", label: "Samsung", count: 38 },
        { id: "sony", label: "Sony", count: 27 },
        { id: "nike", label: "Nike", count: 23 },
        { id: "adidas", label: "Adidas", count: 19 },
        { id: "lg", label: "LG", count: 15 },
        { id: "bose", label: "Bose", count: 12 },
        { id: "dell", label: "Dell", count: 11 },
        { id: "hp", label: "HP", count: 10 },
        { id: "canon", label: "Canon", count: 8 },
      ],
    },
    {
      id: "availability",
      type: "select",
      label: "Availability",
      options: [
        { id: "in-stock", label: "In Stock" },
        { id: "out-of-stock", label: "Out of Stock" },
        { id: "pre-order", label: "Pre-Order" },
      ],
    },
  ],
  initialFilters = {},
}: FilterDialogProps) {
  const [filters, setFilters] =
    React.useState<Record<string, any>>(initialFilters);
  const [expandedGroups, setExpandedGroups] = React.useState<string[]>([]);
  const [brandSearchQuery, setBrandSearchQuery] = React.useState("");

  // Initialize expanded groups
  React.useEffect(() => {
    if (open) {
      const initialExpanded = filterGroups
        .filter((group) => group.expanded)
        .map((group) => group.id);

      setExpandedGroups(initialExpanded);
    }
  }, [open]);

  // Initialize filters with initial values
  // ...existing code...

  // Replace the problematic useEffect with this:
  React.useEffect(() => {
    if (open) {
      // Create a copy of initialFilters
      const newFilters = { ...initialFilters };

      // Initialize range filters with default values if not set
      filterGroups.forEach((group) => {
        if (group.type === "range" && !newFilters[group.id]) {
          newFilters[group.id] = [
            group.range?.min || 0,
            group.range?.max || 100,
          ];
        }
      });

      // Set filters once with all updates
      setFilters(newFilters);
    }
  }, [open]);

  // ...existing code...

  const handleCheckboxChange = (
    groupId: string,
    optionId: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const currentValues = prev[groupId] || [];

      if (checked) {
        return {
          ...prev,
          [groupId]: [...currentValues, optionId],
        };
      } else {
        return {
          ...prev,
          [groupId]: currentValues.filter((id: string) => id !== optionId),
        };
      }
    });
  };

  const handleRadioChange = (groupId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: value,
    }));
  };

  const handleRangeChange = (groupId: string, values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: values,
    }));
  };

  const handleDateChange = (
    groupId: string,
    field: "from" | "to",
    date: Date | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        [field]: date,
      },
    }));
  };

  const handleSelectChange = (groupId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [groupId]: value,
    }));
  };

  const handleSearchChange = (groupId: string, query: string) => {
    if (groupId === "brand") {
      setBrandSearchQuery(query);
    }
  };

  const handleToggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      if (prev.includes(groupId)) {
        return prev.filter((id) => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters?.(filters);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleResetFilters = () => {
    // Reset to initial filters or empty object
    const defaultFilters: Record<string, any> = {};

    // Initialize range filters with default values
    filterGroups.forEach((group) => {
      if (group.type === "range") {
        defaultFilters[group.id] = [
          group.range?.min || 0,
          group.range?.max || 100,
        ];
      }
    });

    setFilters(defaultFilters);
    setBrandSearchQuery("");
    onResetFilters?.();
  };

  const getActiveFilterCount = () => {
    let count = 0;

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // For checkbox groups and range sliders
        if (typeof value[0] === "string") {
          // Checkbox groups
          count += value.length;
        } else {
          // Range sliders - count as 1 if not at default values
          const group = filterGroups.find((g) => g.id === key);
          if (group?.type === "range") {
            const [min, max] = value as number[];
            if (min !== group.range?.min || max !== group.range?.max) {
              count += 1;
            }
          }
        }
      } else if (typeof value === "object" && value !== null) {
        // For date ranges
        if (value.from || value.to) {
          count += 1;
        }
      } else if (value !== undefined && value !== "") {
        // For radio buttons and selects
        count += 1;
      }
    });

    return count;
  };

  const filteredBrandOptions = React.useMemo(() => {
    const brandGroup = filterGroups.find((group) => group.id === "brand");
    if (!brandGroup || !brandGroup.options) return [];

    if (!brandSearchQuery.trim()) return brandGroup.options;

    return brandGroup.options.filter((option) =>
      option.label.toLowerCase().includes(brandSearchQuery.toLowerCase())
    );
  }, [brandSearchQuery, filterGroups]);

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderFilterGroup = (group: FilterGroup) => {
    const isExpanded = expandedGroups.includes(group.id);

    switch (group.type) {
      case "checkbox":
        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {filters[group.id]?.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters[group.id].length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-1">
                {group.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${group.id}-${option.id}`}
                      checked={(filters[group.id] || []).includes(option.id)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(group.id, option.id, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`${group.id}-${option.id}`}
                      className="flex flex-1 items-center justify-between text-sm"
                    >
                      {option.label}
                      {option.count !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          ({option.count})
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );

      case "radio":
        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {filters[group.id] && (
                  <Badge variant="secondary" className="ml-2">
                    {group.options?.find((o) => o.id === filters[group.id])
                      ?.label || filters[group.id]}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={filters[group.id] || ""}
                onValueChange={(value) => handleRadioChange(group.id, value)}
                className="space-y-2 pt-1"
              >
                {group.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.id}
                      id={`${group.id}-${option.id}`}
                    />
                    <Label
                      htmlFor={`${group.id}-${option.id}`}
                      className="text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        );

      case "range":
        if (!group.range) return null;
        const [min, max] = filters[group.id] || [
          group.range.min,
          group.range.max,
        ];
        const isDefault = min === group.range.min && max === group.range.max;

        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {!isDefault && (
                  <Badge variant="secondary" className="ml-2">
                    {group.range.unit || ""}
                    {min} - {group.range.unit || ""}
                    {max}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2 px-1">
                <Slider
                  defaultValue={[min, max]}
                  min={group.range.min}
                  max={group.range.max}
                  step={group.range.step || 1}
                  value={[min, max]}
                  onValueChange={(values) =>
                    handleRangeChange(group.id, values)
                  }
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <div className="rounded-md border px-2 py-1 text-xs">
                    {group.range.unit || ""}
                    {min}
                  </div>
                  <div className="rounded-md border px-2 py-1 text-xs">
                    {group.range.unit || ""}
                    {max}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );

      case "date":
        const dateValue = filters[group.id] || {};
        const hasDateFilter = dateValue.from || dateValue.to;

        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {hasDateFilter && (
                  <Badge variant="secondary" className="ml-2">
                    {dateValue.from && formatDate(dateValue.from)}
                    {dateValue.from && dateValue.to && " - "}
                    {dateValue.to && formatDate(dateValue.to)}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="grid gap-2">
                  <Label htmlFor={`${group.id}-from`} className="text-xs">
                    From
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`${group.id}-from`}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateValue.from ? (
                          formatDate(dateValue.from)
                        ) : (
                          <span className="text-muted-foreground">
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateValue.from}
                        onSelect={(date) =>
                          handleDateChange(group.id, "from", date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`${group.id}-to`} className="text-xs">
                    To
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`${group.id}-to`}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateValue.to ? (
                          formatDate(dateValue.to)
                        ) : (
                          <span className="text-muted-foreground">
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateValue.to}
                        onSelect={(date) =>
                          handleDateChange(group.id, "to", date)
                        }
                        initialFocus
                        disabled={(date) =>
                          dateValue.from ? date < dateValue.from : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );

      case "search":
        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {filters[group.id]?.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {filters[group.id].length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-1">
                <div className="relative">
                  <Input
                    placeholder={
                      group.searchPlaceholder ||
                      `Search ${group.label.toLowerCase()}...`
                    }
                    value={group.id === "brand" ? brandSearchQuery : ""}
                    onChange={(e) =>
                      handleSearchChange(group.id, e.target.value)
                    }
                    className="pr-8"
                  />
                  {brandSearchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setBrandSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                </div>

                <div className="max-h-[200px] overflow-auto pr-2">
                  {group.id === "brand" && filteredBrandOptions.length === 0 ? (
                    <p className="py-2 text-center text-sm text-muted-foreground">
                      No brands found
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {(group.id === "brand"
                        ? filteredBrandOptions
                        : group.options
                      )?.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${group.id}-${option.id}`}
                            checked={(filters[group.id] || []).includes(
                              option.id
                            )}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(
                                group.id,
                                option.id,
                                !!checked
                              )
                            }
                          />
                          <Label
                            htmlFor={`${group.id}-${option.id}`}
                            className="flex flex-1 items-center justify-between text-sm"
                          >
                            {option.label}
                            {option.count !== undefined && (
                              <span className="text-xs text-muted-foreground">
                                ({option.count})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );

      case "select":
        return (
          <AccordionItem key={group.id} value={group.id}>
            <AccordionTrigger className="py-3 text-sm">
              <div className="flex items-center justify-between w-full">
                <span>{group.label}</span>
                {filters[group.id] && (
                  <Badge variant="secondary" className="ml-2">
                    {group.options?.find((o) => o.id === filters[group.id])
                      ?.label || filters[group.id]}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Select
                value={filters[group.id] || ""}
                onValueChange={(value) => handleSelectChange(group.id, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={`Select ${group.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {group.options?.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        );

      default:
        return null;
    }
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Filter className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1.5">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <h3 className="font-medium">Filters</h3>
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount}</Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              disabled={activeFilterCount === 0}
              className="h-8 px-2 text-xs"
            >
              Reset All
            </Button>
          </div>

          <Separator className="my-4" />

          <ScrollArea className="max-h-[calc(90vh-220px)] pr-4">
            <Accordion
              type="multiple"
              value={expandedGroups}
              onValueChange={setExpandedGroups}
              className="space-y-2"
            >
              {filterGroups.map(renderFilterGroup)}
            </Accordion>
          </ScrollArea>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => onOpenChange?.(false)}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Apply Filters
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
