import Link from "next/link";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function CTASection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello DubaiSafariDesert, I would like to book a desert safari tour."
  );

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-slate-950 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-300 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950/20 text-slate-950 text-xs font-bold uppercase tracking-wider mb-4">
          <CalendarCheck className="w-4 h-4" />
          <span>Instant Availability Check</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Ready for the Ultimate Dubai Desert Adventure?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-amber-100 max-w-2xl mx-auto">
          Reserve your safari today with zero advance payment requirements. Experience red dune bashing, breathtaking sunsets, and Arabian hospitality.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/booking"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-950 text-amber-400 font-extrabold text-sm uppercase tracking-wider shadow-2xl hover:bg-slate-900 transition-all hover:scale-105 active:scale-95"
            id="cta-book-safari-now"
          >
            Book Your Safari Now
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call: {SITE_CONFIG.contact.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
