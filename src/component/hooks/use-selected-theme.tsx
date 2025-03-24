"use client";

import { ThemeItem } from "@/lib/theme-config";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { isDefined } from "remeda";
import axios from "axios";

export const selectedThemeAtomId = atom<string | undefined>(undefined);

export const useSelectedThemeId = () => {
  return useAtom(selectedThemeAtomId);
};

export const useSelectedTheme = () => {
  return useSelectedThemeExp().data;
};

export const useSelectedThemeExp = () => {
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [id] = useSelectedThemeId();

  useEffect(() => {
    if (isDefined(id)) {
      axios.get<ThemeItem[]>("/theme/index.json").then((res) => {
        setThemes((prevThemes) => [...prevThemes, ...res.data]);
      });
    }
  }, [id]);

  return {
    data: themes?.find((theme) => theme.id === id),
  };
};
