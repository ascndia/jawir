"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DialogContentSection, DialogMediaSection, FlexibleDialog, FlexibleDialogLayout } from "@/components/ui/reusable-dialog"

interface DialogProduct1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mediaPosition?: "left" | "right"
  product?: {
    name: string
    description: string
    price: number
    imageSrc: string
    discount?: number
  }
}

const productDefault = {
    name: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day listening.",
    price: 299.99,
    imageSrc: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    discount: 15,
  }

export function DialogProduct1A({ open, onOpenChange, mediaPosition = "left", product = productDefault }: DialogProduct1AProps) {
  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price

  return (
    <FlexibleDialog title="Product" open={open} onOpenChange={onOpenChange}>
      <FlexibleDialogLayout
        mediaPosition={mediaPosition}
        mediaSection={<DialogMediaSection type="image" src={product.imageSrc} alt={product.name} />}
        contentSection={
          <DialogContentSection title={product.name}>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mt-2">
                {product.discount && (
                  <>
                    <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
                    <span className="text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    <Badge variant="destructive" className="ml-2">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
                {!product.discount && <span className="text-xl font-bold">${product.price.toFixed(2)}</span>}
              </div>

              <p className="mt-4 text-muted-foreground">{product.description}</p>

              <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-2">
                <Button className="flex-1">Add to Cart</Button>
                <Button variant="outline" className="flex-1">
                  Save for Later
                </Button>
              </div>
            </div>
          </DialogContentSection>
        }
      />
    </FlexibleDialog>
  )
}
