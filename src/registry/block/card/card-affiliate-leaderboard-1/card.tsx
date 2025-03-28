import React from "react";
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
} from "@/registry/components/avatar/avatar-shadcn/avatar"; // Assuming named exports
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Trophy, Award, Medal } from "lucide-react";

interface AffiliateRank {
  rank: number;
  name: string;
  score: number; // Could be earnings, conversions, etc.
  isCurrentUser?: boolean;
  avatarUrl?: string; // Optional avatar image URL
}

interface AffiliateLeaderboardCardProps {
  leaderboard?: AffiliateRank[];
  currentUserRank?: AffiliateRank; // Explicitly pass current user's rank info
  title?: string;
  description?: string;
  scoreLabel?: string; // e.g., "Earnings", "Conversions"
}

// Helper to get initials from name
const getInitials = (name: string = ""): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter((_, i, arr) => i === 0 || i === arr.length - 1) // First and last initial
    .join("")
    .toUpperCase();
};

// Helper to assign medal icons
const getMedalIcon = (rank: number): React.ElementType | null => {
  if (rank === 1) return Award;
  if (rank === 2) return Medal;
  if (rank === 3) return Trophy; // Using Trophy for 3rd, could adjust
  return null;
};

const defaultLeaderboard: AffiliateRank[] = [
  {
    rank: 1,
    name: "Alice Johnson",
    score: 25800,
    avatarUrl: "/images/placeholder.svg",
  },
  { rank: 2, name: "Bob Williams", score: 22100 },
  {
    rank: 3,
    name: "Charlie Brown",
    score: 19500,
    avatarUrl: "/images/placeholder.svg",
  },
  { rank: 4, name: "Diana Miller", score: 18900 },
  { rank: 15, name: "You", score: 9850, isCurrentUser: true }, // Example current user
];

// Separate current user from the default list for clarity in props
const defaultCurrentUserRank = defaultLeaderboard.find((a) => a.isCurrentUser);
const defaultTopRanks = defaultLeaderboard.filter(
  (a) => !a.isCurrentUser && a.rank <= 3
); // Show top 3 + current user

export function CardAffiliateLeaderboard1({
  leaderboard = defaultTopRanks, // Default to top ranks excluding current user
  currentUserRank = defaultCurrentUserRank,
  title = "Affiliate Leaderboard",
  description = "See how you stack up against top performers.",
  scoreLabel = "Earnings",
}: AffiliateLeaderboardCardProps) {
  // Combine top ranks and current user if provided, then sort
  const displayList = [
    ...leaderboard.filter((a) => !a.isCurrentUser).slice(0, 3), // Ensure only top 3 from leaderboard prop
    ...(currentUserRank ? [currentUserRank] : []),
  ].sort((a, b) => a.rank - b.rank);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {displayList.map((affiliate) => {
            const MedalIcon = getMedalIcon(affiliate.rank);
            return (
              <li
                key={affiliate.rank}
                className={`flex items-center justify-between gap-3 p-2 rounded-md ${
                  affiliate.isCurrentUser
                    ? "bg-muted/50 border border-border"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3 flex-grow min-w-0">
                  <span className="font-semibold text-muted-foreground w-6 text-center">
                    {affiliate.rank}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={affiliate.avatarUrl}
                      alt={affiliate.name}
                    />
                    <AvatarFallback>
                      {getInitials(affiliate.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`font-medium truncate ${
                      affiliate.isCurrentUser ? "text-primary" : ""
                    }`}
                  >
                    {affiliate.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {MedalIcon && (
                    <MedalIcon className="h-4 w-4 text-yellow-500" />
                  )}
                  <Badge
                    variant="secondary"
                    className="min-w-[70px] justify-center"
                  >
                    {affiliate.score.toLocaleString()}
                  </Badge>
                </div>
              </li>
            );
          })}
          {/* Optional: Add ellipsis if current user is not in top ranks */}
          {currentUserRank &&
            currentUserRank.rank > 4 &&
            leaderboard.length >= 3 && (
              <li className="text-center text-muted-foreground">...</li>
            )}
        </ul>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Score based on {scoreLabel}.
        </p>
      </CardContent>
    </Card>
  );
}

export default CardAffiliateLeaderboard1;
