"use client";
import BetweenVertical from "@/registry/components/between-vertical/between-vertical";
import React from "react";
import { Test } from "./a";
import Banner from "@/registry/block/banner/banner-2/banner";
import { FeaturesSection } from "./b";
import { Features2Section } from "./c";
import { Test2 } from "./d";
import { Timeline } from "./e";
import FeaturesXComponent, {
  FeaturesX,
} from "@/registry/section/features/features-x";
import FilterPanel from "./filter";
import TestimonialBento1A from "@/registry/section/testimonial/testimonial-bento-1";
import { ComparisonTable1A } from "@/registry/section/comparison-table/comparison-table-1";
import { ComparisonTable2A } from "@/registry/section/comparison-table/comparison-table-2";

function Page() {
  return (
    <div className="flex flex-col">
      <TestimonialBento1A/>
      <ComparisonTable1A/>
      <ComparisonTable2A/>
      <div className="max-w-2xl">
      <FilterPanel/>
      </div>
      <Test />
      <BetweenVertical>
        <Banner />
      </BetweenVertical>
      <Timeline />
      <FeaturesXComponent.FeaturesX />
      <FeaturesXComponent.FeaturesXReverse />
    </div>
  );
}

export default Page;
