import Link from "next/link";
import { Compass, CalendarCheck, HeadphonesIcon, Layers, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function WhyChooseUs() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  const trustPoints = [
    {
      icon: Compass,
      badge: "Expert Guides",
      title: "Experienced Safari Marshals",
      description:
        "Every desert expedition is led by seasoned, licensed drivers with deep expertise navigating Dubai's steep Lahbab red dunes safely.",
    },
    {
      icon: ShieldCheck,
      badge: "Passenger Safety",
      title: "Certified 4x4 Fleet",
      description:
        "All safari Land Cruisers are fitted with reinforced internal roll cages, first-aid safety kits, and comprehensive commercial passenger coverage.",
    },
    {
      icon: Layers,
      badge: "Zero Deposit",
      title: "Transparent & Card-Free",
      description:
        "Book with complete confidence and zero upfront card requirement. Pay seamlessly on the tour day in cash or card directly to your driver.",
    },
    {
      icon: CalendarCheck,
      badge: "Citywide Transfers",
      title: "Door-to-Door Pickup",
      description:
        "Enjoy complimentary hotel, resort, or residential apartment pickup and drop-off anywhere in Dubai in an air-conditioned 4x4 vehicle.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#1D150E] text-[#17120D] dark:text-[#FBF7F0] relative overflow-hidden border-y border-[#C89B3C]/15 transition-colors duration-200">
      {/* Background Subtle Ambient Desert Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow">
              Excellence & Distinction
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.1]">
              Why Choose Safari Dune Tours
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
              We focus on genuine Emirati hospitality, uncompromising safety standards, and breathtaking natural terrain to give you an unforgettable Arabian adventure.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Distinct Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={index} delay={index * 70}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/25 shadow-sm hover:border-[#C89B3C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C89B3C]/20 to-[#C89B3C]/5 border border-[#C89B3C]/30 flex items-center justify-center text-[#8C6214] dark:text-[#E8C48A] shadow-inner">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#8C6214] dark:text-[#E8C48A]">
                        {point.badge}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] mb-2.5">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#6B6258] dark:text-[#B8ADA2]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Action CTA Bar */}
        <ScrollReveal delay={200}>
          <div className="mt-12 pt-8 border-t border-[#C89B3C]/20 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="btn-gold px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md"
            >
              <span>Book Your Safari Today</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-md"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              <span>WhatsApp Us Now</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
