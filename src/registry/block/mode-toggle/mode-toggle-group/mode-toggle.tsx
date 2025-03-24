"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/components/toggle-group";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        type="single"
        value={theme}
        onValueChange={(value) => value && setTheme(value)}
        className="flex h-10 items-center p-1 shadow"
      >
        <Item value="system">
          <Monitor
            className={`h-5 ${
              theme === "system" ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </Item>
        <Item value="light">
          <Sun
            className={`h-5 ${
              theme === "light" ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </Item>
        <Item value="dark">
          <Moon
            className={`h-5 ${
              theme === "dark" ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </Item>
      </ToggleGroup>
    </div>
  );
}

const Item = ({ children, ...props }: any) => {
  return (
    <ToggleGroupItem className="flex-1 hover:cursor-pointer px-3" {...props}>
      {children}
    </ToggleGroupItem>
  );
};
