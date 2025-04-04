import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "react-aria";

interface DialogMedia1AProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src?: string;
}

export function DialogMedia1A({ open, onOpenChange, src = "https://r2cdn.perplexity.ai/spaces-user-video.mp4" }: DialogMedia1AProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>

        <VisuallyHidden>
        <DialogTitle>Media Dialog</DialogTitle>
        <DialogDescription>
            This is a media dialog that can display videos or images.
        </DialogDescription>
        </VisuallyHidden>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <video
            className="rounded-md w-full shadow-lg"
            controls
            src={src}
            autoPlay
            // poster="/path-to-your-poster.jpg"
          />
          <h2 className="mt-4 text-lg font-semibold">Introducing Spaces</h2>
          <p className="text-sm">
            Your AI-powered research & collaboration hub.
          </p>
          <Button className="ms-auto" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}



interface DialogMedia1BProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src?: string;
  alt?: string;
}

export function DialogMedia1B({ open, onOpenChange, src="https://i.pinimg.com/736x/86/9c/23/869c23f9a8a5f96be026e58b43ad067a.jpg", alt="iamge" }: DialogMedia1BProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Media Dialog</DialogTitle>
            <DialogDescription>
              This is a media dialog that can display videos or images.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <Image
            className="rounded-md w-full shadow-lg"
            src={src}
            alt={alt}
            priority
            quality={75}
            width={500}
            height={500}
          />
          <h2 className="mt-4 text-lg font-semibold">Monarchy of death</h2>
          <p className="text-sm">
            World shall know the absolute terror.
          </p>
          <Button className="ms-auto" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}