import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FrequentlyAskedQuestions } from "@/constants/Faq";

const FAQ = () => {
  return (
    <section
      id="faq"
      className="min-h-screen py-16 md:py-24 px-4 md:px-8 mx-auto flex flex-col md:flex-row gap-8 md:gap-12 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]"
    >
      <div className="flex flex-col text-left basis-full md:basis-1/2 max-w-7xl">
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-700 dark:text-white mb-4 md:mb-8">
          Frequently Asked Questions
        </p>
        <div className="text-zinc-700 dark:text-white/80 text-sm md:text-base">
          Have another question? Contact me on{" "}
          <a
            className="text-green-500 dark:text-white/80 font-bold"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/sigma_developer_/"
          >
            Instagram
          </a>{" "}
          or by{" "}
          <a
            href="mailto:sigmadev234@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 dark:text-white/80 font-bold"
          >
            email
          </a>
          .
        </div>
      </div>

      {/* Accordion for FAQs */}
      <div className="flex flex-col items-start justify-start basis-full md:basis-1/2 w-full mt-8 md:mt-0">
        <Accordion type="single" collapsible className="w-full">
          {FrequentlyAskedQuestions.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base md:text-xl font-bold text-zinc-800 dark:text-white active:text-green-500 py-4 px-2 md:px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base font-semibold text-zinc-600 dark:text-zinc-400 whitespace-pre-line px-2 md:px-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;