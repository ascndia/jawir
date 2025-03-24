/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header as HeaderComponent } from "@/registry/components/header/header-1/header";
import { Button } from "@/registry/components/button/select";
import Link from "next/link";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Leaf } from "lucide-react";

const headerLinks = [
  { name: "Features", href: "/header-demo/#features" },
  { name: "Pricing", href: "/header-demo/#pricing" },
  { name: "FAQs", href: "/header-demo/#faqs" },
];
const icons = [
  {
    name: "Twitter",
    icon: <TwitterLogoIcon />,
    href: "https://x.com",
  },
  {
    name: "GitHub",
    icon: <GitHubLogoIcon />,
    href: "https://github.com",
  },
];

const HeaderLink = (props: { href: string; name: string }) => {
  return <Link href={props.href}>{props.name}</Link>;
};

const Header = ({
  variant = "default",
}: {
  variant?: "default" | "centered";
}) => (
  <HeaderComponent
    Logo={<Leaf />}
    desktopItems={
      <>
        {headerLinks.map((link, i) => (
          <HeaderLink key={i} href={link.href} name={link.name} />
        ))}
      </>
    }
    mobileItems={({ setIsOpen }) => (
      <>
        {headerLinks.map((link) => (
          <Button
            disabled
            key={link.href}
            asChild
            variant={"outline"}
            className="w-full rounded-xl justify-center"
            size="lg"
            onClick={() => setIsOpen(false)}
          >
            {/* <Link href={link.href}>{link.name}</Link> */}
            {link.name}
          </Button>
        ))}
        <div className="flex-row-end w-full gap-3 border-t pt-4 border-dashed">
          {icons && (
            <div className="flex-row-center grow gap-2">
              {icons.map((icon) => (
                <Button
                  disabled
                  key={icon.name}
                  size="icon"
                  className="rounded-full"
                  variant={"outline"}
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  {/* <Link href={icon.href}>{icon.icon}</Link> */}
                  {icon.icon}
                </Button>
              ))}
            </div>
          )}
        </div>
      </>
    )}
  />
);

export default Header;
