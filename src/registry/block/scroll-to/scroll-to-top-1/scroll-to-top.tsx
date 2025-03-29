import { useState, useEffect } from "react";
import { Button } from "@/registry/components/button/select";
import { ArrowUpToLine } from "lucide-react";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    showTopBtn && (
      <div className="fixed bottom-4 right-4 opacity-90 shadow-md">
        <Button onClick={goToTop}>
          <ArrowUpToLine className="h-4 w-4" />
        </Button>
      </div>
    )
  );
};
