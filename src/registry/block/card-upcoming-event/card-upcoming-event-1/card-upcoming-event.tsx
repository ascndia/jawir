import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/components/card/card-shadcn/card";
import { Calendar } from "lucide-react";

function CardUpcomingEvent() {
  return (
    <Card className="w-[310px]">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Your schedule for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { date: "Today", event: "Team standup", time: "10:00 AM" },
            { date: "Tomorrow", event: "Client meeting", time: "2:00 PM" },
            {
              date: "Fri, Jun 12",
              event: "Project deadline",
              time: "11:59 PM",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.event}</p>
                <p className="text-xs text-muted-foreground">
                  {item.date} at {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Full Calendar</Button>
      </CardFooter>
    </Card>
  );
}

export default CardUpcomingEvent;
