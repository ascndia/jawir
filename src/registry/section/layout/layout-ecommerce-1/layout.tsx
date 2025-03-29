"use client";

import Link from "next/link";
import {
  ChevronRight,
  Filter,
  Home,
  Menu,
  Minus,
  Package2,
  Plus,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import * as React from "react";
import { motion } from "framer-motion";

import { Badge } from "@/registry/components/badge";
import { Button } from "@/registry/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { Input } from "@/registry/components/input";
import { ScrollArea } from "@/registry/components/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/registry/components/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";
import { VisuallyHidden } from "@/registry/components/viusally-hidden/visually-hidden-1/visually-hidden";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/registry/components/breadcrumb";
import { Checkbox } from "@/registry/components/checkbox";
import { Slider } from "@/registry/components/slider";
import { Separator } from "@/registry/components/separator";

const categoryOptions = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Beauty",
  "Books",
  "Toys",
];

const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    quantity: 1,
    image: "/placeholder-product.jpg",
  },
];

interface LayoutProps {
  children: React.ReactNode;
  defaultRightSidebarOpen?: boolean;
}

export default function LayoutEcommerce1({
  children,
  defaultRightSidebarOpen = true,
}: LayoutProps) {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(
    defaultRightSidebarOpen
  );
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [cart, setCart] = React.useState(cartItems);

  const updateQuantity = (id: number, change: number) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
      {/* Left Sidebar - Product Filters */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">ShopNow</span>
            </Link>
          </div>

          <ScrollArea className="flex-1 px-4 py-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              <h3 className="font-medium text-lg">Filters</h3>
            </div>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="py-3">Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 ml-1">
                    {categoryOptions.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={`category-${category}`} />
                        <label
                          htmlFor={`category-${category}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="py-3">
                  Price Range
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-3   px-1">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rating">
                <AccordionTrigger className="py-3">Rating</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 ml-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${stars}`} />
                        <label
                          htmlFor={`rating-${stars}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {stars} Star{stars > 1 ? "s" : ""} & Up
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="availability">
                <AccordionTrigger className="py-3">
                  Availability
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 ml-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="in-stock" />
                      <label
                        htmlFor="in-stock"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="on-sale" />
                      <label
                        htmlFor="on-sale"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Header with search, breadcrumb, categories */}
        <header className="border-b bg-muted/40">
          <div className="flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle filters menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="flex flex-col px-0">
                <VisuallyHidden>
                  <SheetTitle>Product Filters</SheetTitle>
                </VisuallyHidden>
                <div className="border-b px-6 py-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    <h3 className="font-medium text-lg">Filters</h3>
                  </div>
                </div>
                <ScrollArea className="flex-1 px-6 py-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="category-mobile">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 ml-1">
                          {categoryOptions.map((category) => (
                            <div
                              key={`mobile-${category}`}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`mobile-category-${category}`} />
                              <label
                                htmlFor={`mobile-category-${category}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="price-mobile">
                      <AccordionTrigger>Price Range</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 px-1">
                          <Slider
                            defaultValue={[0, 1000]}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onValueChange={setPriceRange}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm">${priceRange[0]}</span>
                            <span className="text-sm">${priceRange[1]}</span>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rating-mobile">
                      <AccordionTrigger>Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2 ml-1">
                          {[5, 4, 3, 2, 1].map((stars) => (
                            <div
                              key={`mobile-${stars}`}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox id={`mobile-rating-${stars}`} />
                              <label
                                htmlFor={`mobile-rating-${stars}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {stars} Star{stars > 1 ? "s" : ""} & Up
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </ScrollArea>
                <div className="border-t p-6">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>

            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
                  />
                </div>
              </form>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Order History</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <span>Theme</span>
                  <span className="ml-auto">
                    <ModeToggle />
                  </span>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Help Center</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className="ml-2 relative hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
              <span className="sr-only">Toggle cart</span>
            </Button>
          </div>

          {/* <div className="px-4 py-2 lg:px-6 space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
                    <Home className="h-3 w-3 mr-1" />
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics">
                    Electronics
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/headphones">
                    Headphones
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex overflow-auto pb-2 gap-2">
              {categoryOptions.map((category) => (
                <Button
                  key={`category-btn-${category}`}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div> */}
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main Content - Products */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background">
            {children}
          </main>

          {/* Right Sidebar - Shopping Cart */}
          {isRightSidebarOpen && (
            <motion.aside
              className="w-80 border-l bg-muted/40 lg:block hidden overflow-y-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between border-b p-4 h-14 lg:h-[60px]">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart (
                  {cart.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsRightSidebarOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close cart</span>
                </Button>
              </div>

              <div className="p-4">
                {cart.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="flex px-4">
                          <div className="h-16 w-16 rounded-md bg-muted mr-4 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-7 w-7 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Separator className="my-2" />

                    <div className="flex items-center justify-between font-medium">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <Button className="w-full mt-4">Checkout</Button>
                    <Button variant="outline" className="w-full ">
                      View Cart
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h4 className="font-medium text-lg mb-1">
                      Your cart is empty
                    </h4>
                    <p className="text-sm text-muted-foreground text-center mb-6">
                      Looks like you haven't added any products to your cart
                      yet.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsRightSidebarOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </div>
  );
}
