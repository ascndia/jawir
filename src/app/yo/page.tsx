import Navbar from "@/registry/block/navbar/navbar-1/navbar";
import CompanyLogos from "@/registry/section/company-logos/company-logos-2/company-logos";
import Faq from "@/registry/section/faq/faq3/faq";
import React from "react";
import { CodeBlockBasic } from "../test/d";
import FeaturesBento from "@/registry/section/features-bento/features-bento-1/features-bento";
import Testimonial from "@/registry/section/testimonial/testimonial-carousel-1/testimonial";
import Badge from "@/registry/components/badge/badge-1/badge";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";

export default function Page() {
  return (
    <>
      <Navbar />
      <FeaturesBento />
      {[
        "primary",
        "default",
        "purple",
        "success",
        "warning",
        "danger",
        "info",
        "ghost",
        "outline",
      ].map((variant) => (
        <Badge
          title={variant}
          key={variant}
          variant={
            variant as
              | "default"
              | "purple"
              | "success"
              | "warning"
              | "danger"
              | "info"
              | "ghost"
              | "outline"
          }
        />
      ))}
      {/* <Badge /> */}
      <ModeToggle />
      <Testimonial />
      <Faq />
      <CodeBlockBasic />
      <CompanyLogos />
    </>
  );
}
