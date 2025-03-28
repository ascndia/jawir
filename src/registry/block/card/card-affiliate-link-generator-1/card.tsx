"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Label from "@/registry/components/label/label-shadcn/label"; // Corrected to default import
import Button from "@/registry/components/button/button-shadcn/button";
import { Copy, Check, Link as LinkIcon, Settings2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface AffiliateLinkGeneratorCardProps {
  baseReferralUrl?: string; // e.g., "https://yourecommercesite.com/ref?id=AFF123XYZ"
  campaignParamName?: string; // e.g., "utm_campaign" or "campaign_id"
  sourceParamName?: string; // e.g., "utm_source"
  mediumParamName?: string; // e.g., "utm_medium"
}

export function CardAffiliateLinkGenerator1({
  baseReferralUrl = "https://yourecommercesite.com/ref?id=AFF123XYZ",
  campaignParamName = "utm_campaign",
  sourceParamName = "utm_source",
  mediumParamName = "utm_medium",
}: AffiliateLinkGeneratorCardProps) {
  const [campaign, setCampaign] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const generatedLink = useMemo(() => {
    const url = new URL(baseReferralUrl);
    if (campaign.trim()) {
      url.searchParams.set(campaignParamName, campaign.trim());
    }
    if (source.trim()) {
      url.searchParams.set(sourceParamName, source.trim());
    }
    if (medium.trim()) {
      url.searchParams.set(mediumParamName, medium.trim());
    }
    return url.toString();
  }, [
    baseReferralUrl,
    campaign,
    source,
    medium,
    campaignParamName,
    sourceParamName,
    mediumParamName,
  ]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          <CardTitle>Custom Link Generator</CardTitle>
        </div>
        <CardDescription>
          Create tracked links for your campaigns by adding parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor="campaign-input">{campaignParamName}</Label>
            <Input
              id="campaign-input"
              placeholder="e.g., spring_sale"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="source-input">{sourceParamName}</Label>
            <Input
              id="source-input"
              placeholder="e.g., facebook"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="medium-input">{mediumParamName}</Label>
            <Input
              id="medium-input"
              placeholder="e.g., social_post"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 rounded-b-lg border-t border-border bg-muted/50 p-4">
        <Label className="text-xs text-muted-foreground">Generated Link:</Label>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            value={generatedLink}
            readOnly
            className="flex-grow bg-background"
            aria-label="Generated Referral Link"
          />
          <TooltipProvider>
            <Tooltip open={isCopied}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  disabled={generatedLink === baseReferralUrl}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy Generated Link</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CardAffiliateLinkGenerator1;
