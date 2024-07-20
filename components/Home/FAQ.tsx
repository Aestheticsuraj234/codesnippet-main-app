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
    <section id="faq" className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col text-left basis-1/2">
        <p className="sm:text-4xl text-3xl font-extrabold text-zinc-700 dark:text-white mb-8">
          Frequently Asked Questions
        </p>
        <div className=" text-zinc-700  dark:text-white/80">
          Have another question? Contact me on{" "}
          <a
            className=" text-yellow-500 dark:text-white/80 font-bold"
            target="_blank"
            href="https://www.instagram.com/sigma_developer_/"
          >
            Instagram
          </a>{" "}
          or by{" "}
          <a
            href="mailto:sigmadev234@gmail.com"
            target="_blank"
            className=" text-yellow-500 dark:text-white/80 font-bold"
          >
            email
          </a>
          .
        </div>
      </div>

      <div className="flex flex-col items-start justify-start basis-1/2">
        {FrequentlyAskedQuestions.map((faq, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="text-xl font-bold text-zinc-800  dark:text-white active:text-yellow-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base font-semibold text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
