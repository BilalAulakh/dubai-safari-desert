import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";
import HeroVideo from "@/components/home/HeroVideo";

export default function HeroSection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-dune-950">
      {/* Background fills the section, so the video or poster never shifts layout */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-parallax absolute inset-0">
          <HeroVideo />
        </div>
        {/* Bottom-up gradient keeps the copy readable over any frame; a light top fade helps the nav */}
        <div className="absolute inset-0 bg-gradient-to-t from-dune-950 via-dune-950/55 to-dune-950/10" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dune-950/60 to-transparent" />
      </div>

      <div className="container-page pb-24 pt-40 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <h1 className="animate-hero-fade-up font-display text-display font-semibold text-sand-50 opacity-0">
            Dubai Desert Safari <span className="text-amber-300">from AED 79</span>
          </h1>

          <p className="animate-hero-fade-up mt-6 max-w-[44rem] text-body-lg text-sand-100 opacity-0 [animation-delay:150ms]">
            {/* Each phrase stays whole; lines only break at the separators */}
            <span className="whitespace-nowrap">Free hotel pickup</span>
            <span className="mx-2 text-amber-300" aria-hidden="true">·</span><span className="sr-only">, </span>
            <span className="whitespace-nowrap">BBQ dinner &amp; 7 live shows</span>
            <span className="mx-2 text-amber-300" aria-hidden="true">·</span><span className="sr-only">, </span>
            <span className="whitespace-nowrap">Pay on the day, no card needed</span>
          </p>

          <div className="animate-hero-fade-up mt-10 flex flex-col gap-3 opacity-0 [animation-delay:300ms] sm:flex-row sm:gap-4">
            <Link href="/booking" className="btn-gold btn-lg group" id="hero-book-now-cta">
              <span>Book Now</span>
              <ArrowRight
                className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline btn-lg"
              id="hero-whatsapp-cta"
            >
              <MessageCircle className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
