"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/components/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { themeToStyles } from "@/lib/theme-to-styles";
import { useThemeConfig } from "@/component/hooks/use-active-theme";
import { type ThemeConfig } from "@/lib/theme-config";

import { useIsMobile } from "@jlns/hooks";
import { RemoveScroll } from "react-remove-scroll";
import { Copy } from "lucide-react";
import CopyStringButton from "@/registry/block/copy-button/copy-button-string/copy-button";
import { Button } from "@/registry/components/button/select";
// Removed unused import as Object.entries is used instead

const configToCss = (config: ThemeConfig) => {
  const lightStyle = themeToStyles(config.light);
  const light = Object.entries(lightStyle)
    .map(([key, value]) => `      ${key}: ${value};`)
    .join("\n");

  const space = `      `;

  const darkStyle = themeToStyles(config.dark);
  const dark = Object.entries(darkStyle)
    .map(([key, value]) => `${space}${key}: ${value};`)
    .join("\n");

  return `@layer base {
    :root {
${light}
${space}--radius: 0.5rem;
    }
  
    .dark {
${dark}
    }
  }
  `;
};

const title = "Copy code";
const description = "Just copy the code below into your own project.";

export const CopyCode = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button disabled>
            <Copy className="size-4" />
            <span className="sr-only">Copy code</span>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="flex max-h-[80svh] flex-col p-4">
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button disabled>
              <Copy className="size-4" />
              <span className="sr-only">Copy code</span>
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        <TooltipContent>Copy current theme as code</TooltipContent>
      </Tooltip>
      <DialogContent className="flex max-h-[95vh] w-[98vw] max-w-screen-lg flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content />
      </DialogContent>
    </Dialog>
  );
};

const Content = () => {
  const config = useThemeConfig();

  const themeTemplate = configToCss(config);

  return (
    <div className="relative grid min-h-0 rounded-md border bg-muted">
      <CopyStringButton disabled className="w-full" text={themeTemplate} />
      <pre className="h-full overflow-auto">
        <code className="block rounded px-2 py-3 font-mono text-xs lg:text-sm">
          {themeTemplate}
        </code>
      </pre>
    </div>
  );
};
