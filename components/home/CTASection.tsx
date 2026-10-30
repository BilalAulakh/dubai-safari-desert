import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function CTASection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    "Hello Safari Dune, I would like to book a desert safari tour."
  );

  return (
    <section className="section-y bg-page">
      <div className="container-page">
        {/* Night-navy panel over a desert photo; looks the same in both themes */}
        <div className="relative isolate overflow-hidden rounded-3xl bg-dune-900 px-6 py-16 text-center sm:px-12 sm:py-20">
          <img
            src="/images/tours/evening-desert-safari-dubai.webp"
            alt=""
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dune-900/60 via-dune-900/80 to-dune-900" aria-hidden="true" />

          <ScrollReveal>
            <div className="mx-auto max-w-2xl">
              <p className="kicker justify-center text-amber-300 after:h-px after:w-8 after:bg-current after:opacity-70 after:content-['']">
                No Advance Payment
              </p>
              <h2 className="mt-5 font-display text-h2 font-bold text-sand-50">
                Ready for your Dubai <span className="italic text-amber-300">desert adventure?</span>
              </h2>
              <p className="mt-5 text-body-lg text-sand-400">
                Reserve today and pay on the day. Red dunes, a desert sunset and an evening of Arabian hospitality.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/booking" className="btn-gold btn-lg group w-full sm:w-auto" id="cta-book-safari-now">
                  <span>Book Your Safari</span>
                  <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury-outline btn-lg w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4 text-amber-300" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
