"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { MoreVertical, Link2, Info, Paintbrush } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Reaction {
  emoji: string
  count: number
  active?: boolean
}

interface CardCivitAI1AProps {
  imageUrl?: string
  avatarUrl?: string
  username?: string
  reactions?: Reaction[]
}

export default function CardCivitAI1A({
  imageUrl = "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  avatarUrl = "/placeholder.svg?height=40&width=40",
  username = "Akimizu",
  reactions = [
    { emoji: "👍", count: 2787, active: false },
    { emoji: "❤️", count: 1126, active: false },
    { emoji: "😂", count: 438, active: false },
    { emoji: "😲", count: 234, active: false },
    { emoji: "⚡", count: 0, active: false },
  ],
}: CardCivitAI1AProps) {
  const [localReactions, setLocalReactions] = useState<Reaction[]>(reactions)

  const handleReactionClick = (index: number) => {
    setLocalReactions((prev) => {
      const newReactions = [...prev]
      const isActive = newReactions[index].active

      newReactions[index] = {
        ...newReactions[index],
        count: isActive ? newReactions[index].count - 1 : newReactions[index].count + 1,
        active: !isActive,
      }

      return newReactions
    })
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg group relative">
      {/* Full card image with hover effect */}
      <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Post image"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent"></div>

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-3 z-10">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <button className="p-1.5 bg-gray-800/70 hover:bg-gray-700/90 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5 text-white" />
            </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onClick={() => console.log("Save image to collection")}>
                Save image to collection
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("View Post")}>
                View Post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Report image")}>
                Report image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Hide this image")}>
                Hide this image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Hide content from this user")}>
                Hide content from this user
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
          <button className="p-1.5 bg-white hover:bg-gray-100 rounded-full transition-colors">
            <Paintbrush className="h-5 w-5" />
          </button>
        </div>

        {/* User profile section - overlaid at the bottom */}
        <div className="absolute bottom-12 left-0 right-0 px-4 py-2 flex items-center z-10">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={avatarUrl} alt={`${username}'s avatar`} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-white">{username}</span>
        </div>

        {/* Reactions bar - overlaid at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-3 flex items-center justify-between z-10">
          <div className="flex space-x-1">
            {localReactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => handleReactionClick(index)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                  reaction.active ? "bg-gray-700/70" : "hover:bg-gray-700/50"
                }`}
              >
                <span className="text-sm">{reaction.emoji}</span>
                <span className="text-xs font-medium text-white tabular-nums">
                  {reaction.count > 0 ? reaction.count : ""}
                </span>
              </button>
            ))}
          </div>
          <button className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
            <Info className="h-4 w-4 text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  )
}

