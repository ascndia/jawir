"use client";

import { useFilePicker } from "use-file-picker";
import { 
  ChevronDown, 
  Download, 
  File, 
  LayoutDashboard, 
  Loader, 
  MousePointerClick, 
  Redo2, 
  Undo2
} from "lucide-react";

import { ActiveTool, Editor } from "./types";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const Logo = () => <LayoutDashboard className="size-8" />;

export const Navbar = ({
  activeTool,
  onChangeActiveTool,
}: NavbarProps) => {
//   const data = useMutationState({
//     filters: {
//       mutationKey: ["project", { id }],
//       exact: true,
//     },
//     select: (mutation) => mutation.state.status,
//   });

//   const currentStatus = data[data.length - 1];

//   const isError = currentStatus === "error";
//   const isPending = currentStatus === "pending";

//   const { openFilePicker } = useFilePicker({
//     accept: ".json",
//     onFilesSuccessfullySelected: ({ plainFiles }: any) => {
//       if (plainFiles && plainFiles.length > 0) {
//         const file = plainFiles[0];
//         const reader = new FileReader();
//         reader.readAsText(file, "UTF-8");
//         reader.onload = () => {
//           editor?.loadJson(reader.result as string);
//         };
//       }
//     },
//   });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Logo />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
            //   onClick={() => openFilePicker()}
              className="flex items-center gap-x-2"
            >
              <File className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" side="bottom" sideOffset={10}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-100")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={10}>
          <Button
            // disabled={!editor?.canUndo()}
            variant="ghost"
            size="icon"
            // onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={10}>
          <Button
            // disabled={!editor?.canRedo()}
            variant="ghost"
            size="icon"
            // onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        {/* {isPending && ( 
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Saving...
            </div>
          </div>
        )}
        {!isPending && isError && ( 
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Failed to save
            </div>
          </div>
        )}
        {!isPending && !isError && ( 
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Saved
            </div>
          </div>
        )} */}
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.saveJson()}
              >
                <File className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.savePng()}
              >
                <File className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.saveJpg()}
              >
                <File className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                // onClick={() => editor?.saveSvg()}
              >
                <File className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <UserButton /> */}
          <Button>User</Button>
        </div>
      </div>
    </nav>
  );
};
