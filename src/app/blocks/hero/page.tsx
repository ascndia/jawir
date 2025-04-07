import React from "react";

import {Hero9A, Hero9B, Hero9C, Hero9D, Hero9E, Hero9F, Hero9G, Hero9H} from "@/registry/section/hero/hero-9";
import HeroForm3 from "@/registry/section/hero/hero-form-3/hero";
import HeroSearch4 from "@/registry/section/hero/hero-search-4";
import { HeroForm4A } from "@/registry/section/hero/hero-form-4";
import { HeroFeatures1A, HeroFeatures1B, HeroFeatures1C, HeroFeatures1D, HeroFeatures1E } from "@/registry/section/hero/hero-features-1";
import { HeroFloat1A } from "@/registry/section/hero/hero-float-1";
import { Hero10A } from "@/registry/section/hero/hero-10";
function HeroPage() {
  return (
    <div >
      <Hero10A/>
      <HeroFloat1A/>
      <HeroFeatures1A/>
      <HeroFeatures1B/>
      <HeroFeatures1C/>
      <HeroFeatures1D/>
      <HeroFeatures1E/>
      <HeroForm4A/>
      <HeroForm3/>
      <HeroSearch4/>
      <Hero9A/>
      <Hero9B/>
      <Hero9C/>
      <Hero9D/>
      <Hero9E/>
      <Hero9F/>
      <Hero9G/>
      <Hero9H/>
    </div>
  );
}

export default HeroPage;
