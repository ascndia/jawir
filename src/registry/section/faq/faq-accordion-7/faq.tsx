import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  description?: string;
  items?: FaqItem[];
  multiple?: boolean;
}

const faq: FaqItem[] = [
  {
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping fees and delivery times vary by location, and customs duties may apply for some countries.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay, ensuring secure payment options for all customers.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
  },
];

const FaqAccordion7 = ({
  heading = "Frequently Asked Questions",
  description = "Quick answers to common questions about our products and services.",
  items = faq,
  multiple = false,
}: FaqProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight">
          {heading}
        </h2>
        <p className="mt-1.5 text-lg text-muted-foreground">{description} </p>

        <Accordion
          type={multiple ? "multiple" : ("single" as const)}
          className="mt-8 space-y-4"
          collapsible
          //   defaultValue="1"
        >
          {items.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none "
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 cursor-pointer items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqAccordion7;
