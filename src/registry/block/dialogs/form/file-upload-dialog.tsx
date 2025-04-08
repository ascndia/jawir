"use client";

import * as React from "react";
import { File, Loader2, UploadCloud, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Progress } from "@/registry/components/progress";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";

interface FileUploadDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onUpload?: (files: File[]) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  title?: string;
  description?: string;
}

export default function FileUploadDialog({
  open = false,
  onOpenChange,
  onUpload,
  onCancel,
  isLoading = false,
  maxFiles = 5,
  maxSize = 10, // 10MB
  acceptedTypes = [
    "image/*",
    "application/pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
  ],
  title = "Upload Files",
  description = "Drag and drop files here or click to browse",
}: FileUploadDialogProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(
    null
  );
  const [errors, setErrors] = React.useState<string[]>([]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setFiles([]);
      setDragActive(false);
      setUploadProgress(null);
      setErrors([]);
    }
  }, [open]);

  // Simulate upload progress
  React.useEffect(() => {
    if (isLoading && files.length > 0 && uploadProgress === null) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev === null) return 0;
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 300);

      return () => clearInterval(interval);
    }

    if (!isLoading) {
      setUploadProgress(null);
    }
  }, [isLoading, files.length, uploadProgress]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFiles = (fileList: FileList | File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check if adding these files would exceed the max files limit
    if (files.length + fileList.length > maxFiles) {
      newErrors.push(`You can only upload a maximum of ${maxFiles} files`);
      return { validFiles, newErrors };
    }

    // Validate each file
    Array.from(fileList).forEach((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(
          `${file.name} exceeds the maximum file size of ${maxSize}MB`
        );
        return;
      }

      // Check file type
      const fileType = file.type;
      const fileExtension = `.${file.name.split(".").pop()}`;

      const isAcceptedType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          // Check by extension
          return fileExtension.toLowerCase() === type.toLowerCase();
        } else if (type.includes("*")) {
          // Check by MIME type with wildcard
          const [category] = type.split("/");
          return fileType.startsWith(`${category}/`);
        } else {
          // Check exact MIME type
          return fileType === type;
        }
      });

      if (!isAcceptedType) {
        newErrors.push(`${file.name} has an unsupported file type`);
        return;
      }

      validFiles.push(file);
    });

    return { validFiles, newErrors };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const { validFiles, newErrors } = validateFiles(e.dataTransfer.files);

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setErrors([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const { validFiles, newErrors } = validateFiles(e.target.files);

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      setFiles((prev) => [...prev, ...validFiles]);
      setErrors([]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;

    onUpload?.(files);
  };

  const handleCancel = () => {
    onCancel?.();
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div
            className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/30 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <UploadCloud className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">
              Drag & drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports {acceptedTypes.join(", ")} (Max: {maxSize}MB per file)
            </p>
            <Input
              ref={inputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(",")}
              onChange={handleChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={isLoading}
            />
          </div>

          {errors.length > 0 && (
            <div className="mt-2 rounded-lg bg-destructive/10 p-2 text-sm text-destructive">
              <ul className="list-inside list-disc">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-4">
              <Label className="mb-2 block">
                Selected Files ({files.length}/{maxFiles})
              </Label>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-2"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file) ? (
                        <img
                          src={
                            (getFileIcon(file) as string) || "/placeholder.svg"
                          }
                          alt={file.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                          <File className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      disabled={isLoading}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {uploadProgress !== null && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            className="w-full sm:w-auto"
            disabled={files.length === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${files.length} ${files.length === 1 ? "File" : "Files"}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
