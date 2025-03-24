"use client";

import { type ReactNode } from "react";

import { ThemeStyleSheet } from "@/component/theme-style-sheet";
import { Skeleton } from "@/registry/components/skeleton";
import { themeToStyles } from "@/lib/theme-to-styles";
import { useActiveTheme } from "@/component/hooks/use-active-theme";

import * as Portal from "@radix-ui/react-portal";
import { range } from "remeda";

export const StyleProvider = ({ children }: { children: ReactNode }) => {
  const activeTheme = useActiveTheme();

  if (!activeTheme)
    return (
      <div className="container grid gap-12 py-24 lg:grid-cols-3 lg:py-40">
        {range(0, 9).map((i) => (
          <Skeleton key={i} className="h-80" />
        ))}
      </div>
    );

  const style = themeToStyles(activeTheme);

  return (
    <div
      style={style}
      className="h-full w-full rounded-sm bg-background text-foreground"
    >
      {children}
      <Portal.Root asChild>
        <ThemeStyleSheet />
      </Portal.Root>
    </div>
  );
};
