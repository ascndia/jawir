"use client";
import { Button } from "@/registry/components/button/select";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; // Prevent hydration errors

  return (
    <Button className="ghost inline-block" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? (
        <Moon className="h-[1.1rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.1rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
