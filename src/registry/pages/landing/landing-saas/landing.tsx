"use client";

import React from "react";
import Hero from "@/registry/section/hero/hero-7/hero";
import CompanyLogos from "@/registry/section/logos/logos-1/company-logos";
import Features from "@/registry/section/features/features-bento-1/features";
import Testimonial from "@/registry/section/testimonial/testimonial-carousel-1/testimonial";
import PricingBento from "@/registry/section/pricing/pricing-bento/pricing-bento";
import CTA from "@/registry/section/cta/cta-2/cta";
import Stats from "@/registry/section/stats/stats-1/stats";
import LatestArticles from "@/registry/section/latest-articles/latest-articles-1/latest-articles";
import { Footer } from "@/registry/section/footer/footer-1/footer";
import Faq from "@/registry/section/faq/faq-accordion1/faq";

const LandingSaaS = () => {
  return (
    <>
      <Hero
        badge="SaaS Platform"
        heading="Streamline Your Workflow with Our SaaS Solution"
        description="Our platform provides everything you need to build, manage, and scale your business operations efficiently. Designed for teams of all sizes."
        primaryButton={{
          text: "Start Free Trial",
          url: "#",
        }}
        secondaryButton={{
          text: "View Demo",
          url: "#",
        }}
        testimonial={{
          quote: "This platform transformed our workflow efficiency",
          author: "Sarah Chen",
          role: "CTO",
          company: "TechCorp",
          avatars: [
            {
              image: "https://shadcnblocks.com/images/block/avatar-1.webp",
              fallback: "SC",
            },
            {
              image: "https://shadcnblocks.com/images/block/avatar-2.webp",
              fallback: "JD",
            },
            {
              image: "https://shadcnblocks.com/images/block/avatar-3.webp",
              fallback: "MK",
            },
          ],
        }}
        images={{
          main: "https://shadcnblocks.com/images/block/placeholder-1.svg",
          secondary:
            "https://shadcnblocks.com/images/block/placeholder-dark-2.svg",
          tertiary:
            "https://shadcnblocks.com/images/block/placeholder-dark-3.svg",
        }}
      />

      <CompanyLogos
        title="Trusted by innovative companies"
        subtitle="Join thousands of businesses already using our platform"
      />

      <Features />

      <Stats
        heading="Platform performance metrics"
        description="See how our platform is helping businesses grow and succeed"
        link={{
          text: "Read our customer success stories",
          url: "#",
        }}
        stats={[
          {
            id: "stat-1",
            value: "98%",
            label: "customer satisfaction rate",
          },
          {
            id: "stat-2",
            value: "45%",
            label: "increase in team productivity",
          },
          {
            id: "stat-3",
            value: "10x",
            label: "faster workflow implementation",
          },
          {
            id: "stat-4",
            value: "24/7",
            label: "dedicated customer support",
          },
        ]}
      />

      <Testimonial />

      <PricingBento />

      <LatestArticles />

      <Faq />

      <CTA
        heading="Ready to transform your business?"
        description="Start your free 14-day trial today. No credit card required. Cancel anytime."
        buttons={{
          primary: {
            text: "Get Started",
            url: "#",
          },
          secondary: {
            text: "Contact Sales",
            url: "#",
          },
        }}
      />

      <Footer
        logo={{
          src: "https://www.shadcnblocks.com/images/block/block-1.svg",
          alt: "SaaS Platform Logo",
          title: "SaaS Platform",
          url: "#",
        }}
        tagline="Streamline your workflow."
        copyright="© 2024 SaaS Platform. All rights reserved."
      />
    </>
  );
};

export default LandingSaaS;
