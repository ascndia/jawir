import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/registry/components/card/card-shadcn/card";

import { Progress } from "@/registry/components/progress";
import { Download } from "lucide-react";
function CardProgress() {
  return (
    <Card className="w-[310px]">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Download Progress</CardTitle>
        <Download className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={40} className="w-full" />
        <p className="text-xs text-muted-foreground mt-2">
          2 of 5 files downloaded
        </p>
      </CardContent>
    </Card>
  );
}
export default CardProgress;
