"use client";

import FormWaitlist from "@/registry/block/form/form-waitlist-1/form-waitlist";

interface AvatarProps {
  initials: string;
  index: number;
}

export function Avatar({ initials, index }: AvatarProps) {
  const colors = [
    "bg-purple-600", // First avatar
    "bg-blue-600", // Second avatar
    "bg-blue-700", // Third avatar
  ];

  return (
    <div
      className={`w-10 h-10 rounded-full border border-white/20 ${colors[index]} flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  );
}

export default function Waitlist() {
  const waitlistCount = 1000;

  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text">
            Join Our Product Launch Waitlist
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-muted-foreground">
            Be part of something truly extraordinary. Join thousands of others
            already gaining early access to our revolutionary new product.
          </p>
        </div>
        <div className="w-full">
          <FormWaitlist />
        </div>
        <div>
          <div className="flex items-center justify-center mt-8">
            <div className="flex -space-x-2 mr-4">
              <Avatar initials="JD" index={0} />
              <Avatar initials="AS" index={1} />
              <Avatar initials="MK" index={2} />
            </div>
            <p className="font-semibold">
              {waitlistCount}+ people on the waitlist
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
