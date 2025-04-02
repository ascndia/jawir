"use client"
import { BookOpen, Home, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TourDialog } from "./tour-dialog"
import { TourProvider, useTour } from "./tour-provider"

function DemoContent() {
  const { startTour } = useTour()

  const startAppTour = () => {
    startTour([
      {
        title: "Welcome to our App!",
        description: "This tour will guide you through the main features of our application.",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        title: "Dashboard Overview",
        description: "This is your dashboard where you can see all your important information at a glance.",
        target: "#dashboard",
      },
      {
        title: "User Management",
        description: "Manage your team members and their permissions from this section.",
        target: "#users",
      },
      {
        title: "Settings",
        description: "Customize your experience by adjusting your settings here.",
        target: "#settings",
      },
      {
        title: "You're all set!",
        description: "You've completed the tour. Feel free to explore the app on your own now.",
      },
    ])
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={startAppTour}>Start Tour</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card id="dashboard">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" /> Dashboard
            </CardTitle>
            <CardDescription>View your analytics and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Users
            </CardTitle>
            <CardDescription>Manage your team and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>

        <Card id="settings">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" /> Settings
            </CardTitle>
            <CardDescription>Configure your application preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
        <Card  id="users">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" /> Documentation
            </CardTitle>
            <CardDescription>Learn how to use the platform effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted"></div>
          </CardContent>
        </Card>
      </div>
      <Button onClick={startAppTour}>Start Tour</Button>
      <Button onClick={startAppTour}>Start Tour</Button>

      <TourDialog />
    </div>
  )
}

export default function Page() {
  return (
    <TourProvider>
      <DemoContent />
    </TourProvider>
  )
}

