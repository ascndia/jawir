"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentSelect } from "@/component/component-select";

import meta1 from "./button-aurora/meta";
import meta2 from "./button-colorful/meta";
import meta3 from "./button-shadcn/meta";
import meta4 from "./button-animated/meta";

const list = [meta1, meta2, meta3, meta4];
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  initialComponentId?: string;
  className?: string;
  variant?: string;
  size?: string;
  asChild?: boolean;
  disabled?: boolean;
}

const Button = ({
  disabled = false,
  children,
  initialComponentId = "button-shadcn",
  ...props
}: ButtonProps) => {
  return (
    <ComponentSelect
      disabled={disabled}
      className={props.className}
      initialComponentId={initialComponentId}
      components={list}
    >
      {(ButtonComponent: React.ComponentType<any>) => (
        <ButtonComponent {...props}>{children}</ButtonComponent>
      )}
    </ComponentSelect>
  );
};

export { Button };
