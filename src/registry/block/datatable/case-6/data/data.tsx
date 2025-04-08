// filepath: c:\Coding\jawir\src\registry\block\datatable\case-6\data\data.tsx
import {
  CircleCheck,
  Clock,
  AlertCircle,
  XCircle,
  Github,
  Figma,
  FolderGit2,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react"

export const projectStatuses = [
  {
    value: "active",
    label: "Active",
    icon: Clock,
    variant: "default" as const,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
    variant: "success" as const,
  },
  {
    value: "pending",
    label: "Pending",
    icon: AlertCircle,
    variant: "warning" as const,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
    variant: "destructive" as const,
  },
]

export const metadataTypes = [
  {
    key: "github",
    label: "GitHub",
    icon: Github,
  },
  {
    key: "figma",
    label: "Figma",
    icon: Figma,
  },
  {
    key: "gdrive",
    label: "Google Drive",
    icon: FolderGit2,
  },
  {
    key: "slack",
    label: "Slack",
    icon: MessageSquare,
  },
  {
    key: "jira",
    label: "Jira",
    icon: FileSpreadsheet,
  },
]
