import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { ExternalLink, Users } from "lucide-react";
import Link from "next/link"; // Using next/link for external links

interface ReferrerStat {
  domain: string;
  clicks: number;
  faviconUrl?: string; // Optional URL for favicon
}

interface CardAnalyticsReferrers1Props {
  topReferrers?: ReferrerStat[];
}

// Placeholder for favicon
const FaviconPlaceholder = ({ domain }: { domain: string }) => (
  <div className="flex h-5 w-5 items-center justify-center rounded-sm border bg-muted text-[10px] font-bold text-muted-foreground">
    {domain.charAt(0).toUpperCase()}
  </div>
);

export default function CardAnalyticsReferrers1({
  topReferrers = [
    {
      domain: "google.com",
      clicks: 3201,
      faviconUrl: "/images/placeholder.svg",
    }, // Replace with actual favicons if possible
    {
      domain: "facebook.com",
      clicks: 1850,
      faviconUrl: "/images/placeholder.svg",
    },
    {
      domain: "twitter.com",
      clicks: 975,
      faviconUrl: "/images/placeholder.svg",
    },
    { domain: "github.com", clicks: 620 }, // No favicon example
    {
      domain: "producthunt.com",
      clicks: 412,
      faviconUrl: "/images/placeholder.svg",
    },
  ],
}: CardAnalyticsReferrers1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Referrers</CardTitle>
          <Users className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Websites sending the most traffic to your links.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topReferrers.length > 0 ? (
          <ul className="space-y-3">
            {topReferrers.slice(0, 5).map(
              (
                referrer // Show top 5
              ) => (
                <li
                  key={referrer.domain}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    {referrer.faviconUrl ? (
                      <img
                        src={referrer.faviconUrl}
                        alt={`${referrer.domain} favicon`}
                        className="h-5 w-5 rounded-sm"
                      />
                    ) : (
                      <FaviconPlaceholder domain={referrer.domain} />
                    )}
                    <Link
                      href={`https://${referrer.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline flex items-center gap-1"
                    >
                      {referrer.domain}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </Link>
                  </div>
                  <span className="font-semibold">
                    {referrer.clicks.toLocaleString()}
                  </span>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center">
            <Users className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No referrer data available yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
