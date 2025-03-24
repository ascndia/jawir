"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentSelect } from "@/component/component-select";
import list from ".";

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
