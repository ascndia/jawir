"use client";
import { CardTestimony } from "@/registry/block/card-testimony/select";
import ColorPicker from "@/registry/block/color-picker/color-picker-1/color-picker";
import React from "react";
import Hero from "../test/e";
import { cards } from "../page";
import { Newsletter } from "@/registry/section/newsletter/newsletter-2/newsletter";
import Header from "@/registry/block/header/header-1/header";
import { Plus } from "lucide-react";
import { Separator } from "@/registry/components/separator/separator-2/separator";
import CTA from "@/registry/section/cta/cta-1/cta";
import Testimonial from "@/registry/section/testimonial/testimonial-cards-1/testimonial";
// import CTA from "@/registry/section/cta/cta-1/cta";
function Cohort() {
  return (
    <>
      <Header />
      <div className="container pt-6 lg:pt-10 mx-auto">
        <Separator gradient />
        <Separator />
        <Separator
          label={<span className="text-xs px-2 border">Section</span>}
          gradient
        />
        <Separator label={<span className="px-2">Section</span>} />
        <Separator
          label={
            <div className="border px-4 py-1 rounded-full border-dashed">
              Section
            </div>
          }
          gradient
        />
        <Separator
          label={<div className="border px-4 py-1 rounded-full">Section</div>}
        />
        <Separator
          label={
            <div className="border px-12 py-2 rounded-full">
              <Plus />
            </div>
          }
          gradient
        />
        <Hero />
        <CTA />
        <Testimonial />
        <div className="max-w-sm">
          <CardTestimony />
        </div>
        <ColorPicker color={{ h: 0, s: 0, l: 0 }} onColorChange={() => {}} />
        <Newsletter />
      </div>
    </>
  );
}

export default Cohort;
