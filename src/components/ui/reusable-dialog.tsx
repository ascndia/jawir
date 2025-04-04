import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cva } from "class-variance-authority"
import { Separator } from "./separator"

const headerVariants = cva("", {
  variants: {
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    alignment: "center",
  },
})

interface ReusableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  headerAlignment?: "left" | "center" | "right"
}

export function ReusableDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  headerAlignment = "center",
}: ReusableDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-h-[90vh] overflow-y-auto", className)}>
        {(title || description) && (
          <DialogHeader className={headerVariants({ alignment: headerAlignment })}>
            {title && <DialogTitle className={headerVariants({ alignment: headerAlignment })}>{title}</DialogTitle>}
            {description && (
              <DialogDescription className={headerVariants({ alignment: headerAlignment })}>
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
