"use client";
import { Leaf } from "lucide-react";
import Link from "next/link";

const links = [
  {
    title: "Docs",
    href: "/docs",
  },
  {
    title: "GitHub",
    href: "https://github.com/ezeslucky/botnext-ui",
  },
]

const pages = [
  {
    title: "Components",
    href: "/components",
  },
  {
    title: "Examples",
    href: "/examples",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
]

const legal = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms of Service",
    href: "/tos",
  },
]

const Links = ({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) => (
  <div>
    <h3 className="mb-3 font-semibold text-text-primary dark:text-text-secondary">{title}</h3>
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-text-secondary hover:text-text-primary dark:text-text-muted dark:hover:text-text-secondary"
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);  


export default function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-text-primary dark:text-text-secondary" />
            <h2 className="text-lg font-bold text-text-primary dark:text-text-secondary">
              JAWIR
            </h2>
          </Link>
          <h1 className="text-text-secondary dark:text-text-primary mt-4">
            Built by{" "}
            <span className="text-primary">
              <Link href="#">@ascndia</Link>
            </span>
          </h1>
          <p className="text-sm text-text-secondary dark:text-text-primary mt-5">
            © {new Date().getFullYear()} Jawir. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Links title="Social" links={links} />
          <Links title="Pages" links={pages} />
          <Links title="Legal" links={legal} />
        </div>
      </div>
      <div className="w-full flex mt-4 items-center justify-center">
      {/* <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-primary dark:from-primary dark:to-neutral-700 select-none"> */}
        <h1 className="text-center text-3xl md:text-5xl lg:text-[10rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-700 dark:from-neutral-700 dark:to-neutral-900 select-none">
          JAWIR
        </h1>
      </div>
    </div>
    </footer>
  );
}