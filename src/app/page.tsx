"use client";
import { Box } from "@/registry/block/box/box-gradient/box";
import CardCookies from "@/registry/block/card-cookies/card-cookies-1/card-cookies";
import CardCookies2 from "@/registry/block/card-cookies/card-cookies-2/card-cookies";
import CardCookies3 from "@/registry/block/card-cookies/card-cookies-3/card-cookies";
import CardFeature from "@/registry/block/card-feature/card-feature-1/card-feature";
import CardNotification from "@/registry/block/card-notification/card-notification-1/card-notification";
import CardPeople from "@/registry/block/card-people/card-people-1/card-people";
import CardPricing from "@/registry/block/card-pricing/card-pricing-1/card-pricing";
import CardPricing2 from "@/registry/block/card-pricing/card-pricing-2/card-pricing";
import CardPricing3 from "@/registry/block/card-pricing/card-pricing-3/card-pricing";
import CardPricing4 from "@/registry/block/card-pricing/card-pricing-4/card-pricing";
import CardPricing5 from "@/registry/block/card-pricing/card-pricing-5/card-pricing";
import CardService from "@/registry/block/card-service/card-service-1/card-service";
import CardService2 from "@/registry/block/card-service/card-service-2/card-service";
import CardTestimony from "@/registry/block/card-testimony/card-testimony-1/card-testimony";
import CardTestimony2 from "@/registry/block/card-testimony/card-testimony-2/card-testimony";
import CTASecond from "@/registry/block/cta-second/cta-second-1/cta-second";
import ModeToggle from "@/registry/block/mode-toggle/mode-toggle-dropdown/mode-toggle";
import ModeToggle2 from "@/registry/block/mode-toggle/mode-toggle-button/mode-toggle";
import { ScrollToTop } from "@/registry/block/scroll-to-top/scroll-to-top-1/scroll-to-top";
import Background from "@/registry/components/background/select";
import { Button } from "@/registry/components/button/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import Code from "@/registry/components/code/code-1/code";
import { ScrollReveal, SlideIn } from "@/registry/components/framer";
import AutoScrollReveal from "@/registry/components/framer/framer-auto-scroll-reveal/framer-auto-scroll-reveal";
import Faq from "@/registry/section/faq/faq1/faq";
import Faq2 from "@/registry/section/faq/faq2/faq";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { CookiesSettings } from "@/registry/block/cookies/cookies-setting/cookies-setting";
import CompanyLogos from "@/registry/section/company-logos/company-logos-1/company-logos";
import { Footer } from "@/registry/section/footer/footer-1/footer";
import { ScrollToDown } from "@/registry/block/scroll-to-down/scroll-to-down-1/scroll-to-down";
import DialogScroll from "@/registry/block/dialog/dialog-scroll/dialog-scroll";
import UploadImage from "@/registry/block/upload-image/upload-image-1/upload-image";
import LatestArticles from "@/registry/section/latest-articles/latest-articles-1/latest-articles";
import CopyStringButton from "@/registry/block/copy-button/copy-button-string/copy-button";
import CardBlogPost from "@/registry/block/card-blog-post/card-blog-post-1/card-blog-post";
import CardCheckout from "@/registry/block/card-checkout/card-checkout-1/card-checkout";
import CardImage from "@/registry/block/card-image/card-image-1/card-image";
import Announcement from "@/registry/components/announcement/announcement-1/announcement";
import CardOrderSummary from "@/registry/block/card-order-summary/card-order-summary-1/card-order-summary";
import Banner from "@/registry/block/banner/banner-2/banner";
import CardContact from "@/registry/block/card-contact/card-contact-1/card-contact";
import CardContact2 from "@/registry/block/card-contact/card-contact-2/card-contact";
import CardWeather from "@/registry/block/card-weather/card-weather-1/card-weather";
import ContactForm from "@/registry/section/contact-form/contact-form-2/contact-form";
import ProfileMenu from "@/registry/block/profile-menu/profile-menu-1/profile-menu";
import ProfileMenu2 from "@/registry/block/profile-menu/profile-menu-2/profile-menu";
import Dropdown from "@/registry/block/dropdown/dropdown-button/dropdown";
import BannerCookies from "@/registry/block/banner/banner-cookie/banner";

