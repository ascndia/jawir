"use client"

import { Button } from "@/components/ui/button"
import { DialogContentSection, DialogMediaSection, FlexibleDialog, FlexibleDialogLayout } from "@/components/ui/reusable-dialog"
import { CheckCircle2 } from "lucide-react"

interface DialogTutorial1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mediaPosition?: "left" | "right"
  tutorial?: {
    title: string
    description: string
    videoSrc: string
    duration: string
    topics: string[]
  }
}

const videoTutorial = {
    title: "Getting Started with React",
    description: "Learn the fundamentals of React and build your first component-based application.",
    videoSrc: "https://r2cdn.perplexity.ai/spaces-user-video.mp4", // Replace with actual video URL
    duration: "45 minutes",
    topics: [
      "Understanding React components",
      "Working with props and state",
      "Handling events in React",
      "Component lifecycle methods",
      "Building a complete React application",
    ],
  }

export function DialogTutorial1A({
  open,
  onOpenChange,
  mediaPosition = "left",
  tutorial = videoTutorial,
}: DialogTutorial1AProps) {
  return (
    <FlexibleDialog title="Tutorial" open={open} onOpenChange={onOpenChange}>
      <FlexibleDialogLayout
        mediaPosition={mediaPosition}
        mediaSection={
          <DialogMediaSection type="custom">
            <div className="w-full h-full bg-black flex items-center justify-center">
              <video
                src={tutorial.videoSrc}
                className="w-auto h-full object-cover flex-1"
                controls
                poster="/placeholder.svg?height=400&width=600"
              />
            </div>
          </DialogMediaSection>
        }
        contentSection={
          <DialogContentSection title={tutorial.title}>
            <div className="flex flex-col h-full">
              <p className="text-sm text-muted-foreground mb-2">Duration: {tutorial.duration}</p>
              <p className="text-muted-foreground">{tutorial.description}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">What you'll learn:</h3>
                <ul className="space-y-2">
                  {tutorial.topics.map((topic, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-6">
                <Button className="w-full">Start Learning</Button>
              </div>
            </div>
          </DialogContentSection>
        }
      />
    </FlexibleDialog>
  )
}

