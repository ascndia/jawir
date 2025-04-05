import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Layouts } from "@/registry/section/layout";
import Layout1 from "@/registry/section/layout/layout-1/layout";
import Layout2 from "@/registry/section/layout/layout-2/layout";
import Layout3 from "@/registry/section/layout/layout-3/layout";
import Layout4 from "@/registry/section/layout/layout-4/layout";
import { LayoutDesign } from "@/registry/section/layout/layout-design";
import LayoutEcommerce1 from "@/registry/section/layout/layout-ecommerce-1/layout";
import LayoutShadcn1 from "@/registry/section/layout/layout-shadcn-1/layout";
import LayoutShadcn2 from "@/registry/section/layout/layout-shadcn-2/layout";
import LayoutShadcn3 from "@/registry/section/layout/layout-shadcn-3/layout";
import LayoutShadcn4 from "@/registry/section/layout/layout-shadcn-4/layout";
import LayoutSidebar1 from "@/registry/section/layout/layout-sidebar-1/layout";
import { LayoutDashboard } from "lucide-react";
import React from "react";

function LayoutM() {
  return (
    <>
      <Layouts>
        <div className="w-full h-full flex items-center justify-center">
          Content
        </div>
      </Layouts>
    </>
  );
}

export default LayoutM;
