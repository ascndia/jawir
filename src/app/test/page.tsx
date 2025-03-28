import StatusSelect from "@/registry/block/status-select/status-select-1/status-select";
import CompanyLogos from "@/registry/section/logos/logos-4/company-logos";
import ContactForm from "@/registry/section/contact-form/contact-form-3/contact-form";
import Features from "@/registry/section/features/features-grid-1/features";
import Footer from "@/registry/section/footer/footer-4/footer";
import Hero from "@/registry/section/hero/hero-5/hero";
import Hero6 from "@/registry/section/hero/hero-6/hero";
import Testimonial from "@/registry/section/testimonial/testimonial-carousel-2/testimonial";
import React from "react";
import HeroSection from "./e";
import Newsletter from "@/registry/section/newsletter/newsletter-3/newsletter";
import PricingCards from "@/registry/section/pricing/pricing-cards-2/pricing-cards";
import LogosMarquee1 from "@/registry/section/logos/logos-marquee-1/logos";

export default function Test() {
  return (
    <>
      {/* <StatusSelect/> */}
      <HeroSection />
      <LogosMarquee1 />
      <Hero />
      <CompanyLogos />
      <PricingCards />
      <Testimonial />
      <Features />
      <Hero6 />
      <ContactForm />
      <Newsletter />
      <Footer />
    </>
  );
}
