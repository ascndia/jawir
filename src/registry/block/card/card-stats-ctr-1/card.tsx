import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Percent } from "lucide-react";

interface CardStatsCtr1Props {
  ctr?: number; // Click-Through Rate as a percentage
}

export default function CardStatsCtr1({ ctr = 4.7 }: CardStatsCtr1Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Click-Through Rate (CTR)
        </CardTitle>
        <Percent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{ctr.toFixed(1)}%</div>
        <p className="text-xs text-muted-foreground">
          Overall CTR across all links
        </p>
      </CardContent>
    </Card>
  );
}
