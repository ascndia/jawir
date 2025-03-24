import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { useSelectedThemeId } from "@/component/hooks/use-selected-theme";
import { useSetThemeConfig } from "@/component/hooks/use-active-theme";
import { Dices } from "lucide-react";
import { Button } from "@/registry/components/button/select";

export const Random = () => {
  const setThemeConfig = useSetThemeConfig();
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled
          onClick={async () => {
            const createThemeConfig = (
              await import("@/lib/create-theme-config")
            ).createThemeConfig;

            setThemeConfig(createThemeConfig());
            setSelectedThemeId(undefined);
          }}
          className="flex items-center gap-2"
        >
          <Dices className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Generate Random theme</TooltipContent>
    </Tooltip>
  );
};
