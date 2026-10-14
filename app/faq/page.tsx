import { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { getFAQs } from "@/lib/data/store";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import FAQInteractiveList from "@/components/faq/FAQInteractiveList";
import CTASection from "@/components/home/CTASection";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export const metadata: Metadata = {
  title: "Dubai Desert Safari FAQ | Safari Dune Tours",
  description:
    "Find immediate answers to questions regarding Dubai desert safari inclusions, clothing advice, child safety, pickup timing, payment methods, and cancellation policies.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/faq`,
  },
  openGraph: {
    title: "Dubai Desert Safari FAQ | Safari Dune Tours",
    description:
      "Find immediate answers to questions regarding Dubai desert safari inclusions, clothing advice, child safety, pickup timing, payment methods, and cancellation policies.",
    url: `${SITE_CONFIG.url}/faq`,
    siteName: SITE_CONFIG.name,
  },
};

export default async function FAQPage() {
  const faqs = await getFAQs();

  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune Tours, I have a question about desert safari tours."
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
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Help & Answers</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            Dubai Desert Safari <span className="gold-text-gradient">FAQ</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Find immediate answers to questions regarding pickup locations, clothing advice, child safety, food menus, and cancellation policies.
          </p>
        </div>
      </section>

      {/* Interactive Search & List Component */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQInteractiveList faqs={faqs} whatsappUrl={whatsappUrl} />
      </section>

      <CTASection />
    </div>
  );
}
