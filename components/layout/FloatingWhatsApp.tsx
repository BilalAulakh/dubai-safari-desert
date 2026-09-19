"use client";

import Link from "next/link";
import { MessageCircle, CalendarCheck, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <>
      {/* Desktop Floating Action Stack (Bottom Right) */}
      <div className="hidden sm:flex fixed bottom-5 right-5 z-50 flex-col items-end gap-2 pointer-events-none">
        {/* Sticky WhatsApp Button */}
        <div className="pointer-events-auto flex items-center group">
          <span className="mr-2.5 px-3 py-1 text-xs font-semibold rounded-full bg-[#17120D]/95 text-[#E8C48A] border border-[#C89B3C]/30 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md">
            WhatsApp Us
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us Now"
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#25D366] to-[#1eb857] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 relative"
            id="floating-whatsapp-btn"
          >
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white" />
            </span>
            <MessageCircle className="w-5 h-5 fill-white/20 text-white" />
            <span className="sr-only">WhatsApp Us Now</span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#17120D]/95 backdrop-blur-md border-t border-[#C89B3C]/25 px-2.5 py-1.5 shadow-2xl flex items-center justify-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 max-w-[160px] h-8 sm:h-9 px-2.5 rounded-lg bg-[#25D366] hover:bg-[#1eb857] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white/20 shrink-0" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/booking"
          className="flex-1 max-w-[160px] h-8 sm:h-9 px-2.5 rounded-lg bg-[#C89B3C] hover:bg-[#D6A84F] text-[#17120D] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform whitespace-nowrap"
        >
          <CalendarCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Book Now</span>
        </Link>
      </div>
    </>
  );
}

