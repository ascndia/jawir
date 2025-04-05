import { useState } from "react";

import { 
  ArrowUp, 
  ArrowDown, 
  ChevronDown, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Trash,
  SquareSplitHorizontal,
  Copy,
  PaintRoller,
  Bold,
  Italic,
  Underline,
  Strikethrough
} from "lucide-react";

import { 
  ActiveTool, 
  Editor, 
  FONT_SIZE, 
  FONT_WEIGHT
} from "./types";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { TransparencyGridIcon, WidthIcon } from "@radix-ui/react-icons";

interface ToolbarProps {
  activeTool: ActiveTool;
};

export const Toolbar = ({
  activeTool,
}: ToolbarProps) => {
//   const initialFillColor = editor?.getActiveFillColor();
//   const initialStrokeColor = editor?.getActiveStrokeColor();
//   const initialFontFamily = editor?.getActiveFontFamily();
//   const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
//   const initialFontStyle = editor?.getActiveFontStyle();
//   const initialFontLinethrough = editor?.getActiveFontLinethrough();
//   const initialFontUnderline = editor?.getActiveFontUnderline();
//   const initialTextAlign = editor?.getActiveTextAlign();
//   const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE

//   const [properties, setProperties] = useState({
//     fillColor: initialFillColor,
//     strokeColor: initialStrokeColor,
//     fontFamily: initialFontFamily,
//     fontWeight: initialFontWeight,
//     fontStyle: initialFontStyle,
//     fontLinethrough: initialFontLinethrough,
//     fontUnderline: initialFontUnderline,
//     textAlign: initialTextAlign,
//     fontSize: initialFontSize,
//   });

//   const selectedObject = editor?.selectedObjects[0];
//   const selectedObjectType = editor?.selectedObjects[0]?.type;

//   const isText = isTextType(selectedObjectType);
//   const isImage = selectedObjectType === "image";

//   const onChangeFontSize = (value: number) => {
//     if (!selectedObject) {
//       return;
//     }

//     editor?.changeFontSize(value);
//     setProperties((current) => ({
//       ...current,
//       fontSize: value,
//     }));
//   };

//   const onChangeTextAlign = (value: string) => {
//     if (!selectedObject) {
//       return;
//     }

//     editor?.changeTextAlign(value);
//     setProperties((current) => ({
//       ...current,
//       textAlign: value,
//     }));
//   };

//   const toggleBold = () => {
//     if (!selectedObject) {
//       return;
//     }

//     const newValue = properties.fontWeight > 500 ? 500 : 700;

//     editor?.changeFontWeight(newValue);
//     setProperties((current) => ({
//       ...current,
//       fontWeight: newValue,
//     }));
//   };

//   const toggleItalic = () => {
//     if (!selectedObject) {
//       return;
//     }

//     const isItalic = properties.fontStyle === "italic";
//     const newValue = isItalic ? "normal" : "italic";

//     editor?.changeFontStyle(newValue);
//     setProperties((current) => ({
//       ...current,
//       fontStyle: newValue,
//     }));
//   };

//   const toggleLinethrough = () => {
//     if (!selectedObject) {
//       return;
//     }

//     const newValue = properties.fontLinethrough ? false : true;

//     editor?.changeFontLinethrough(newValue);
//     setProperties((current) => ({
//       ...current,
//       fontLinethrough: newValue,
//     }));
//   };

//   const toggleUnderline = () => {
//     if (!selectedObject) {
//       return;
//     }

//     const newValue = properties.fontUnderline ? false : true;

//     editor?.changeFontUnderline(newValue);
//     setProperties((current) => ({
//       ...current,
//       fontUnderline: newValue,
//     }));
//   };

//   if (editor?.selectedObjects.length === 0) {
//     return (
//       <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
//     );
//   }

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "fill" && "bg-gray-100"
              )}
            >
              <div
                className="rounded-sm size-4 border bg-teal"
              />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke color" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "stroke-color" && "bg-gray-100"
              )}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white border-teal"
              />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "stroke-width" && "bg-gray-100"
              )}
            >
              <WidthIcon className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate">
                Roboto
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                 "bg-gray-100"
              )}
            >
              <Bold className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-gray-100"
              )}
            >
              <Italic className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-gray-100"
              )}
            >
              <Underline className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-gray-100"
              )}
            >
              <Strikethrough className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-gray-100"
              )}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
            "bg-gray-100"
              )}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "bg-gray-100"
              )}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "filter" && "bg-gray-100"
              )}
            >
              <PaintRoller className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      { (
        <div className="flex items-center h-full justify-center">
          <Hint label="Remove background" side="bottom" sideOffset={5}>
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "remove-bg" && "bg-gray-100"
              )}
            >
              <SquareSplitHorizontal className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send backwards" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <TransparencyGridIcon className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button
              
            size="icon"
            variant="ghost"
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-600"
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
