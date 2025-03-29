import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { X } from "lucide-react";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    alt: "Mountain landscape with lake",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "https://plus.unsplash.com/premium_photo-1664637350832-362f1c02344e",
    alt: "Aerial view of forest",
    width: 800,
    height: 1200,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
    alt: "Desert landscape",
    width: 800,
    height: 800,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "Beach sunset",
    width: 800,
    height: 1000,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1520962922320-2038eebab146",
    alt: "Mountain peak",
    width: 800,
    height: 600,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1727961986518-3271a6110cd7",
    alt: "Snow covered mountains",
    width: 800,
    height: 900,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1460627390041-532a28402358",
    alt: "Sunset over water",
    width: 800,
    height: 700,
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1673280706261-0c849a4abcaf",
    alt: "Mountain range",
    width: 800,
    height: 1100,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1515266591878-f93e32bc5937",
    alt: "Tropical beach",
    width: 800,
    height: 800,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1583483547183-d9c10c10f044",
    alt: "Aurora borealis",
    width: 800,
    height: 600,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1439853949127-fa647821eba0",
    alt: "Lightning storm",
    width: 800,
    height: 900,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1534447677768-be436bb09401",
    alt: "Turquoise lake",
    width: 800,
    height: 1000,
  },
];

const GalleryMasonry2 = () => {
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );

  const openLightbox = (image: (typeof images)[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div>
        <h2 className="mb-14 text-5xl md:text-6xl font-bold text-center tracking-tight">
          Gallery
        </h2>
        <div className="max-w-screen-xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="mb-4 overflow-hidden rounded-xl break-inside-avoid cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: image.id * 0.1 }}
              onClick={() => openLightbox(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          <motion.div
            className="relative max-w-[90vw] max-h-[90vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-background/80 rounded-full p-2 backdrop-blur-sm z-10"
              onClick={closeLightbox}
            >
              <X className="size-6" />
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center bg-background/80 backdrop-blur-sm py-2 px-4 mx-auto w-fit rounded-full">
              <p className="text-sm font-medium">{selectedImage.alt}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GalleryMasonry2;
