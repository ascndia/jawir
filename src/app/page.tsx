"use client";
import Link from "next/link";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Leaf,
  ArrowRight,
  Blocks,
  Layout,
  Grid,
  Component,
  Layers,
  FileCode,
  Home as HomeIcon,
  Github,
  Table,
  LucideShieldQuestion,
  Pointer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Banner from "@/registry/block/banner/banner-2/banner";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";

// Available pages in the application
const availablePages = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-4 w-4 mr-2" /> },
  {
    name: "Features",
    path: "/features",
    icon: <Blocks className="h-4 w-4 mr-2" />,
  },
  { name: "Test", path: "/test", icon: <Layout className="h-4 w-4 mr-2" /> },
  {
    name: "Card Gallery",
    path: "/card",
    icon: <Component className="h-4 w-4 mr-2" />,
  },
  {
    name: "Data Table",
    path: "/datatable",
    icon: <Table className="h-4 w-4 mr-2" />,
  },
  {
    name: "Faq",
    path: "/blocks/faq",
    icon: <Grid className="h-4 w-4 mr-2" />,
  },
  {
    name: "How it Works",
    path: "/blocks/hiw",
    icon: <LucideShieldQuestion className="h-4 w-4 mr-2" />,
  },
  {
    name: "CTA",
    path: "/blocks/cta",
    icon: <Pointer className="h-4 w-4 mr-2" />,
  },
  {
    name: "Categories",
    path: "/blocks/categories",
    icon: <Layers className="h-4 w-4 mr-2" />,
  },
  {
    name: "Landing Pages",
    path: "/landing",
    icon: <Layers className="h-4 w-4 mr-2" />,
  },
  {
    name: "Component Demo",
    path: "/yo",
    icon: <FileCode className="h-4 w-4 mr-2" />,
  },
  {
    name: "Old Components",
    path: "/old",
    icon: <FileCode className="h-4 w-4 mr-2" />,
  },
  {
    name: "Custom Components",
    path: "/c",
    icon: <FileCode className="h-4 w-4 mr-2" />,
  },
  {
    name: "Dialogs",
    path: "/dialog",
    icon: <FileCode className="h-4 w-4 mr-2" />,
  },
  {
    name: "Layouts",
    path: "/layout",
    icon: <FileCode className="h-4 w-4 mr-2" />,
  },
];

// Component categories
const componentCategories = [
  {
    title: "Blocks",
    description: "Reusable UI blocks like navbars, banners, cards, and more",
    items: [
      "Navbar",
      "Banner",
      "Card",
      "Profile Menu",
      "Mode Toggle",
      "Breadcrumb",
      "Header",
    ],
    icon: <Component className="h-6 w-6" />,
  },
  {
    title: "Sections",
    description: "Larger page sections like heroes, features, and footers",
    items: [
      "Hero",
      "Features",
      "Footer",
      "Testimonial",
      "Pricing",
      "FAQ",
      "CTA",
    ],
    icon: <Layers className="h-6 w-6" />,
  },
  {
    title: "Pages",
    description: "Complete page templates ready for customization",
    items: ["Landing Pages", "Dashboard", "Product Page", "Contact Page"],
    icon: <Layout className="h-6 w-6" />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Banner alignment="centered" />

      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center mb-6">
            {/* <Leaf className="h-10 w-10 mr-2 text-primary" /> */}
            <h1 className="text-6xl  font-bold">jawir</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            A well-organized repository of high-quality React components,
            blocks, and page sections built with Next.js, Tailwind CSS, and
            Shadcn UI. Sourced from the web and developed by the community with
            the help of AI.
          </p>
          <div className="text-sm text-muted-foreground mb-6 p-3 bg-muted rounded-md">
            <strong>Note:</strong> This is not a Shadcn/UI-style application
            where you can search and install code blocks.
            <br /> Instead, it is a repository containing a large collection of
            pre-built components, sections, and blocks.
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/features">
                Explore Components <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/landing">View Landing Pages</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link
                href="https://github.com/ascndia/jawir"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <Github className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Available Pages Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Available Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availablePages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                {page.icon}
                <span>{page.name}</span>
                <ArrowRight className="ml-auto h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>

        {/* Component Categories */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Component Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {componentCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <CardTitle>{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center">
                        <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/features">Explore {category.title}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-20">
          <div className="bg-muted rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-6">
              Start building beautiful interfaces with our pre-built components.
              Simply copy and paste the code into your project.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">For Developers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    Browse component categories
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    Copy code snippets directly
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    Customize to match your brand
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">For Designers</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    Explore design patterns
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    View responsive layouts
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2 text-primary" />
                    Understand component hierarchy
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <Button asChild>
                <Link href="/features">Start Exploring</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/ascndia/jawir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on GitHub <Github className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Leaf className="h-6 w-6 mr-2" />
              <span className="font-semibold">jawir</span>
            </div>
            <div className="flex gap-6">
              <Link
                href="/features"
                className="text-muted-foreground hover:text-foreground"
              >
                Components
              </Link>
              <Link
                href="/landing"
                className="text-muted-foreground hover:text-foreground"
              >
                Landing Pages
              </Link>
              <Link
                href="/card"
                className="text-muted-foreground hover:text-foreground"
              >
                Cards
              </Link>
              <Link
                href="https://github.com/ascndia/jawir"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} jawir. Built with Next.js, Tailwind
            CSS, and Shadcn UI.
          </div>
        </div>
      </footer>
    </div>
  );
}
