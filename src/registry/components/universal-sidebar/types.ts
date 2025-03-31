import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// Base item that all sidebar items extend from
export interface SidebarItemBase {
  id: string;
  title: string;
  icon?: LucideIcon | ReactNode;
  iconPosition?: "left" | "right";
  badge?: string | number | { content: ReactNode; className?: string };
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  tooltip?: string | { content: ReactNode; position?: "right" | "left" | "top" | "bottom" };
}

// Link item (for navigation)
export interface SidebarLinkItem extends SidebarItemBase {
  type: "link";
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: "_blank" | "_self" | "_parent" | "_top";
  external?: boolean;
}

// Button item (for actions)
export interface SidebarButtonItem extends SidebarItemBase {
  type: "button";
  onClick: (e: React.MouseEvent) => void;
}

// Dropdown item (for nested menus)
export interface SidebarDropdownItem extends SidebarItemBase {
  type: "dropdown";
  children: SidebarItem[];
  defaultOpen?: boolean;
  renderCustomContent?: (props: {
    item: SidebarDropdownItem;
    isOpen: boolean;
    toggle: () => void;
  }) => ReactNode;
}

// Divider item (for visual separation)
export interface SidebarDividerItem {
  id: string;
  type: "divider";
  className?: string;
}

// Custom item (for complete flexibility)
export interface SidebarCustomItem {
  id: string;
  type: "custom";
  render: (props: { className?: string }) => ReactNode;
  className?: string;
}

// Union type of all possible sidebar item types
export type SidebarItem =
  | SidebarLinkItem
  | SidebarButtonItem
  | SidebarDropdownItem
  | SidebarDividerItem
  | SidebarCustomItem;

// Section for grouping items
export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarItem[];
  className?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  renderCustomTitle?: (props: { 
    section: SidebarSection;
    isOpen?: boolean;
    toggle?: () => void;
  }) => ReactNode;
}

// Sidebar appearance options
export interface SidebarAppearance {
  variant?: "default" | "floating" | "inset";
  position?: "left" | "right";
  collapsible?: "offcanvas" | "icon" | "none";
  defaultOpen?: boolean;
  width?: number | string;
  collapsedWidth?: number | string;
  className?: string;
  headerClassName?: string;
  footerClassName?: string;
  contentClassName?: string;
}

// Props for the main Sidebar component
export interface SidebarProps {
  sections?: SidebarSection[];
  items?: SidebarItem[];
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  appearance?: SidebarAppearance;
  stickyItems?: SidebarItem[]; // Added stickyItems property
  renderCustomItem?: (item: SidebarItem) => ReactNode;
  onItemClick?: (item: SidebarItem, e: React.MouseEvent) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

// Context for the sidebar state management
export interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  collapsible: "offcanvas" | "icon" | "none";
  position: "left" | "right";
  variant: "default" | "floating" | "inset";
  appearance: SidebarAppearance;
  onItemClick?: (item: SidebarItem, e: React.MouseEvent) => void;
  activePath?: string;
  setActivePath?: (path: string) => void;
}