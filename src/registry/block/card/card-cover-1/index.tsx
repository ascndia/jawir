"use client"

import { MoreVertical, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CardCover1AProps {
  title?: string
  artist?: string
  coverArt?: string
}

export function CardCover1A({
  title = "tv off (feat. lefty gunplay)",
  artist = "Kendrick Lamar, Lefty Gunplay",
  coverArt = "https://images.unsplash.com/photo-1528155124528-06c125d81e89",
}: CardCover1AProps) {
  return (
    <Card className="w-full overflow-hidden rounded-xl bg-black text-white shadow-xl">
      <div className="relative">
        {/* Header */}
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-3">
          <div className="font-bold">GNX</div>
          <div className="flex items-center gap-4">
            <button className="text-white opacity-80 hover:opacity-100">
              <MoreVertical size={20} />
            </button>
            <button className="text-white opacity-80 hover:opacity-100">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cover Art with Gradient Overlay */}
        <div className="relative h-[320px] w-full">
          <img
            src={coverArt || "/placeholder.svg"}
            alt={`${title} by ${artist}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black"></div>
        </div>
      </div>

      {/* Song Info */}
      <CardContent className="bg-black p-4 pb-6">
        <h2 className="text-lg font-bold leading-tight">{title}</h2>
        <p className="mt-1 text-sm text-gray-400">{artist}</p>
      </CardContent>
    </Card>
  )
}

