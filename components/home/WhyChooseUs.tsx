import Link from "next/link";
import { Compass, CalendarCheck, Layers, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
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
    <section className="section bg-[#F5EEE3] dark:bg-[#1D150E] text-[#17120D] dark:text-[#FBF7F0] relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="eyebrow">
              Excellence & Distinction
            </span>
            <h2 className="section-title">
              Why Choose Safari Dune Tours
            </h2>
            <p className="section-lead">
              We focus on genuine Emirati hospitality, uncompromising safety standards, and breathtaking natural terrain to give you an unforgettable Arabian adventure.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Distinct Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={index} delay={index * 70}>
                <div className="card card-hover h-full p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-[#C89B3C]/12 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8C6214] dark:text-[#E8C48A] mb-1.5">
                    {point.badge}
                  </p>
                  <h3 className="font-heading text-lg font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5E554C] dark:text-[#B8ADA2]">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Single action row keeps the section focused */}
        <ScrollReveal delay={200}>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link href="/booking" className="btn-gold">
              <span>Book Your Safari</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
