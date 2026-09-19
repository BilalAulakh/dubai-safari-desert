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
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#17120D] pt-24 pb-16 transition-colors duration-300">
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
          className="w-full h-full object-cover object-center opacity-100 brightness-105 contrast-100 transition-opacity duration-700"
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

        {/* Clear Cinematic Overlay — Minimal and crisp so the video is vividly visible and navbar stays transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main H1 Heading — Crisp, clean, and elegant */}
        <h1 className="animate-hero-fade-up [animation-delay:200ms] opacity-0 font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white max-w-2xl leading-[1.2] tracking-tight mb-6 sm:mb-8 drop-shadow-[0_3px_16px_rgba(0,0,0,0.9)]">
          Unforgettable{" "}
          <span className="bg-gradient-to-r from-[#FDE68A] via-[#E8C48A] to-[#C89B3C] bg-clip-text text-transparent">
            Desert Safari
          </span>{" "}
          in Dubai
        </h1>

        {/* Action CTAs — Sleek and proportionate buttons */}
        <div className="animate-hero-fade-up [animation-delay:400ms] opacity-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto mb-7 sm:mb-10 max-w-xs sm:max-w-none">
          <Link
            href="/booking"
            className="btn-gold group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_20px_rgba(200,155,60,0.4)] w-full sm:w-auto"
            id="hero-book-safari-cta"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#17120D]" />
            <span>Book Your Safari</span>
          </Link>

          <Link
            href="/packages"
            className="btn-luxury-outline group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold tracking-wide rounded-xl shadow-lg w-full sm:w-auto bg-black/35 backdrop-blur-sm"
            id="hero-explore-packages-cta"
          >
            <span>Explore Packages</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E8C48A] group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Trust Indicators Grid — Clean floating cards without harsh dividing line */}
        <div className="animate-hero-fade-up [animation-delay:550ms] opacity-0 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 w-full max-w-3xl pt-2 sm:pt-3">
          <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-xl text-left hover:-translate-y-0.5 hover:bg-black/55 transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">Hotel Pickup</p>
              <p className="text-[9px] sm:text-[10px] text-[#E8C48A]/80 mt-0.5 truncate">Across Dubai</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-xl text-left hover:-translate-y-0.5 hover:bg-black/55 transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">Licensed Marshals</p>
              <p className="text-[9px] sm:text-[10px] text-[#E8C48A]/80 mt-0.5 truncate">Safety Certified</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-[#C89B3C]/70 shadow-xl text-left hover:-translate-y-0.5 hover:bg-black/55 transition-all duration-300">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C89B3C]/20 border border-[#C89B3C]/40 text-[#E8C48A] flex items-center justify-center shrink-0 shadow-inner">
              <CalendarCheck className="w-3.5 h-3.5 text-[#E8C48A]" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">Flexible Tours</p>
              <p className="text-[9px] sm:text-[10px] text-[#E8C48A]/80 mt-0.5 truncate">Family & Private</p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-xl border border-white/15 hover:border-emerald-400/70 shadow-xl text-left hover:-translate-y-0.5 hover:bg-black/55 transition-all duration-300 group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors truncate">Instant WhatsApp</p>
              <p className="text-[9px] sm:text-[10px] text-emerald-400/90 mt-0.5 truncate">24/7 Assistance</p>
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
