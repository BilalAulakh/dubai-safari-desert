"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function FloatingWhatsApp() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#0B0F17]/95 text-white border border-emerald-500/40 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with a Safari Specialist
      </span>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with DubaiSafariDesert"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
        id="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 text-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
}
