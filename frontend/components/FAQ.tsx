"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const faqItems = [
  {
    question: "What payment methods do you accept ?",
    answer: "We accept credit cards, PayPal, and Nintendo eShop vouchers.",
  },
  {
    question: "Do you offer worldwide shipping ?",
    answer: "Yes! We ship to most countries worldwide. Shipping fees may vary.",
  },
  {
    question: "Are your products officially licensed ?",
    answer: "Yes, all our Nintendo products are 100% officially licensed.",
  },
  {
    question: "How long does shipping take ?",
    answer:
      "Shipping takes between 3-7 business days depending on your location.",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto my-16 p-6 bg-white shadow-xl rounded-2xl border-2 border-red-600">
      <h2 className="text-3xl font-extrabold text-red-600 text-center mb-6 flex items-center justify-center gap-2">
        <HelpCircle className="w-8 h-8 text-red-600" /> Frequently Asked
        Questions
      </h2>
      <Accordion.Root type="multiple" className="space-y-4">
        {faqItems.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </Accordion.Root>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion.Item value={question} className="border-b border-gray-300">
      <Accordion.Header>
        <Accordion.Trigger
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center py-3 px-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-red-600" />
          </motion.div>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content forceMount>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="p-4 text-gray-700">{answer}</p>
        </motion.div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