const cards = [
  <CardBlogPost key="card-blog-post" />,
  <CardWeather key="card-weather" />,
  <CardOrderSummary key="card-order-summary" />,
  <CardContact key="card-contact" />,
  <CardContact2 key="card-contact-2" />,
  <CardImage key="card-image" />,
  <CardCheckout key="card-checkout" />,
  <CardService key="card-service-1" />,
  <CardService2 key="card-service-2" />,
  <CardFeature key="card-feature" />,
  <CardPeople key="card-people" />,
  <CardNotification key="card-notification" />,
  <CardPricing key="card-pricing" />,
  <CardPricing2 key="card-pricing2" />,
  <CardPricing3 key="card-pricing3" />,
  <CardPricing4 key="card-pricing4" />,
  <CardPricing5 key="card-pricing5" />,
  <CardTestimony key="card-testimony" />,
  <CardTestimony2 key="card-testimony2" />,
  <CardCookies key="card-cookies" />,
  <CardCookies2 key="card-cookies-fixed" />,
  <CardCookies3 key="card-cookies-fixed2" />,
  <CookiesSettings key="cookies-settings" />,
];
export { cards };
export default function Home() {
  return (
    <>
    <BannerCookies/>
      <ScrollToDown />
      <Background />
      <Banner/>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <ModeToggle2 />
          <ProfileMenu/>
          <ProfileMenu2/>
          <Dropdown/>
          <Announcement>
            New snippets ⚡️
            <span className="inline-flex items-center pl-2 text-black dark:text-white">
              Read more{" "}
              <ArrowRight
                className="pl-0.5 text-black dark:text-white"
                size={16}
              />
            </span>
          </Announcement>
          <DialogScroll />
          <ContactForm/>
          <UploadImage />
          <CompanyLogos />
          {/* <div className="flex flex-col w-full gap-4"> */}
          <AutoScrollReveal once={false} components={cards} />
          {/* </div> */}
          <ModeToggle />
          <ModeToggle2 />
          <Card>
            <CardHeader>
              <CardTitle>Get started with Next.js</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm/6">
                Edit <Code>src/app/page.tsx</Code> and save to change this page.
              </p>
            </CardContent>
          </Card>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing <Code>src/app/page.tsx</Code>.
            </li>
            <li className="tracking-[-.01em]">
              Save and see your changes instantly.
            </li>
          </ol>
          <Box>
            <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2 tracking-[-.01em]">
                Get started by editing{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                  src/app/page.tsx
                </code>
                .
              </li>
              <li className="tracking-[-.01em]">
                Save and see your changes instantly.
              </li>
            </ol>
          </Box>
          <CopyStringButton text="Bisikan manis" />
          <LatestArticles />
          <ScrollReveal>
            <SlideIn direction={"bottom"}>
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Button>Deploy now</Button>
                <CTASecond>Ralhafnioh j9ajpihwh</CTASecond>
              </div>
            </SlideIn>
          </ScrollReveal>
          <div className="max-w-[768px] mx-auto">
            <Faq />
            <Faq2 />
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                src/app/page.tsx
              </code>
              .
            </li>
            <li className="tracking-[-.01em]">
              Save and see your changes instantly.
            </li>
          </ol>
          <Box>
            <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2 tracking-[-.01em]">
                Get started by editing{" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                  src/app/page.tsx
                </code>
                .
              </li>
              <li className="tracking-[-.01em]">
                Save and see your changes instantly.
              </li>
            </ol>
          </Box>
          <ScrollReveal once={false}>
            <SlideIn direction={"bottom"}>
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <Button>Deploy now</Button>
                <Button>Read our docs</Button>
              </div>
            </SlideIn>
          </ScrollReveal>
        </main>
        <footer className="row-start-3 relative flex gap-[24px] flex-wrap items-center justify-center">
          <Background />
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
