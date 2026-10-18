import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, formatPrice } from "@/lib/utils";
import HeroVideo from "@/components/home/HeroVideo";
import { warnIfStartingPriceDrifts } from "@/lib/data/pricing";

interface HeroSectionProps {
  // From getStartingPrice(): the cheapest active package. Never pass a literal.
  startingPrice: number | null;
}

export default async function HeroSection({ startingPrice }: HeroSectionProps) {
  // Dev-only: warns if the price we're about to render isn't the cheapest active package
  await warnIfStartingPriceDrifts(startingPrice, "HeroSection");

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
        {/* Light shading only where it's needed: low behind the copy, a soft fade under the nav.
            The rest of the frame stays bright. */}
        <div className="absolute inset-0 bg-gradient-to-t from-dune-950/70 via-dune-950/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dune-950/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dune-950/35 to-transparent" />
      </div>

      <div className="container-page pb-24 pt-40 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <h1 className="animate-hero-fade-up font-display text-display font-semibold text-sand-50 opacity-0 [text-shadow:0_2px_18px_rgb(14_10_7/0.55)]">
            Dubai Desert Safari
            {startingPrice !== null && (
              <>
                {" "}
                <span className="text-amber-300">from {formatPrice(startingPrice)}</span>
              </>
            )}
          </h1>


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
