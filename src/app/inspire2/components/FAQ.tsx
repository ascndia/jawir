"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Our free trial gives you full access to all FlowSpace features for 14 days with no credit card required. You can invite your team, create projects, and explore all the functionality. At the end of your trial, you can choose a plan that best suits your needs or cancel without any obligation.",
  },
  {
    question: "Can I switch between pricing plans?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, the new features are immediately available and we prorate the cost. When downgrading, the changes take effect at the end of your current billing cycle.",
  },
  {
    question: "How many team members can I add?",
    answer:
      "The Starter plan supports up to 5 team members, the Professional plan up to 20, and the Enterprise plan offers unlimited team members. Each team member gets their own login credentials and customizable permission levels.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "All plans include access to our help center and community forums. The Starter plan includes email support with a 24-hour response time. Professional plans receive priority email support with a 12-hour response time. Enterprise plans enjoy 24/7 phone and email support with a dedicated account manager.",
  },
  {
    question:
      "Do you offer discounts for non-profits or educational institutions?",
    answer:
      "Yes, we offer special pricing for registered non-profit organizations and educational institutions. Please contact our sales team to learn more about our discount programs and eligibility requirements.",
  },
  {
    question: "Can I integrate FlowSpace with other tools we use?",
    answer:
      "FlowSpace integrates with 100+ popular tools including Slack, Microsoft Teams, Google Workspace, GitHub, Jira, and many more. Our Professional and Enterprise plans also include access to our API for custom integrations. If you need a specific integration, contact us to discuss options.",
  },
  {
    question: "Is it possible to migrate our data from another platform?",
    answer:
      "Yes, we offer migration tools and services to help you seamlessly transition from other project management platforms. Our team can assist with importing tasks, projects, and user data from popular tools. Enterprise plans include personalized migration support.",
  },
  {
    question: "How secure is our data on FlowSpace?",
    answer:
      "Security is our top priority. All data is encrypted in transit and at rest. We use industry-standard security practices including regular security audits, two-factor authentication, and role-based access controls. Our Enterprise plan offers additional security features like SSO integration and advanced audit logs.",
  },
];

export default function FAQ() {
  return (
    <section className="w-full bg-background py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Everything you need to know about FlowSpace
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <div className="rounded-xl border bg-muted/30 p-6 shadow-sm">
            <h3 className="text-xl font-medium">Still have questions?</h3>
            <p className="mt-2 text-muted-foreground">
              If you can't find the answer to your question, our support team is
              ready to help.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
