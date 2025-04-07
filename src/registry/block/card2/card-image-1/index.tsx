
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface CardImage1AProps {
  id?: string;
  imageUrl?: string;
  title?: string;
  author?: string;
  timestamp?: string;
  status?: "generating" | "completed" | "failed";
  aspectRatio?: string;
  prompt?: string;
  model?: string;
  style?: string;
  resolution?: string;
  seed?: string;
}

export const CardImage1A = ({
    imageUrl = "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    title = "My Photo",
    author = "Alen Bradley",
    timestamp = "2023-10-01 12:00",
    status = "completed",
    aspectRatio = "1:1"
}: CardImage1AProps) => {
    return (
        <Card className="overflow-hidden">
            <div className={`relative overflow-hidden ${aspectRatio === "1:1" ? "aspect-square" : aspectRatio === "16:9" ? "aspect-video" : "aspect-[4/5]"}`}>
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-[1.03]"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/30">
                        <Skeleton className="w-full h-full" />
                    </div>
                )}
                
                {status === "generating" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="animate-pulse-slow text-primary font-medium">Generating...</div>
                    </div>
                )}
            </div>
            <CardContent className="p-3">
                <h3 className="text-sm font-medium truncate">{title}</h3>
                <p className="text-xs text-muted-foreground truncate">by {author}</p>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between items-center text-xs text-muted-foreground border-t border-border/10">
                <span>{timestamp}</span>
                <Badge
                        variant={status === "generating" ? "secondary" : status === "completed" ? "default" : "destructive"}
                        className="rounded-full text-[10px] font-medium px-2 py-0.5"
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            </CardFooter>
        </Card>
    );
};