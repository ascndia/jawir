"use client"; // Assuming chart library might use hooks

import * as React from "react";
import { FileText, HardDrive, Image, Video, FileQuestion } from "lucide-react"; // Icons for file types

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

// Placeholder for chart component props
interface ChartProps {
  data: { name: string; value: number; color: string }[];
}

// Placeholder Chart Component
const PlaceholderPieChart = ({ data }: ChartProps) => (
  <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed bg-muted text-sm text-muted-foreground">
    Pie Chart Placeholder
  </div>
);

interface StorageBreakdownItem {
  type: string; // e.g., "Documents", "Photos", "Videos", "Other"
  size: number; // Size in GB or MB for calculation
  formattedSize: string; // e.g., "15.2 GB"
  icon: React.ElementType;
  color: string; // Tailwind color class for chart/legend
}

interface CardStorageBreakdownProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  breakdownData?: StorageBreakdownItem[];
  totalUsedStorage?: string;
}

const defaultBreakdownData: StorageBreakdownItem[] = [
  {
    type: "Documents",
    size: 12.8,
    formattedSize: "12.8 GB",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    type: "Photos",
    size: 8.5,
    formattedSize: "8.5 GB",
    icon: Image,
    color: "bg-green-500",
  },
  {
    type: "Videos",
    size: 6.2,
    formattedSize: "6.2 GB",
    icon: Video,
    color: "bg-purple-500",
  },
  {
    type: "Other",
    size: 5.3,
    formattedSize: "5.3 GB",
    icon: FileQuestion,
    color: "bg-gray-500",
  },
];

const defaultTotalUsed = "32.8 GB"; // Sum of above

export function CardFileHosting19({
  className,
  title = "Storage Breakdown",
  description = "How your storage space is being used.",
  breakdownData = defaultBreakdownData,
  totalUsedStorage = defaultTotalUsed,
  ...props
}: CardStorageBreakdownProps) {
  const chartData = breakdownData.map((item) => ({
    name: item.type,
    value: item.size,
    color: item.color, // Pass color to chart if needed
  }));

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center space-x-2">
          <HardDrive className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description} Total used: {totalUsedStorage}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="mb-4">
          <PlaceholderPieChart data={chartData} />
        </div>
        <div className="space-y-2">
          {breakdownData.map((item) => (
            <div key={item.type} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={cn("h-3 w-3 rounded-full", item.color)} />
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{item.type}</span>
              </div>
              <span className="text-sm font-medium">{item.formattedSize}</span>
            </div>
          ))}
        </div>
      </CardContent>
      {/* Optional Footer for actions like "Manage Storage" */}
      {/* <CardFooter className="p-4 border-t">
         <Button variant="outline" size="sm" className="w-full">Manage Storage</Button>
       </CardFooter> */}
    </Card>
  );
}
