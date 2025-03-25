import {
    Breadcrumb as BreadcrumbComponent,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/registry/components/breadcrumb";
  import { ChevronRight, Home, ShoppingBag, Layers, Laptop } from "lucide-react";
  
  export default function Breadcrumb() {
    return (
      <BreadcrumbComponent className="p-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/products" className="flex items-center gap-1">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Products</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/products/categories"
              className="flex items-center gap-1"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Categories</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1 font-medium">
              <Laptop className="h-3.5 w-3.5" />
              <span>Electronics</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbComponent>
    );
  }
  