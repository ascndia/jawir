import Image from "next/image";
import { AlertTriangle, Loader, Crown } from "lucide-react";

// import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

import { 
  ActiveTool, 
  Editor,
} from "./types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

// import { ResponseType, useGetTemplates } from "@/features/projects/api/use-get-templates";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useConfirm } from "@/hooks/use-confirm";

interface TemplateSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const TemplateSidebar = ({
  activeTool,
  onChangeActiveTool,
}: TemplateSidebarProps) => {
  // const { shouldBlock, triggerPaywall } = usePaywall();

  // const [ConfirmDialog, confirm] = useConfirm(
  //   "Are you sure?",
  //   "You are about to replace the current project with this template."
  // )

  // const { data, isLoading, isError } = useGetTemplates({
  //   limit: "20",
  //   page: "1",
  // });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  // const onClick = async (template: ResponseType["data"][0]) => {
  //   if (template.isPro && shouldBlock) {
  //     triggerPaywall();
  //     return;
  //   }

  //   const ok = await confirm();

  //   if (ok) {
  //     editor?.loadJson(template.json);
  //   }
  // };

  const columns = 2; // Change this for more columns

// Create an array with empty sub-arrays for each column
  const columnItems: number[][] = Array.from({ length: columns }, () => []);

  Array.from({ length: 20 }).forEach((_, i) => {
    columnItems[i % columns].push(i); // Distribute items evenly in a zigzag
  });

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "templates" ? "visible" : "hidden",
      )}
    >
      {/* <ConfirmDialog /> */}
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />
      {/* {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch templates
          </p>
        </div>
      )} */}
     <ScrollArea className="h-full overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {columnItems.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((item) => (
              <div
                key={item}
                style={{
                  height: `${Math.floor(Math.random() * 100) + 50}px`,
                  backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                }}
                className="relative w-full group hover:opacity-75 transition rounded-sm border"
              >
                <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                  Template {item}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
