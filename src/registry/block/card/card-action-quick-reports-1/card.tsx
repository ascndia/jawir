import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  FileText,
  ExternalLink,
  BarChartBig,
  DollarSign,
  Users,
} from "lucide-react";

interface CardActionQuickReports1Props {
  onViewClicksReport?: () => void;
  onViewEarningsReport?: () => void;
  onViewReferralsReport?: () => void;
}

export default function CardActionQuickReports1({
  onViewClicksReport = () => console.log("View Clicks Report"),
  onViewEarningsReport = () => console.log("View Earnings Report"),
  onViewReferralsReport = () => console.log("View Referrals Report"),
}: CardActionQuickReports1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quick Reports</CardTitle>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          Jump directly to detailed analytics sections.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button variant="outline" onClick={onViewClicksReport}>
          <BarChartBig className="mr-2 h-4 w-4" />
          Detailed Click Analytics
          <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="outline" onClick={onViewEarningsReport}>
          <DollarSign className="mr-2 h-4 w-4" />
          Earnings & Payouts Report
          <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
        <Button variant="outline" onClick={onViewReferralsReport}>
          <Users className="mr-2 h-4 w-4" />
          Referral Performance
          <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  );
}
