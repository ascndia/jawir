"use client";
import { CardTestimony } from "@/registry/block/card-testimony/select";
import ColorPicker from "@/registry/block/color-picker/color-picker-1/color-picker";
import React from "react";
import { cards } from "../page";
import { Newsletter } from "@/registry/section/newsletter/newsletter-2/newsletter";
import Header from "@/registry/block/header/header-irung-1/header";
import { Plus } from "lucide-react";
import { Separator } from "@/registry/components/separator/separator-2/separator";
import CTA from "@/registry/section/cta/cta-1/cta";
import CTA2 from "@/registry/section/cta/cta-2/cta";
import CTA3 from "@/registry/section/cta/cta-3/cta";
import Testimonial from "@/registry/section/testimonial/testimonial-cards-1/testimonial";
import Testimonial2 from "@/registry/section/testimonial/testimonial-single-1/testimonial";
import Testimonial3 from "@/registry/section/testimonial/testimonial-single-2/testimonial";
import Hero from "@/registry/section/hero/hero-1/hero";
import Hero2 from "@/registry/section/hero/hero-2/hero";
import Hero3 from "@/registry/section/hero/hero-3/hero";
import Hero4 from "@/registry/section/hero/hero-4/hero";
import Hero5 from "@/registry/section/hero/hero-5/hero";
import Banner from "@/registry/block/banner/banner-1/banner";
import Banner3 from "@/registry/block/banner/banner-3/banner";
import Stats from "@/registry/section/stats/stats-1/stats";
import Features from "@/registry/section/features/features-bento-2/features";
import { AvatarStack } from "@/registry/block/avatar-stack/avatar-stack-2/avatar-stack";
import  AvatarStack3 from "@/registry/block/avatar-stack/avatar-stack-3/avatar-stack";
import Faq from "@/registry/section/faq/faq4/faq";
import Faq2 from "@/registry/section/faq/faq-5/faq";
import StatusSelect from "@/registry/block/status-select/status-select-1/status-select";
import CreditCard from "@/registry/block/credit-card/credit-card-1/credit-card";
import CompanyLogos from "@/registry/section/company-logos/company-logos-3/company-logos";
import Cookies from "@/registry/section/cookies/cookies";
import Blog from "@/registry/section/blog/blog-1/blog";
import Services from "@/registry/section/services/services-1/services";
import ProductOverview from "@/registry/section/product/product-overview/product";
import ShoppingCart from "@/registry/section/shopping-cart/shopping-cart-1/shopping-cart";
import Footer from "@/registry/section/footer/footer-3/footer";
import StatsAdmin from "@/registry/section/stats-admin/stats-admin-1/stats-admin";
import Breadcrumb from "@/registry/block/breadcrumb/breadcrumb-icon/breadcrumb";
import ContactForm from "@/registry/section/contact-form/contact-form-1/contact-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/components/avatar/avatar-shadcn/avatar";
import Announcement from "@/registry/block/announcement/announcement-1/announcement";
const Le = () => (
  <AvatarStack3>
    <Avatar>
      <AvatarImage src="https://github.com/haydenbleasel.png" />
      <AvatarFallback>HB</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/leerob.png" />
      <AvatarFallback>LR</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/serafimcloud.png" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  </AvatarStack3>
)
function Cohort() {
  return (
    <>
      {/* <Header /> */}
      <Banner/>
      <Banner3/>
      <div className="container pt-6 lg:pt-10 mx-auto">
        <Hero5 />
        <ProductOverview/>
        <div className="w-full mx-auto">
          <Announcement>
            <h1 className="">New Cohort added</h1>
          </Announcement>
        </div>
        <Le/>
        <Testimonial3/>
        <ContactForm/>
        <ShoppingCart/>
        <Hero />
        <Breadcrumb/>
        <StatsAdmin/>
        <CTA3 />
        <Hero2 />
        <div className="mx-auto">
        <CreditCard/>
        <CompanyLogos/>
        <StatusSelect/>
        </div>
        <Cookies/>
        <Blog/>
        <Testimonial2/>
        <Hero3 />
        <AvatarStack />
        <Faq/>
        <Hero4 />
        <Stats/>
        <Features/>
        <Separator gradient />
        <Separator />
        <Faq2/>
        <Services/>
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
        <CTA />
        <CTA2 />
        <Testimonial />
        <div className="max-w-sm">
          <CardTestimony />
        </div>
        <ColorPicker color={{ h: 0, s: 0, l: 0 }} onColorChange={() => {}} />
        <Newsletter />
        <Footer/>
      </div>
    </>
  );
}

export default Cohort;
