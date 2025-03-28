import { useState } from "react";
import { Button } from "@/registry/components/button/select";
import {
  Star,
  Truck,
  ShieldCheck,
  Heart,
  ChevronRight,
  ChevronLeft,
  Check,
  Info,
} from "lucide-react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { Badge } from "@/registry/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

export default function ProductOverview() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const productImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    "https://images.unsplash.com/photo-1622434641406-a158123450f9",
  ];

  const reviews = [
    {
      id: 1,
      author: "Alex Johnson",
      rating: 5,
      comment:
        "Absolutely love this watch! The quality is outstanding and it looks even better in person.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      author: "Sarah Miller",
      rating: 4,
      comment:
        "Great watch for the price. The leather strap is comfortable and the design is elegant.",
      date: "1 month ago",
    },
    {
      id: 3,
      author: "David Chen",
      rating: 5,
      comment:
        "Excellent craftsmanship. I've received many compliments wearing this watch.",
      date: "2 months ago",
    },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <a href="#" className="hover:underline">
          Home
        </a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <a href="#" className="hover:underline">
          Watches
        </a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">Classic Leather Watch</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <Image
              src={productImages[currentImage]}
              alt="Modern watch with leather strap"
              className="object-cover w-full h-full"
              width={700}
              height={700}
            />
            <div className="absolute top-4 right-4">
              <Button
                size="icon"
                variant="outline"
                className={`rounded-full bg-background/80 backdrop-blur-sm ${
                  isFavorite ? "text-red-500" : ""
                }`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`}
                />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImage === index ? "bg-primary" : "bg-background/80"
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  currentImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              New Arrival
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">4.9</span>
              <a
                href="#reviews"
                className="text-sm text-muted-foreground hover:underline"
              >
                (128 reviews)
              </a>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Classic Leather Watch</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-bold">$299.00</span>
            <span className="text-lg text-muted-foreground line-through">
              $399.00
            </span>
            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              Save 25%
            </Badge>
          </div>

          <p className="text-muted-foreground mb-6">
            Elevate your style with our Classic Leather Watch. Featuring premium
            materials, precise movement, and timeless design that complements
            any outfit.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>In Stock</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ships within 24 hours</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>2 Year Warranty</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Color</span>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </button>
                <button className="w-8 h-8 rounded-full bg-amber-800"></button>
                <button className="w-8 h-8 rounded-full bg-slate-200"></button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Size</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size={"sm"}
                  className="border-primary text-primary"
                >
                  38mm
                </Button>
                <Button variant="outline" size={"sm"}>
                  42mm
                </Button>
                <Button variant="outline" size={"sm"}>
                  44mm
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                  onClick={decrementQuantity}
                >
                  -
                </Button>
                <div className="px-4 py-2 border-y border-x-0 border-input w-16 text-center">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                  onClick={incrementQuantity}
                >
                  +
                </Button>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4 mt-8">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Buy Now
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t">
            <Tabs defaultValue="description">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" id="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Our Classic Leather Watch combines timeless design with modern
                  functionality. The genuine leather strap ages beautifully with
                  wear, developing a unique patina over time. The stainless
                  steel case houses a precision Japanese movement that ensures
                  accurate timekeeping for years to come.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Water-resistant up to 50 meters, this versatile timepiece is
                  suitable for everyday wear and can withstand splashes and
                  brief immersion in water. The minimalist dial features
                  luminous hands for visibility in low-light conditions.
                </p>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Case Material</span>
                    <span>316L Stainless Steel</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Movement</span>
                    <span>Japanese Quartz</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Water Resistance</span>
                    <span>5 ATM (50 meters)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Strap</span>
                    <span>Genuine Leather</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Glass</span>
                    <span>Sapphire Crystal</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <span className="font-medium">Battery Life</span>
                    <span>Approximately 3 years</span>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{review.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
