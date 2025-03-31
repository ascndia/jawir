"use client";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/components/badge";
import { Button } from "@/registry/components/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/registry/components/carousel";
  import { ArrowLeft, ArrowRight, Play } from "lucide-react";

  import { useEffect, useState } from "react";
  
  export interface AnimeItem {
    id: string;
    title: string;
    description: string;
    image: string;
    badge?: string;
  }
  
  export const featuredAnime: AnimeItem[] = [
    {
      id: "1",
      title: "Demon Slayer",
      description: "A boy raised by wild demons joins an elite group of demon slayers to avenge his family.",
      image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1470&auto=format&fit=crop",
      badge: "New Season"
    },
    {
      id: "2",
      title: "Attack on Titan",
      description: "The last humans fight for survival against man-eating giants called Titans.",
      image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1374&auto=format&fit=crop",
      badge: "Final Season"
    },
    {
      id: "3",
      title: "One Piece",
      description: "Follow Monkey D. Luffy on his quest to become King of the Pirates.",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1470&auto=format&fit=crop",
      badge: "Popular"
    },
    {
      id: "4",
      title: "My Hero Academia",
      description: "In a world of superpowers, a quirkless boy dreams of becoming a hero.",
      image: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Jujutsu Kaisen",
      description: "A boy joins a secret organization of Jujutsu Sorcerers to kill a powerful Curse.",
      image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1470&auto=format&fit=crop",
      badge: "Trending"
    }
  ];

  interface AnimeCardProps {
    anime: AnimeItem;
    className?: string;
  }
  
  const AnimeCard = ({ anime, className }: AnimeCardProps) => {
    return (
      <div 
        className={cn(
          "relative h-[500px] w-full overflow-hidden rounded-xl",
          className
        )}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${anime.image})` }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <div className="flex items-center space-x-2 mb-2">
            {anime.badge && (
              <Badge className="bg-primary hover:bg-primary text-primary-foreground px-3">
                {anime.badge}
              </Badge>
            )}
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 max-w-xl">{anime.title}</h2>
          <p className="text-white/80 mb-4 max-w-lg md:text-lg">{anime.description}</p>
          
          <div className="flex space-x-3">
            <Button className="gap-2">
              <Play size={18} />
              Watch Now
            </Button>
            <Button variant="outline" className="text-white bg-white/20 hover:bg-white/30 border-none">
              Add to List
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  const BannerCarousel2 = () => {
    const [api, setApi] = useState<any>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      if (!api) return;
  
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
  
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);
  
    return (
      <div className="w-full py-6">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {featuredAnime.map((anime) => (
              <CarouselItem key={anime.id} className="w-full">
                <AnimeCard anime={anime} />
              </CarouselItem>
            ))}
          </CarouselContent>
  
          <div className="absolute bottom-12 right-24 transform  z-10">
            <CarouselPrevious className="h-10 w-10 bg-background/50 hover:bg-background/70 text-white border-none">
              <ArrowLeft className="h-5 w-5" />
            </CarouselPrevious>
          </div>
  
          <div className="absolute bottom-12 right-24 transform  z-10">
            <CarouselNext className="h-10 w-10 bg-background/50 hover:bg-background/70 text-white border-none">
              <ArrowRight className="h-5 w-5" />
            </CarouselNext>
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-1 z-10">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    );
  };
  
  export default BannerCarousel2;