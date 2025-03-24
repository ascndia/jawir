"use client";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardImageProps {
  title?: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

export default function CardImage({
  title = "Paris, France",
  imageUrl = "https://kzmisnorfny76w7204z4.lite.vusercontent.net/placeholder.svg?height=400&width=600",
  className,
  onClick,
}: CardImageProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden relative aspect-square w-full group min-w-xs",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={`${title} image`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      </div>
      <CardContent className="absolute bottom-0 w-full p-4">
        <CardTitle className="text-white text-lg font-bold">{title}</CardTitle>
      </CardContent>
    </Card>
  );
}
