import { z } from "zod"

// Schema for e-commerce product data
export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(), // Using string for formatted prices like "$19.99"
  description: z.string(),
  category: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
  seller: z.object({
    name: z.string(),
    rating: z.string().optional(), // Optional rating like "4.5/5"
    location: z.string().optional(),
  }),
})

export type Product = z.infer<typeof productSchema>