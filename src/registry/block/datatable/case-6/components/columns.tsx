// filepath: c:\Coding\jawir\src\registry\block\datatable\case-6\components\columns.tsx
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"

import { projectStatuses } from "../data/data"
import { Project } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Project>[] = [
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
      <DataTableColumnHeader column={column} title="Project ID" />
    ),
    cell: ({ row }) => <div className="w-[80px] font-medium">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[250px] truncate font-medium">
          {row.getValue("name")}
        </div>
      )
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => <div className="w-[140px]">{row.getValue("owner")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = projectStatuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return <div>{row.getValue("status")}</div>
      }

      return (
        <Badge variant={(status.variant as "default" | "destructive" | "secondary" | "outline") || "default"} className="capitalize">
          <status.icon className="mr-1 h-3.5 w-3.5" />
          <span>{status.label}</span>
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("dueDate"))
      const formattedDate = format(date, "MMM d, yyyy")
      const today = new Date()
      const isPastDue = date < today
      
      return (
        <div className={`w-[120px] ${isPastDue ? "text-red-500" : ""}`}>
          {formattedDate}
        </div>
      )
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number
      
      return (
        <div className="w-[180px] flex items-center gap-2">
          <Progress  value={progress} className="h-2 " />
          <span className="w-10 text-xs text-muted-foreground">{progress}%</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
