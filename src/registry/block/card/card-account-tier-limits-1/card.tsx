import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import { Progress } from "@/registry/components/progress";
import { UserCheck, Link, Globe, ArrowUpCircle } from "lucide-react";

interface AccountLimits {
  linksCreated: number;
  linkLimit: number;
  customDomainsUsed: number;
  customDomainLimit: number;
}

interface CardAccountTierLimits1Props {
  tierName?: string;
  limits?: AccountLimits;
  onUpgrade?: () => void; // Callback for upgrade action
}

export default function CardAccountTierLimits1({
  tierName = "Pro Plan",
  limits = {
    linksCreated: 850,
    linkLimit: 1000,
    customDomainsUsed: 2,
    customDomainLimit: 5,
  },
  onUpgrade = () => console.log("Upgrade plan clicked"),
}: CardAccountTierLimits1Props) {
  const linkUsagePercentage =
    limits.linkLimit > 0 ? (limits.linksCreated / limits.linkLimit) * 100 : 0;
  const domainUsagePercentage =
    limits.customDomainLimit > 0
      ? (limits.customDomainsUsed / limits.customDomainLimit) * 100
      : 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Account Tier: {tierName}
          </CardTitle>
          {/* Optional: Add a badge or icon indicating the tier */}
        </div>
        <CardDescription>Your current plan usage and limits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Link className="h-4 w-4" /> Link Usage
            </span>
            <span className="font-medium">
              {limits.linksCreated.toLocaleString()} /{" "}
              {limits.linkLimit.toLocaleString()}
            </span>
          </div>
          <Progress
            value={linkUsagePercentage}
            aria-label="Link usage percentage"
            className="h-2"
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Globe className="h-4 w-4" /> Custom Domains
            </span>
            <span className="font-medium">
              {limits.customDomainsUsed} / {limits.customDomainLimit}
            </span>
          </div>
          <Progress
            value={domainUsagePercentage}
            aria-label="Custom domain usage percentage"
            className="h-2"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="secondary" onClick={onUpgrade}>
          <ArrowUpCircle className="mr-2 h-4 w-4" />
          Upgrade Plan
        </Button>
      </CardFooter>
    </Card>
  );
}
