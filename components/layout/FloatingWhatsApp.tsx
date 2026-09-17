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
      <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3 pointer-events-none">
        {/* Sticky WhatsApp Button */}
        <div className="pointer-events-auto flex items-center group">
          <span className="mr-3 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-[#17120D]/95 text-[#E8C48A] border border-[#C89B3C]/30 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap backdrop-blur-md">
            WhatsApp Us Now
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us Now"
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#1eb857] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 relative"
            id="floating-whatsapp-btn"
          >
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
            </span>
            <MessageCircle className="w-7 h-7 fill-white/20 text-white" />
            <span className="sr-only">WhatsApp Us Now</span>
          </a>
        </div>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-[#17120D]/95 backdrop-blur-md border-t border-[#C89B3C]/30 px-3 py-2.5 shadow-2xl flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-transform"
        >
          <MessageCircle className="w-4 h-4 fill-white/20" />
          <span>WhatsApp Us Now</span>
        </a>

        <Link
          href="/booking"
          className="btn-gold flex-1 py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-98"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Safari Today</span>
        </Link>
      </div>
    </>
  );
}

