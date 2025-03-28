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
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input/input-shadcn/input";
import {
  Eye,
  EyeOff,
  KeyRound,
  PlusCircle,
  RefreshCw,
  Trash2,
  Copy,
} from "lucide-react";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface ApiKey {
  id: string;
  key: string; // The actual key value
  label: string; // User-defined label
  createdAt: string; // ISO 8601
  lastUsed?: string; // ISO 8601 or null/undefined
}

interface CardAccountApiKeys1Props {
  apiKeys?: ApiKey[];
  onGenerateKey?: (label: string) => Promise<ApiKey | { error: string }>;
  onRevokeKey?: (keyId: string) => Promise<boolean | { error: string }>;
  onCopyKey?: (key: string) => void;
}

// Mock functions
const mockGenerate = async (
  label: string
): Promise<ApiKey | { error: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!label) return { error: "Label cannot be empty." };
  return {
    id: `key_${Math.random().toString(36).substring(2, 10)}`,
    key: `sk_${Math.random().toString(36).substring(2)}`,
    label: label,
    createdAt: new Date().toISOString(),
  };
};
const mockRevoke = async (
  keyId: string
): Promise<boolean | { error: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Revoking key:", keyId);
  return true; // Simulate success
};
const mockCopy = (key: string) => {
  navigator.clipboard.writeText(key).then(
    () => console.log("API Key copied!"),
    (err) => console.error("Failed to copy API Key:", err)
  );
};

export default function CardAccountApiKeys1({
  apiKeys: initialApiKeys = [
    {
      id: "key_abc1",
      key: "sk_test_123abc************************",
      label: "Development Key",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "key_def2",
      key: "sk_live_456def************************",
      label: "Production Key",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  onGenerateKey = mockGenerate,
  onRevokeKey = mockRevoke,
  onCopyKey = mockCopy,
}: CardAccountApiKeys1Props) {
  const [keys, setKeys] = React.useState<ApiKey[]>(initialApiKeys);
  const [visibleKeys, setVisibleKeys] = React.useState<Record<string, boolean>>(
    {}
  );
  const [newKeyLabel, setNewKeyLabel] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generateError, setGenerateError] = React.useState<string | null>(null);

  const toggleVisibility = (keyId: string) => {
    setVisibleKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
    // Note: In a real app, you'd fetch the full key here if needed,
    // as the initial key might be masked. For this demo, we assume `key` holds the full value.
  };

  const handleGenerate = async () => {
    if (!newKeyLabel || isGenerating) return;
    setIsGenerating(true);
    setGenerateError(null);
    const result = await onGenerateKey(newKeyLabel);
    setIsGenerating(false);
    if ("error" in result) {
      setGenerateError(result.error);
    } else {
      setKeys((prev) => [result, ...prev]); // Add new key to the top
      setNewKeyLabel(""); // Clear input
      setGenerateError(null);
      // Consider making the new key visible briefly or providing a copy button immediately
    }
  };

  const handleRevoke = async (keyId: string) => {
    // Add confirmation dialog in a real app
    const result = await onRevokeKey(keyId);
    if (result === true) {
      setKeys((prev) => prev.filter((key) => key.id !== keyId));
    } else if (typeof result === "object" && "error" in result) {
      console.error("Failed to revoke key:", result.error); // Show error to user
    }
  };

  const formatKeyDisplay = (key: string, isVisible: boolean): string => {
    if (isVisible) return key;
    // Show prefix and suffix, mask the middle
    const prefixLength = key.startsWith("sk_test_")
      ? 8
      : key.startsWith("sk_live_")
      ? 8
      : 3;
    const suffixLength = 4;
    if (key.length > prefixLength + suffixLength + 4) {
      return `${key.substring(
        0,
        prefixLength
      )}************************${key.substring(key.length - suffixLength)}`;
    }
    return `${key.substring(0, prefixLength)}****`; // Fallback for short keys
  };

  const formatRelativeTime = (dateString?: string): string => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Keys</CardTitle>
          <KeyRound className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Manage API keys for programmatic access. Keep them secure!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {keys.map((apiKey) => (
          <div key={apiKey.id} className="space-y-2 rounded-md border p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{apiKey.label}</span>
              <div className="flex items-center gap-1">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => toggleVisibility(apiKey.id)}
                      >
                        {visibleKeys[apiKey.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {visibleKeys[apiKey.id] ? "Hide key" : "Show key"}
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {visibleKeys[apiKey.id] ? "Hide key" : "Show key"}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onCopyKey(apiKey.key)}
                        disabled={!visibleKeys[apiKey.id]}
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy key</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy key (must be visible)</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => handleRevoke(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Revoke key</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Revoke key</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Input
              value={formatKeyDisplay(apiKey.key, !!visibleKeys[apiKey.id])}
              readOnly
              className="font-mono text-xs h-8"
              aria-label={`API Key for ${apiKey.label}`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Created: {new Date(apiKey.createdAt).toLocaleDateString()}
              </span>
              <span>Last used: {formatRelativeTime(apiKey.lastUsed)}</span>
            </div>
          </div>
        ))}
        {keys.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No API keys generated yet.
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 border-t pt-4">
        <label htmlFor="newKeyLabel" className="text-sm font-medium">
          Generate New Key
        </label>
        <div className="flex w-full space-x-2">
          <Input
            id="newKeyLabel"
            placeholder="Label (e.g., My App)"
            value={newKeyLabel}
            onChange={(e) => setNewKeyLabel(e.target.value)}
            disabled={isGenerating}
            aria-label="Label for new API key"
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !newKeyLabel}
          >
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="mr-2 h-4 w-4" />
            )}
            Generate
          </Button>
        </div>
        {generateError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {generateError}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
