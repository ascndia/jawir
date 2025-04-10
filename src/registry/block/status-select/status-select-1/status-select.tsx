'use client';

import { Dot } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";

const defaultStatuses = [
  { value: "completed", label: "Completed", color: "text-emerald-600" },
  { value: "in_progress", label: "In Progress", color: "text-blue-600" },
  { value: "pending", label: "Pending", color: "text-yellow-500" },
  { value: "cancelled", label: "Cancelled", color: "text-gray-500" },
  { value: "failed", label: "Failed", color: "text-red-600" },
];

const StatusSelect = ({
    statuses = defaultStatuses,
  }: {
    statuses?: { value: string; label: string; color: string }[];
  }
) => {
  return (
    <div className="space-y-2">
      <Select defaultValue="completed">
        <SelectTrigger id="select-status" className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              <span className="flex items-center gap-2">
                <Dot
                  className={status.color}
                  width={10}
                  height={10}
                  strokeWidth={20}
                />
                <span className="truncate">{status.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusSelect;