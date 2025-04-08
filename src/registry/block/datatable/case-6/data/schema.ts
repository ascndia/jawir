// filepath: c:\Coding\jawir\src\registry\block\datatable\case-6\data\schema.ts
import { z } from "zod"

// Schema for project management data
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  status: z.enum(["active", "completed", "pending", "canceled"]),
  dueDate: z.string(), // ISO date string
  progress: z.number().min(0).max(100),
  metadata: z.object({
    github: z.string().url().optional(),
    figma: z.string().url().optional(),
    gdrive: z.string().url().optional(),
    slack: z.string().url().optional(),
    jira: z.string().url().optional(),
  }).optional(),
})

export type Project = z.infer<typeof projectSchema>
