import { ActiveTool, Editor } from "./types";
import { ShapeTool } from "./shape-tool";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Circle, Diamond, Square, Triangle } from "lucide-react";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool
            icon={Circle}
          />
          <ShapeTool
            icon={Square}
          />
          <ShapeTool
            icon={Square}
          />
          <ShapeTool
            icon={Triangle}
          />
          <ShapeTool
            icon={Triangle}
            iconClassName="rotate-180"
          />
          <ShapeTool
            icon={Diamond}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
