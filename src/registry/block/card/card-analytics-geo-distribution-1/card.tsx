import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Globe, MapPin } from "lucide-react";

interface GeoStat {
  countryCode: string; // e.g., 'US', 'GB', 'DE'
  countryName: string;
  clicks: number;
  percentage: number;
}

interface CardAnalyticsGeoDistribution1Props {
  topCountries?: GeoStat[];
}

// Placeholder flag component (replace with actual flags if available)
const FlagPlaceholder = ({ countryCode }: { countryCode: string }) => (
  <div className="flex h-5 w-8 items-center justify-center rounded border bg-muted text-xs text-muted-foreground">
    {countryCode}
  </div>
);

export default function CardAnalyticsGeoDistribution1({
  topCountries = [
    {
      countryCode: "US",
      countryName: "United States",
      clicks: 4521,
      percentage: 35.8,
    },
    {
      countryCode: "GB",
      countryName: "United Kingdom",
      clicks: 2105,
      percentage: 16.7,
    },
    {
      countryCode: "DE",
      countryName: "Germany",
      clicks: 1588,
      percentage: 12.6,
    },
    { countryCode: "CA", countryName: "Canada", clicks: 970, percentage: 7.7 },
    { countryCode: "IN", countryName: "India", clicks: 850, percentage: 6.7 },
  ],
}: CardAnalyticsGeoDistribution1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Countries by Clicks</CardTitle>
          <Globe className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Geographic distribution of your link clicks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topCountries.length > 0 ? (
          <ul className="space-y-3">
            {topCountries.slice(0, 5).map(
              (
                country // Show top 5
              ) => (
                <li
                  key={country.countryCode}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3">
                    <FlagPlaceholder countryCode={country.countryCode} />
                    <span className="font-medium">{country.countryName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {country.clicks.toLocaleString()}
                    </span>
                    <span className="w-12 text-right font-semibold">
                      {country.percentage.toFixed(1)}%
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 text-center">
            <MapPin className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Not enough click data for geographic distribution yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
