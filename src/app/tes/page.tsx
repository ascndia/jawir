import BetweenVertical from "@/registry/components/between-vertical/between-vertical";
import React from "react";
import { Test } from "./a";
import Banner from "@/registry/block/banner/banner-2/banner";
import { FeaturesSection } from "./b";
import { Features2Section } from "./c";
import { Test2 } from "./d";
import { Timeline } from "./e";

function Page() {
  return (
    <div className="flex flex-col">
      <Test/>
      <BetweenVertical>
        <Banner/>
      </BetweenVertical>
      <Timeline/>
    </div>
  );
}

export default Page;
