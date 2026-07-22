import { useState } from "react";
import Title from "./ui/Title";
import { IoIosArrowDown } from "react-icons/io";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How long does shipping take with Trendora?",
    answer:
      "Shipping usually takes 2 to 5 business days nationwide. As soon as your order is shipped, we will send you an email and an SMS containing a direct link to track your shipment.",
  },
  {
    id: 2,
    question: "What is your return and exchange policy?",
    answer:
      "We offer a flexible return policy. You can return or exchange any product within 14 days of delivery, provided that the product is unused, in its original condition, and in its original packaging.",
  },
  {
    id: 3,
    question: "Do you offer Cash on Delivery (COD)?",
    answer:
      "Yes, Cash on Delivery is available in most cities. We also support secure online payment methods including Credit Cards, Apple Pay, and flexible installment plans.",
  },
  {
    id: 4,
    question: "How can I contact Trendora customer support?",
    answer:
      "Our team is ready to help you 24/7! You can reach us directly via WhatsApp, call our unified hotline, or send us an email. We typically respond within less than an hour.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="FAQ" className="section-padding custom-container">
      <Title
        heading={" Frequently Asked Questions"}
        subHeading={` Everything you need to
           know about shipping, returns, and payments at Trendora`}
      />

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
                className="w-full flex justify-between items-center font-bold text-left
                 text-base-text dark:text-dark-text res-text select-none focus:outline-none"
              >
                <span>{faq.question}</span>
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
                    {faq.answer}
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
