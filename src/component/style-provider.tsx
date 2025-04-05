"use client";

import { useEffect, type ReactNode } from "react";

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
  // useEffect(() => {
  //   const previousStyles = new Map<string, string>();
  
  //   // Save old values and apply new ones
  //   Object.entries(style).forEach(([key, value]) => {
  //     const cssKey = `--${key.replace(/^--/, '')}`;
  //     const oldValue = getComputedStyle(document.body).getPropertyValue(cssKey);
  //     previousStyles.set(cssKey, oldValue);
  //     document.body.style.setProperty(cssKey, value);
  //   });
  
  //   return () => {
  //     // Restore old values on cleanup
  //     previousStyles.forEach((value, key) => {
  //       document.body.style.setProperty(key, value);
  //     });
  //   };
  // }, [activeTheme, style]);
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-theme-vars", "true");
  
    const cssVars = Object.entries(style)
      .map(([key, value]) => `--${key.replace(/^--/, "")}: ${value};`)
      .join("\n");
  
    styleTag.innerHTML = `:root { ${cssVars} }`;
    document.head.appendChild(styleTag);
  
    return () => {
      styleTag.remove();
    };
  }, [activeTheme, style]);
  

  return (
    <>
      {children}
      <Portal.Root asChild>
        <ThemeStyleSheet />
      </Portal.Root>
    </>
  );
};
