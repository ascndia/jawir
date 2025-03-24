"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentSelect } from "@/component/component-select";
import list from ".";

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
