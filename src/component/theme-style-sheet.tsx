"use client";

import { useMemo } from "react";

import { themeToStyles } from "@/lib/theme-to-styles";
import { useThemeConfig } from "@/component/hooks/use-active-theme";

// This weird approach is necessary to also style the portaled components
export const ThemeStyleSheet = () => {
  const config = useThemeConfig();

  const style = useMemo(() => {
    const styles = {
      light: themeToStyles(config.light),
      dark: themeToStyles(config.dark),
    };

    const lightStyles = Object.entries(styles.light)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");

    const darkStyles = Object.entries(styles.dark)
      .map(([key, value]) => `${key}: ${value};`)
      .join("\n");

    return `
    .customizable {
      ${lightStyles}
    }

    html.dark .customizable {
      ${darkStyles}
    }`;
  }, [config]);

  return <style dangerouslySetInnerHTML={{ __html: style }} />;
};
