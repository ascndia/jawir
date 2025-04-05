"use client"

import { useState } from "react"
import { DialogContentSection, DialogMediaSection, FlexibleDialog, FlexibleDialogLayout } from "@/components/ui/reusable-dialog"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Photo {
  id: string
  src: string
  alt: string
  caption?: string
}

const photosDefault = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
      alt: "Mountain landscape",
      caption: "Sunrise over the mountains",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
      alt: "Ocean view",
      caption: "Waves crashing on the shore",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
      alt: "Forest trail",
      caption: "A peaceful walk through the forest",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
      alt: "City skyline",
      caption: "Downtown at sunset",
    },
  ]

interface DialogGallery1AProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mediaPosition?: "left" | "right"
  photos?: Photo[]
  initialPhotoIndex?: number
  title?: string
  description?: string
}

export function DialogGallery1A({
  open,
  onOpenChange,
  mediaPosition = "left",
  photos = photosDefault,
  initialPhotoIndex = 0,
  title = "Photo Gallery",
  description = "Explore our collection of stunning photos.",
}: DialogGallery1AProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(initialPhotoIndex)
  const currentPhoto = photos[currentPhotoIndex]

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const goToPrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <FlexibleDialog title={title} open={open} onOpenChange={onOpenChange}>
      <FlexibleDialogLayout
        mediaPosition={mediaPosition}
        mediaSection={
          <DialogMediaSection type="custom">
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <img
                src={currentPhoto.src || "/placeholder.svg"}
                alt={currentPhoto.alt}
                className="max-h-full max-w-full object-contain"
              />

              {photos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={goToNextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {currentPhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                  {currentPhoto.caption}
                </div>
              )}
            </div>
          </DialogMediaSection>
        }
        contentSection={
          <DialogContentSection title={title}>
            <div className="flex flex-col h-full">
              <p className="text-muted-foreground">{description}</p>

              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Gallery</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={cn(
                        "relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2",
                        index === currentPhotoIndex ? "border-primary" : "border-transparent",
                      )}
                    >
                      <img
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 flex justify-between">
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContentSection>
        }
      />
    </FlexibleDialog>
  )
}

