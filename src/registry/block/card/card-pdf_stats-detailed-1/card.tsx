import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { FileText, BarChart3, HardDrive, MessageSquare } from "lucide-react";

interface PdfStats {
  totalPdfs: number;
  totalPages: number;
  totalStorageMb: number; // Storage in MB
  mostChattedPdf?: {
    name: string;
    chatCount: number;
  };
}

interface CardPdfStatsDetailedProps {
  stats?: PdfStats;
  className?: string;
}

// Helper to format storage size
const formatStorage = (mb: number): string => {
  if (mb < 1024) {
    return `${mb.toFixed(1)} MB`;
  } else {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
};

export default function CardPdfStatsDetailed1({
  stats = {
    totalPdfs: 125,
    totalPages: 10520,
    totalStorageMb: 850.5,
    mostChattedPdf: { name: "Annual Report 2024.pdf", chatCount: 42 },
  },
  className,
}: CardPdfStatsDetailedProps) {
  const averagePages =
    stats.totalPdfs > 0 ? (stats.totalPages / stats.totalPdfs).toFixed(1) : "0";

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Detailed PDF Statistics</CardTitle>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          In-depth metrics about your document library.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-5">
        <div className="flex items-start space-x-3">
          <div className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Total Documents
            </p>
            <p className="text-lg font-bold">
              {stats.totalPdfs.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="rounded-md bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <FileText className="h-5 w-5" />{" "}
            {/* Reusing icon, could use Layers */}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Avg. Pages / PDF
            </p>
            <p className="text-lg font-bold">{averagePages}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="rounded-md bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <HardDrive className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Total Storage Used
            </p>
            <p className="text-lg font-bold">
              {formatStorage(stats.totalStorageMb)}
            </p>
          </div>
        </div>
        {stats.mostChattedPdf && (
          <div className="flex items-start space-x-3">
            <div className="rounded-md bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">
                Most Active PDF
              </p>
              <p
                className="truncate text-sm font-semibold"
                title={stats.mostChattedPdf.name}
              >
                {stats.mostChattedPdf.name}
              </p>
              <p className="text-xs text-muted-foreground">
                ({stats.mostChattedPdf.chatCount} sessions)
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
