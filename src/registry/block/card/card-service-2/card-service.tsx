import { Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Button } from "@/registry/components/button/select";

interface CardServiceProps {
  title?: string;
  description?: string;
  className?: string;
}

const CardService = ({
  title = "Service Card",
  description = "Lorem ipsum dolor sit amet",
  className = "",
}: Partial<CardServiceProps>) => (
  <Card
    className={`max-w-md md:break-inside-avoid overflow-hidden drop-shadow-xl shadow-black/10 ${className}`}
  >
    <CardContent>
      <div className="flex flex-row items-center gap-4 pb-2">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Lightbulb />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-1 text-sm">
            {description}
          </CardDescription>
        </div>
      </div>
      <Button className="w-full mt-4">Learn More</Button>
      <p className="text-sm text-muted-foreground mt-4">
        Additional details here
      </p>
    </CardContent>
  </Card>
);

export default CardService;
