import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

function Announcement(props: PropsWithChildren) {
  return (
    <div
      className={cn(
        "group px-4 py-1 rounded-full border transition-all ease-in hover:cursor-pointer"
      )}
    >
      {props.children}
    </div>
  );
}
// ("group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800");

export default Announcement;
