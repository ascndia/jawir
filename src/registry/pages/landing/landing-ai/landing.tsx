"use client";

import React from "react";
import HeroImmersive from "@/registry/section/hero/hero-immersive/hero-immersive";
import CompanyLogos from "@/registry/section/logos/logos-1/company-logos";
import FeaturesBento from "@/registry/section/features/features-bento-2/features";
import FeaturesCard from "@/registry/section/features/features-card-1/features";
import Testimonial from "@/registry/section/testimonial/testimonial-single-1/testimonial";
import PricingCards from "@/registry/section/pricing/pricing-cards-1/pricing-cards";
import CTA from "@/registry/section/cta/cta-4/cta";
import Stats from "@/registry/section/stats/stats-3/stats";
import LatestArticles from "@/registry/section/latest-articles/latest-articles-2/latest-articles";
import { Footer } from "@/registry/section/footer/footer-1/footer";
import Faq from "@/registry/section/faq/faq-2/faq";
import HeroSearch from "@/registry/section/hero/hero-search-1/hero";

const LandingAI = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroImmersive
        backgroundImage="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=3540&auto=format&fit=crop"
        overlayColor="from-black/80 via-black/50 to-black/30"
        heading="AI-Powered Solutions for the Modern Enterprise"
        subheading="NEXT GENERATION AI PLATFORM"
        description="Harness the power of artificial intelligence to transform your business operations, enhance customer experiences, and drive innovation at scale."
        features={[
          { text: "Advanced machine learning algorithms" },
          { text: "Natural language processing" },
          { text: "Computer vision capabilities" },
        ]}
        primaryButton={{
          text: "Get Started",
          url: "#",
        }}
        secondaryButton={{
          text: "Schedule Demo",
          url: "#",
        }}
        stats={[
          { value: "99.9%", label: "Accuracy rate" },
          { value: "10x", label: "Faster processing" },
          { value: "24/7", label: "AI assistance" },
        ]}
        alignment="center"
        textColor="light"
        size="default"
        withAnimation={true}
      />

      {/* AI Search Demo */}
      <HeroSearch
        title="Experience AI-Powered Search"
        subtitle="Ask anything and get instant, accurate answers"
        searchPlaceholder="Ask about our AI capabilities..."
      />

      {/* Company Logos */}
      <CompanyLogos
        title="Trusted by AI-forward companies"
        subtitle="Join industry leaders already leveraging our AI platform"
        logos={[
          {
            name: "TechCorp",
            logo: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
            className: "h-7 w-auto",
          },
          {
            name: "DataSense",
            logo: "https://shadcnblocks.com/images/block/logos/tailwind-wordmark.svg",
            className: "h-5 w-auto",
          },
          {
            name: "AILabs",
            logo: "https://shadcnblocks.com/images/block/logos/supabase-wordmark.svg",
            className: "h-6 w-auto",
          },
          {
            name: "FutureTech",
            logo: "https://shadcnblocks.com/images/block/logos/figma-wordmark.svg",
            className: "h-5 w-auto",
          },
          {
            name: "InnovateAI",
            logo: "https://shadcnblocks.com/images/block/logos/astro-wordmark.svg",
            className: "h-6 w-auto",
          },
        ]}
      />

      {/* Features Bento Section */}
      <FeaturesBento
        heading="AI Capabilities That Transform Business"
        description="Our comprehensive suite of AI tools and services designed to solve complex business challenges and drive innovation."
        feature1={{
          title: "Natural Language Processing",
          description:
            "Understand and generate human language with advanced NLP models that power chatbots, content generation, and sentiment analysis.",
          image: "https://shadcnblocks.com/images/block/placeholder-1.svg",
        }}
        feature2={{
          title: "Computer Vision",
          description:
            "Analyze and interpret visual data with state-of-the-art computer vision algorithms for object detection, image recognition, and more.",
          image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
        }}
        feature3={{
          title: "Predictive Analytics",
          description:
            "Forecast trends and outcomes with machine learning models that analyze historical data and identify patterns.",
          image: "https://shadcnblocks.com/images/block/placeholder-1.svg",
        }}
        feature4={{
          title: "Automated Decision Making",
          description:
            "Optimize business processes with AI systems that make data-driven decisions based on complex criteria and constraints.",
          image: "https://shadcnblocks.com/images/block/placeholder-2.svg",
        }}
      />

      {/* Stats Section */}
      <Stats
        heading="AI Performance Metrics"
        subheading="MEASURABLE RESULTS"
        description="Our AI solutions deliver quantifiable improvements across key business metrics"
        backgroundStyle="gradient"
        stats={[
          {
            id: "accuracy",
            categoryId: "performance",
            value: "99.8%",
            label: "Accuracy in data processing",
          },
          {
            value: "85%",
            label: "Reduction in manual tasks",
            id: "reduction",
            categoryId: "performance",
          },
          {
            value: "10x",
            label: "Faster insights generation",
            id: "speed",
            categoryId: "performance",
          },
          {
            value: "24/7",
            label: "Continuous learning & improvement",
            id: "continuous",
            categoryId: "performance",
          },
        ]}
      />

      {/* Features Card Section */}
      <FeaturesCard />

      {/* Testimonials */}
      <Testimonial
        quote="Implementing this AI platform has revolutionized how we approach data analysis and customer engagement. The accuracy and speed of insights have given us a competitive edge we didn't have before."
        author={{
          name: "Dr. Emily Chen",
          role: "Chief Data Officer at GlobalTech",
          avatar: {
            src: "https://www.shadcnblocks.com/images/block/avatar-1.webp",
            alt: "Dr. Emily Chen",
          },
        }}
      />

      {/* Pricing Section */}
      <PricingCards />

      {/* Latest Articles */}
      <LatestArticles
        title="AI Insights & Resources"
        description="Stay updated with the latest developments in AI technology and implementation strategies"
        layout="featured"
        maxArticles={3}
      />

      {/* FAQ Section */}
      <Faq />

      {/* Call to Action */}
      <CTA
        heading="Ready to harness the power of AI?"
        description="Start transforming your business with our cutting-edge AI solutions today."
        features={[
          "Custom AI model development",
          "Seamless integration with existing systems",
          "Ongoing support and model optimization",
        ]}
        buttons={{
          primary: {
            text: "Start Your AI Journey",
            url: "#",
          },
          secondary: {
            text: "Talk to an AI Expert",
            url: "#",
          },
        }}
        image={{
          src: "https://images.unsplash.com/photo-1677442135136-760c813028c0?q=80&w=2070&auto=format&fit=crop",
          alt: "AI technology visualization",
        }}
      />

      {/* Footer */}
      <Footer
        logo={{
          src: "https://www.shadcnblocks.com/images/block/block-1.svg",
          alt: "AI Platform Logo",
          title: "AI Platform",
          url: "#",
        }}
        tagline="Intelligent solutions for tomorrow."
        copyright="© 2024 AI Platform. All rights reserved."
        menuItems={[
          {
            title: "Solutions",
            links: [
              { text: "NLP", url: "#" },
              { text: "Computer Vision", url: "#" },
              { text: "Predictive Analytics", url: "#" },
              { text: "Custom AI Models", url: "#" },
              { text: "AI Integration", url: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About", url: "#" },
              { text: "Team", url: "#" },
              { text: "Blog", url: "#" },
              { text: "Careers", url: "#" },
              { text: "Contact", url: "#" },
            ],
          },
          {
            title: "Resources",
            links: [
              { text: "Documentation", url: "#" },
              { text: "API Reference", url: "#" },
              { text: "Case Studies", url: "#" },
              { text: "Webinars", url: "#" },
            ],
          },
          {
            title: "Legal",
            links: [
              { text: "Privacy Policy", url: "#" },
              { text: "Terms of Service", url: "#" },
              { text: "AI Ethics", url: "#" },
            ],
          },
        ]}
      />
    </>
  );
};

export default LandingAI;
