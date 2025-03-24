import NextLink from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: ReactNode;
  className?: string;
  isExternal?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
}

export default function Link({
  href = "#",
  children,
  className = "",
  isExternal = false,
  target,
  rel,
  prefetch,
  scroll = true,
  replace = false,
  ...rest
}: LinkProps) {
  // Check if the link is external by URL pattern or explicit flag
  const isExternalLink =
    isExternal ||
    (typeof href === "string" &&
      (href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")));

  // For external links, use regular anchor tag
  if (isExternalLink) {
    // Add security attributes for external links
    const secureRel =
      target === "_blank" ? `noopener noreferrer ${rel || ""}`.trim() : rel;

    return (
      <a
        href={href}
        className={className}
        target={target || "_blank"} // Default to _blank for external links
        rel={secureRel}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // For internal links, use Next.js Link component
  return (
    <NextLink
      href={href}
      className={className}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
