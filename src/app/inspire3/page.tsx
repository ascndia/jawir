import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import Showcase from "./components/Showcase";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Partners from "./components/Partners";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Inspire3Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Workflow />
        <Showcase />
        <Testimonials />
        <Partners />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
