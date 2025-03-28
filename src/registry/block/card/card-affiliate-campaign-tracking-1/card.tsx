import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator"; // Assuming named export
import Button from "@/registry/components/button/button-shadcn/button";
import { Megaphone, MousePointerClick, Target, ArrowRight } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  clicks: number;
  conversions: number;
  link?: string; // Optional link to campaign details or specific referral link
}

interface AffiliateCampaignTrackingCardProps {
  campaigns?: Campaign[];
  title?: string;
  description?: string;
  viewAllLink?: string;
}

const defaultCampaigns: Campaign[] = [
  {
    id: "c1",
    name: "Spring Sale 2025",
    clicks: 1250,
    conversions: 45,
    link: "#spring",
  },
  {
    id: "c2",
    name: "New Product Launch - Gadget X",
    clicks: 870,
    conversions: 62,
    link: "#gadgetx",
  },
  { id: "c3", name: "Holiday Promo", clicks: 2100, conversions: 88 },
  {
    id: "c4",
    name: "Evergreen Content Link",
    clicks: 550,
    conversions: 15,
    link: "#evergreen",
  },
];

export function CardAffiliateCampaignTracking1({
  campaigns = defaultCampaigns,
  title = "Campaign Performance",
  description = "Overview of your active campaign results.",
  viewAllLink = "#",
}: AffiliateCampaignTrackingCardProps) {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            <CardTitle>{title}</CardTitle>
          </div>
          {viewAllLink && (
            <Button variant="link" size="sm" className="text-sm" asChild>
              <a href={viewAllLink}>
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, index) => (
              <React.Fragment key={campaign.id}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="font-medium truncate flex-1">
                    {campaign.name}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <MousePointerClick className="h-4 w-4" />
                      <span>{campaign.clicks.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <Target className="h-4 w-4" />
                      <span>{campaign.conversions}</span>
                    </div>
                    {campaign.link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={campaign.link}>Details</a>
                      </Button>
                    )}
                  </div>
                </div>
                {index < campaigns.length - 1 && <Separator />}
              </React.Fragment>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No active campaigns found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateCampaignTracking1;
