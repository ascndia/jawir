import { AppSidebar } from "./app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/components/breadcrumb";
import { Separator } from "@/registry/components/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/components/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function LayoutShadcn2({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

const meta = {
  id: "layout-shadcn-2",
  slug: "layout-shadcn-2",
  name: "Layout Shadcn 2",
  title: "Layout Shadcn 2",
  component: LayoutShadcn2,
  demo: null,
};
export { meta };