"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { FAQ } from "@/types";
import ScrollReveal from "@/components/common/ScrollReveal";

interface HomeFAQProps {
  faqs: FAQ[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = faqs.slice(0, 6);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Essential Inquiries</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2]">
              Everything you need to know before embarking on your Dubai desert safari.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-[#241A12] border-[#C89B3C]/50 shadow-md"
                    : "bg-white/80 dark:bg-[#241A12]/60 border-[#C89B3C]/15 hover:border-[#C89B3C]/35"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-[#C89B3C]/15 text-[#C89B3C]" : "bg-black/5 dark:bg-white/5 text-[#6B6258] dark:text-[#B8ADA2]"
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#C89B3C]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed border-t border-[#C89B3C]/10 animate-in fade-in-50 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C89B3C] hover:text-[#D6A84F] group"
          >
            <span>Have more questions? Read our Full FAQ</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
