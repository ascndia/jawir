"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Modeoggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-black/90 dark:bg-black/90 rounded-full p-1 flex items-center">
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "p-2 px-4 rounded-full transition-colors cursor-pointer",
            theme === "system"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-gray-200"
          )}
          aria-label="System theme"
        >
          <Monitor className="h-5 w-5" />
        </button>
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "p-2 px-4 rounded-full transition-colors cursor-pointer",
            theme === "light"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-gray-200"
          )}
          aria-label="Light theme"
        >
          <Sun className="h-5 w-5" />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "p-2 px-4 rounded-full transition-colors cursor-pointer",
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:text-gray-200"
          )}
          aria-label="Dark theme"
        >
          <Moon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
