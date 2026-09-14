import Link from "next/link";
import { ShieldCheck, MapPin, Sparkles, MessageCircle, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function HeroSection() {
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0B0F17] transition-colors duration-300">
      {/* Background Video with Crisp Visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-85 scale-105 transition-opacity duration-700"
        >
          <source src="/videos/8865812-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop"
            alt="Dubai desert safari dunes sunset"
            width={1280}
            height={720}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </video>
        {/* Balanced Overlay - light enough to see video vividly, dark enough for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-[#0B0F17]/45 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center flex flex-col items-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md mb-3 shadow-sm">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-amber-300 uppercase">
            Experience Dubai Like Never Before
          </span>
        </div>

        {/* Main H1 Heading - Compact size */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl leading-tight mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Unforgettable <span className="gold-text-gradient">Desert Safari</span> Adventures in Dubai
        </h1>

        {/* Supporting Copy - Compact readable font size */}
        <p className="text-xs sm:text-sm text-slate-100 max-w-xl leading-relaxed mb-6 font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
          Immerse yourself in thrilling 4x4 dune bashing across golden Arabian sands, peaceful camel rides at sunset, authentic Bedouin camp hospitality, 5-star international BBQ buffets, and mesmerizing fire shows under a canopy of desert stars.
        </p>

        {/* Action CTAs - Reduced width & height */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <Link
            href="/booking"
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 text-center"
            id="hero-book-safari-cta"
          >
            Book Your Safari
          </Link>

          <Link
            href="/packages"
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/95 dark:bg-white/15 hover:bg-white dark:hover:bg-white/25 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm border border-slate-300 dark:border-white/20 shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-center"
            id="hero-explore-packages-cta"
          >
            Explore Safari Packages
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 backdrop-blur-md font-semibold text-xs sm:text-sm transition-colors text-center"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl pt-6 border-t border-white/15">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white">Hotel Pickup</p>
              <p className="text-[10px] text-slate-300">Across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white">Licensed Marshals</p>
              <p className="text-[10px] text-slate-300">Insured Pros</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <CalendarCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white">Flexible Tours</p>
              <p className="text-[10px] text-slate-300">Family & Private</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-[11px] font-bold text-white">Instant WhatsApp</p>
              <p className="text-[10px] text-slate-300">Daily Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
