import { Metadata } from "next";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";

export const metadata: Metadata = {
  title: "Inspire | Modern Design System",
  description: "A showcase of modern design with fluid animations",
};

export default function InspirePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </div>
  );
}
