import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, Loader, Upload } from "lucide-react";

import { ActiveTool, Editor } from "./types";
import { ToolSidebarClose } from "./tool-sidebar-close";
import { ToolSidebarHeader } from "./tool-sidebar-header";

// import { useGetImages } from "@/features/images/api/use-get-images";

import { cn } from "@/lib/utils";
// import { UploadButton } from "@/lib/uploadthing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface ImageSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ImageSidebar = ({ activeTool, onChangeActiveTool }: ImageSidebarProps) => {
  // const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };
  const columns = 2; // Change this for more columns

  const columnItems: number[][] = Array.from({ length: columns }, () => []);

  Array.from({ length: 20 }).forEach((_, i) => {
    columnItems[i % columns].push(i); // Distribute items evenly in a zigzag
  });

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Images" description="Add images to your canvas" />
      <div className="p-4 border-b">
        <Button className="w-full" >Upload an image</Button>
      </div>
      {/* {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">Failed to fetch images</p>
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
                      height: `${Math.floor(Math.random() * 100) + 80}px`,
                      backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                    }}
                    className="relative w-full group hover:opacity-75 transition rounded-sm border"
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center text-gray-700 text-sm"
                    >
                      Mock Image {item + 1}
                    </div>
                    <div
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white p-1 bg-black/50 text-left"
                    >
                      Mock User {item + 1}
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
