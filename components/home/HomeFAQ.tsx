"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
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
    <section className="section bg-[#F5EEE3] dark:bg-[#1D150E] transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 sm:mb-12">
            <div className="eyebrow">
              <span>Essential Inquiries</span>
            </div>
            <h2 className="section-title">
              Frequently Asked Questions
            </h2>
            <p className="section-lead">
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
                    ? "bg-white dark:bg-[#241A12] border-[#C89B3C]/45 shadow-[0_8px_24px_-12px_rgba(90,62,12,0.25)]"
                    : "bg-white dark:bg-[#241A12] border-[var(--border-subtle)] hover:border-[#C89B3C]/35"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-[#17120D] dark:text-[#FBF7F0]">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? "bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A]" : "bg-black/5 dark:bg-white/5 text-[#5E554C] dark:text-[#B8ADA2]"
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-4 text-[15px] text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed border-t border-[#C89B3C]/10 animate-in fade-in-50 duration-200">
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
            className="link-arrow"
          >
            <span>Have more questions? Read our Full FAQ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
