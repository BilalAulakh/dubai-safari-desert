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
      {/* Full-bleed cinematic background; overlay only where the copy sits */}
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-t from-dune-950/85 via-dune-950/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dune-950/45 via-transparent to-transparent" />
      </div>

      <div className="container-page pb-20 pt-40 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl">
          <p className="animate-hero-fade-up opacity-0 inline-flex items-center gap-2.5 text-label font-semibold uppercase tracking-[0.16em] text-gold-300">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" aria-hidden="true" />
            Daily tours · Free hotel pickup across Dubai
          </p>

          <h1 className="animate-hero-fade-up opacity-0 [animation-delay:120ms] mt-6 font-display text-display font-semibold text-sand-50 [text-shadow:0_2px_16px_rgb(14_10_7/0.45)]">
            Discover Dubai&apos;s <span className="text-gold-300">Golden Desert</span>
          </h1>

          <p className="animate-hero-fade-up opacity-0 [animation-delay:240ms] mt-6 max-w-[34rem] text-body-lg text-sand-100 [text-shadow:0_1px_10px_rgb(14_10_7/0.5)]">
            Red dune bashing, sunset camel treks and a starlit Bedouin camp, with expert marshals and no payment until your tour day.
          </p>

          <div className="animate-hero-fade-up opacity-0 [animation-delay:360ms] mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/packages" className="btn-gold btn-lg group" id="hero-explore-packages-cta">
              <span>Explore Safari Packages</span>
              <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline btn-lg"
              id="hero-whatsapp-cta"
            >
              <MessageCircle className="h-4 w-4 text-gold-300" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
