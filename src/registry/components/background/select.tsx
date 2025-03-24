"use client";
import { BackgroundtSelect } from "@/component/background-select";
/* eslint-disable @typescript-eslint/no-explicit-any */
import list from ".";

const Background = ({
  children,
  initialComponentId = "background-gradient",
  ...props
}: React.PropsWithChildren<{
  initialComponentId?: string;
  className?: string;
}>) => {
  return (
    <BackgroundtSelect
      initialComponentId={initialComponentId}
      components={list}
    >
      {(ButtonComponent: React.ComponentType<any>) => (
        <ButtonComponent {...props}>{children}</ButtonComponent>
      )}
    </BackgroundtSelect>
  );
};

export default Background;
