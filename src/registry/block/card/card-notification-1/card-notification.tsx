import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { Button } from "@/registry/components/button/select";

interface CardNotificationProps {
  title?: string;
  message?: string;
  time?: string;
  className?: string;
}

const CardNotification = ({
  title = "New Notification",
  message = "You have a new message waiting.",
  time = "Just now",
  className = "",
}: Partial<CardNotificationProps>) => (
  <Card
    className={`max-w-md md:break-inside-avoid overflow-hidden ${className}`}
  >
    <CardContent>
      <div className="flex flex-row items-center gap-4">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Bell />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="mt-1 text-sm">{message}</CardDescription>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Dismiss</Button>
      </div>
    </CardContent>
  </Card>
);

export default CardNotification;
