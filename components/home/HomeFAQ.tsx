"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";
import { FAQ } from "@/types";
import ScrollReveal from "@/components/common/ScrollReveal";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

interface HomeFAQProps {
  faqs: FAQ[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = faqs.slice(0, 6);
  const whatsappUrl = createWhatsAppUrl(SITE_CONFIG.contact.whatsapp, SITE_CONFIG.whatsappTemplates.general);

  return (
    <section className="section-y bg-surface-alt">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <ScrollReveal>
          <div className="lg:sticky lg:top-28">
            <p className="kicker">Before You Book</p>
            <h2 className="mt-5 font-display text-h2 font-bold text-ink">
              Questions, <span className="italic text-accent">answered</span>
            </h2>
            <p className="mt-5 text-body-lg text-muted">
              Everything you need to know before your Dubai desert safari.
            </p>

            <div className="mt-8 rounded-2xl bg-dune-900 p-6 text-sand-50 dark:bg-dune-950 dark:ring-1 dark:ring-white/10">
              <p className="font-display text-xl font-bold">Still deciding?</p>
              <p className="mt-2 text-small text-sand-400">
                Message us and we will help you pick the right safari for your group.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <div className="divide-y divide-line border-y border-line">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display text-h4 font-semibold transition-colors ${isOpen ? "text-accent" : "text-ink"}`}>
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? "rotate-45 border-amber-500 bg-amber-500 text-dune-900" : "border-line text-muted"
                      }`}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && <p className="pb-6 pr-12 text-body leading-relaxed text-muted">{faq.answer}</p>}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link href="/faq" className="link-arrow">
              <span>Read the full FAQ</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
