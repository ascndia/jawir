import { CTA5A, CTA5B, CTA5C, CTA5D, CTA5E, CTA5F, CTA5G, CTA5H, CTA5I } from "@/registry/section/cta/cta-5";
import { CTANewsletter1A, CTANewsletter1B, CTANewsletter1C, CTANewsletter1D } from "@/registry/section/cta/cta-newsletter-1";
import React from "react";

function CTAPage() {
  return (
    <div >
      <CTANewsletter1A/>
      <CTANewsletter1B/>
      <CTANewsletter1C/>
      <CTANewsletter1D/>
      <CTA5A/>
      <CTA5B/>
      <CTA5C/>
      <CTA5D/>
      <CTA5E/>
      <CTA5F/>
      <CTA5G/>
      <CTA5H/>
      <CTA5I/>
    </div>
  );
}

export default CTAPage;
