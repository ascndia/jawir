import NextLink, { LinkProps } from "next/link";
import React from "react";
import Button from "../../button/button-shadcn/button";

export type ButtonLinkProps = LinkProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonComponent?: React.ElementType;
  };

export const Link: React.FC<ButtonLinkProps> = ({
  href,
  children,
  buttonComponent: ButtonComponent = Button,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <ButtonComponent style={{ cursor: "pointer" }} {...props}>
        {children}
      </ButtonComponent>
    </NextLink>
  );
};

export default Link;
