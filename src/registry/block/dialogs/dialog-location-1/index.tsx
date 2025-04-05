"use client"

import { DialogContentSection, DialogMediaSection, FlexibleDialog, FlexibleDialogLayout } from "@/components/ui/reusable-dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, Globe, ExternalLink } from "lucide-react"

interface DialogLocation1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mediaPosition?: "left" | "right"
  location?: {
    name: string
    address: string
    description: string
    hours: string[]
    phone: string
    website: string
    mapImageSrc: string
  }
}

const locationDefault = {
    name: "Central Park Café",
    address: "123 Park Avenue, New York, NY 10001",
    description:
      "A cozy café located in the heart of Central Park, offering organic coffee, pastries, and light meals with a view of the park.",
    hours: ["Monday - Friday: 7:00 AM - 8:00 PM", "Saturday: 8:00 AM - 9:00 PM", "Sunday: 8:00 AM - 7:00 PM"],
    phone: "(212) 555-1234",
    website: "https://example.com/centralparkcafe",
    mapImageSrc: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
  }

export function DialogLocation1A({ open, onOpenChange, mediaPosition = "left", location = locationDefault }: DialogLocation1AProps) {
  return (
    <FlexibleDialog title="Location" open={open} onOpenChange={onOpenChange}>
      <FlexibleDialogLayout
        mediaPosition={mediaPosition}
        mediaSection={
          <DialogMediaSection type="image" src={location.mapImageSrc} alt={`Map location for ${location.name}`} />
        }
        contentSection={
          <DialogContentSection title={location.name}>
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">{location.address}</p>
              </div>

              <p className="text-muted-foreground mb-4">{location.description}</p>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Hours</h3>
                    <ul className="text-sm space-y-1 mt-1">
                      {location.hours.map((hour, index) => (
                        <li key={index}>{hour}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Phone</h3>
                    <p className="text-sm">{location.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Website</h3>
                    <a
                      href={location.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      {location.website.replace(/^https?:\/\//, "")}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 flex gap-2">
                <Button className="flex-1">Get Directions</Button>
                <Button variant="outline" className="flex-1">
                  Save
                </Button>
              </div>
            </div>
          </DialogContentSection>
        }
      />
    </FlexibleDialog>
  )
}

