"use client";
import { Button } from "@/registry/components/button/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

type FaqType = {
  isActive: boolean;
  question: string;
  answer: string;
};
const faqList: FaqType[] = [
  {
    isActive: true,
    question: "What is Easy Frontend?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Who is Easy Frontend for?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "How does Easy Frontend work?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "How often does your team upload resources?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I get a refund if I cancel my subscription?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I use Easy Frontend designs in my portfolio?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
  {
    isActive: false,
    question: "Can I buy Easy Frontend extended license?",
    answer:
      "When it comes to booking a holiday, we know everyone likes something different - so we've designed our getaways with you in mind. When it comes to booking a holiday, we know everyone likes something different.",
  },
];

const FaqItem = ({ faq }: { faq: FaqType }) => {
  const [isOpen, setIsOpen] = useState(faq.isActive || false);

  const toggleFaq = () => setIsOpen(!isOpen);

  return (
    <div className={isOpen ? "active" : undefined}>
      <a
        href="#!"
        className="btn px-0 py-4 w-full text-start flex justify-between items-center"
        onClick={toggleFaq}
      >
        <span>{faq.question}</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </a>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } border-l-2 border-primary border-border mb-4`}
      >
        <div className="px-6">
          <p className="opacity-50">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq5 = () => {
  return (
    <section className="py-14 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 justify-center mb-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 text-center">
            <h2 className="font-bold text-[25px] md:text-[45px] leading-none mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg opacity-70">
              Assumenda non repellendus distinctio nihil dicta sapiente,
              quibusdam maiores, illum at, aliquid blanditiis eligendi
              qui.Assumenda non repellendus distinctio nihil dicta sapiente,
              quibusdam maiores
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <div className="bg-muted shadow dark:shadow-none p-6">
              {faqList.map((faq, i) => (
                <FaqItem faq={faq} key={i} />
              ))}

              <Button className=" rounded transition mt-5">
                View All FAQ's
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq5;
