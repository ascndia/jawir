import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Link } from "lucide-react";

interface CardStatsTotalLinks1Props {
  totalLinks?: number;
}

export default function CardStatsTotalLinks1({
  totalLinks = 1234,
}: CardStatsTotalLinks1Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Links</CardTitle>
        <Link className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalLinks.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          Total short links created
        </p>
      </CardContent>
    </Card>
  );
}
