"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Package } from "@/types";
import { formatPrice, createWhatsAppUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";

interface StickyBookingBarProps {
  pkg: Package;
}

export default function StickyBookingBar({ pkg }: StickyBookingBarProps) {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.packageInquiry(pkg.name)
  );

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-[#17120D]/95 backdrop-blur-md border-t border-[#C89B3C]/25 py-3.5 px-4 sm:px-6 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Package info & price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 truncate">
          <span className="font-heading text-sm sm:text-base font-bold text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
            {pkg.name}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-[#E8C48A] uppercase font-semibold">From</span>
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {formatPrice(pkg.price)}
            </span>
            <span className="text-[11px] text-[#B8ADA2]">/ guest</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="btn-gold px-6 py-2.5 text-xs sm:text-sm uppercase tracking-wider font-bold shadow-md"
            id="sticky-book-now-cta"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
