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
            {pkg.original_price && pkg.original_price > pkg.price && (
              <span className="text-xs text-gray-400 line-through">
                AED {pkg.original_price}
              </span>
            )}
            <span className="text-[10px] uppercase font-bold text-amber-300">From</span>
            <span className="text-lg sm:text-xl font-black text-[#FF6B00] dark:text-[#E8C48A] tracking-tight">
              AED {pkg.price}
            </span>
            <span className="text-[11px] text-[#B8ADA2]">
              {pkg.per_unit ? `(${pkg.per_unit})` : "/ guest"}
            </span>
            <span className="hidden md:inline-block ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
              Flexible Group Rates
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 h-8 sm:h-9 px-3 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold hover:bg-emerald-600/30 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="h-8 sm:h-9 px-4 sm:px-5 rounded-lg bg-[#C89B3C] hover:bg-[#D6A84F] text-[#17120D] text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-sm inline-flex items-center justify-center transition-all duration-200"
            id="sticky-book-now-cta"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
