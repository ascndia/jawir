"use client";

import { Button } from "@/registry/components/button/select";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const headerVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "max-w-7xl",
      centered:
        "max-w-4xl rounded-full mt-2 border shadow-lg dark:border-zinc-900",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface HeaderProps extends VariantProps<typeof headerVariants> {
  sticky?: boolean;
  Logo: React.ReactNode;
  /**
   * Items to be displayed on mobile
   */
  mobileItems: ({
    setIsOpen,
  }: {
    setIsOpen: (open: boolean) => void;
  }) => React.ReactNode;
  /**
   * Items to be displayed on desktop
   */
  desktopItems: React.ReactNode;
}

//======================================
export const Header = ({
  Logo,
  sticky,
  variant,
  mobileItems,
  desktopItems,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full dark:bg-zinc-950/50 backdrop-blur bg-zinc-50",
        sticky && variant == "centered" && "md:sticky top-3",
        sticky && variant == "default" && "md:sticky top-0"
      )}
    >
      <div className={cn("hidden md:block", headerVariants({ variant }))}>
        <div className="flex-row-start px-6 pb-2 pt-3 w-full gap-2">
          {Logo}
          <nav className="grow flex-row-end gap-3 lg:gap-8">{desktopItems}</nav>
        </div>
      </div>
      <MobileHeader Logo={Logo}>{mobileItems}</MobileHeader>
    </header>
  );
};

export const MobileHeader = ({
  Logo,
  children,
}: {
  Logo: React.ReactNode;
  children: ({
    setIsOpen,
  }: {
    /**
     * Set the open state of the mobile header, use to close the header when a link is clicked
     */
    setIsOpen: (open: boolean) => void;
  }) => React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      className={cn(
        "md:hidden px-4 pt-2",
        isOpen && "min-h-screen z-40 dark:bg-zinc-950 bg-zinc-50 size-full"
      )}
    >
      <div className="flex-row-between pb-2">
        {Logo}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="rounded-xl"
          variant={"outline"}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <dialog
        open={isOpen}
        className={
          isOpen
            ? "animate-popover-in flex flex-col gap-3 h-full w-full pt-4 px-4 bg-inherit"
            : "hidden"
        }
      >
        {typeof children === "function" ? children({ setIsOpen }) : children}
      </dialog>
    </div>
  );
};
