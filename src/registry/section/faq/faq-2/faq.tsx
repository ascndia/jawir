"use client";

import React from "react";
import { motion } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
}

interface Faq2Props {
  title?: string;
  subtitle?: string;
  faqs?: FaqItemProps[];
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <h3 className="text-lg font-medium text-foreground mb-2">{question}</h3>
      <div className="text-muted-foreground">
        <p>{answer}</p>
      </div>
    </div>
  );
};

const Faq2: React.FC<Faq2Props> = ({
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our products and services.",
  faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Sign Up' button in the top right corner of the homepage. Follow the instructions to complete your registration.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. Payment information is securely processed and stored.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. There are no cancellation fees or hidden charges.",
    },
    {
      question: "How can I contact customer support?",
      answer: "Our customer support team is available 24/7. You can reach us through live chat, email at support@example.com, or by phone at +1 (555) 123-4567.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service, you can request a full refund within 30 days of purchase.",
    },
  ],
}) => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {subtitle}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="grid gap-6 md:grid-cols-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FaqItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Faq2;