"use client";

import { type ReactNode } from "react";
import { hslToCssValue } from "@/lib/hsl-to-variable-value";
import { useResolvedTheme } from "@/component/hooks/use-resolved-theme";
import { useSelectedThemeId } from "@/component/hooks/use-selected-theme";
import { useSetThemeConfig } from "@/component/hooks/use-active-theme";
import { ThemeItem, type ThemeConfig } from "@/lib/theme-config";

export const ThemeLink = ({ id, name, config }: ThemeItem) => {
  const [, setSelectedThemeId] = useSelectedThemeId();

  return (
    <ThemeButton
      config={config}
      name={name}
      onClick={async () => {
        setSelectedThemeId(id);
      }}
    ></ThemeButton>
  );
};

const ColorPalette = ({ config }: { config: ThemeConfig }) => {
  const visibleColors = ["primary", "secondary", "accent"] as const;

  const theme = useResolvedTheme();

  if (!theme) return null;

  return (
    <div className="flex h-12 w-20 gap-0.5 p-1">
      {visibleColors.map((color) => (
        <div
          className="flex-1 rounded border"
          key={color}
          style={{
            backgroundColor: hslToCssValue(config[theme][color]),
          }}
        />
      ))}
    </div>
  );
};

export const ThemeButton = ({
  onClick,
  config,
  name,
  children,
}: {
  onClick?: () => void;
  config: ThemeConfig;
  name: string;
  children?: ReactNode;
}) => {
  const setThemeConfig = useSetThemeConfig();

  return (
    <button
      className="flex flex-col gap-1 overflow-hidden rounded-lg px-2 py-1 hover:bg-accent/60"
      title={name}
      onClick={() => {
        onClick?.();
        setThemeConfig(config);
      }}
    >
      <div className="flex w-full justify-center">
        <ColorPalette config={config} />
      </div>
      <p className="w-full truncate text-sm">{name}</p>
      {children}
    </button>
  );
};
