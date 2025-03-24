import { Button } from "@/registry/components/button/select";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import { useResolvedTheme } from "./hooks/use-resolved-theme";

export const AppTheme = () => {
  const theme = useResolvedTheme();
  const { setTheme } = useTheme();

  const Icon = theme === "light" ? Sun : Moon;

  return (
    <Button
      disabled
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      <Icon className="size-4" />
    </Button>
  );
};
