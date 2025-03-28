"use client";
import Lightbox from "@/registry/components/lightbox/lightbox-2/lightbox";
import { Button } from "@/registry/components/button/select";
import { useState } from "react";

export default function AdvancedGalleryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const mediaItems = [
    {
      id: "1",
      type: "image",
      src: "/images/placeholder.jpg",
      title: "Beautiful Landscape",
      description: "A stunning mountain view at sunset",
      alt: "Mountain landscape",
      tags: ["nature", "mountains", "sunset"],
      author: {
        name: "John Doe",
        avatar: "/path/to/avatar.jpg",
      },
    },
    {
      id: "2",
      type: "image",
      src: "/images/placeholder.jpg",
      thumbnail: "/images/placeholder.jpg",
      title: "Wildlife Documentary",
    },
  ];

  const handleLike = (item: any) => {
    console.log("Liked item:", item);
    // Implement your like functionality
  };

  const handleShare = (item: any) => {
    console.log("Sharing item:", item);
    // Implement your share functionality
  };

  const handleDownload = (item: any) => {
    console.log("Downloading item:", item);
    // Implement your download functionality
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {mediaItems.map((item, index) => (
        <div
          key={item.id}
          className="cursor-pointer"
          onClick={() => {
            setInitialIndex(index);
            setIsOpen(true);
          }}
        >
          <img
            src={item.thumbnail || item.src}
            alt={item.alt || item.title || "Gallery item"}
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      ))}

      <Lightbox
        items={mediaItems as any}
        initialIndex={initialIndex}
        open={isOpen}
        onOpenChange={setIsOpen}
        thumbnailsPosition="right"
        darkMode={true}
        onLike={handleLike}
        onShare={handleShare}
        onDownload={handleDownload}
        onIndexChange={(index) => console.log("Current index:", index)}
        renderCustomControls={({
          currentIndex,
          totalItems,
          onNext,
          onPrev,
        }) => (
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
            <Button variant="ghost" size="sm" onClick={onPrev}>
              Previous
            </Button>
            <span>
              {currentIndex + 1} of {totalItems}
            </span>
            <Button variant="ghost" size="sm" onClick={onNext}>
              Next
            </Button>
          </div>
        )}
      />
    </div>
  );
}
