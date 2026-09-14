"use client";

import { useState } from "react";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import { FAQ } from "@/types";

interface FAQInteractiveListProps {
  faqs: FAQ[];
  whatsappUrl: string;
}

export default function FAQInteractiveList({ faqs, whatsappUrl }: FAQInteractiveListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "General",
    "Timing",
    "Pickup",
    "Family & Safety",
    "Preparation",
    "Booking",
    "Packages",
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search a question (e.g. pickup, clothing, kids)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#0F1624] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all shadow-sm"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="pt-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#0F1624] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              No questions found matching &ldquo;{searchTerm}&rdquo;.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Our Team on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-amber-900/10 dark:border-white/10 bg-white dark:bg-[#0F1624] overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-amber-50/50 dark:focus:bg-slate-800/50"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
