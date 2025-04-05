"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type LucideIcon, PlusCircle } from "lucide-react"

interface EmptyStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  actionLabel?: string
  actionIcon?: LucideIcon
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon = PlusCircle,
  title = "No data",
  description = "No data available",
  actionLabel = "Add",
  actionIcon: ActionIcon = PlusCircle,
  onAction ,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-muted/40 p-8 text-center",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icon className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-center text-sm text-muted-foreground">{description}</p>
        {actionLabel && (
          <Button onClick={onAction} className="mt-6" size="sm">
            {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

