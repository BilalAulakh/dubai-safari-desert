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
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1280&auto=format&fit=crop"
          className="w-full h-full object-cover object-center opacity-60 dark:opacity-50 scale-105 transition-opacity duration-1000"
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
        {/* Cinematic Dual Gradient Overlay to ensure crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/60 to-[#0B0F17]/75 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center flex flex-col items-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 backdrop-blur-md mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-amber-300 uppercase">
            Experience Dubai Like Never Before
          </span>
        </div>

        {/* Main H1 Heading - Reduced font size for optimal visual balance */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-3xl leading-snug mb-4 drop-shadow-md">
          Unforgettable <span className="gold-text-gradient">Desert Safari</span> Adventures in Dubai
        </h1>

        {/* Supporting Copy - Compact readable font size */}
        <p className="text-xs sm:text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed mb-8 font-medium drop-shadow-sm">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-white/15">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Hotel Pickup</p>
              <p className="text-[11px] text-slate-300">Available across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Licensed Marshals</p>
              <p className="text-[11px] text-slate-300">Professional & Insured</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <CalendarCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Flexible Packages</p>
              <p className="text-[11px] text-slate-300">Family & Private tours</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-md text-left">
            <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Instant WhatsApp</p>
              <p className="text-[11px] text-slate-300">Prompt daily support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
