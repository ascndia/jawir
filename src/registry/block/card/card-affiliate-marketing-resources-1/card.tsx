import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Image as ImageIcon,
  Link as LinkIcon,
  FileText,
  Download,
} from "lucide-react";

interface ResourceLink {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ElementType;
  isDownload?: boolean; // Indicate if the link triggers a download
}

interface AffiliateMarketingResourcesCardProps {
  resources?: ResourceLink[];
  title?: string;
  description?: string;
}

const defaultResources: ResourceLink[] = [
  {
    id: "res1",
    name: "Banner Ads",
    description: "Download various banner sizes for your website.",
    url: "#banners",
    icon: ImageIcon,
    isDownload: true,
  },
  {
    id: "res2",
    name: "Text Links",
    description: "Pre-approved text links for different products.",
    url: "#textlinks",
    icon: LinkIcon,
  },
  {
    id: "res3",
    name: "Affiliate Guide",
    description: "Best practices and tips for success.",
    url: "#guide",
    icon: FileText,
    isDownload: true,
  },
  {
    id: "res4",
    name: "Product Images",
    description: "High-quality images for promotional use.",
    url: "#productimages",
    icon: ImageIcon,
    isDownload: true,
  },
];

export function CardAffiliateMarketingResources1({
  resources = defaultResources,
  title = "Marketing Resources",
  description = "Access promotional materials and guides.",
}: AffiliateMarketingResourcesCardProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {resources.map((resource, index) => (
            <React.Fragment key={resource.id}>
              <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3 flex-grow min-w-0">
                  <resource.icon className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{resource.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex-shrink-0 mt-2 sm:mt-0"
                >
                  <a href={resource.url} download={resource.isDownload}>
                    {resource.isDownload ? "Download" : "Access"}
                    {resource.isDownload && (
                      <Download className="ml-2 h-4 w-4" />
                    )}
                  </a>
                </Button>
              </li>
              {index < resources.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateMarketingResources1;
