"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Input } from "@/registry/components/input/input-shadcn/input";
import Button from "@/registry/components/button/button-shadcn/button";
import { Copy, Check, Link as LinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip"; // Assuming tooltip path

interface AffiliateReferralLinkCardProps {
  referralLink?: string;
  linkDescription?: string;
}

export function CardAffiliateReferralLink1({
  referralLink = "https://yourecommercesite.com/ref?id=AFF123XYZ",
  linkDescription = "Share this link to earn commissions on referred sales.",
}: AffiliateReferralLinkCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optionally show an error state/message
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-primary" />
          <CardTitle>Your Referral Link</CardTitle>
        </div>
        <CardDescription>{linkDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center space-x-2">
        <Input
          type="text"
          value={referralLink}
          readOnly
          className="flex-grow"
          aria-label="Referral Link"
        />
        <TooltipProvider>
          <Tooltip open={isCopied}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {isCopied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy Referral Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copied!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateReferralLink1;
