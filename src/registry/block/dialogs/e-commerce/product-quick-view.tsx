"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Loader2,
  MinusCircle,
  PlusCircle,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Calendar } from "@/registry/components/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Label } from "@/registry/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { ScrollArea } from "@/registry/components/scroll-area";
import { Separator } from "@/registry/components/separator";
import { Badge } from "@/registry/components/badge";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
}

interface ProductOption {
  name: string;
  values: string[];
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  content: string;
}

interface ProductQuickViewDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onAddToCart?: (data: {
    variantId: string;
    quantity: number;
    options: Record<string, string>;
  }) => void;
  onWishlist?: (variantId: string) => void;
  onShare?: () => void;
  isLoading?: boolean;
  product?: {
    id: string;
    title: string;
    description: string;
    images: ProductImage[];
    variants: ProductVariant[];
    options: ProductOption[];
    reviews: ProductReview[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    tags?: string[];
  };
}

export default function ProductQuickViewDialog({
  open = false,
  onOpenChange,
  onAddToCart,
  onWishlist,
  onShare,
  isLoading = false,
  product = {
    id: "prod-1",
    title: "Premium Wireless Headphones",
    description:
      "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    images: [
      {
        id: "img-1",
        url: "/placeholder.svg?height=400&width=400",
        alt: "Black wireless headphones front view",
      },
      {
        id: "img-2",
        url: "/placeholder.svg?height=400&width=400",
        alt: "Black wireless headphones side view",
      },
      {
        id: "img-3",
        url: "/placeholder.svg?height=400&width=400",
        alt: "Black wireless headphones with case",
      },
    ],
    variants: [
      {
        id: "var-1",
        name: "Black",
        price: 199.99,
        compareAtPrice: 249.99,
        available: true,
      },
      {
        id: "var-2",
        name: "White",
        price: 199.99,
        compareAtPrice: 249.99,
        available: true,
      },
      {
        id: "var-3",
        name: "Rose Gold",
        price: 219.99,
        compareAtPrice: 269.99,
        available: false,
      },
    ],
    options: [
      {
        name: "Color",
        values: ["Black", "White", "Rose Gold"],
      },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Alex Johnson",
        rating: 5,
        date: "2023-05-15",
        title: "Best headphones I've ever owned",
        content:
          "The sound quality is amazing and the noise cancellation works perfectly. Battery life is impressive too!",
      },
      {
        id: "rev-2",
        author: "Sam Smith",
        rating: 4,
        date: "2023-04-22",
        content:
          "Great headphones overall. Comfortable to wear for long periods. The only downside is they're a bit bulky for travel.",
      },
    ],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    tags: ["Wireless", "Noise Cancellation", "Bluetooth 5.0"],
  },
}: ProductQuickViewDialogProps) {
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>("");
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = React.useState(1);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const selectedVariant = React.useMemo(() => {
    return (
      product.variants.find((v) => v.id === selectedVariantId) ||
      product.variants[0]
    );
  }, [selectedVariantId, product.variants]);

  React.useEffect(() => {
    if (open && product.variants.length > 0) {
      // Set first available variant as default
      const defaultVariant =
        product.variants.find((v) => v.available) || product.variants[0];
      setSelectedVariantId(defaultVariant.id);

      // Set first option values as default
      const defaultOptions: Record<string, string> = {};
      product.options.forEach((option) => {
        defaultOptions[option.name] = option.values[0];
      });
      setSelectedOptions(defaultOptions);

      // Reset quantity and image index
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [open]);
  // }, [open, product.variants, product.options]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));

    // Find matching variant based on selected options
    const matchingVariant = product.variants.find(
      (variant) => variant.name === value && variant.available
    );

    if (matchingVariant) {
      setSelectedVariantId(matchingVariant.id);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !selectedVariant.available) return;

    onAddToCart?.({
      variantId: selectedVariant.id,
      quantity,
      options: selectedOptions,
    });
  };

  const handleWishlist = () => {
    onWishlist?.(selectedVariant.id);
  };

  const handleShare = () => {
    onShare?.();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => {
      const filled = index < Math.floor(rating);
      const halfFilled =
        !filled && index < Math.ceil(rating) && rating % 1 !== 0;

      return (
        <Star
          key={index}
          className={`h-4 w-4 ${
            filled || halfFilled ? "text-warning" : "text-muted-foreground"
          }`}
          fill={
            filled ? "currentColor" : halfFilled ? "url(#half-star)" : "none"
          }
        />
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Product Images */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={
                  product.images[currentImageIndex]?.url || "/placeholder.svg"
                }
                alt={product.images[currentImageIndex]?.alt || product.title}
                className="h-full w-full object-cover transition-all"
              />

              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </>
              )}

              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <Badge variant="destructive" className="text-sm">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border ${
                      index === currentImageIndex
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-muted hover:border-muted-foreground/50"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <DialogHeader className="text-left">
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl font-bold sm:text-2xl">
                    {product.title}
                  </DialogTitle>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlist}
                    className="h-8 w-8"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="h-8 w-8"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share product</span>
                  </Button>
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">
                    {formatCurrency(selectedVariant.price)}
                  </span>
                  {selectedVariant.compareAtPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatCurrency(selectedVariant.compareAtPrice)}
                    </span>
                  )}
                  {selectedVariant.compareAtPrice && (
                    <Badge variant="secondary" className="ml-2">
                      {Math.round(
                        (1 -
                          selectedVariant.price /
                            selectedVariant.compareAtPrice) *
                          100
                      )}
                      % Off
                    </Badge>
                  )}
                </div>

                <DialogDescription className="mt-2">
                  {product.description}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              {/* Product Options */}
              {product.options.map((option) => (
                <div key={option.name} className="space-y-2">
                  <Label>{option.name}</Label>
                  <RadioGroup
                    value={selectedOptions[option.name] || ""}
                    onValueChange={(value) =>
                      handleOptionChange(option.name, value)
                    }
                    className="flex flex-wrap gap-2"
                  >
                    {option.values.map((value) => {
                      const matchingVariant = product.variants.find(
                        (v) => v.name === value
                      );
                      const isAvailable = matchingVariant?.available;

                      return (
                        <div key={value} className="flex items-center">
                          <RadioGroupItem
                            value={value}
                            id={`option-${option.name}-${value}`}
                            disabled={!isAvailable}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`option-${option.name}-${value}`}
                            className={`rounded-md border px-3 py-2 text-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 ${
                              isAvailable
                                ? "cursor-pointer hover:bg-muted"
                                : "cursor-not-allowed opacity-50"
                            }`}
                          >
                            {value}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              ))}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || !selectedVariant.available}
                    className="h-9 w-9"
                  >
                    <MinusCircle className="h-4 w-4" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <div className="w-12 text-center">
                    <span className="text-sm font-medium">{quantity}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={!selectedVariant.available}
                    className="h-9 w-9"
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="mt-6 flex-col items-stretch gap-2 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                onClick={handleWishlist}
                className="sm:w-auto"
              >
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant.available || isLoading}
                className="sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </div>

        {/* Product Tabs (Description, Reviews, etc.) */}
        <Separator className="my-6" />

        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-4">
            <div className="text-sm">
              <p>{product.description}</p>
              <ul className="mt-4 list-inside list-disc space-y-1">
                <li>Premium sound quality with deep bass</li>
                <li>Active noise cancellation technology</li>
                <li>30-hour battery life on a single charge</li>
                <li>Comfortable over-ear design with memory foam cushions</li>
                <li>Bluetooth 5.0 with multi-device connectivity</li>
                <li>Built-in microphone for calls</li>
                <li>Foldable design for easy storage and travel</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm font-medium">
                    {product.rating.toFixed(1)} out of 5
                  </span>
                </div>
                <Button size="sm">Write a Review</Button>
              </div>

              <Separator />

              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{review.author}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(review.date)}
                        </div>
                      </div>
                      <div className="flex">{renderStars(review.rating)}</div>
                      {review.title && (
                        <div className="font-medium">{review.title}</div>
                      )}
                      <p className="text-sm">{review.content}</p>
                      <Separator />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-4">
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="mt-1">
                  Free standard shipping on orders over $50. Expedited and
                  international shipping options available at checkout.
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Standard Shipping: 3-5 business days</li>
                  <li>Expedited Shipping: 1-2 business days</li>
                  <li>International Shipping: 7-14 business days</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium">Returns & Exchanges</h4>
                <p className="mt-1">
                  We offer a 30-day return policy for unused items in original
                  packaging. Return shipping is free for defective items.
                </p>
                <p className="mt-2">
                  To initiate a return, please contact our customer service team
                  with your order number and reason for return.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
