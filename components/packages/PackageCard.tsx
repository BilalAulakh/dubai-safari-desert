"use client";

import Link from "next/link";
import { Clock, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { Package } from "@/types";
import { formatPrice, optimizeImageUrl, createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface PackageCardProps {
  pkg: Package;
  featuredOnly?: boolean;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  // Pre-filled WhatsApp inquiry URL with flexible negotiation prompt
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    `Hello Safari Dune Tours! I am interested in your *${pkg.name}* (Starting at *AED ${pkg.price}*). We are a group and would like to ask about your best flexible / group discount rate and today's availability. Thank you!`
  );

  const discountPercent =
    pkg.original_price && pkg.original_price > pkg.price
      ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)
      : null;

  return (
    <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 dark:border-[#C89B3C]/25 shadow-sm hover:shadow-[0_16px_36px_rgba(200,155,60,0.18)] hover:border-[#C89B3C]/60 transition-all duration-300 overflow-hidden hover:-translate-y-1.5 h-full">
      {/* Image Container with Badges */}
      <div className="relative h-64 w-full overflow-hidden bg-[#17120D]">
        <Link href={`/packages/${pkg.slug}`} className="block w-full h-full">
          <img
            src={optimizeImageUrl(pkg.main_image, 600)}
            alt={pkg.name}
            width={600}
            height={400}
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/95 via-[#17120D]/35 to-transparent group-hover:via-[#17120D]/20 transition-colors duration-300" />
        </Link>

        {/* Badges Stack (Top Left) */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10 max-w-[75%]">
          {pkg.badges && pkg.badges.length > 0 ? (
            pkg.badges.map((badge, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-sm ${
                  idx === 0
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#FF2E88] text-white"
                    : "bg-[#17120D]/85 text-[#E8C48A] border border-[#C89B3C]/40"
                }`}
              >
                {badge}
              </span>
            ))
          ) : pkg.featured ? (
            <span className="px-2.5 py-1 rounded-full bg-[#C89B3C] text-[#17120D] text-[10px] font-black uppercase tracking-wider shadow-md">
              Signature Tour
            </span>
          ) : null}
        </div>

        {/* Discount Savings Tag (Top Right) */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black tracking-wide shadow-lg uppercase">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Duration Chip (Bottom Left) */}
        <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#17120D]/85 backdrop-blur-md text-white text-xs font-medium border border-white/15">
          <Clock className="w-3.5 h-3.5 text-[#E8C48A]" />
          <span>{pkg.duration}</span>
        </div>

        {/* Pricing Display (Bottom Right) with "From" prefix */}
        <div className="absolute bottom-3 right-3.5 text-right z-10">
          {pkg.original_price && pkg.original_price > pkg.price && (
            <span className="text-[11px] text-gray-300 line-through font-semibold block mr-0.5">
              AED {pkg.original_price}
            </span>
          )}
          <div className="flex items-baseline justify-end gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 drop-shadow-sm">
              From
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#FF6B00] dark:text-[#E8C48A] tracking-tight drop-shadow-sm">
              AED {pkg.price}
            </span>
          </div>
          <span className="text-[10px] text-white/80 font-medium block">
            {pkg.per_unit || "per person"}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] group-hover:text-[#C89B3C] transition-colors mb-2 leading-snug">
            <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6258] dark:text-[#B8ADA2] line-clamp-2 leading-relaxed mb-4">
            {pkg.short_description}
          </p>

          {/* Highlights List */}
          <div className="space-y-1.5 mb-5">
            {pkg.inclusions.slice(0, 4).map((inc, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-xs text-[#17120D]/90 dark:text-[#FBF7F0]/90 font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>

          {/* Flexible Pricing Hint Banner */}
          <div className="flex items-center justify-between gap-1 py-1.5 px-2.5 rounded-lg bg-[#C89B3C]/10 dark:bg-[#C89B3C]/15 border border-[#C89B3C]/25 text-[#8C6214] dark:text-[#E8C48A] text-[11px] font-semibold mb-3">
            <div className="flex items-center gap-1.5">
              <span>Flexible Group Rates</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400">Save up to 15%</span>
          </div>
        </div>

        {/* Card Actions: WhatsApp Quick Inquiry & Online Booking */}
        <div className="pt-2.5 border-t border-[#C89B3C]/15 dark:border-white/10 flex flex-col gap-1.5 mt-auto">
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 max-w-xs mx-auto w-full">
            {/* WhatsApp Direct Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-bold transition-all shadow-sm shadow-emerald-600/25 flex items-center justify-center gap-1 text-center whitespace-nowrap active:scale-98"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Booking */}
            <Link
              href={`/booking?package=${encodeURIComponent(pkg.id)}`}
              className="h-8 sm:h-9 px-2 sm:px-3 rounded-lg bg-[#C89B3C] hover:bg-[#D6A84F] text-[#17120D] text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm flex items-center justify-center text-center whitespace-nowrap active:scale-98 transition-all duration-200"
            >
              Book Now
            </Link>
          </div>

          {/* Subtle Details link */}
          <Link
            href={`/packages/${pkg.slug}`}
            className="text-center text-[10px] sm:text-[11px] font-semibold text-[#8C6214] dark:text-[#E8C48A] hover:underline flex items-center justify-center gap-1 pt-0.5"
          >
            <span>View Full Details & Itinerary</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
