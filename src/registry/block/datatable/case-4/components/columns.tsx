"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card"
import { SquareArrowOutUpRight, Star } from "lucide-react"

import { categories, productStatuses } from "../data/data"
import { Product } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product ID" />
    ),
    cell: ({ row }) => <div className="w-[90px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[300px] truncate font-medium">
          {row.getValue("name")}
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = categories.find(
        (cat) => cat.value === row.getValue("category")
      )

      if (!category) {
        return <div>{row.getValue("category")}</div>
      }

      return (
        <div className="flex items-center">
          {category.icon && (
            <category.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{category.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = productStatuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return <div>{row.getValue("status")}</div>
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[300px] truncate text-muted-foreground">
          {row.getValue("description")}
        </div>
      )
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[]
      const displayTags = tags.slice(0, 2)
      const remainingCount = tags.length - 2

      return (
        <div className="flex flex-wrap gap-1">
          {displayTags.map((tag) => (
            <Badge key={tag} variant="outline" className="px-1 py-0 text-xs">
              {tag}
            </Badge>
          ))}
          
          {remainingCount > 0 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Badge variant="secondary" className="px-1 py-0 text-xs cursor-pointer">
                  +{remainingCount}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-auto p-2" align="center">
                <div className="flex flex-wrap gap-1">
                  {tags.slice(2).map((tag) => (
                    <Badge key={tag} variant="outline" className="px-1 py-0 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "seller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Seller" />
    ),
    cell: ({ row }) => {
      const seller = row.getValue("seller") as { 
        name: string; 
        rating?: string;
        location?: string;
      }
      
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="cursor-pointer font-medium underline-offset-2 hover:underline">
              {seller.name}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-60" align="center">
            <div className="space-y-2">
                <div className="flex justify-between items-center">

                    <h4 className="text-sm font-semibold">{seller.name}</h4>
                    <Button size={"sm"} variant={"link"} className="flex items-center gap-1">
                        <SquareArrowOutUpRight className="h-2 w-2" />
                        <span className="ml-1 text-sm">View Profile</span>
                    </Button>
                </div>
              
              {seller.rating && (
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{seller.rating}</span>
                </div>
              )}
              
              {seller.location && (
                <div className="text-sm text-muted-foreground">
                  {seller.location}
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]