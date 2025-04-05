import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 cursor-pointer hover:bg-muted py-4 flex flex-col justify-center items-center rounded-none",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-2 text-xs">
        {label}
      </span>
    </button>
  );
};
