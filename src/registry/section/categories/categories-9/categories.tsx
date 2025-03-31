import Link from "next/link";
import { Button } from "@/registry/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card";
import { Badge } from "@/registry/components/badge";
import {
  ArrowRight,
  ChevronRight,
  Monitor,
  ShoppingBag,
  Gamepad2,
  BookOpen,
  Home,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion";

const categories = [
  {
    name: "Electronics",
    description: "Explore the latest gadgets and tech.",
    icon: Monitor,
    color: "from-blue-500 to-cyan-400", // Gradient colors
    subcategories: [
      { name: "Laptops & Computers", href: "#" },
      { name: "Smartphones & Tablets", href: "#" },
      { name: "Audio & Headphones", href: "#" },
      { name: "Cameras & Photography", href: "#" },
      { name: "Wearable Technology", href: "#" }, // New
      { name: "Smart Home Devices", href: "#" }, // New
    ],
  },
  {
    name: "Fashion",
    description: "Discover trendy apparel and accessories.",
    icon: ShoppingBag,
    color: "from-pink-500 to-rose-400", // Gradient colors
    subcategories: [
      { name: "Men's Clothing", href: "#" },
      { name: "Women's Clothing", href: "#" },
      { name: "Shoes & Footwear", href: "#" },
      { name: "Accessories", href: "#" },
      { name: "Sportswear", href: "#" }, // New
      { name: "Luxury Fashion", href: "#" }, // New
    ],
  },
  {
    name: "Gaming",
    description: "Level up with the latest games and consoles.",
    icon: Gamepad2,
    color: "from-green-500 to-emerald-400", // Gradient colors
    subcategories: [
      { name: "Gaming Consoles", href: "#" },
      { name: "PC Gaming", href: "#" },
      { name: "Gaming Accessories", href: "#" },
      { name: "Video Games", href: "#" },
      { name: "VR Gaming", href: "#" }, // New
      { name: "Gaming Chairs", href: "#" }, // New
    ],
  },
  {
    name: "Books",
    description: "Dive into a world of literature and knowledge.",
    icon: BookOpen,
    color: "from-orange-500 to-amber-400", // Gradient colors
    subcategories: [
      { name: "Fiction", href: "#" },
      { name: "Non-Fiction", href: "#" },
      { name: "Children's Books", href: "#" },
      { name: "Textbooks & Education", href: "#" },
      { name: "Audiobooks", href: "#" }, // New
      { name: "Comics & Graphic Novels", href: "#" }, // New
    ],
  },
  {
    name: "Home & Living",
    description: "Furnish and decorate your living space.",
    icon: Home,
    color: "from-purple-500 to-indigo-400", // Gradient colors
    subcategories: [
      { name: "Furniture", href: "#" },
      { name: "Home Decor", href: "#" },
      { name: "Kitchen & Dining", href: "#" },
      { name: "Bed & Bath", href: "#" },
      { name: "Outdoor & Garden", href: "#" }, // New
      { name: "Lighting", href: "#" }, // New
    ],
  },
];

export default function Categories9() {
  return (
    <section className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Browse Categories
          </h2>
          <Button variant="outline" asChild>
            <Link href="#">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Accordion type="multiple" className="space-y-4">
          {categories.map((category) => (
            <AccordionItem
              key={category.name}
              value={category.name}
              className="rounded-lg border"
            >
              <AccordionTrigger className="p-6 hover:no-underline">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pt-0">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {category.subcategories.map((subcategory) => (
                    <Button
                      key={subcategory.name}
                      variant="ghost"
                      className="h-auto justify-start text-left"
                      asChild
                    >
                      <Link href={subcategory.href}>
                        <span className="text-sm font-medium">
                          {subcategory.name}
                        </span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}