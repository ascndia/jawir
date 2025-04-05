import Image from "next/image"
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
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { VisuallyHidden } from "react-aria"

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

export interface FlexibleDialogLayoutProps {
  mediaSection: React.ReactNode
  contentSection: React.ReactNode
  mediaPosition?: "left" | "right"
  className?: string
}

export function FlexibleDialogLayout({
  mediaSection,
  contentSection,
  mediaPosition = "left",
  className,
}: FlexibleDialogLayoutProps) {
  const isMediaLeft = mediaPosition === "left"

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2", className)}>
      <div className={cn("flex items-center justify-center", isMediaLeft ? "order-1" : "order-2")}>{mediaSection}</div>
      <div className={cn("flex flex-col p-6", isMediaLeft ? "order-2" : "order-1")}>{contentSection}</div>
    </div>
  )
}

export interface DialogContentSectionProps {
  title?: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function DialogContentSection({ title, description, className, children }: DialogContentSectionProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
      <div className="mt-4 flex-1">{children}</div>
    </div>
  )
}


export interface DialogMediaSectionProps {
  type: "image" | "video" | "custom"
  src?: string
  alt?: string
  className?: string
  children?: React.ReactNode
  bgColor?: string
}

export function DialogMediaSection({
  type,
  src,
  alt = "Dialog media",
  className,
  children,
  bgColor = "bg-sky-100",
}: DialogMediaSectionProps) {
  return (
    <div className={cn("h-full w-full", bgColor, className)}>
      {type === "image" && src && (
        <div className="relative h-full w-full min-h-[300px]">
          <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
        </div>
      )}

      {type === "video" && src && (
        <div className="relative h-full w-full min-h-[300px]">
          <video src={src} className="h-full w-full object-cover" controls={false} autoPlay muted loop />
        </div>
      )}

      {type === "custom" && <div className="h-full w-full flex items-center justify-center">{children}</div>}
    </div>
  )
}

export interface FlexibleDialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  children: React.ReactNode,
  title: string,
}

export function FlexibleDialog({ children, title = "", ...props }: FlexibleDialogProps) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-lg border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[90vh] overflow-y-auto">
          <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <VisuallyHidden>
              <DialogPrimitive.DialogTitle>{title}</DialogPrimitive.DialogTitle>
            </VisuallyHidden>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

