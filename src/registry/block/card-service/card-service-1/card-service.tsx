import { Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";

interface CardServiceProps {
  title?: string;
  description?: string;
  className?: string;
}

const CardService = ({
  title = "Service Card",
  description = "src\\registry\\blockcard-servicecard-service-1\\card-service.tsx",
  className = "",
}: Partial<CardServiceProps>) => (
  <Card
    className={`max-w-md md:break-inside-avoid overflow-hidden ${className}`}
  >
    <CardContent className="flex flex-row items-center gap-4 pb-2">
      <div className="p-2 bg-primary/20 rounded-xl">
        <Lightbulb />
      </div>
      <div className="flex flex-col">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="mt-1 text-sm">
          {description}
        </CardDescription>
      </div>
    </CardContent>
  </Card>
);

export default CardService;
