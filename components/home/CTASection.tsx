import Link from "next/link";
import { MessageCircle, Phone, CalendarCheck, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function CTASection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune, I would like to book a desert safari tour."
  );

  return (
    <section className="relative py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#17120D] text-[#17120D] dark:text-white overflow-hidden border-t border-[#C89B3C]/20 transition-colors duration-300">
      {/* Background Subtle Desert Dunes Glow & Ambient Gradient */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-[#241A12] to-[#17120D]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#241A12] via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/35 text-[#8C6214] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-5">
          <CalendarCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
          <span>Instant Availability & Free 24h Cancellation</span>
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#17120D] dark:text-white max-w-3xl mx-auto leading-[1.15]">
          Ready for Your Dubai Desert Adventure?
        </h2>

        <p className="mt-3 text-sm sm:text-base text-[#55493D] dark:text-[#FBF7F0]/85 max-w-2xl mx-auto leading-relaxed">
          Reserve your safari today with zero advance payment requirements. Experience red dune bashing, breathtaking sunsets, and genuine Arabian hospitality.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/booking"
            className="btn-gold w-full sm:w-auto px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95"
            id="cta-book-safari-now"
          >
            Book Your Safari Today
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us Now</span>
          </a>

          <a
            href={createWhatsAppUrl(
              SITE_CONFIG.contact.whatsapp,
              SITE_CONFIG.whatsappTemplates.freeQuote
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-outline w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl !bg-white/90 dark:!bg-white/5 !text-[#17120D] dark:!text-white border-[#C89B3C]/50 hover:border-[#C89B3C] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#C89B3C]" />
            <span>Get a Free Quote</span>
          </a>
        </div>
      </div>
    </section>
  );
}
