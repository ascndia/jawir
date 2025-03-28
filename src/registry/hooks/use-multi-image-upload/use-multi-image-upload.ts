import { useState, useCallback, useRef, useEffect } from "react";

export interface FileWithPreview extends File {
  preview: string;
  id: string; // Unique ID for stable list rendering and removal
}

export interface UseMultiImageUploadProps {
  maxFiles?: number;
  acceptedFormats?: string[];
  maxFileSize?: number; // in bytes
  onUploadSuccess?: (files: FileWithPreview[]) => void; // Placeholder for actual upload logic
  onUploadError?: (error: Error | string) => void; // Placeholder
  initialFiles?: FileWithPreview[];
}

const DEFAULT_MAX_FILES = 5;
const DEFAULT_ACCEPTED_FORMATS = ["image/jpeg", "image/png", "image/webp"];
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function useMultiImageUpload({
  maxFiles = DEFAULT_MAX_FILES,
  acceptedFormats = DEFAULT_ACCEPTED_FORMATS,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  onUploadSuccess,
  onUploadError,
  initialFiles = [],
}: UseMultiImageUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up preview URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on unmount

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return `Invalid file type: ${
          file.name
        }. Accepted formats: ${acceptedFormats.join(", ")}`;
      }
      if (file.size > maxFileSize) {
        return `File too large: ${file.name}. Maximum size: ${
          maxFileSize / 1024 / 1024
        }MB`;
      }
      return null;
    },
    [acceptedFormats, maxFileSize]
  );

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const currentErrors: string[] = [];
      const filesToAdd: FileWithPreview[] = [];

      Array.from(newFiles).forEach((file) => {
        if (files.length + filesToAdd.length >= maxFiles) {
          currentErrors.push(`Maximum number of files (${maxFiles}) reached.`);
          return; // Stop adding more files if limit is reached
        }

        const error = validateFile(file);
        if (error) {
          currentErrors.push(error);
        } else {
          const fileWithPreview: FileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: crypto.randomUUID(), // Generate unique ID
          });
          filesToAdd.push(fileWithPreview);
        }
      });

      setErrors(currentErrors); // Set errors encountered during this batch

      if (filesToAdd.length > 0) {
        setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
        // Optionally trigger success callback immediately after adding
        // onUploadSuccess?.([...files, ...filesToAdd]); // Or maybe after an actual upload step
      }
      if (currentErrors.length > 0) {
        onUploadError?.(currentErrors.join("\n"));
      }
    },
    [files.length, maxFiles, validateFile, onUploadError]
  );

  const removeFile = useCallback(
    (fileId: string) => {
      setFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((f) => f.id === fileId);
        if (fileToRemove) {
          URL.revokeObjectURL(fileToRemove.preview); // Clean up memory
        }
        return prevFiles.filter((f) => f.id !== fileId);
      });
      setErrors([]); // Clear errors when a file is removed
    },
    [] // No dependencies needed as setFiles handles updates correctly
  );

  const replaceFile = useCallback(
    (fileId: string, newFile: File) => {
      const error = validateFile(newFile);
      if (error) {
        setErrors([error]);
        onUploadError?.(error);
        return;
      }

      setFiles((prevFiles) =>
        prevFiles.map((f) => {
          if (f.id === fileId) {
            URL.revokeObjectURL(f.preview); // Clean up old preview
            return Object.assign(newFile, {
              preview: URL.createObjectURL(newFile),
              id: fileId, // Keep the same ID
            });
          }
          return f;
        })
      );
      setErrors([]);
    },
    [validateFile, onUploadError]
  );

  const reorderFiles = useCallback((startIndex: number, endIndex: number) => {
    setFiles((prevFiles) => {
      const result = Array.from(prevFiles);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        addFiles(event.target.files);
      }
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [addFiles]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files) {
        addFiles(event.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // Placeholder for actual upload logic
  const uploadFiles = useCallback(async () => {
    // Simulate upload process
    console.log("Uploading files:", files);
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      onUploadSuccess?.(files);
      // Optionally clear files after successful upload:
      // files.forEach(file => URL.revokeObjectURL(file.preview));
      // setFiles([]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Upload failed:", error);
      onUploadError?.(error);
    }
  }, [files, onUploadSuccess, onUploadError]);

  return {
    files,
    errors,
    fileInputRef,
    addFiles,
    removeFile,
    replaceFile,
    reorderFiles,
    handleFileChange,
    handleDrop,
    triggerFileInput,
    uploadFiles, // Expose upload function
  };
}
