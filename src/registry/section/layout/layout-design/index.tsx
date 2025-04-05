"use client";

// import { fabric } from "fabric";
// import debounce from "lodash.debounce";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

// import { ResponseType } from "@/features/projects/api/use-get-project";

import { 
  ActiveTool, 
  selectionDependentTools
} from "./types";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { ShapeSidebar } from "./shape-sidebar";
import { FillColorSidebar } from "./fill-color-sidebar";
import { StrokeColorSidebar } from "./stroke-color-sidebar";
import { StrokeWidthSidebar } from "./stroke-width-sidebar";
import { OpacitySidebar } from "./opacity-sidebar";
import { TextSidebar } from "./text-sidebar";
import { FontSidebar } from "./font-sidebar";
import { ImageSidebar } from "./image-sidebar";
import { FilterSidebar } from "./filter-sidebar";
import { DrawSidebar } from "./draw-sidebar";
import { AiSidebar } from "./ai-sidebar";
import { TemplateSidebar } from "./template-sidebar";
import { RemoveBgSidebar } from "./remove-bg-sidebar";
import { SettingsSidebar } from "./settings-sidebar";

// interface EditorProps {
//   initialData: ResponseType["data"];
// };

export const LayoutDesign = ({children}: PropsWithChildren) => {
//   const { mutate } = useUpdateProject(initialData.id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
//   const debouncedSave = useCallback(
//     debounce(
//       (values: { 
//         json: string,
//         height: number,
//         width: number,
//       }) => {
//         mutate(values);
//     },
//     500
//   ), [mutate]);

  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  // const onClearSelection = useCallback(() => {
  //   if (selectionDependentTools.includes(activeTool)) {
  //     setActiveTool("select");
  //   }
  // }, [activeTool]);

//   const { init, editor } = useEditor({
//     defaultState: initialData.json,
//     defaultWidth: initialData.width,
//     defaultHeight: initialData.height,
//     clearSelectionCallback: onClearSelection,
//     saveCallback: debouncedSave,
//   });

  const onChangeActiveTool = useCallback((tool: ActiveTool) => {
    // if (tool === "draw") {
    //   editor?.enableDrawingMode();
    // }

    // if (activeTool === "draw") {
    //   editor?.disableDrawingMode();
    // }

    // if (tool === activeTool) {
    //   return setActiveTool("select");
    // }
    
    setActiveTool(tool);
  }, [activeTool]);

//   const canvasRef = useRef(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       controlsAboveOverlay: true,
//       preserveObjectStacking: true,
//     });

//     init({
//       initialCanvas: canvas,
//       initialContainer: containerRef.current!,
//     });

//     return () => {
//       canvas.dispose();
//     };
//   }, [init]);

  return (
    <div className="h-full flex flex-col">
      <Navbar
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute h-[calc(100%-68px)] w-full top-[68px] flex">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TemplateSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBgSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
          <Toolbar
            activeTool={activeTool}
            // onChangeActiveTool={onChangeActiveTool}
          />
          <div className="flex-1 h-[calc(100%-124px)] bg-muted">
            {/* <canvas ref={canvasRef} /> */}
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};


const meta = {
  id: "layout-design",
  slug: "layout-design",
  name: "Layout Design",
  title: "Layout Design",
  component: LayoutDesign,
  demo: null,
};
export { meta };