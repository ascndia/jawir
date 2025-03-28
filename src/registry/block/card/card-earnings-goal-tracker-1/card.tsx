"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Progress } from "@/registry/components/progress";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { Goal, TrendingUp, Edit, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardEarningsGoalTracker1Props {
  currentEarnings?: number;
  initialGoal?: number;
  currencySymbol?: string;
  onGoalUpdate?: (newGoal: number) => void; // Callback when goal is updated
}

export default function CardEarningsGoalTracker1({
  currentEarnings = 785.5,
  initialGoal = 1500,
  currencySymbol = "$",
  onGoalUpdate = (newGoal) => console.log("Goal updated to:", newGoal),
}: CardEarningsGoalTracker1Props) {
  const [goal, setGoal] = React.useState(initialGoal);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editValue, setEditValue] = React.useState(initialGoal.toString());

  const progressPercentage =
    goal > 0 ? Math.min((currentEarnings / goal) * 100, 100) : 0;
  const remainingAmount = Math.max(0, goal - currentEarnings);

  const handleEditToggle = () => {
    if (isEditing) {
      const newGoal = parseFloat(editValue);
      if (!isNaN(newGoal) && newGoal >= 0) {
        setGoal(newGoal);
        onGoalUpdate(newGoal);
      } else {
        // Reset edit value if invalid
        setEditValue(goal.toString());
      }
    } else {
      setEditValue(goal.toString()); // Set current goal to edit input
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and one decimal point
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditValue(value);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2">
            <Goal className="h-5 w-5" />
            Monthly Earnings Goal
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <Check className="h-4 w-4" />
            ) : (
              <Edit className="h-4 w-4" />
            )}
            <span className="sr-only">
              {isEditing ? "Save Goal" : "Edit Goal"}
            </span>
          </Button>
        </div>
        {isEditing ? (
          <div className="flex items-center gap-2 pt-1">
            <Label htmlFor="goalInput" className="sr-only">
              Set Goal Amount
            </Label>
            <span className="text-lg font-semibold text-muted-foreground">
              {currencySymbol}
            </span>
            <Input
              id="goalInput"
              type="text" // Use text to allow decimal input control
              inputMode="decimal"
              value={editValue}
              onChange={handleInputChange}
              className="h-8 flex-1 text-lg font-semibold"
              autoFocus
              onBlur={handleEditToggle} // Save on blur
              onKeyDown={(e) => e.key === "Enter" && handleEditToggle()} // Save on Enter
            />
          </div>
        ) : (
          <CardDescription>
            Target:{" "}
            <span className="font-semibold">
              {currencySymbol}
              {goal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {currencySymbol}
            {currentEarnings.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
          <span className="text-sm text-muted-foreground">
            earned this month
          </span>
        </div>
        <Progress
          value={progressPercentage}
          aria-label="Monthly earnings goal progress"
          className="mt-3 h-2"
        />
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground flex items-center">
          <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          {currencySymbol}
          {remainingAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          left to reach your goal.
        </p>
      </CardFooter>
    </Card>
  );
}
