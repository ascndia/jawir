"use client";

import { useState, useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { toast } from "sonner";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import { Check, ShoppingCart, Bell, Star, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for fake user interactions
const fakeUsers = [
  {
    name: "Alex",
    action: "purchased",
    item: "Premium Plan",
    timeAgo: "2 minutes ago",
    avatar: "/avatars/01.png",
  },
  {
    name: "Jamie",
    action: "subscribed to",
    item: "Newsletter",
    timeAgo: "just now",
    avatar: "/avatars/02.png",
  },
  {
    name: "Taylor",
    action: "upgraded to",
    item: "Pro Plan",
    timeAgo: "5 minutes ago",
    avatar: "/avatars/03.png",
  },
  {
    name: "Jordan",
    action: "joined",
    item: "Waitlist",
    timeAgo: "1 minute ago",
    avatar: "/avatars/04.png",
  },
  {
    name: "Casey",
    action: "purchased",
    item: "Annual Subscription",
    timeAgo: "3 minutes ago",
    avatar: "/avatars/05.png",
  },
  {
    name: "Riley",
    action: "rated",
    item: "5 stars",
    timeAgo: "just now",
    avatar: "/avatars/06.png",
  },
];

// Define variants using CVA
const toastVariants = cva("", {
  variants: {
    type: {
      purchase:
        "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800",
      subscription:
        "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
      upgrade:
        "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-800",
      waitlist:
        "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
      rating:
        "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-800",
    },
    position: {
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
    },
  },
  defaultVariants: {
    type: "purchase",
    position: "bottom-right",
  },
});

// Helper function to get icon based on action
const getActionIcon = (action: string) => {
  switch (action) {
    case "purchased":
      return (
        <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
      );
    case "subscribed to":
      return <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
    case "upgraded to":
      return <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
    case "joined":
      return <User className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
    case "rated":
      return <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
    default:
      return <Check className="h-4 w-4" />;
  }
};

// Helper function to get type based on action
const getTypeFromAction = (
  action: string
): "purchase" | "subscription" | "upgrade" | "waitlist" | "rating" => {
  switch (action) {
    case "purchased":
      return "purchase";
    case "subscribed to":
      return "subscription";
    case "upgraded to":
      return "upgrade";
    case "joined":
      return "waitlist";
    case "rated":
      return "rating";
    default:
      return "purchase";
  }
};

export interface AutoToastProps extends VariantProps<typeof toastVariants> {
  interval?: number;
  enabled?: boolean;
  className?: string;
}

export function AutoToast({
  interval = 8000,
  position = "bottom-right",
  enabled = true,
  className,
}: AutoToastProps) {
  const [isActive, setIsActive] = useState(enabled);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showRandomToast = () => {
    if (!isActive) return;

    const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    const type = getTypeFromAction(randomUser.action);

    toast.custom(
      (id) => (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border p-4 shadow-sm",
            toastVariants({ type, position }),
            className
          )}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={randomUser.avatar} alt={randomUser.name} />
            <AvatarFallback>{randomUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{randomUser.name}</span>
              <span className="text-xs text-muted-foreground">
                {randomUser.timeAgo}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              {getActionIcon(randomUser.action)}
              <span>
                {randomUser.action} <strong>{randomUser.item}</strong>
              </span>
            </div>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position:
          position === "top-left" || position === "top-right"
            ? "top-right"
            : "bottom-right",
      }
    );
  };

  useEffect(() => {
    if (enabled) {
      // Show first toast after a short delay
      const initialDelay = setTimeout(() => {
        showRandomToast();

        // Then set up the interval
        timerRef.current = setInterval(showRandomToast, interval);
      }, 2000);

      return () => {
        clearTimeout(initialDelay);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [enabled, interval]);

  useEffect(() => {
    setIsActive(enabled);

    if (!enabled && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else if (enabled && !timerRef.current) {
      showRandomToast();
      timerRef.current = setInterval(showRandomToast, interval);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [enabled]);

  // This component doesn't render anything visible itself
  return null;
}
