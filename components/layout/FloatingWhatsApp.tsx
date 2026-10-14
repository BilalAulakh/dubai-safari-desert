"use client";

import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";
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
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-center gap-2 border-t border-amber-500/25 bg-dune-900/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-whatsapp-700 px-3 text-small font-bold text-white shadow-md transition-transform hover:bg-whatsapp-700/90 active:scale-95"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <Link
          href="/booking"
          className="flex h-11 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-amber-500 px-3 text-small font-bold text-dune-900 shadow-md transition-transform hover:bg-amber-400 active:scale-95"
        >
          <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Book Now</span>
        </Link>
      </div>
    </>
  );
}

