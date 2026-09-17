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
      title: "Professional Safari Experience",
      description:
        "Experienced desert guides with comfortable 4x4 Land Cruisers ensure memorable red dune drives, sandboarding, and authentic Bedouin camp hospitality.",
    },
    {
      icon: CalendarCheck,
      title: "Easy Booking Process",
      description:
        "Reserve in under 2 minutes with zero advance card requirements. Receive an instant booking reference code and prompt confirmation.",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Customer Support",
      description:
        "Real-time WhatsApp and phone assistance available daily to answer questions, adjust timings, and accommodate special family requests.",
    },
    {
      icon: Layers,
      title: "Flexible Safari Packages",
      description:
        "Morning sunrise drives, evening BBQ buffets, overnight stargazing, quad biking, and private VIP charters tailored to your group.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Dubai Tour Experience",
      description:
        "Dedicated to passenger comfort, safety-first driving on desert terrain, and memorable Arabian adventures for guests worldwide.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#1D150E] text-[#17120D] dark:text-[#FBF7F0] relative overflow-hidden border-y border-[#C89B3C]/15 transition-colors duration-200">
      {/* Background Subtle Ambient Desert Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C]">
              Excellence & Distinction
            </span>
            <h2 className="font-heading mt-2 text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.15]">
              Why Choose Safari Dune Tours
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed">
              We focus on genuine Emirati hospitality, uncompromising safety standards, and breathtaking natural terrain to give you an unforgettable Arabian adventure.
            </p>
          </div>
        </ScrollReveal>

        {/* 5 Distinct Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={index} delay={index * 70}>
                <div
                  className={`h-full p-7 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/25 shadow-sm hover:border-[#C89B3C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
                    index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C89B3C]/20 to-[#C89B3C]/5 border border-[#C89B3C]/30 flex items-center justify-center mb-5 text-[#8C6214] dark:text-[#E8C48A] shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] mb-2.5">
                      {point.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#6B6258] dark:text-[#B8ADA2]">
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
