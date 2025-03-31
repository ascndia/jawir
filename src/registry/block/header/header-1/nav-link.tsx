import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    highlight?: boolean;
  }
  
  const NavLink = ({ href, icon, label, highlight = false }: NavLinkProps) => {
    return (
      <Link 
        href={href} 
        className={cn(
          "flex flex-col items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
          highlight 
            ? "bg-accent/30 text-primary hover:bg-accent hover:text-primary" 
            : "hover:bg-accent hover:text-primary"
        )}
      >
        {icon}
        <span className="mt-1">{label}</span>
      </Link>
    );
  };
  
  interface MobileNavLinkProps extends NavLinkProps {
    onClick: () => void;
  }
  
  const MobileNavLink = ({ href, icon, label, onClick, highlight = false }: MobileNavLinkProps) => {
    return (
      <Link 
        href={href} 
        className={cn(
          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
          highlight 
            ? "bg-accent/30 text-primary hover:bg-accent hover:text-primary" 
            : "hover:bg-accent hover:text-primary"
        )}
        onClick={onClick}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    );
  };

  type MenuItemProps = {
      items: {
          label: string;
          icon: React.ReactNode;
          href?: string;
      }[];
  }
  const MenuItems = ({ items }: MenuItemProps) => {
      return (
        <DropdownMenuContent>
          <DropdownMenuLabel>Esplora</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={item.href || "#"} className="flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>)
          )}
        </DropdownMenuContent>  
      )
  }

  export { NavLink, MobileNavLink, MenuItems };
  export type { NavLinkProps, MobileNavLinkProps, MenuItemProps };