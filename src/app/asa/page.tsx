import { Newsletter } from "@/registry/section/newsletter/newsletter-1/newsletter";
import React from "react";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import EffectTextShiny from "@/registry/components/effect-text/effect-text-shiny/effect-text-shiny";
import Announcement from "@/registry/components/announcement/announcement-1/announcement";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-group-3/mode-toggle";
import PricingCards from "@/registry/section/pricing/pricing-cards-1/pricing-cards";
import Waitlist from "@/registry/section/waitlist/waitlist-1/waitlist";
import { Toaster } from "sonner";
import FormWaitlist from "@/registry/block/form/form-waitlist-1/form-waitlist";
import ContactForm from "@/registry/block/card/card-contact-1/card-contact";
import CuisineSelector from "../test/a";
import { DialogNewsletter } from "@/registry/block/dialogs/dialog-newsletter-1/dialog-newsletter";
import AutoScrollReveal from "@/registry/components/framer/framer-auto-scroll-reveal/framer-auto-scroll-reveal";
import { CardTestimony } from "@/registry/block/card-testimony/select";
import CopyButton from "@/registry/block/copy-button/copy-button-tooltip/copy-button";
import Footer from "@/registry/section/footer/footer-2/footer";
import PricingSingle from "@/registry/section/pricing/pricing-single-1/pricing-single";
import { SiteHeader } from "../test/b";
import FaqCards from "@/registry/section/faq/faq-cards-1/faq";
import Features from "@/registry/section/features/features-card-1/features";
import Testimonial from "@/registry/section/testimonial/testimonial-marquee-1/testimonial";
import PricingCardsC from "../test/c";
import { AvatarStack } from "@/registry/block/avatar-stack/avatar-stack-1/avatar-stack";
import FeaturesCard5 from "@/registry/section/features/features-card-5/features";
import FeaturesMarquee1 from "@/registry/section/features/features-marquee-1/feature";
import TestimonialMarquee2 from "@/registry/section/testimonial/testimonial-marquee-2/testimonial";
import TestimonialMarquee3 from "@/registry/section/testimonial/testimonial-marquee-3/testimonial";
import HeroForm1 from "@/registry/section/hero/hero-form-1/hero";
import HeroForm2 from "@/registry/section/hero/hero-form-2/hero";
import BannerCarousel1 from "@/registry/section/banner/banner-carousel-1/banner";
import BannerCarousel2 from "@/registry/section/banner/banner-carousel-2/banner";
import { Features1A, Features1B } from "@/registry/section/features/features-1";

function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center">
      <Announcement>
        <EffectTextShiny className="inline-flex items-center justify-center  transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ Introducing Nyxb UI</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </EffectTextShiny>
      </Announcement>
    </div>
  );
}

export default function asa() {
  return (
    <>
      <SiteHeader />
      <HeroForm2 />
      <div className="container w-full mx-auto p-4">
        <BannerCarousel1 />
        <BannerCarousel2/>
        <HeroForm1 />
        <Features1A/>
        <Features1B/>
        <AnimatedShinyTextDemo />
        <ModeToggle />
        <FeaturesMarquee1 />
        <CopyButton />
        <Features />
        <AvatarStack />
        <PricingCardsC />
        <Testimonial />
        <TestimonialMarquee2 />
        <TestimonialMarquee3 />
        <FeaturesCard5 />
        <CuisineSelector />
        <div className="mb-32 mx-auto w-sm">
          <DialogNewsletter />
        </div>
 
        <AutoScrollReveal components={[<CardTestimony key="1" />]} />
        <div className="mb-32 mx-auto w-sm" />
        <FormWaitlist />
        <ContactForm />
        <Waitlist />
        <Newsletter />
        <PricingCards />
        <PricingSingle />
        <FaqCards />
      </div>
      <Footer />
    </>
  );
}
