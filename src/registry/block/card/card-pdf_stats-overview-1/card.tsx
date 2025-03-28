import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { FileText, BookOpen } from "lucide-react";

interface CardPdfStatsOverviewProps {
  totalPdfs?: number;
  pagesIndexed?: number;
  className?: string;
}

export default function CardPdfStatsOverview1({
  totalPdfs = 125,
  pagesIndexed = 10520,
  className,
}: CardPdfStatsOverviewProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">PDF Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total PDFs
            </p>
            <p className="text-xl font-bold">{totalPdfs.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-md bg-secondary/10 p-2 text-secondary-foreground">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Pages Indexed
            </p>
            <p className="text-xl font-bold">{pagesIndexed.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
