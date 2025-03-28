import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this template free?",
    answer: "Yes. It is a free ChadcnUI template.",
    value: "item-1",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
    value: "item-2",
  },
  {
    question:
      "Lorem ipsum dolor sit amet  Consectetur natus dolores minus quibusdam?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis necessitatibus maxime quis ipsa vitae cumque quo?",
    value: "item-3",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipisicing elit?",
    answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    value: "item-4",
  },
  {
    question:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur natus?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam? Consectetur sapiente iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
    value: "item-5",
  },
];

interface FaqProps {
  heading?: string;
  items?: FAQProps[];
  multiple?: boolean;
}

const Faq = ({
  heading = "Frequently asked questions",
  multiple = true,
  items = FAQList,
}: FaqProps) => {
  return (
    <section id="faq" className="container mx-auto py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>

      <Accordion
        type={multiple ? "multiple" : "single"}
        className="w-full AccordionRoot"
      >
        {items.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};

export default Faq;
