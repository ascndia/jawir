"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type TabItem = {
  id: string
  label: string
  content: React.ReactNode
}

interface DialogWithLayoutProps {
  title?: string
  description?: string
  tabs?: TabItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultOpen?: boolean
  defaultTab?: string
}

const tabsDefault = [
    {
      id: "account",
      label: "Account",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "appearance",
      label: "Appearance",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Appearance</h2>
          <p className="text-muted-foreground">Customize the appearance of the application.</p>
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 cursor-pointer border-2 border-primary">
              <div className="font-medium">Light</div>
              <div className="text-sm text-muted-foreground">Light mode theme</div>
            </Card>
            <Card className="p-4 cursor-pointer">
              <div className="font-medium">Dark</div>
              <div className="text-sm text-muted-foreground">Dark mode theme</div>
            </Card>
            <Card className="p-4 cursor-pointer">
              <div className="font-medium">System</div>
              <div className="text-sm text-muted-foreground">Follow system theme</div>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          <p className="text-muted-foreground">Manage how you receive notifications.</p>
          <div className="space-y-4">
            {["Email notifications", "Push notifications", "SMS notifications"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <input type="checkbox" id={item.replace(/\s+/g, "-").toLowerCase()} className="h-4 w-4 rounded" />
                <Label htmlFor={item.replace(/\s+/g, "-").toLowerCase()}>{item}</Label>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "security",
      label: "Security",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-muted-foreground">Manage your security preferences.</p>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button className="w-full">Update Password</Button>
          </div>
        </div>
      ),
    },
  ]

export function DialogWithLayout({
  title = "Settings",
  description = "Manage your account settings and preferences.",
  tabs = tabsDefault,
  open,
  onOpenChange,
  defaultTab,
}: DialogWithLayoutProps) {
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab || tabs[0]?.id || "")

  const activeContent = React.useMemo(() => {
    return tabs.find((tab) => tab.id === activeTab)?.content
  }, [activeTab, tabs])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl min-w-[60vw] p-0 overflow-y-auto max-h-[95vh] min-h-[70vh]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          </div>
          
          {/* Main content area with sidebar */}
          <div className="flex flex-1 overflow-hidden">
            {/* Traditional sidebar */}
            <div className="w-48 border-r ">
              <nav className="p-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </button>
                ))}
              </nav>
            </div>
            
            {/* Content area */}
            <div className="flex-1 overflow-auto p-6">
              {activeContent}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
