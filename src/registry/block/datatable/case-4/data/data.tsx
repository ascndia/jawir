import {
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  Smartphone,
  Shirt,
  BookOpen,
  ShoppingBag,
  Coffee,
} from "lucide-react"

export const productStatuses = [
  {
    value: "in stock",
    label: "In Stock",
    icon: CheckCircle,
  },
  {
    value: "low stock",
    label: "Low Stock",
    icon: AlertCircle,
  },
  {
    value: "out of stock",
    label: "Out of Stock",
    icon: Package,
  },
  {
    value: "pre-order",
    label: "Pre-Order",
    icon: Clock,
  },
]

export const categories = [
  {
    value: "electronics",
    label: "Electronics",
    icon: Smartphone,
  },
  {
    value: "clothing",
    label: "Clothing",
    icon: Shirt,
  },
  {
    value: "books",
    label: "Books",
    icon: BookOpen,
  },
  {
    value: "accessories",
    label: "Accessories",
    icon: ShoppingBag,
  },
  {
    value: "other",
    label: "Other",
    icon: Coffee,
  },
]