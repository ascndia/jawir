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
  ScrollArea,
  ScrollBar,
} from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { FileText, MessageSquare, Trash2, Clock } from "lucide-react";

interface PdfItem {
  id: string;
  name: string;
  uploadDate: Date;
  status: "Processing" | "Ready" | "Error";
  pages: number;
}

interface CardPdfManagementRecentListProps {
  recentPdfs?: PdfItem[];
  className?: string;
  maxHeight?: string; // e.g., "h-[300px]"
}

// Helper function to format date/time
const formatDateTime = (date: Date) => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function CardPdfManagementRecentList1({
  recentPdfs = [
    // Default mock data
    {
      id: "pdf1",
      name: "Annual Report 2024.pdf",
      uploadDate: new Date(Date.now() - 3600000),
      status: "Ready",
      pages: 52,
    },
    {
      id: "pdf2",
      name: "Project Proposal - AI Integration.pdf",
      uploadDate: new Date(Date.now() - 7200000),
      status: "Processing",
      pages: 15,
    },
    {
      id: "pdf3",
      name: "Meeting Notes - Q1 Review.pdf",
      uploadDate: new Date(Date.now() - 86400000),
      status: "Ready",
      pages: 8,
    },
    {
      id: "pdf4",
      name: "Technical Specification - v2.pdf",
      uploadDate: new Date(Date.now() - 172800000),
      status: "Error",
      pages: 120,
    },
    {
      id: "pdf5",
      name: "Onboarding Guide.pdf",
      uploadDate: new Date(Date.now() - 259200000),
      status: "Ready",
      pages: 25,
    },
  ],
  className,
  maxHeight = "h-[350px]",
}: CardPdfManagementRecentListProps) {
  const getStatusVariant = (status: PdfItem["status"]) => {
    switch (status) {
      case "Ready":
        return "default"; // Or 'success' if you have it
      case "Processing":
        return "secondary";
      case "Error":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
        <CardDescription>
          Manage and interact with your recently uploaded PDFs.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={maxHeight}>
          <div className="space-y-1 p-4 pt-0">
            {recentPdfs.map((pdf, index) => (
              <React.Fragment key={pdf.id}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium leading-none">
                        {pdf.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDateTime(pdf.uploadDate)}</span>
                        <span>&middot;</span>
                        <span>{pdf.pages} pages</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={getStatusVariant(pdf.status)}
                      className="hidden sm:inline-flex"
                    >
                      {pdf.status}
                    </Badge>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={pdf.status !== "Ready"}
                            className="h-8 w-8"
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span className="sr-only">Chat</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Start Chat</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete PDF</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                {index < recentPdfs.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
