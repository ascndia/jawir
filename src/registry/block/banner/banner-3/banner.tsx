import { CircleAlert } from "lucide-react";
import { Banner as BannerComponent, BannerAction, BannerClose, BannerIcon, BannerTitle } from "@/registry/components/banner/banner-1/banner";

export default function Banner() {
  return (
    <div className="flex w-full items-center justify-center">
      <BannerComponent>
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>Important message</BannerTitle>
        <BannerAction>Learn more</BannerAction>
        <BannerClose />
      </BannerComponent>
    </div>
  );
}
