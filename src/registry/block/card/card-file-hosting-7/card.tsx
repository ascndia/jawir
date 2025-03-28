import * as React from "react";
import {
  Calendar,
  Clock,
  Folder,
  HardDrive,
  Info,
  MapPin,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Button } from "@/registry/components/button/select";
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

interface FileMetadata {
  type: string;
  size: string;
  location: string; // File path or breadcrumb
  owner: {
    name: string;
    avatarUrl?: string;
  };
  createdAt: string;
  modifiedAt: string;
}

interface CardFileDetailsProps extends React.HTMLAttributes<HTMLDivElement> {
  fileName?: string;
  metadata?: FileMetadata;
}

const defaultMetadata: FileMetadata = {
  type: "PDF Document",
  size: "12.8 MB",
  location: "/Projects/Q2 Reports/",
  owner: { name: "Maria Garcia", avatarUrl: "/images/placeholder.svg" },
  createdAt: "October 20, 2023",
  modifiedAt: "Today at 11:15 AM",
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export function CardFileHosting7({
  className,
  fileName = "Quarterly Report Q2.pdf",
  metadata = defaultMetadata,
  ...props
}: CardFileDetailsProps) {
  const DetailItem = ({
    icon: Icon,
    label,
    value,
    children,
  }: {
    icon: React.ElementType;
    label: string;
    value?: string | React.ReactNode;
    children?: React.ReactNode;
  }) => (
    <div className="flex items-start space-x-3">
      <Icon className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {value && <p className="text-sm">{value}</p>}
        {children}
      </div>
    </div>
  );

  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">File Details</CardTitle>
        </div>
        <CardDescription className="truncate pt-1 text-sm" title={fileName}>
          {fileName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-0">
        <DetailItem icon={Info} label="Type" value={metadata.type} />
        <DetailItem icon={HardDrive} label="Size" value={metadata.size} />
        <DetailItem icon={MapPin} label="Location" value={metadata.location} />
        <Separator />
        <DetailItem icon={User} label="Owner">
          <div className="flex items-center space-x-2 pt-0.5">
            <Avatar className="h-5 w-5 border">
              <AvatarImage
                src={metadata.owner.avatarUrl}
                alt={metadata.owner.name}
              />
              <AvatarFallback className="text-[10px]">
                {getInitials(metadata.owner.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{metadata.owner.name}</span>
          </div>
        </DetailItem>
        <DetailItem
          icon={Calendar}
          label="Created"
          value={metadata.createdAt}
        />
        <DetailItem
          icon={Clock}
          label="Last Modified"
          value={metadata.modifiedAt}
        />
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="p-4 border-t">
        <Button variant="outline" size="sm" className="w-full">Open File Location</Button>
      </CardFooter> */}
    </Card>
  );
}
