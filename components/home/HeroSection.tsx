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
          className="w-full h-full object-cover object-center opacity-45 dark:opacity-40 scale-105 transition-opacity duration-1000"
        >
          <source src="https://cdn.coverr.co/videos/coverr-driving-in-the-desert-4701/1080p.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-safari-jeep-driving-on-sand-dunes-in-a-desert-42500-large.mp4" type="video/mp4" />
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
        {/* Cinematic Dual Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-amber-50/60 to-white/70 dark:from-[#0B0F17] dark:via-[#0B0F17]/75 dark:to-[#0B0F17]/85 transition-colors duration-300 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center flex flex-col items-center">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 dark:bg-amber-500/10 border border-amber-500/40 dark:border-amber-500/30 backdrop-blur-md mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-[11px] sm:text-xs font-bold tracking-wider text-amber-800 dark:text-amber-300 uppercase">
            Experience Dubai Like Never Before
          </span>
        </div>

        {/* Main H1 Heading - Reduced font size for optimal visual balance */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white max-w-3xl leading-snug mb-4">
          Unforgettable <span className="gold-text-gradient">Desert Safari</span> Adventures in Dubai
        </h1>

        {/* Supporting Copy - Compact readable font size */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal">
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
