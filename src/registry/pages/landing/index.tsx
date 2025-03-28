"use client";
import { PageSelect } from "@/component/page-select";
import meta1 from "./landing-ai/meta";
import meta2 from "./landing-saas/meta";

const list = [meta1, meta2];

type LandingPagesProps = {
  initialComponentId?: string;
  className?: string;
  disabled?: boolean;
};

const LandingPages = ({
  initialComponentId = "card-testimony-1",
  disabled = false,
  ...props
}: LandingPagesProps) => {
  return (
    <PageSelect
      disabled={disabled}
      className={props.className}
      initialPageId={initialComponentId}
      pages={list}
    >
      {(Page: React.ComponentType<any>) => <Page {...props} />}
    </PageSelect>
  );
};

export { LandingPages };
