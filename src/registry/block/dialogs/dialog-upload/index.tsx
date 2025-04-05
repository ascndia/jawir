"use client"

import type * as React from "react"
import { useState, useRef } from "react"
import { Upload, X, ImageIcon, FileText, FileIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

type FileWithPreview = {
  file: File
  preview?: string
  id: string
}

export function DialogUpload1A({
    open,
    onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const newFilesWithPreview = newFiles.map((file) => {
      const fileWithPreview: FileWithPreview = {
        file,
        id: Math.random().toString(36).substring(2, 9),
      }

      if (file.type.startsWith("image/")) {
        fileWithPreview.preview = URL.createObjectURL(file)
      }

      return fileWithPreview
    })

    setFiles((prev) => [...prev, ...newFilesWithPreview])
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id)

      // Revoke object URLs to avoid memory leaks
      const removedFile = prev.find((f) => f.id === id)
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview)
      }

      return filtered
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)

      setTimeout(() => {
        setUploading(false)
        setFiles([])
        setProgress(0)
      }, 500)
    }, 4000)
  }

  const getFileIcon = (file: FileWithPreview) => {
    if (file.preview) {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-md">
          <img src={file.preview || "/placeholder.svg"} alt={file.file.name} className="h-full w-full object-cover" />
        </div>
      )
    }

    if (file.file.type.includes("pdf")) {
      return <FileText className="h-8 w-8 text-muted-foreground" />
    }

    if (file.file.type.includes("image")) {
      return <ImageIcon className="h-8 w-8 text-muted-foreground" />
    }

    return <FileIcon className="h-8 w-8 text-muted-foreground" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>Drag and drop files or click to browse.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            className={cn(
              "relative flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 px-6 py-10 text-center transition-colors",
              isDragging && "border-primary/50 bg-muted/50",
              uploading && "pointer-events-none opacity-60",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <div className="flex flex-col items-center gap-1">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                <span className="text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">Images, PDFs, and documents (max 10MB each)</p>
            </div>
          </div>

          {files.length > 0 && (
            <ScrollArea className="h-[200px] rounded-md border p-2">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="group relative flex h-24 flex-col items-center justify-center rounded-md border bg-muted/50 p-2"
                  >
                    {getFileIcon(file)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 h-6 w-6 scale-0 rounded-full opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(file.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                    <p className="mt-1 w-full truncate text-center text-xs">{file.file.name}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground">
                Uploading {files.length} file{files.length > 1 ? "s" : ""}... {progress}%
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpload} disabled={files.length === 0 || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

