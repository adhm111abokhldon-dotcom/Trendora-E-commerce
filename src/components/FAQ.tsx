import { useState } from "react";
import Title from "./ui/Title";
import { IoIosArrowDown } from "react-icons/io";
import { useI18n } from "@/i18n";
import type { TranslationKey } from "@/i18n/en";

type FAQItem = {
  id: number;
  questionKey: TranslationKey;
  answerKey: TranslationKey;
};

const faqData: FAQItem[] = [
  { id: 1, questionKey: "faq.q1", answerKey: "faq.a1" },
  { id: 2, questionKey: "faq.q2", answerKey: "faq.a2" },
  { id: 3, questionKey: "faq.q3", answerKey: "faq.a3" },
  { id: 4, questionKey: "faq.q4", answerKey: "faq.a4" },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useI18n();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="section-padding custom-container">
      <Title heading={t("faq.title")} subHeading={t("faq.sub")} />

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id}
              className={`bg-base-surface dark:bg-dark-bg border rounded-card p-5 transition-all duration-300 ${
                isOpen
                  ? "border-accent-trendora ring-1 ring-accent-trendora"
                  : "border-border-light dark:border-border-dark"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="w-full flex justify-between items-center font-bold text-start
                 text-base-text dark:text-dark-text res-text select-none focus:outline-none"
              >
                <span>{t(faq.questionKey)}</span>
                <span
                  className={`transition-transform duration-300 text-accent-trendora ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className="border-t border-border-light dark:border-border-dark mt-4 pt-4 text-base-text-muted dark:text-dark-text-muted 
                  text-sm sm:text-base leading-relaxed"
                  >
                    {t(faq.answerKey)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
