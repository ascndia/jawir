import { cn } from "@/lib/utils";
import { Announcement as AnnouncementComponent, AnnouncementTag, AnnouncementTitle } from "@/registry/components/announcement/announcement-2/announcement";
import { ArrowUpRightIcon } from "lucide-react";

type AnnouncementProps = {
    variant?: "solid" | "outline";
    themed?: boolean;
    className?: string;
    children?: React.ReactNode;
    tag?: string;
} & React.ComponentProps<typeof AnnouncementComponent>

export default function Announcement({
    variant="outline",
    themed,
    className,
    children,
    tag = "Announcement",
    ...props
}: AnnouncementProps) {
  return (
    <AnnouncementComponent
      {...props}
      variant={variant}
      themed={themed}
      className={cn("gap-2", className)}
    >
      <AnnouncementTag>{tag}</AnnouncementTag>
      <AnnouncementTitle>
        {children}
        <ArrowUpRightIcon size={16} className="shrink-0 text-muted-foreground" />
      </AnnouncementTitle>
    </AnnouncementComponent>
  );
}
