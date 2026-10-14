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
    <section className="section bg-page transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Light: warm sand panel. Dark: deep dune panel with gold glow */}
        <div className="relative overflow-hidden rounded-3xl border border-[#C89B3C]/30 bg-gradient-to-br from-[#F7E9CC] via-[#F2E0BC] to-[#E8CFA0] px-5 py-14 sm:px-10 sm:py-16 text-center shadow-[0_24px_48px_-28px_rgba(140,98,20,0.45)] dark:from-[#241A12] dark:via-[#1D150E] dark:to-[#17120D] dark:shadow-none">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent dark:from-[#C89B3C]/15" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-[#C89B3C]/40 text-[#8C6214] dark:bg-[#C89B3C]/15 dark:border-[#C89B3C]/35 dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-5">
                <CalendarCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Instant Availability & Free 24h Cancellation</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#17120D] dark:text-white max-w-3xl mx-auto leading-[1.1]">
                Ready for Your Dubai <span className="gold-text-gradient">Desert Adventure?</span>
              </h2>

              <p className="mt-4 text-[15px] sm:text-lg text-[#5E554C] dark:text-[#FBF7F0]/80 max-w-2xl mx-auto leading-relaxed">
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
        </div>
      </div>
    </section>
  );
}
