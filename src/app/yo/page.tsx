import Navbar from "@/registry/block/header/navbar-1/navbar";
import CompanyLogos from "@/registry/section/logos/logos-2/company-logos";
import Faq from "@/registry/section/faq/faq-accordion-3/faq";
import React from "react";
import { CodeBlockBasic } from "../test/d";
import FeaturesBento from "@/registry/section/features/features-bento-1/features";
import Testimonial from "@/registry/section/testimonial/testimonial-carousel-1/testimonial";
import Badge from "@/registry/components/badge/badge-1/badge";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";
import Stats1A from "@/registry/section/stats/stats-4";
import { EmptyState } from "@/registry/block/empty-state/empty-state-1";

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
      <Stats1A/>
      <EmptyState/>
      <ModeToggle />
      <Testimonial />
      <Faq />
      <CodeBlockBasic />
      <CompanyLogos />
    </>
  );
}
