"use client";

import dynamic from "next/dynamic";

import { AppTheme } from "@/component/app-theme";
import { CopyCode } from "@/component/copy-code";
import { Customize } from "@/component/customize";
import { Explore } from "@/component/explore";
import { Random } from "@/component/random";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";

const Menu = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex  overflow-hidden px-2 pb-1 duration-300 animate-in slide-in-from-bottom-12 lg:justify-center lg:p-4 lg:pb-4">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="pointer-events-auto relative mx-auto flex flex-shrink-0 items-center gap-2 rounded-md border border-accent bg-accent/40 p-2 shadow backdrop-blur-sm scrollbar-thin max-lg:overflow-x-auto max-sm:w-full">
          <Customize />
          <Random />
          <CopyCode />
          <Separator orientation="vertical" className="bg-accent" />
          <Explore />
          <Separator orientation="vertical" className="bg-accent" />
          <AppTheme />
        </div>
      </div>
    </div>
  );
};

export const FloatingMenu = dynamic(() => Promise.resolve(Menu), {
  ssr: false,
});
