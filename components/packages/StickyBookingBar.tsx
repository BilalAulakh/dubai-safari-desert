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
    <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-t border-amber-500/20 py-3 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Package info & price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 truncate">
          <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {pkg.name}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-amber-300">From</span>
            <span className="text-base sm:text-lg font-extrabold text-white">
              {formatPrice(pkg.price)}
            </span>
            <span className="text-[10px] text-slate-400">/ person</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-600/30 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-105 active:scale-95"
            id="sticky-book-now-cta"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
