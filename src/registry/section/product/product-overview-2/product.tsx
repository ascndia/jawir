import { Button } from "@/registry/components/button/select";
import { Star, Truck, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";

export default function ProductOverview() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Modern watch with leather strap"
            className="object-cover w-full h-full"
            width={700}
            height={700}
          />
          <div className="absolute top-4 right-4">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              New Arrival
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Classic Leather Watch</h1>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-2xl font-bold">$299.00</span>
            <span className="text-lg text-muted-foreground line-through">
              $399.00
            </span>
            <span className="text-sm font-medium text-green-600">Save 25%</span>
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

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Color</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                <button className="w-8 h-8 rounded-full bg-brown-500"></button>
                <button className="w-8 h-8 rounded-full bg-slate-200"></button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium">Select Size</span>
              <div className="flex gap-2">
                <Button variant="outline" size={"sm"}>
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
          </div>

          <div className="flex w-full gap-4 mt-8">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
