"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface GradeBadgeProps {
  grade: string; // Expected values: "A", "B", "C", "D", "F"
}

const gradeColors: Record<string, string> = {
  A: "bg-green-500 text-white",
  B: "bg-blue-500 text-white",
  C: "bg-yellow-500 text-black",
  D: "bg-orange-500 text-white",
  F: "bg-red-500 text-white",
};

export const GradeBadge: React.FC<GradeBadgeProps> = ({ grade }) => {
  const colorClass = gradeColors[grade] || "bg-gray-500 text-white"; // Default to gray if grade is invalid

  return (
    <Badge className={`${colorClass} px-2 py-1 rounded-full text-sm font-medium`}>
      {grade}
    </Badge>
  );
};
