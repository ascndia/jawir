import React from "react";
import Faq4 from "@/registry/section/faq/faq-4/faq";
import Faq1 from "@/registry/section/faq/faq-1/faq";
import Faq2 from "@/registry/section/faq/faq-2/faq";
import Faq3 from "@/registry/section/faq/faq-3/faq";
import FaqCards1 from "@/registry/section/faq/faq-cards-1/faq";
import Faq5 from "@/registry/section/faq/faq-5/faq";
import Faq6 from "@/registry/section/faq/faq-6/faq";
import Faq7 from "@/registry/section/faq/faq-7/faq";
function FaqPage() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-12">
        <Faq1 />
        <Faq2 />
        <Faq3 />
        <Faq4 />
        <Faq5 />
        <Faq6 />
        <Faq7 />
        <FaqCards1 />
      </div>
    </div>
  );
}

export default FaqPage;
