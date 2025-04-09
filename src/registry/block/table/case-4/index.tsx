"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils";

interface InventoryItem {
  itemName: string;
  category: string;
  stockQty: number;
  price: number;
}

interface EditableCellProps {
  value: string | number;
  isEditing: boolean;
  onSave: (value: string | number) => void;
  onCancel: () => void;
  type?: "text" | "number";
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  isEditing,
  onSave,
  onCancel,
  type = "text",
}) => {
  const [editValue, setEditValue] = useState<string | number>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      setEditValue(e.target.value === "" ? "" : Number(e.target.value));
    } else {
      setEditValue(e.target.value);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave(editValue);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancel();
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          type={type}
          value={editValue}
          onChange={handleChange}
          autoFocus
          step={type === "number" ? "0.01" : undefined}
          min={type === "number" ? "0" : undefined}
          onClick={(e) => e.stopPropagation()}
          className="h-8 w-full"
        />
        <div className="flex gap-1">
          <Button
            onClick={handleSave}
            size="icon"
            variant="default"
            className="h-7 w-7"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleCancel}
            size="icon"
            variant="destructive"
            className="h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return <span className="px-2">{value}</span>;
};

export const TableCase4: React.FC = () => {
  const initialData: InventoryItem[] = [
    { itemName: "Apple", category: "Fruits", stockQty: 50, price: 1.2 },
    { itemName: "Banana", category: "Fruits", stockQty: 100, price: 0.5 },
    { itemName: "Carrot", category: "Vegetables", stockQty: 30, price: 0.8 },
    { itemName: "Broccoli", category: "Vegetables", stockQty: 20, price: 1.5 },
    { itemName: "Chicken Breast", category: "Meat", stockQty: 15, price: 5.99 },
    { itemName: "Salmon", category: "Seafood", stockQty: 10, price: 8.99 },
  ];

  const [data, setData] = useState<InventoryItem[]>(initialData);
  const [editCell, setEditCell] = useState<{
    rowIndex: number | null;
    columnKey: keyof InventoryItem | null;
  }>({ rowIndex: null, columnKey: null });

  const handleCellClick = (rowIndex: number, columnKey: keyof InventoryItem) => {
    setEditCell({ rowIndex, columnKey });
  };

  const handleSaveEdit = (
    rowIndex: number,
    columnKey: keyof InventoryItem,
    value: string | number
  ) => {
    const newData = [...data];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
    setData(newData);
    setEditCell({ rowIndex: null, columnKey: null });
  };

  const handleCancelEdit = () => {
    setEditCell({ rowIndex: null, columnKey: null });
  };

  const isEditing = (rowIndex: number, columnKey: keyof InventoryItem) =>
    editCell.rowIndex === rowIndex && editCell.columnKey === columnKey;

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="divide-x divide-border">
              <TableHead className="px-4 py-3">Item Name</TableHead>
              <TableHead className="px-4 py-3">Category</TableHead>
              <TableHead className="px-4 py-3">Stock Quantity</TableHead>
              <TableHead className="px-4 py-3">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, rowIndex) => (
              <TableRow key={rowIndex} className="divide-x divide-border">
                <TableCell
                  className="px-4 py-2 cursor-pointer"
                  onClick={
                    isEditing(rowIndex, "itemName")
                      ? undefined
                      : () => handleCellClick(rowIndex, "itemName")
                  }
                >
                  <EditableCell
                    value={item.itemName}
                    isEditing={isEditing(rowIndex, "itemName")}
                    onSave={(value) => handleSaveEdit(rowIndex, "itemName", value)}
                    onCancel={handleCancelEdit}
                  />
                </TableCell>
                <TableCell
                  className="px-4 py-2 cursor-pointer"
                  onClick={
                    isEditing(rowIndex, "category")
                      ? undefined
                      : () => handleCellClick(rowIndex, "category")
                  }
                >
                  <EditableCell
                    value={item.category}
                    isEditing={isEditing(rowIndex, "category")}
                    onSave={(value) => handleSaveEdit(rowIndex, "category", value)}
                    onCancel={handleCancelEdit}
                  />
                </TableCell>
                <TableCell
                  className="px-4 py-2 cursor-pointer"
                  onClick={
                    isEditing(rowIndex, "stockQty")
                      ? undefined
                      : () => handleCellClick(rowIndex, "stockQty")
                  }
                >
                  <EditableCell
                    value={item.stockQty}
                    isEditing={isEditing(rowIndex, "stockQty")}
                    onSave={(value) => handleSaveEdit(rowIndex, "stockQty", value)}
                    onCancel={handleCancelEdit}
                    type="number"
                  />
                </TableCell>
                <TableCell
                  className="px-4 py-2 cursor-pointer"
                  onClick={
                    isEditing(rowIndex, "price")
                      ? undefined
                      : () => handleCellClick(rowIndex, "price")
                  }
                >
                  <EditableCell
                    value={item.price}
                    isEditing={isEditing(rowIndex, "price")}
                    onSave={(value) => handleSaveEdit(rowIndex, "price", value)}
                    onCancel={handleCancelEdit}
                    type="number"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};