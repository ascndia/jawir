"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/components/toggle-group";

export default function Modeoggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleGroup
      variant="outline"
      className="inline-flex gap-0 -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse bg-background"
      type="single"
      onValueChange={(value) => value && setTheme(value)}
    >
      <ToggleGroupItem
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        value="system"
      >
        <Monitor className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        value="light"
      >
        <Sun className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
        value="dark"
      >
        <Moon className="h-5 w-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
