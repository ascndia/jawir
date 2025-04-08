// filepath: c:\Coding\jawir\src\registry\block\datatable\case-6\components\data-table-row-actions.tsx
"use client"

import { Row } from "@tanstack/react-table"
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Copy, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  ExternalLink 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { metadataTypes, projectStatuses } from "../data/data"
import { projectSchema } from "../data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const project = projectSchema.parse(row.original)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <Edit className="mr-2 h-3.5 w-3.5" />
          Edit Project
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-3.5 w-3.5" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {/* Status submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Clock className="mr-2 h-3.5 w-3.5" />
            <span>Status</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={project.status}>
              {projectStatuses.map((status) => (
                <DropdownMenuRadioItem key={status.value} value={status.value}>
                  <status.icon className="mr-2 h-3.5 w-3.5" />
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        
        {/* Project links/metadata section */}
        {project.metadata && Object.keys(project.metadata).length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Project Links</DropdownMenuLabel>
            
            {metadataTypes.map((type) => {
              const url = project.metadata?.[type.key as keyof typeof project.metadata]
              if (!url) return null
              
              return (
                <DropdownMenuItem key={type.key} asChild>
                  <a 
                    href={url as string} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <type.icon className="mr-2 h-3.5 w-3.5" />
                    {type.label}
                    <ExternalLink className="ml-auto h-3 w-3" />
                  </a>
                </DropdownMenuItem>
              )
            })}
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash className="mr-2 h-3.5 w-3.5" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
