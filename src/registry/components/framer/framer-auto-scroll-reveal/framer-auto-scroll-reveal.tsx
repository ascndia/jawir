import React from "react";
import {
  ScrollReveal,
  ScrollRevealProps,
} from "@/registry/components/framer/framer-scroll-reveal/ScrollReveal";

export interface AutoScrollRevealProps
  extends Omit<ScrollRevealProps, "direction" | "children"> {
  components: React.ReactNode[];
}

const AutoScrollReveal = ({ components, ...props }: AutoScrollRevealProps) => {
  return components.map((Component, index) => (
    <ScrollReveal
      key={index}
      direction={index % 2 === 0 ? "right" : "left"}
      {...{ ...props, onAnimationStart: undefined }}
    >
      {Component}
    </ScrollReveal>
  ));
};

export default AutoScrollReveal;
