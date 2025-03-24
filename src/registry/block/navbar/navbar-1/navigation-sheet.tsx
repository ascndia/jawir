import { Button } from "@/registry/components/button/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/components/sheet";
import { Leaf, Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = ({
  title = "Company name",
}: {
  title?: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center gap-2">
          <Leaf className="h-8 w-8" />
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <NavMenu orientation="vertical" className="ml-2 items-start" />
      </SheetContent>
    </Sheet>
  );
};
