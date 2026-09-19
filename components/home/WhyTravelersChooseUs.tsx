import Link from "next/link";
import { Zap, ShieldCheck, Layers, Headphones, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function WhyTravelersChooseUs() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.freeQuote
  );

  const pillars = [
    {
      icon: Zap,
      title: "Fast Response",
      tagline: "Under 5-Minute Inquiry Reply",
      description:
        "Direct communication with our Dubai safari team via WhatsApp. Instant availability checks, immediate booking references, and real-time pickup updates.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Service",
      tagline: "Experienced Desert Drivers",
      description:
        "Every tour is led by seasoned drivers familiar with Dubai's high red dunes, prioritizing safety, smooth handling, and genuine hospitality.",
    },
    {
      icon: Layers,
      title: "Flexible Packages",
      tagline: "Zero Advance Card Requirement",
      description:
        "Book your preferred safari date with zero upfront deposit. Enjoy free 24-hour cancellation and customizable itineraries for families or private groups.",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      tagline: "Daily 08:00 AM – 11:00 PM GST",
      description:
        "Dedicated assistance before, during, and after your trip. We coordinate dietary preferences, hotel door-to-door transfers, and special celebration requests.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FCFBF8] dark:bg-[#120D09] text-[#17120D] dark:text-[#FBF7F0] border-t border-[#C89B3C]/15 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#8C6214] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Reliable & Transparent Service</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.15]">
              Why Travelers Choose Us
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
              We focus on genuine hospitality, straightforward bookings, and uncompromising passenger safety across every Arabian desert excursion.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 80}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#1D150E] border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C] hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center mb-4 border border-[#C89B3C]/30 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C89B3C] block mb-1">
                      {item.tagline}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action Conversion Bar */}
        <ScrollReveal delay={180}>
          <div className="mt-12 p-6 rounded-2xl bg-[#F2E8D5] dark:bg-[#1D150E] border border-[#C89B3C]/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-heading text-base sm:text-lg font-bold text-[#17120D] dark:text-[#FBF7F0]">
                Planning Your Safari Adventure?
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2]">
                Connect directly with our desert specialists for instant quotes and custom tour plans.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                href="/booking"
                className="btn-gold px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
              >
                Book Your Safari Today
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Get a Free Quote</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
