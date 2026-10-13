"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, MessageCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import { createWhatsAppUrl } from "@/lib/utils";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const whatsappUrl = createWhatsAppUrl(
    SITE_CONFIG.contact.whatsapp,
    SITE_CONFIG.whatsappTemplates.general
  );

  // Attach the video only after the page has rendered, so it never competes with
  // critical CSS/JS/fonts. The poster shows until then; data-saver users keep the poster.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const start = () => {
      video.src = window.matchMedia("(max-width: 767px)").matches
        ? "/videos/hero-desert-540.mp4"
        : "/videos/hero-desert-1080.mp4";
      video.muted = true;
      video.play().catch(() => {
        // Autoplay blocked: poster stays visible
      });
    };

    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#17120D] pt-24 pb-16 transition-colors duration-300">
      {/* Background Cinematic Desert Safari Video — Crystal Clear & Crisp */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          poster="/images/hero-poster.webp"
          aria-hidden="true"
          className="w-full h-full object-cover object-center brightness-105 contrast-[1.08] saturate-[1.1]"
        />

        {/* Gradient Overlay: top/bottom fade for navbar and section edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#17120D]/65 via-transparent to-[#17120D]/80 pointer-events-none" />

        {/* Soft vignette behind the copy so the heading stays legible over bright sky */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_45%,rgba(23,18,13,0.55),transparent_75%)] pointer-events-none" />

        {/* Subtle Sunlight Tint at Top Edge Only */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#17120D]/40 to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Luxury Eyebrow Pill */}
        <div className="animate-hero-fade-up opacity-0 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/20 border border-[#E8C48A]/40 text-[#F3D7A4] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] mb-3 sm:mb-4 backdrop-blur-md shadow-[0_2px_12px_rgba(200,155,60,0.2)]">
          <span>Premium Arabian Desert Excursions</span>
        </div>

        {/* Main H1 Heading — Refined font size with luminous golden gradient */}
        <h1 className="animate-hero-fade-up [animation-delay:150ms] opacity-0 font-heading text-[34px] sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-white max-w-3xl text-balance leading-[1.05] tracking-tight mb-4 sm:mb-5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          Discover Dubai&apos;s{" "}
          <span className="whitespace-nowrap bg-gradient-to-r from-[#FFF0D0] via-[#E8C48A] to-[#C89B3C] bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(200,155,60,0.6)]">
            Golden Desert
          </span>
        </h1>

        {/* Supporting Copy — Reduced font size & balanced spacing */}
        <p className="animate-hero-fade-up [animation-delay:300ms] opacity-0 text-[15px] sm:text-lg md:text-xl text-[#FBF7F0]/90 max-w-xl leading-relaxed font-normal mb-7 sm:mb-10 drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
          Explore unforgettable desert adventures, from golden dunes to authentic Arabian hospitality.
        </p>

        {/* Action CTAs — Primary: Explore Safari Packages, Secondary: WhatsApp Us */}
        <div className="animate-hero-fade-up [animation-delay:450ms] opacity-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto mb-8 sm:mb-12 max-w-xs sm:max-w-none">
          <Link
            href="/packages"
            className="btn-gold group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-[15px] font-bold rounded-xl shadow-[0_6px_24px_rgba(200,155,60,0.35)] w-full sm:w-auto"
            id="hero-explore-packages-cta"
          >
            <span>Explore Safari Packages</span>
            <ArrowRight className="w-4 h-4 text-[#17120D] group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-outline group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-[15px] font-semibold rounded-xl shadow-lg w-full sm:w-auto bg-black/40 backdrop-blur-md border-[#C89B3C]/40 hover:border-[#C89B3C] text-white"
            id="hero-whatsapp-cta"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Indicators Grid — Refined, verified, balanced */}
        <div className="animate-hero-fade-up [animation-delay:600ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-4xl pt-2">
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/45 backdrop-blur-xl border border-white/10 hover:border-[#C89B3C]/50 shadow-lg text-left transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Hotel Pickup</p>
              <p className="text-[10px] text-[#E8C48A]/80 mt-0.5">Across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/45 backdrop-blur-xl border border-white/10 hover:border-[#C89B3C]/50 shadow-lg text-left transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Licensed Marshals</p>
              <p className="text-[10px] text-[#E8C48A]/80 mt-0.5">Safety Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/45 backdrop-blur-xl border border-white/10 hover:border-[#C89B3C]/50 shadow-lg text-left transition-all duration-300">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight">Card-Free Booking</p>
              <p className="text-[10px] text-[#E8C48A]/80 mt-0.5">Pay on Tour Day</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/45 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 shadow-lg text-left transition-all duration-300 group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">Direct WhatsApp</p>
              <p className="text-[10px] text-emerald-400/90 mt-0.5">24/7 Assistance</p>
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
