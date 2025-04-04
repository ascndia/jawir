"use client";

import * as React from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import { RadioGroup } from "@/registry/components/radio-group";
import { Label } from "@/registry/components/label";

interface ExportFormat {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  extension: string;
}

interface ExportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: (options: {
    format: string;
    filename: string;
    includeHeaders: boolean;
    selectedColumns: string[];
    filters: boolean;
  }) => Promise<void>;
  isLoading?: boolean;
  title?: string;
  description?: string;
  dataName?: string;
  rowCount?: number;
  columns?: { id: string; label: string }[];
  hasFilters?: boolean;
}

export default function ExportDialog({
  open = false,
  onOpenChange,
  onExport,
  isLoading = false,
  title = "Export Data",
  description = "Download your data in various formats",
  dataName = "data",
  rowCount = 1250,
  columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
    { id: "created_at", label: "Created At" },
    { id: "updated_at", label: "Updated At" },
    { id: "role", label: "Role" },
    { id: "department", label: "Department" },
    { id: "location", label: "Location" },
  ],
  hasFilters = true,
}: ExportDialogProps) {
  const [format, setFormat] = React.useState("csv");
  const [filename, setFilename] = React.useState(`${dataName}-export`);
  const [includeHeaders, setIncludeHeaders] = React.useState(true);
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(
    columns.map((col) => col.id)
  );
  const [includeFilters, setIncludeFilters] = React.useState(hasFilters);
  const [exportProgress, setExportProgress] = React.useState<number | null>(
    null
  );

  React.useEffect(() => {
    if (open) {
      // Reset state when dialog opens
      setFilename(`${dataName}-export`);
      setSelectedColumns(columns.map((col) => col.id));
      setExportProgress(null);
    }
  }, [open]);
  // }, [open, dataName, columns]);

  // Simulate export progress
  React.useEffect(() => {
    if (isLoading && exportProgress === null) {
      setExportProgress(0);
      const interval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev === null) return 0;
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 150);

      return () => clearInterval(interval);
    }

    if (!isLoading) {
      setExportProgress(null);
    }
  }, [isLoading, exportProgress]);

  const exportFormats: ExportFormat[] = [
    {
      id: "csv",
      label: "CSV",
      description: "Comma-separated values file",
      icon: <FileText className="h-5 w-5" />,
      extension: ".csv",
    },
    {
      id: "xlsx",
      label: "Excel",
      description: "Microsoft Excel spreadsheet",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      extension: ".xlsx",
    },
    {
      id: "json",
      label: "JSON",
      description: "JavaScript Object Notation",
      icon: <FileText className="h-5 w-5" />,
      extension: ".json",
    },
  ];

  const handleFormatChange = (value: string) => {
    setFormat(value);

    // Update filename extension
    const newFormat = exportFormats.find((f) => f.id === value);
    if (newFormat) {
      const baseName = filename.split(".")[0] || `${dataName}-export`;
      setFilename(`${baseName}${newFormat.extension}`);
    }
  };

  const handleFilenameChange = (value: string) => {
    // Ensure filename has correct extension
    const currentFormat = exportFormats.find((f) => f.id === format);
    if (!currentFormat) return;

    const extension = currentFormat.extension;
    const baseName = value.replace(/\.\w+$/, "");

    setFilename(`${baseName}${extension}`);
  };

  const handleColumnToggle = (columnId: string, checked: boolean) => {
    if (checked) {
      setSelectedColumns((prev) => [...prev, columnId]);
    } else {
      setSelectedColumns((prev) => prev.filter((id) => id !== columnId));
    }
  };

  const handleSelectAllColumns = (checked: boolean) => {
    if (checked) {
      setSelectedColumns(columns.map((col) => col.id));
    } else {
      setSelectedColumns([]);
    }
  };

  const handleExport = async () => {
    if (selectedColumns.length === 0) return;

    try {
      await onExport?.({
        format,
        filename,
        includeHeaders,
        selectedColumns,
        filters: includeFilters,
      });
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const selectedFormat = exportFormats.find((f) => f.id === format);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Download className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="mt-1.5">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="space-y-3">
            <Label>Export Format</Label>
            <RadioGroup
              value={format}
              onValueChange={handleFormatChange}
              className="grid gap-3"
            >
              {exportFormats.map((exportFormat) => (
                <div
                  key={exportFormat.id}
                  className="flex items-center space-x-3 rounded-md border border-border p-3 cursor-pointer hover:bg-accent/50 [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/10"
                >
                  <div className="flex justify-center items-center w-6">
                    {exportFormat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{exportFormat.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {exportFormat.extension}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {exportFormat.description}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="filename">Filename</Label>
            <div className="relative">
              <input
                id="filename"
                value={filename}
                onChange={(e) => handleFilenameChange(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Columns</Label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  checked={selectedColumns.length === columns.length}
                  onChange={(e) => handleSelectAllColumns(e.target.checked)}
                  disabled={isLoading}
                />
                Select all
              </label>
            </div>
            <div className="max-h-40 overflow-y-auto border border-border rounded-md p-2">
              <div className="grid grid-cols-2 gap-2">
                {columns.map((column) => (
                  <label
                    key={column.id}
                    className="flex items-center gap-2 text-sm cursor-pointer p-1 rounded hover:bg-accent/50"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      checked={selectedColumns.includes(column.id)}
                      onChange={(e) =>
                        handleColumnToggle(column.id, e.target.checked)
                      }
                      disabled={isLoading}
                    />
                    {column.label}
                  </label>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Exporting {selectedColumns.length} of {columns.length} columns,
              {rowCount.toLocaleString()} rows
            </p>
          </div>

          <div className="space-y-3">
            <Label>Options</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  checked={includeHeaders}
                  onChange={(e) => setIncludeHeaders(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="text-sm">Include column headers</span>
              </label>

              {hasFilters && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    checked={includeFilters}
                    onChange={(e) => setIncludeFilters(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-sm">Apply current filters</span>
                </label>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          {exportProgress !== null && (
            <div className="w-full mb-4">
              <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-150 ease-in-out"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {exportProgress < 100
                  ? "Exporting data..."
                  : "Export complete!"}
              </p>
            </div>
          )}
          <button
            onClick={handleExport}
            disabled={isLoading || selectedColumns.length === 0}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">Exporting...</span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export {selectedFormat?.label || ""}
              </span>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


import { Button } from "@/components/ui/button";
interface ExportDialogProps2 {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onExport?: (arg0: string) => Promise<void>;
  isLoading?: boolean;
}

export function DialogExport1B({
  open = false,
  onOpenChange,
  onExport,
  isLoading = false,
}: ExportDialogProps2) {
  const [format, setFormat] = React.useState("csv");

  const handleExport = () => {
    onExport?.(format);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Data</DialogTitle>
          <DialogDescription>Select a format to export your data.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="format"
                value="csv"
                checked={format === "csv"}
                onChange={() => setFormat("csv")}
              />
              CSV
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="format"
                value="xlsx"
                checked={format === "xlsx"}
                onChange={() => setFormat("xlsx")}
              />
              Excel
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="format"
                value="json"
                checked={format === "json"}
                onChange={() => setFormat("json")}
              />
              JSON
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleExport}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isLoading ? "Exporting..." : "Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}