import AutoScrollReveal from "@/registry/components/framer/framer-auto-scroll-reveal/framer-auto-scroll-reveal";
import Features1 from "@/registry/section/features/features-card-1/features";
import Features2 from "@/registry/section/features/features-bento-1/features";
import Features3 from "@/registry/section/features/features-bento-2/features";
import Features4 from "@/registry/section/features/features-bento-3/features";
import Features5 from "@/registry/section/features/features-grid-1/features";
import React from "react";
import Hero from "@/registry/section/hero/hero-7/hero";
import HeroImmersive from "@/registry/section/hero/hero-immersive/hero-immersive";
import CTA from "@/registry/section/cta/cta-4/cta";
import Hero8 from "@/registry/section/hero/hero-8/hero";
import LatestArticles from "@/registry/section/latest-articles/latest-articles-2/latest-articles";
import LatestArticles3 from "@/registry/section/latest-articles/latest-articles-3/latest-articles-3";
import PricingSingle2 from "@/registry/section/pricing/pricing-single.tsx/pricing-single";
import Pricing from "@/registry/section/pricing/pricing-single-1/pricing-single";
import Pricing5 from "@/registry/section/pricing/pricing-1/pricing";
import PricingBento from "@/registry/section/pricing/pricing-bento/pricing-bento";
import GalleryBento1 from "@/registry/section/gallery/gallery-bento-1/gallery";
import FeaturesGrid2 from "@/registry/section/features/features-grid-2/features";
import FeaturesGrid3 from "@/registry/section/features/features-grid-3/features";
import Stats2 from "@/registry/section/stats/stats-2/stats";
import Stats3 from "@/registry/section/stats/stats-3/stats";
import { AutoToast } from "@/registry/block/auto-toast/auto-toast-1/auto-toast";
import Timeline1 from "@/registry/section/timeline/timeline-1/timeline";
import Timeline2 from "@/registry/section/timeline/timeline-2/timeline";
import Timeline3 from "@/registry/section/timeline/timeline-3/timeline";
import TimelineHorizontal1 from "@/registry/section/timeline/timeline-horiontal-1/timeline";
import GalleryMasonry1 from "@/registry/section/gallery/gallery-masonry-1/gallery";
import GallerySimple from "@/registry/section/gallery/gallery-simple-1/gallery";
import HeroSearch1 from "@/registry/section/hero/hero-search-1/hero";
import HeroSearch2 from "@/registry/section/hero/hero-search-2/hero";
import HeroSearch3 from "@/registry/section/hero/hero-search-3/hero";
import FeaturesCard2 from "@/registry/section/features/features-card-2/features";
import FeaturesCard4 from "@/registry/section/features/features-card-4/features";
import DownloadX from "@/registry/section/download/download-x/download";
import { Download } from "lucide-react";
import Download1 from "@/registry/section/download/download-1/download";
import Download2 from "@/registry/section/download/download-2/download";
import LatestArticles4 from "@/registry/section/latest-articles/latest-articles-4/latest-articles";
import DownloadList1 from "@/registry/section/download/download-list-1/download";
import FormJobApplication1 from "@/registry/block/form/form-job-application-1/form";
import FormSubscription1 from "@/registry/block/form/form-subscribtion-1/form";
import FormBooking1 from "@/registry/block/form/form-booking-1/form";
import FormFeedback1 from "@/registry/block/form/form-feedback-1/form";
import HeroPortofolio1 from "@/registry/section/hero/hero-portofolio/hero";
import ShowcaseProject1 from "@/registry/section/showcase/showcase-project-1/showcase";

const features = [
  Features1,
  Features2,
  Features3,
  Features4,
  Features5,
  FeaturesCard4,
];
function FeaturesPage() {
  return (
    <>
      <HeroImmersive />
      <Hero8 />
      <HeroPortofolio1 />
      <ShowcaseProject1 />
      <PricingBento />
      <div className="container mx-auto">
        <Hero />
        <FeaturesCard4 />
        <Download1 />
        <Download2 />
        <FormJobApplication1 />
        <FormSubscription1 />
        <FormBooking1 />
        <FormFeedback1 />
        <DownloadList1 />
        <DownloadX />
        <HeroSearch1 />
        <HeroSearch2 />
        <HeroSearch3 />
        <CTA />
        <FeaturesCard2 />
        <FeaturesGrid2 />
        <FeaturesGrid3 />
        <GallerySimple />
        <GalleryMasonry1 />
        <Timeline1 />
        <Timeline2 />
        <Timeline3 />
        <TimelineHorizontal1 />
        <Stats2 />
        <Stats3 />
        <GalleryBento1 />
        <LatestArticles />
        <LatestArticles3 />
        <LatestArticles4 />
        <Pricing />
        <Pricing5 />
        <PricingSingle2 />
        <AutoScrollReveal
          once={false}
          className="w-full"
          components={features.map((Component) => (
            <Component key={Component.name} />
          ))}
        />
      </div>
      <AutoToast />
    </>
  );
}

export default FeaturesPage;
