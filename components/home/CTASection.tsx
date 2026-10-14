import Link from "next/link";
import { MessageCircle, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function CTASection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune, I would like to book a desert safari tour."
  );

  return (
    <section className="relative section bg-[#17120D] text-white overflow-hidden border-t border-[#C89B3C]/20 transition-colors duration-300">
      {/* Background Subtle Desert Dunes Glow & Ambient Gradient */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C]/40 via-[#241A12] to-[#17120D]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#241A12] via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/35 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-5">
            <CalendarCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Instant Availability & Free 24h Cancellation</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.1]">
            Ready for Your Dubai <span className="gold-text-gradient">Desert Adventure?</span>
          </h2>

          <p className="mt-4 text-[15px] sm:text-lg text-[#FBF7F0]/80 max-w-2xl mx-auto leading-relaxed">
            Reserve your safari today with zero advance payment requirements. Experience red dune bashing, breathtaking sunsets, and genuine Arabian hospitality.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary CTA: Book Your Safari Today */}
            <Link
              href="/booking"
              className="btn-gold btn-lg w-full sm:w-auto"
              id="cta-book-safari-now"
            >
              Book Your Safari Today
            </Link>

            {/* Secondary CTA: WhatsApp Us Now */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp btn-lg w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
