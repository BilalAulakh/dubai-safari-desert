import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, MapPin, Sparkles, MessageCircle, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function HeroSection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-amber-50/30 dark:bg-[#0B0F17] transition-colors duration-300">
      {/* Background Image with Theme Adaptive Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=85&w=2000&auto=format&fit=crop"
          alt="Dubai desert safari dunes sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25 dark:opacity-45 scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50/90 via-amber-50/50 to-transparent dark:from-[#0B0F17] dark:via-[#0B0F17]/60 dark:to-[#0B0F17]/80 transition-colors duration-300" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/40 dark:border-amber-500/30 backdrop-blur-md mb-6">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-xs sm:text-sm font-bold tracking-wide text-amber-800 dark:text-amber-300 uppercase">
            Experience Dubai Like Never Before
          </span>
        </div>

        {/* Main H1 Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-4xl leading-[1.1] mb-6">
          Unforgettable <span className="gold-text-gradient">Desert Safari</span> Adventures in Dubai
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 max-w-3xl leading-relaxed mb-10 font-normal">
          Immerse yourself in thrilling 4x4 dune bashing across golden Arabian sands, peaceful camel rides at sunset, authentic Bedouin camp hospitality, 5-star international BBQ buffets, and mesmerizing fire shows under a canopy of desert stars.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link
            href="/booking"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-lg hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 text-center"
            id="hero-book-safari-cta"
          >
            Book Your Safari
          </Link>

          <Link
            href="/packages"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/15 text-slate-900 dark:text-white font-semibold text-sm sm:text-base border border-slate-300 dark:border-white/20 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-center"
            id="hero-explore-packages-cta"
          >
            Explore Safari Packages
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-800 dark:text-emerald-400 border border-emerald-500/40 dark:border-emerald-500/30 hover:bg-emerald-600/20 font-semibold text-sm sm:text-base transition-colors text-center"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm text-left">
            <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Hotel Pickup</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Available across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm text-left">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Licensed Marshals</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Professional & Insured</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm text-left">
            <CalendarCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Flexible Packages</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Family & Private tours</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-sm text-left">
            <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Instant WhatsApp</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Prompt daily support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
