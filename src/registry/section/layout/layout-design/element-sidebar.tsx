import { 
  ActiveTool, 
  Editor,
} from "./types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";


import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
// import { useConfirm } from "@/hooks/use-confirm";

interface ElementSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ElementSidebar = ({
  activeTool,
  onChangeActiveTool,
}: ElementSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const columns = 3; 
  const columnItems: number[][] = Array.from({ length: columns }, () => []);
  Array.from({ length: 30 }).forEach((_, i) => {
    columnItems[i % columns].push(i); 
  });

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "elements" ? "visible" : "hidden",
      )}
    >
      {/* <ToolSidebarHeader
        title="Elements"
        description="Add elements to your design"
      /> */}
      <div className="p-4 border-b">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
     <ScrollArea className="h-full overflow-y-auto p-4">
      <div className="grid grid-cols-3 gap-4">
        {columnItems.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-4">
            {column.map((item) => {
              
              const clipShapes = [
                "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // pentagon
                "polygon(50% 0%, 100% 100%, 0% 100%)", // triangle
                "circle(50% at 50% 50%)", // circle
                "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // square
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)", // hexagon
              ];
              
              const randomClip = clipShapes[Math.floor(Math.random() * clipShapes.length)];
              
              return (
                <div
                  key={item}
                  style={{
                    clipPath: randomClip,
                    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    height: `${Math.floor(Math.random() * 100) + 50}px`,
                    // transition: "clip-path 0.3s ease",
                  }}
                  className="rounded-sm"
                />
            )})}
          </div>
        ))}
      </div>
    </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
