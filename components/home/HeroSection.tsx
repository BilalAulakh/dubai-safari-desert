"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, MapPin, Sparkles, MessageCircle, CalendarCheck, Compass } from "lucide-react";
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
    <section className="relative min-h-[92vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#FBF7F0] dark:bg-[#17120D] pt-24 pb-16 transition-colors duration-300">
      {/* Background Cinematic Video & Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover object-center scale-105 animate-hero-zoom opacity-90 dark:opacity-80 transition-opacity duration-500"
        >
          <source src="/videos/8865812-uhd_4096_2160_25fps.mp4" type="video/mp4" />
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop"
            alt="Dubai desert safari dunes sunset"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </video>

        {/* Ambient Soft Overlay to keep video fully visible while ensuring text contrast */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/45 pointer-events-none transition-colors duration-300" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#FBF7F0]/80 via-[#FBF7F0]/20 to-transparent dark:from-black/80 dark:to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#FBF7F0] via-[#FBF7F0]/50 to-transparent dark:from-[#17120D] dark:via-[#17120D]/60 dark:to-transparent pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-[#C89B3C]/15 border border-[#C89B3C]/40 backdrop-blur-md mb-4 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#8C6214] dark:text-[#E8C48A]" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#8C6214] dark:text-[#E8C48A] uppercase">
            The Pinnacle of Arabian Hospitality
          </span>
        </div>

        {/* Main H1 Heading — Elegant luxury typography */}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] font-bold text-[#17120D] dark:text-white max-w-3xl leading-[1.16] tracking-tight mb-4 drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)] dark:drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] transition-colors duration-200">
          Unforgettable <span className="gold-text-gradient">Desert Safari</span> Adventures in Dubai
        </h1>

        {/* Supporting Copy — Refined Inter 14-16px */}
        <p className="text-sm sm:text-base md:text-[16px] text-[#1D160E] dark:text-[#FBF7F0]/90 max-w-xl leading-relaxed mb-6 font-semibold dark:font-normal drop-shadow-[0_1px_8px_rgba(255,255,255,0.85)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] transition-colors duration-200">
          Immerse yourself in thrilling 4x4 dune bashing across golden Arabian sands, tranquil camel caravans at sunset, authentic Bedouin camp hospitality, and 5-star international BBQ buffets under desert stars.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto mb-10">
          <Link
            href="/booking"
            className="btn-gold px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg"
            id="hero-book-safari-cta"
          >
            Book Your Safari
          </Link>

          <Link
            href="/packages"
            className="btn-luxury-outline !bg-white/80 dark:!bg-white/5 !text-[#17120D] dark:!text-white border-[#C89B3C]/40 dark:border-white/25 hover:border-[#C89B3C] shadow-sm px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl"
            id="hero-explore-packages-cta"
          >
            Explore Packages
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Indicators Grid — 4 Sleek Glassmorphism Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-4xl pt-6 border-t border-[#C89B3C]/20">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#241A12]/80 backdrop-blur-md border border-[#C89B3C]/20 shadow-md text-left hover:border-[#C89B3C]/50 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-[#17120D] dark:text-white">Hotel Pickup</p>
              <p className="text-[10px] sm:text-[11px] text-[#6B6258] dark:text-[#B8ADA2]">Across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#241A12]/80 backdrop-blur-md border border-[#C89B3C]/20 shadow-md text-left hover:border-[#C89B3C]/50 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-[#17120D] dark:text-white">Licensed Marshals</p>
              <p className="text-[10px] sm:text-[11px] text-[#6B6258] dark:text-[#B8ADA2]">Safety Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#241A12]/80 backdrop-blur-md border border-[#C89B3C]/20 shadow-md text-left hover:border-[#C89B3C]/50 transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-[#17120D] dark:text-white">Flexible Tours</p>
              <p className="text-[10px] sm:text-[11px] text-[#6B6258] dark:text-[#B8ADA2]">Family & Private</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/90 dark:bg-[#241A12]/80 backdrop-blur-md border border-[#C89B3C]/20 shadow-md text-left hover:border-[#C89B3C]/50 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs sm:text-[13px] font-bold text-[#17120D] dark:text-white">Instant WhatsApp</p>
              <p className="text-[10px] sm:text-[11px] text-[#6B6258] dark:text-[#B8ADA2]">24/7 Assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
