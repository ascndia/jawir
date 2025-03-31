import Faq1 from "@/registry/section/faq/faq-1/faq";
import Faq2 from "@/registry/section/faq/faq-2/faq";
import Faq3 from "@/registry/section/faq/faq-3/faq";
import FaqAccordion2 from "@/registry/section/faq/faq-accordion-2/faq";
import FaqAccordion3 from "@/registry/section/faq/faq-accordion-3/faq";
import FaqAccordion4 from "@/registry/section/faq/faq-accordion-4/faq";
import FaqAccordion5 from "@/registry/section/faq/faq-accordion-5/faq";
import FaqAccordion6 from "@/registry/section/faq/faq-accordion-6/faq";
import FaqAccordion7 from "@/registry/section/faq/faq-accordion-7/faq";
import FaqAccordion1 from "@/registry/section/faq/faq-accordion1/faq";
import FaqCards1 from "@/registry/section/faq/faq-cards-1/faq";
import React from "react";

function FaqPage() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-12">
        <Faq1 />
        <Faq2 />
        <Faq3/>
        <FaqAccordion1/>
        <FaqAccordion2/>
        <FaqAccordion3/>
        <FaqAccordion4/>
        <FaqAccordion5/>
        <FaqAccordion6/>
        <FaqAccordion7/>
        <FaqCards1/>
      </div>
    </div>
  );
}

export default FaqPage;
