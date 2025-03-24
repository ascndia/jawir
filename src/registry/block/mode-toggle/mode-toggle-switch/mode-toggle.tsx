import { Label } from "@/registry/components/label";
import Switch from "@/registry/components/switch/switch-shadcn/switch";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { setTheme, resolvedTheme: theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-switch">
        <Sun className="size-4" />
      </Label>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => {
          setTheme(checked ? "dark" : "light");
        }}
        id="theme-switch"
      />
      <Label htmlFor="theme-switch">
        <Moon className="size-4" />
      </Label>
    </div>
  );
};

export default ModeToggle;
