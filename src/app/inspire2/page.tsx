import { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "FlowSpace | Streamline Your Team's Workflow",
  description:
    "The all-in-one productivity platform that helps teams collaborate, organize and execute projects with efficiency",
};

export default function FlowSpacePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
