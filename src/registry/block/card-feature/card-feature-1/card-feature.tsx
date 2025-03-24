import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";
interface CardFeatureProps {
  title?: string;
  description?: string;
  className?: string;
  iconClassName?: string;
}

const CardFeature = ({
  title = "Community",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum quas provident cum",
  className = "",
  iconClassName = "text-primary",
}: Partial<CardFeatureProps>) => (
  <Card className={`max-w-md p-6 text-center rounded-xl ${className}`}>
    <CardHeader className="flex flex-col items-center gap-4">
      <MapPin className={cn("w-12 h-12 ", iconClassName)} />
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-sm">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default CardFeature;
