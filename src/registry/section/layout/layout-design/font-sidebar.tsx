import { 
  ActiveTool, 
  Editor,
  fonts, 
} from "./types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FontSidebar = ({
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Font"
        description="Change the text font"
      />
      <ScrollArea>
        <div className="p-4 space-y-1 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                "border-2 border-blue-500",
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px"
              }}
              // onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
