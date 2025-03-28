"use client";

import * as React from "react";
import { ListTodo, CalendarDays, Flag, Save, Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label";
import Button from "@/registry/components/button/button-shadcn/button";
import { Textarea } from "@/registry/components/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/components/alert";
import { cn } from "@/lib/utils";

// Example priorities
const priorities = [
  { id: "low", name: "Low", color: "text-green-600" },
  { id: "medium", name: "Medium", color: "text-yellow-600" },
  { id: "high", name: "High", color: "text-red-600" },
];

interface TaskFormData {
  title: string;
  description?: string;
  dueDate?: string; // Format YYYY-MM-DD
  priority: string; // e.g., 'low', 'medium', 'high'
}

interface CardFormTask1Props {
  initialData?: Partial<TaskFormData>;
  onSubmit?: (data: TaskFormData) => Promise<boolean | void> | boolean | void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
}

export function CardFormTask1({
  initialData = {},
  onSubmit,
  onCancel,
  title = "Create New Task",
  description = "Add details for your new task.",
  submitButtonText = "Add Task",
  successMessage = "Task created successfully!",
  errorMessage = "Failed to create task. Please try again.",
  className,
}: CardFormTask1Props) {
  const [formData, setFormData] = React.useState<TaskFormData>({
    title: initialData.title ?? "",
    description: initialData.description ?? "",
    dueDate: initialData.dueDate ?? "",
    priority: initialData.priority ?? priorities[1].id, // Default to medium
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitStatus("idle");
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, priority: value }));
    setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit || isSubmitting || formData.title.trim() === "") return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await onSubmit(formData);
      if (result !== false) {
        setSubmitStatus("success");
        // Reset form on success
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: priorities[1].id,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Task creation error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    // Reset form to initial or default state
    setFormData({
      title: initialData.title ?? "",
      description: initialData.description ?? "",
      dueDate: initialData.dueDate ?? "",
      priority: initialData.priority ?? priorities[1].id,
    });
    setSubmitStatus("idle");
    setIsSubmitting(false);
    console.log("Cancelled task creation");
  };

  const isFormValid = formData.title.trim() !== "";

  return (
    <Card className={cn("w-full max-w-lg", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pb-6">
          {submitStatus === "success" && (
            <Alert
              variant="default"
              className="bg-success/10 border-success/50 text-success-foreground"
            >
              <Info className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {submitStatus === "error" && (
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="task-title">
              <ListTodo className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Task Title
            </Label>
            <Input
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Finalize project report"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="task-description">Description (Optional)</Label>
            <Textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add more details about the task..."
              rows={3}
              disabled={isSubmitting}
              className="min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="task-dueDate">
                <CalendarDays className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Due Date (Optional)
              </Label>
              <Input
                id="task-dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="task-priority">
                <Flag className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                Priority
              </Label>
              <Select
                name="priority"
                value={formData.priority}
                onValueChange={handleSelectChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="task-priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <span className={cn("flex items-center", p.color)}>
                        <Flag className="mr-2 h-4 w-4" /> {p.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? "Adding..." : submitButtonText}
            {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CardFormTask1;
