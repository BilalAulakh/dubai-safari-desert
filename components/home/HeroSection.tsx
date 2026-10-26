import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl, formatPrice } from "@/lib/utils";
import { warnIfStartingPriceDrifts } from "@/lib/data/pricing";

// 4x4 dune bashing under a blue sky (photo supplied by the owner). Mirrored so the car sits
// right of centre and the headline lands on open sand; mobile is a portrait crop on the car.
// Public images are cached by browsers for a week (next.config.ts), so a new photo
// needs a new filename or visitors keep seeing the old one.
export const HERO_IMAGE = "/images/hero-safari-bluesky.webp";
export const HERO_IMAGE_MOBILE = "/images/hero-safari-bluesky-mobile-v2.webp";

interface HeroSectionProps {
  // From getStartingPrice(): the cheapest active package. Never pass a literal.
  startingPrice: number | null;
}

export default async function HeroSection({ startingPrice }: HeroSectionProps) {
  // Dev-only: warns if the price we're about to render isn't the cheapest active package
  await warnIfStartingPriceDrifts(startingPrice, "HeroSection");

  const whatsappUrl = createWhatsAppUrl(SITE_CONFIG.contact.whatsapp, SITE_CONFIG.whatsappTemplates.general);

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-dune-950">
      {/* 4x4 dune bashing: car on the right, open sky on the left for the copy */}
      <div className="absolute inset-0 -z-10">
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={HERO_IMAGE_MOBILE} />
          <img
            src={HERO_IMAGE}
            alt=""
            width={2560}
            height={1440}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        {/* Shade only behind the copy (bottom-left) and under the nav; the car and dunes stay clear */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dune-950/60 via-dune-950/10 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-dune-950/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dune-950/55 to-transparent" />
      </div>

      <div className="container-page pb-24 pt-40 sm:pb-28 lg:pb-32">
        <div className="max-w-3xl">
          <h1 className="animate-hero-fade-up font-display text-display font-semibold text-sand-50 opacity-0 [text-shadow:0_2px_4px_rgb(10_15_36/0.45),0_4px_28px_rgb(10_15_36/0.7)]">
            Dubai Desert Safari
            {startingPrice !== null && (
              // White, not gold: gold text disappears into the sand behind it
              <span className="mt-1 block italic text-white">from {formatPrice(startingPrice)}</span>
            )}
          </h1>

          <div className="animate-hero-fade-up mt-10 flex flex-col gap-3 opacity-0 [animation-delay:200ms] sm:flex-row sm:gap-4">
            <Link href="/booking" className="btn-gold btn-lg group" id="hero-book-now-cta">
              <span>Book Now</span>
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury-outline btn-lg border-white/60 bg-dune-950/45" id="hero-whatsapp-cta">
              <MessageCircle className="h-4 w-4 text-amber-300" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
