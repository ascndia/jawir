"use client";

interface PriceCardProps {
  tier?: string;
  price?: string;
  bestFor?: string;
  CTA?: React.ReactNode;
  benefits?: { text: string; checked: boolean }[];
}
// const PriceCard = ({ tier, price, bestFor, CTA, benefits }: PriceCardProps) => {
//   return (
//     <motion.div
//       initial={{ filter: "blur(2px)" }}
//       whileInView={{ filter: "blur(0px)" }}
//       transition={{ duration: 0.5, ease: "easeInOut", delay: 0.25 }}
//     >
//       <Card className="h-full w-full border-zinc-700 bg-gradient-to-br dark:from-zinc-950/50 dark:to-zinc-900/80">
//         <CardHeader className="text-center">
//           <CardTitle className="">{tier}</CardTitle>
//           <p className="text-4xl font-medium">{price}</p>
//           <p className="bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent">
//             {bestFor}
//           </p>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4 py-4">
//             {benefits.map((b, i) => (
//               <Benefit key={i} {...b} />
//             ))}
//           </div>
//           {CTA}
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// const Benefit = ({ text, checked }: { text: string; checked: boolean }) => (
//   <div className="flex items-center gap-3">
//     <span
//       className={cn(
//         "grid size-5 place-content-center rounded-full",
//         checked ? "bg-blue-600 text-zinc-50" : "bg-zinc-800 text-zinc-400"
//       )}
//     >
//       {checked ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
//     </span>
//     <span className="text-sm text-zinc-300">{text}</span>
//   </div>
// );

// interface GhostButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/registry/components/card/card-shadcn/card";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/components/button/select";

const CardPricing = ({
  tier = "Free",
  price = "$0/mo",
  bestFor = "1-5 users",
  CTA = <Button>Get started free</Button>,
  benefits = [
    {
      text: "One workspace",
      checked: true,
    },
    { text: "Lorem ipsum dolor sit amet", checked: true },
    { text: "Lorem ipsum dolor sit amet", checked: false },
    { text: "Lorem ipsum dolor sit amet", checked: false },
    { text: "Lorem ipsum dolor sit amet", checked: false },
    { text: "Lorem ipsum dolor sit amet", checked: false },
  ],
}: PriceCardProps) => {
  return (
    <Card className="h-full w-full bg-gradient-to-br dark:from-zinc-950/50 dark:to-zinc-900/80">
      <CardHeader className="text-center">
        <CardTitle>{tier}</CardTitle>
        <p className="text-4xl font-medium">{price}</p>
        <p className="text-muted-foreground">{bestFor}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 py-4 mb-2">
          {benefits.map((b, i) => (
            <Benefit key={i} {...b} />
          ))}
        </div>
        <div className="w-full">{CTA}</div>
      </CardContent>
    </Card>
  );
};

const Benefit = ({ text, checked }: { text: string; checked: boolean }) => (
  <div className="flex items-center gap-3">
    <span
      className={cn(
        "grid size-5 place-content-center rounded-full",
        checked
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground"
      )}
    >
      {checked ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
    </span>
    <span className="text-foreground">{text}</span>
  </div>
);

export default CardPricing;
