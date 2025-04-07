"use client";
import { useState } from "react";
import { createColumns } from "./column";
import { data } from "./data";
import { DataTable } from "./data-table";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { VisuallyHidden } from "react-aria";
import { DialogTitle } from "@radix-ui/react-dialog";
export const DataTableCase5 = () => {
    const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
return (
    <>
    <DataTable columns={createColumns(setPreviewImage)} data={data}/>
    <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
        <DialogContent className="w-auto h-auto max-h-[90vh] max-w-[90vw] overflow-auto flex items-center justify-center p-0 border-none bg-transparent">
        <VisuallyHidden>
            <DialogTitle>Preview Image</DialogTitle>
        </VisuallyHidden>
          {previewImage && (
            <Image
              src={previewImage.url || "/placeholder.svg"}
              alt={`Cover of ${previewImage.title}`}
              width={500}
              height={750}
              className="object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
)
}