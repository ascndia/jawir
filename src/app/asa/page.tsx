import { Newsletter } from "@/registry/section/newsletter/newsletter-1/newsletter";
import React from "react";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import EffectTextShiny from "@/registry/components/effect-text/effect-text-shiny/effect-text-shiny";
import Announcement from "@/registry/components/announcement/announcement-1/announcement";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-group-3/mode-toggle";
import PricingCards from "@/registry/section/pricing-cards/pricing-cards-1/pricing-cards";
import Waitlist from "@/registry/section/waitlist/waitlist-1/waitlist";
import { Toaster } from "sonner";
import FormWaitlist from "@/registry/block/form-waitlist/form-waitlist-1/form-waitlist";
import ContactForm from "@/registry/block/card-contact/card-contact-1/card-contact";
import CuisineSelector from "../test/a";
import { DialogNewsletter } from "@/registry/block/dialog-newsletter/dialog-newsletter-1/dialog-newsletter";
import AutoScrollReveal from "@/registry/components/framer/framer-auto-scroll-reveal/framer-auto-scroll-reveal";
import { CardTestimony } from "@/registry/block/card-testimony/select";
import DialogOnboarding from "@/registry/block/dialog-onboarding/dialog-onboarding-1/dialog-onboarding";
import CopyButton from "@/registry/block/copy-button/copy-button-tooltip/copy-button";
import Footer from "@/registry/section/footer/footer-2/footer";
import PricingSingle from "@/registry/section/pricing-single/pricing-single-1/pricing-single";
import { SiteHeader } from "../test/b";
import FaqCards from "@/registry/section/faq-cards/faq-cards-1/faq-cards";
import Features from "@/registry/section/features/features-1/features";
import Testimonial from "@/registry/section/testimonial/testimonial-marquee-1/testimonial";
import PricingCardsC from "../test/c";
import { AvatarStack } from "@/registry/block/avatar-stack/avatar-stack-1/avatar-stack";

export async function AnimatedShinyTextDemo() {
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
      <div className="container w-full mx-auto p-4">
        <AnimatedShinyTextDemo />
        <ModeToggle />
        <CopyButton />
        <Features />
        <AvatarStack />
        <PricingCardsC />
        <Testimonial />
        <CuisineSelector />
        <div className="mb-32 mx-auto w-sm">
          <DialogNewsletter />
        </div>
        <div className="mb-32 mx-auto w-sm">
          <DialogOnboarding />
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
