import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import Button from "@/registry/components/button/button-shadcn/button";
import { ShoppingBag, DollarSign, ArrowRight } from "lucide-react";
import { AspectRatio } from "@/registry/components/aspect-ratio"; // Assuming named export

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  conversions: number;
  revenue: number;
  productLink?: string; // Link to the product page
}

interface AffiliateTopProductsCardProps {
  products?: Product[];
  title?: string;
  description?: string;
  currencySymbol?: string;
  viewAllLink?: string;
}

const defaultProducts: Product[] = [
  {
    id: "p1",
    name: "Premium Wireless Headphones",
    imageUrl: "/images/placeholder.svg", // Replace with actual image path
    conversions: 152,
    revenue: 15180.5,
    productLink: "#product1",
  },
  {
    id: "p2",
    name: "Smart Fitness Tracker Watch",
    imageUrl: "/images/placeholder.svg", // Replace with actual image path
    conversions: 98,
    revenue: 9750.0,
    productLink: "#product2",
  },
  {
    id: "p3",
    name: "Organic Matcha Green Tea Powder",
    imageUrl: "/images/placeholder.svg", // Replace with actual image path
    conversions: 210,
    revenue: 5250.0,
  },
];

export function CardAffiliateTopProducts1({
  products = defaultProducts,
  title = "Top Performing Products",
  description = "Products driving the most conversions through your links.",
  currencySymbol = "$",
  viewAllLink = "#",
}: AffiliateTopProductsCardProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          {viewAllLink && (
            <Button variant="link" size="sm" className="text-sm" asChild>
              <a href={viewAllLink}>
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <React.Fragment key={product.id}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                    {/* Using AspectRatio to maintain image proportions */}
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill // Use fill with parent having position relative (implied by AspectRatio)
                        className="object-cover"
                        sizes="(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 4rem" // Basic example sizes
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {product.revenue.toFixed(2)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {product.conversions} Conv.
                      </span>
                    </div>
                  </div>
                  {product.productLink && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Button>
                  )}
                </div>
                {index < products.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No product performance data available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateTopProducts1;
