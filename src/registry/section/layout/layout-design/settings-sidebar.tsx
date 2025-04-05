import { useEffect, useMemo, useState } from "react";

import { ActiveTool, Editor } from "./types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";
// import { ColorPicker } from "./color-picker";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorPicker } from "@/registry/components/color-picker/color-picker-1/color-picker";

interface SettingsSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const SettingsSidebar = ({
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  // const workspace = editor?.getWorkspace();

  // const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace]);
  // const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace]);
  // const initialBackground = useMemo(() => workspace?.fill ?? "#ffffff", [workspace]);

  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [background, setBackground] = useState("#ffffff");

  // useEffect(() => {
  //   setWidth(initialWidth);
  //   setHeight(initialHeight);
  //   setBackground(initialBackground);
  // }, 
  // [
  //   initialWidth,
  //   initialHeight,
  //   initialBackground
  // ]);

  // const changeWidth = (value: string) => setWidth(value);
  // const changeHeight = (value: string) => setHeight(value);
  // const changeBackground = (value: string) => {
  //   setBackground(value);
  //   editor?.changeBackground(value);
  // };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   editor?.changeSize({
  //     width: parseInt(width, 10),
  //     height: parseInt(height, 10),
  //   });
  // }

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea>
        <form className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>
              Height
            </Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>
              Width
            </Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
