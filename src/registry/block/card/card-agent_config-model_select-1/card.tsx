"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import Label from "@/registry/components/label/label-shadcn/label";
import { BrainCircuit } from "lucide-react";

interface ModelOption {
  value: string;
  label: string;
}

interface CardAgentConfigModelSelectProps {
  availableModels?: ModelOption[];
  selectedModel?: string;
  onModelChange?: (modelValue: string) => void;
  className?: string;
}

export default function CardAgentConfigModelSelect1({
  availableModels = [
    { value: "gpt-4-turbo", label: "GPT-4 Turbo (Recommended)" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "gemini-pro", label: "Gemini Pro" },
  ],
  selectedModel = "gpt-4-turbo",
  onModelChange,
  className,
}: CardAgentConfigModelSelectProps) {
  const [currentModel, setCurrentModel] = React.useState(selectedModel);

  const handleValueChange = (value: string) => {
    setCurrentModel(value);
    if (onModelChange) {
      onModelChange(value);
    }
  };

  // Update internal state if the prop changes
  React.useEffect(() => {
    setCurrentModel(selectedModel);
  }, [selectedModel]);

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Agent Configuration</CardTitle>
            <CardDescription>
              Select the underlying LLM for RAG.
            </CardDescription>
          </div>
          <BrainCircuit className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="agent-model-select">Language Model</Label>
          <Select
            value={currentModel}
            onValueChange={handleValueChange}
            name="agent-model-select"
          >
            <SelectTrigger id="agent-model-select">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model.value} value={model.value}>
                  {model.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
