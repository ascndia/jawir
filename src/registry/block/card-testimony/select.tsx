"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentSelect } from "@/component/component-select";

import meta1 from "./card-testimony-1/meta";
import meta2 from "./card-testimony-2/meta";
import meta3 from "./card-testimony-3/meta";
import meta4 from "./card-testimony-4/meta";
import meta5 from "./card-testimony-5/meta";
import meta6 from "./card-testimony-6/meta";
import meta7 from "./card-testimony-7/meta";
import meta8 from "./card-testimony-8/meta";
import meta9 from "./card-testimony-9/meta";
import meta10 from "./card-testimony-10/meta";
import meta11 from "./card-testimony-11/meta";
const list = [
  meta1,
  meta2,
  meta3,
  meta4,
  meta5,
  meta6,
  meta7,
  meta8,
  meta9,
  meta10,
  meta11,
];
interface unifiedCardTestimonyProps {
  name: string;
  username: string;
  avatar: string;
  comment: string;
}

type CardTestimonyProps = {
  initialComponentId?: string;
  className?: string;
  disabled?: boolean;
} & Partial<unifiedCardTestimonyProps>;

const defaultValue: unifiedCardTestimonyProps = {
  name: "Monkey D. Luffy",
  username: "luffytaroo",
  avatar: "/images/avatar.jpg",
  comment:
    "Jika Anda tidak berani mengambil risiko, Anda tidak akan bisa menciptakan masa depan.",
};

const CardTestimony = ({
  initialComponentId = "card-testimony-1",
  disabled = false,
  ...props
}: CardTestimonyProps) => {
  return (
    <ComponentSelect
      disabled={disabled}
      className={props.className}
      initialComponentId={initialComponentId}
      components={list}
    >
      {(CardComponent: React.ComponentType<any>) => (
        <CardComponent {...defaultValue} {...props} />
      )}
    </ComponentSelect>
  );
};

export { CardTestimony };
