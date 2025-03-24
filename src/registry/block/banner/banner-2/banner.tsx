import Link from "next/link";
import { cva } from "class-variance-authority";

const bannerVariants = cva("bg-muted p-4", {
  variants: {
    alignment: {
      centered: "flex justify-center",
      start: "flex justify-start",
      end: "flex justify-end",
    },
  },
  defaultVariants: {
    alignment: "centered",
  },
});

export default function Banner({ alignment = "centered" }: { alignment?: "centered" | "start" | "end" }) {
  return (
    <div className={bannerVariants({ alignment})}>
      <div className="container">
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-4 text-sm">
            <p className="text-center flex-1">
              <Link
                href="#"
                className="font-semibold hover:underline underline-offset-4"
              >
                Introducing our new UI blocks
              </Link>
              <span className="hidden sm:inline">
                {" "}
                — Get started with 50+ new components.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}