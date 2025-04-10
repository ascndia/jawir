import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  heading?: string;
  items?: FaqItem[];
  multiple?: boolean;
}

const FaqAccordion1 = ({
  heading = "Frequently asked questions",
  multiple = false,
  items = [
    {
      question: "What is a FAQ?",
      answer:
        "A FAQ is a list of frequently asked questions and answers on a particular topic.",
    },
    {
      question: "What is the purpose of a FAQ?",
      answer:
        "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
    },
    {
      question: "How do I create a FAQ?",
      answer:
        "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
    },
    {
      question: "What are the benefits of a FAQ?",
      answer:
        "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
    },
  ],
}: FaqProps) => {
  return (
    <section className="py-24">
      <div className="container w-full mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
          {heading}
        </h1>
        {items.map((item, index) => (
          <Accordion
            key={index}
            type={multiple ? "multiple" : "single"}
            collapsible
          >
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-xl hover:text-foreground/60 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg">{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FaqAccordion1;
