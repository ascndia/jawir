import { useState, useEffect } from "react";
import { Button } from "@/registry/components/button/select";
import { ArrowDownToLine } from "lucide-react";

interface ScrollToDownProps {
  xPosition?: "left" | "right";
  yPosition?: "top" | "bottom";
}
export const ScrollToDown = ({
  xPosition = "right",
  yPosition = "top",
}: ScrollToDownProps) => {
  const [showDownBtn, setShowDownBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowDownBtn(
        window.scrollY < document.body.scrollHeight - window.innerHeight - 400
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    showDownBtn && (
      <div
        className={`fixed ${yPosition} top-4 ${xPosition}-4 opacity-90 shadow-md`}
      >
        <Button onClick={goToDown}>
          <ArrowDownToLine className="h-4 w-4" />
        </Button>
      </div>
    )
  );
};
