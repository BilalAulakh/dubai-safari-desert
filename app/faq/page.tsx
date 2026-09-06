import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { getFAQs } from "@/lib/data/store";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import FAQInteractiveList from "@/components/faq/FAQInteractiveList";
import CTASection from "@/components/home/CTASection";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dubai Desert Safari FAQ | Timing, Clothing, Pickup & Safety",
  description:
    "Find immediate answers to questions regarding Dubai desert safari pickup locations, clothing advice, child safety, vegetarian food menus, and cancellation policies.",
  alternates: {
    canonical: "/faq",
  },
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello DubaiSafariDesert, I have a question about desert safari tours."
  );

  // Structured Data (JSON-LD) for FAQPage rich snippet
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-[#FCFBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Answers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dubai Desert Safari FAQ
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Find immediate answers to questions regarding pickup locations, clothing advice, child safety, food menus, and cancellation policies.
          </p>

          {/* Interactive Search & List Component */}
          <FAQInteractiveList faqs={faqs} whatsappUrl={whatsappUrl} />
        </div>
      </section>

      <CTASection />
    </div>
  );
}
