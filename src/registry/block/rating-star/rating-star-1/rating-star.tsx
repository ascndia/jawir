"use client";

import * as React from "react";
import { Star, StarHalf } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip"; // Assuming tooltip is available here

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  rating?: number; // For controlled component
  onRatingChange?: (rating: number) => void;
  size?: number;
  color?: string; // Tailwind class, e.g., "text-yellow-500" or "text-primary"
  emptyColor?: string; // Tailwind class, e.g., "text-gray-300" or "text-muted-foreground"
  spacing?: number; // In pixels or Tailwind spacing units? Let's assume Tailwind for now (e.g., 1 = space-x-1)
  allowHalf?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  showTooltip?: boolean;
  tooltips?: string[]; // Array of strings for tooltips, index corresponds to rating (1-based)
  customIcon?: React.ElementType;
  customHalfIcon?: React.ElementType;
  resetOnDoubleClick?: boolean;
  hoverEffect?: boolean;
  className?: string;
  ariaLabel?: string;
  // Add any other props needed based on requirements
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  rating: controlledRating,
  onRatingChange,
  size = 24,
  color = "text-primary", // Use semantic color
  emptyColor = "text-muted-foreground", // Use semantic color
  spacing = 1, // Corresponds to space-x-1
  allowHalf = false,
  readOnly = false,
  disabled = false,
  showTooltip = true,
  tooltips,
  customIcon: Icon = Star,
  customHalfIcon: HalfIcon = StarHalf,
  resetOnDoubleClick = false,
  hoverEffect = true,
  className,
  ariaLabel = "Star rating",
  ...props
}) => {
  const isControlled = controlledRating !== undefined;
  const [internalRating, setInternalRating] = React.useState(
    Math.max(0, Math.min(initialRating, totalStars))
  );
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const currentRating = isControlled ? controlledRating : internalRating;
  const displayRating =
    hoverEffect && !readOnly && !disabled && hoverRating !== null
      ? hoverRating
      : currentRating;

  // Clamp rating value
  React.useEffect(() => {
    if (isControlled) {
      const clampedRating = Math.max(
        0,
        Math.min(controlledRating ?? 0, totalStars)
      );
      if (clampedRating !== controlledRating && onRatingChange) {
        // Optional: Notify parent about clamped value if needed, or just use clamped internally.
        // This might cause issues if parent doesn't expect clamping.
        // Consider logging a warning instead.
        console.warn(
          `Rating value ${controlledRating} out of range [0, ${totalStars}]. Clamped to ${clampedRating}.`
        );
      }
    } else {
      const clampedRating = Math.max(0, Math.min(internalRating, totalStars));
      if (clampedRating !== internalRating) {
        setInternalRating(clampedRating);
      }
    }
  }, [
    controlledRating,
    internalRating,
    totalStars,
    isControlled,
    onRatingChange,
  ]);

  const handleRating = (newRating: number) => {
    if (readOnly || disabled) return;

    const finalRating = Math.max(0, Math.min(newRating, totalStars));

    if (!isControlled) {
      setInternalRating(finalRating);
    }
    if (onRatingChange) {
      onRatingChange(finalRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!hoverEffect || readOnly || disabled) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (!hoverEffect || readOnly || disabled) return;
    setHoverRating(null);
  };

  const handleClick = (index: number, event: React.MouseEvent) => {
    if (readOnly || disabled) return;

    let newRating = index + 1;
    if (allowHalf) {
      const starElement = event.currentTarget as HTMLElement;
      const rect = starElement.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      if (clickX < rect.width / 2) {
        newRating -= 0.5;
      }
    }
    handleRating(newRating);
  };

  const handleDoubleClick = () => {
    if (resetOnDoubleClick && !readOnly && !disabled) {
      handleRating(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (readOnly || disabled) return;

    let newRating = currentRating;
    if (event.key === "ArrowRight") {
      newRating = Math.min(currentRating + (allowHalf ? 0.5 : 1), totalStars);
      event.preventDefault();
    } else if (event.key === "ArrowLeft") {
      newRating = Math.max(currentRating - (allowHalf ? 0.5 : 1), 0);
      event.preventDefault();
    } else if (event.key === " " || event.key === "Enter") {
      // Allow setting rating via keyboard focus if needed, though click/arrows are primary
      // newRating = index + 1; // Or maybe just use arrows?
      event.preventDefault(); // Prevent page scroll
    } else if (event.key === "Home") {
      newRating = 0;
      event.preventDefault();
    } else if (event.key === "End") {
      newRating = totalStars;
      event.preventDefault();
    }

    if (newRating !== currentRating) {
      handleRating(newRating);
      // Optionally move focus, though browser usually handles arrow keys on focusable elements
      // const nextFocusable = (event.currentTarget.parentElement?.children[Math.floor(newRating)] as HTMLElement);
      // nextFocusable?.focus();
    }
  };

  const stars = Array.from({ length: totalStars }, (_, i) => i);

  const getStar = (index: number) => {
    const ratingValue = index + 1;
    let isFilled = displayRating >= ratingValue;
    let isHalf = false;

    if (allowHalf) {
      const floorRating = Math.floor(displayRating);
      const ceilRating = Math.ceil(displayRating);
      isFilled = displayRating >= ratingValue;
      isHalf =
        displayRating < ratingValue && displayRating >= ratingValue - 0.5;
    }

    const starColor = isFilled || isHalf ? color : emptyColor;
    const IconComponent = isHalf ? HalfIcon : Icon;

    const tooltipText =
      tooltips?.[index] ?? `${ratingValue} star${ratingValue !== 1 ? "s" : ""}`;

    const starElement = (
      <button
        key={index}
        type="button" // Prevent form submission if inside a form
        role="radio" // Part of a radiogroup
        aria-checked={currentRating === ratingValue} // Indicate checked state based on actual rating
        aria-label={tooltipText}
        aria-disabled={disabled || readOnly}
        tabIndex={
          disabled || readOnly
            ? -1
            : Math.floor(currentRating) === index ||
              (currentRating === 0 && index === 0)
            ? 0
            : -1
        } // Manage focus: only current or first star is tabbable initially
        className={cn(
          "cursor-pointer transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
          {
            "cursor-default": readOnly || disabled,
            "opacity-50": disabled,
          },
          starColor // Apply color class directly
        )}
        onClick={(e) => handleClick(index, e)}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        onDoubleClick={handleDoubleClick}
        onKeyDown={(e) => handleKeyDown(e, index)}
        style={{ width: size, height: size }}
        disabled={disabled}
        {...props} // Spread remaining props onto the button
      >
        <IconComponent
          className="pointer-events-none" // Prevent icon from capturing mouse events
          fill={isFilled || isHalf ? "currentColor" : "none"}
          width={size}
          height={size}
          // strokeWidth={1.5} // Optional: Adjust stroke width
        />
      </button>
    );

    if (showTooltip && !readOnly && !disabled) {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>{starElement}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return starElement;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div
        role="radiogroup" // Use radiogroup for interactive rating selection
        aria-label={ariaLabel}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        // aria-valuemin={0} // Not standard for radiogroup, managed by individual radios
        // aria-valuemax={totalStars}
        // aria-valuenow={currentRating} // Not standard for radiogroup
        className={cn("flex items-center", `space-x-${spacing}`, className)}
        onMouseLeave={handleMouseLeave} // Ensure hover state clears if mouse leaves container
      >
        {stars.map((index) => getStar(index))}
      </div>
    </TooltipProvider>
  );
};

StarRating.displayName = "StarRating";

export default StarRating;
