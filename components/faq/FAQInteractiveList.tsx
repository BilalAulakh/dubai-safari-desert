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
    <>
      {/* Search Input */}
      <div className="mt-8 max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search a question (e.g. pickup, clothing, kids)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-amber-500 transition-all"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
      </div>

      {/* Category Pills */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-amber-400 shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm text-slate-600 mb-4">
              No questions found matching &ldquo;{searchTerm}&rdquo;.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider"
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
                  className="rounded-2xl border border-amber-900/10 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-amber-50/50"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
