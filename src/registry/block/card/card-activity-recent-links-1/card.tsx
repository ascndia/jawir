import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar/avatar-shadcn/avatar";
import { History, Link, MousePointerClick } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "link_created" | "link_clicked";
  linkName?: string; // Only for link_created
  shortUrl: string;
  timestamp: string; // ISO 8601 format string
  userAvatar?: string; // URL for avatar image
  userName?: string; // Fallback initials
}

interface CardActivityRecentLinks1Props {
  activities?: ActivityItem[];
}

// Helper function to format time ago (simplified)
function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function CardActivityRecentLinks1({
  activities = [
    {
      id: "1",
      type: "link_clicked",
      shortUrl: "https://sho.rt/abc123",
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      userAvatar: "/images/placeholder.svg",
      userName: "JD",
    },
    {
      id: "2",
      type: "link_created",
      linkName: "New Campaign",
      shortUrl: "https://sho.rt/def456",
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      userAvatar: "/images/placeholder.svg",
      userName: "AS",
    },
    {
      id: "3",
      type: "link_clicked",
      shortUrl: "https://sho.rt/ghi789",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      userAvatar: "/images/placeholder.svg",
      userName: "MS",
    },
    {
      id: "4",
      type: "link_clicked",
      shortUrl: "https://sho.rt/abc123",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      userAvatar: "/images/placeholder.svg",
      userName: "LP",
    },
    {
      id: "5",
      type: "link_created",
      linkName: "Blog Post Link",
      shortUrl: "https://sho.rt/jkl012",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      userAvatar: "/images/placeholder.svg",
      userName: "KW",
    },
  ],
}: CardActivityRecentLinks1Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <History className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>Latest link creations and clicks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.slice(0, 5).map(
          (
            activity // Limit to 5 items
          ) => (
            <div key={activity.id} className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={activity.userAvatar}
                  alt={activity.userName || "User"}
                />
                <AvatarFallback>
                  {activity.userName
                    ? activity.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">
                  {activity.type === "link_created" ? (
                    <>
                      <Link className="mr-1 inline-block h-3 w-3 text-blue-500" />
                      Created link:{" "}
                      <span className="font-semibold">{activity.linkName}</span>
                    </>
                  ) : (
                    <>
                      <MousePointerClick className="mr-1 inline-block h-3 w-3 text-green-500" />
                      Clicked link:{" "}
                      <span className="font-semibold">{activity.shortUrl}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {timeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          )
        )}
        {activities.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            No recent activity.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
