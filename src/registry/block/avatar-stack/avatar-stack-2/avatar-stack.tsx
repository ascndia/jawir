import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

const avatarStackVariants = cva("flex", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col",
    },
    spacing: {
      sm: "-space-x-5 -space-y-5",
      md: "-space-x-4 -space-y-4",
      lg: "-space-x-3 -space-y-3",
      xl: "-space-x-2 -space-y-2",
    },
    size: {
      sm: "w-6 h-6",
      md: "w-8 h-8",
      lg: "w-10 h-10",
      xl: "w-12 h-12",
      "2xl": "w-16 h-16",
      "3xl": "w-20 h-20",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
    size: "md",
  },
});

export interface AvatarStackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarStackVariants> {
  avatars?: { name: string; image: string }[];
  maxAvatarsAmount?: number;
}

const defaultAvatars = [
  { name: "Jane Cooper", image: "/images/avatar-1.jpg" },
  { name: "Jane Cooper", image: "/images/avatar-2.jpg" },
  { name: "Jane Cooper", image: "/images/avatar-3.jpg" },
  { name: "Jane Cooper", image: "/images/avatar-4.jpg" },
  { name: "Jane Cooper", image: "/images/avatar-5.jpg" },
];

const AvatarStack = ({
  className,
  orientation,
  avatars = defaultAvatars,
  spacing,
  size = "xl",
  maxAvatarsAmount = 5,
  ...props
}: AvatarStackProps) => {
  const shownAvatars = avatars.slice(0, maxAvatarsAmount);
  const hiddenAvatars = avatars.slice(maxAvatarsAmount);

  return (
    <TooltipProvider>
      <div
        className={cn(
          avatarStackVariants({ orientation, spacing, size }),
          className,
          orientation === "horizontal" ? "-space-x-0" : "-space-y-0"
        )}
        {...props}
      >
        <span className="mx-4 inline-flex items-center -space-x-4">
          {shownAvatars.map((avatar, index) => (
            <Tooltip key={index} delayDuration={50}>
              <TooltipTrigger asChild>
                <Avatar className="size-14 border">
                  <AvatarImage src={avatar.image} alt={avatar.name} />
                  <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent >
                {avatar.name}
              </TooltipContent>
            </Tooltip>
          ))}
          {hiddenAvatars.length > 0 && (
            <Avatar className="size-14 border">
              <AvatarFallback>+{hiddenAvatars.length}</AvatarFallback>
            </Avatar>
          )}
        </span>
      </div>
    </TooltipProvider>
  );
};

export { AvatarStack, avatarStackVariants };
