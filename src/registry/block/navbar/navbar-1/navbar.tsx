import { Button } from "@/registry/components/button/select";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Leaf className="h-8 w-8" />
        <NavMenu className="hidden md:block" />
        <div className="flex items-center gap-3">
          <Button className="hidden sm:inline-flex rounded-full">
            Sign In
          </Button>
          <Button className="rounded-full">Get Started</Button>
          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
