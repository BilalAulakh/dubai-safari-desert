"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Sparkles, MessageCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay fallback
        });
      }
    }
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#17120D] pt-28 pb-20 transition-colors duration-300">
      {/* Background Cinematic Desert Safari Video with Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105 opacity-90 dark:opacity-85 transition-opacity duration-700"
        >
          <source src="/videos/8865812-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-driving-in-the-desert-4701/1080p.mp4" type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1920&auto=format&fit=crop"
            alt="Dubai desert safari dunes sunset"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </video>

        {/* Ambient Dark Brown & Obsidian Luxury Overlays for 100% Crisp Contrast & Warmth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120D] via-[#17120D]/65 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#17120D]/35 to-[#17120D]/85 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--bg-page)] via-[var(--bg-page)]/40 to-transparent pointer-events-none transition-colors duration-300" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Luxury Badge - Stagger Step 1 */}
        <div className="animate-hero-fade-up [animation-delay:150ms] opacity-0 inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/45 border border-[#C89B3C]/50 backdrop-blur-md mb-4 sm:mb-5 shadow-2xl">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8C48A]" />
          <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.18em] sm:tracking-[0.22em] text-[#E8C48A] uppercase">
            The Pinnacle of Arabian Hospitality
          </span>
        </div>

        {/* Main H1 Heading — Responsive typography across all device sizes */}
        <h1 className="animate-hero-fade-up [animation-delay:300ms] opacity-0 font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl leading-[1.15] sm:leading-[1.12] tracking-tight mb-3.5 sm:mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Unforgettable{" "}
          <span className="bg-gradient-to-r from-[#FDE68A] via-[#E8C48A] to-[#C89B3C] bg-clip-text text-transparent">
            Desert Safari
          </span>{" "}
          Adventures in Dubai
        </h1>

        {/* Supporting Copy — Responsive high-legibility cream tone */}
        <p className="animate-hero-fade-up [animation-delay:450ms] opacity-0 text-xs sm:text-base md:text-lg text-neutral-200/90 max-w-2xl leading-relaxed mb-6 sm:mb-8 font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] px-2 sm:px-0">
          Immerse yourself in thrilling 4×4 dune bashing across golden Arabian sands, tranquil camel caravans at sunset, authentic Bedouin camp hospitality, and 5-star international BBQ buffets under desert stars.
        </p>

        {/* Action CTAs — Full-width on mobile, auto-width on tablets and desktops */}
        <div className="animate-hero-fade-up [animation-delay:600ms] opacity-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12 max-w-xs sm:max-w-none">
          <Link
            href="/booking"
            className="btn-gold group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-[0_6px_25px_rgba(200,155,60,0.4)] w-full sm:w-auto"
            id="hero-book-safari-cta"
          >
            <CalendarCheck className="w-4 h-4 text-[#17120D]" />
            <span>Book Your Safari</span>
          </Link>

          <Link
            href="/packages"
            className="btn-luxury-outline group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide rounded-xl shadow-lg w-full sm:w-auto"
            id="hero-explore-packages-cta"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-4 h-4 text-[#E8C48A] group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Trust Indicators Grid — Responsive 2-cols on mobile, 4-cols on desktop */}
        <div className="animate-hero-fade-up [animation-delay:750ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-4xl pt-6 sm:pt-8 border-t border-white/15">
          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-2xl text-left hover:-translate-y-1 hover:bg-black/55 transition-all duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <MapPin className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">Hotel Pickup</p>
              <p className="text-[10px] sm:text-xs text-[#E8C48A]/80 mt-0.5 truncate">Across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-2xl text-left hover:-translate-y-1 hover:bg-black/55 transition-all duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">Licensed Marshals</p>
              <p className="text-[10px] sm:text-xs text-[#E8C48A]/80 mt-0.5 truncate">Safety Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-2xl text-left hover:-translate-y-1 hover:bg-black/55 transition-all duration-300">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <CalendarCheck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white leading-tight truncate">Flexible Tours</p>
              <p className="text-[10px] sm:text-xs text-[#E8C48A]/80 mt-0.5 truncate">Family & Private</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-emerald-400/70 shadow-2xl text-left hover:-translate-y-1 hover:bg-black/55 transition-all duration-300 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors truncate">Instant WhatsApp</p>
              <p className="text-[10px] sm:text-xs text-emerald-400/90 mt-0.5 truncate">24/7 Assistance</p>
            </div>
          </a>
        </div>
      </div>

      {/* Subtle Luxury Scroll Indicator — Shown on screens >= sm to prevent mobile sticky CTA collision */}
      <div className="hidden sm:flex absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1 pointer-events-none opacity-75">
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#E8C48A]/80 font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[#C89B3C]/40 p-1 flex justify-center backdrop-blur-sm bg-black/30 shadow-md">
          <div className="w-1 h-2 rounded-full bg-[#E8C48A] animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
