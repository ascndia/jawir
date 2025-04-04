"use client";
import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftRight, Github, LayoutDashboard } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogConnect1A({ open, onOpenChange }: Props) {
  const [selectedUser, setSelectedUser] = React.useState<string | null>("praveenjuge");
  const [selectedRepo, setSelectedRepo] = React.useState<string | null>("project-alpha");

  return (
    <ReusableDialog
    className="!max-w-sm"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <LayoutDashboard size={20} />
            </div>
            <ArrowLeftRight size={20} className="text-gray-500" />
            <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center text-white">
              <Github size={20} />
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">Connect Mosaic to GitHub</span>
        </div>
      }
      description="Select a user and repository to connect with Mosaic for streamlined workflow integration."
      footer={
        <div className="flex justify-between items-center w-full">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-1/2 mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => alert(`Connected to ${selectedUser}/${selectedRepo}`)}
            className="w-1/2"
          >
            Connect Repository
          </Button>
        </div>
      }
    >
      <div className="space-y-4 w-full">
        {/* GitHub User Select */}
        <div className="w-full">
          <label htmlFor="github-user" className="block text-sm font-medium text-gray-700">
            GitHub User
          </label>
          <Select
            value={selectedUser as string}
            onValueChange={(value) => setSelectedUser(value)}
          >
            <SelectTrigger id="github-user" className="mt-1 w-full">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="praveenjuge">praveenjuge</SelectItem>
              <SelectItem value="johnsmith">johnsmith</SelectItem>
              <SelectItem value="janedoe">janedoe</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* GitHub Repository Select */}
        <div className="w-full">
          <label htmlFor="github-repo" className="block text-sm font-medium text-gray-700">
            GitHub Repository
          </label>
          <Select
            value={selectedRepo as string}
            onValueChange={(value) => setSelectedRepo(value)}
          >
            <SelectTrigger id="github-repo" className="mt-1 w-full">
              <SelectValue placeholder="Select a repository" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="project-alpha">project-alpha</SelectItem>
              <SelectItem value="project-beta">project-beta</SelectItem>
              <SelectItem value="project-gamma">project-gamma</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        By clicking "Connect Repository", you agree to grant Mosaic access to the selected GitHub repository. This action is subject to our{" "}
        <a href="#" className="text-blue-500 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-500 underline">
          Privacy Policy
        </a>.
      </p>
    </ReusableDialog>
  );
}

export function DialogConnect1B({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog
      className="!max-w-sm"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <LayoutDashboard size={20} />
            </div>
            <ArrowLeftRight size={20} className="text-gray-500" />
            <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center text-white">
              <Github size={20} />
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">Connect Mosaic to GitHub</span>
        </div>
      }
      description="Streamline your workflow by connecting Mosaic to your GitHub account."
      footer={
        <div className="flex justify-between items-center w-full">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-1/2 mr-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => alert("Connected successfully!")}
            className="w-1/2"
          >
            Connect
          </Button>
        </div>
      }
    >
      <p className="text-sm text-gray-600 text-center">
        By clicking "Connect", you agree to grant Mosaic access to your GitHub account. This action is subject to our{" "}
        <a href="#" className="text-blue-500 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-500 underline">
          Privacy Policy
        </a>.
      </p>
    </ReusableDialog>
  );
}

import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogConnect1C({ open, onOpenChange }: Props) {
  const [apiKey, setApiKey] = React.useState<string>("");
  const [submitterId, setSubmitterId] = React.useState<string>("");

  return (
    <ReusableDialog
      className="!max-w-sm"
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <LayoutDashboard size={20} />
            </div>
            <ArrowLeftRight size={20} className="text-gray-500" />
            <div className="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center text-white">
              <span className="text-sm font-bold">MA</span>
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">Connect to Mosaic Analytics</span>
        </div>
      }
      description="Enter your API Key and Submitter ID to connect with Mosaic Analytics for enhanced data insights."
      footer={
        <div className="flex flex-col gap-2 w-full">
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
            className="w-full"
          >
            Connect
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancel
          </Button>
          
        </div>
      }
    >
      <div className="space-y-4 w-full">
        {/* API Key Input */}
        <div className="w-full">
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <Input
            id="api-key"
            placeholder="Enter your API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 w-full"
          />
        </div>

        {/* Submitter ID Input */}
        <div className="w-full">
          <label htmlFor="submitter-id" className="block text-sm font-medium text-gray-700">
            Submitter ID
          </label>
          <Input
            id="submitter-id"
            placeholder="Enter your Submitter ID"
            value={submitterId}
            onChange={(e) => setSubmitterId(e.target.value)}
            className="mt-1 w-full"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        By clicking "Connect", you agree to grant Mosaic Analytics access to your data. This action is subject to our{" "}
        <a href="#" className="text-blue-500 underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-500 underline">
          Privacy Policy
        </a>.
      </p>
    </ReusableDialog>
  );
}