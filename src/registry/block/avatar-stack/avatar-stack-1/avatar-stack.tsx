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
    <div
      className={cn(
        avatarStackVariants({ orientation, spacing, size }),
        className,
        orientation === "horizontal" ? "-space-x-0" : "-space-y-0"
      )}
      {...props}
    >
      {shownAvatars.map(({ name, image }, index) => (
        <TooltipProvider delayDuration={300} key={`${image}-${index + 1}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                className={cn(avatarStackVariants({ size }), "hover:z-10")}
              >
                <AvatarImage src={image} />
                <AvatarFallback>
                  {name
                    ?.split(" ")
                    ?.map((word) => word[0])
                    ?.join("")
                    ?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      {hiddenAvatars.length ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar
                className={cn(avatarStackVariants({ size }))}
                key="Excesive avatars"
              >
                <AvatarFallback>
                  +{avatars.length - shownAvatars.length}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              {hiddenAvatars.map(({ name }, index) => (
                <p key={`${name}-${index + 1}`}>{name}</p>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  );
};

export { AvatarStack, avatarStackVariants };
