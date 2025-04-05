"use client";
import { PageSelect } from "@/component/page-select";

import {meta as meta1} from "./layout-1/layout";
import {meta as meta2} from "./layout-2/layout";
import {meta as meta3} from "./layout-3/layout";
import {meta as meta4} from "./layout-4/layout";
import {meta as meta5} from "./layout-shadcn-1/layout";
import {meta as meta6} from "./layout-shadcn-2/layout";
import {meta as meta7} from "./layout-shadcn-3/layout";
import {meta as meta8} from "./layout-shadcn-4/layout";
import {meta as meta9} from "./layout-ecommerce-1/layout";
import {meta as meta10} from "./layout-design/index";
import {meta as meta11} from "./layout-sidebar-1/layout";
import { PropsWithChildren } from "react";

const list = [meta1, meta2, meta3, meta4, meta5, meta6, meta7, meta8, meta9, meta10, meta11];

type LayoutsProps = {
  initialComponentId?: string;
  className?: string;
  disabled?: boolean;
};

const Layouts = ({
  initialComponentId = "layout-1",
  disabled = false,
  ...props
}: PropsWithChildren<LayoutsProps>) => {
  return (
    <PageSelect
    position="top-center"
      disabled={disabled}
      className={props.className}
      initialPageId={initialComponentId}
      pages={list}
    >
      {(Page: React.ComponentType<any>) => <Page {...props} />}
    </PageSelect>
  );
};

export { Layouts };
