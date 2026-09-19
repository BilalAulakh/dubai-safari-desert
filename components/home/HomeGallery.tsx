"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Camera, X, ChevronLeft, ChevronRight, Maximize2, Tag } from "lucide-react";
import { GalleryItem } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";
import ScrollReveal from "@/components/common/ScrollReveal";

interface HomeGalleryProps {
  items: GalleryItem[];
}

export default function HomeGallery({ items }: HomeGalleryProps) {
  const displayItems = items.slice(0, 6);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % displayItems.length);
    }
  }, [lightboxIndex, displayItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (prev) => ((prev ?? 0) - 1 + displayItems.length) % displayItems.length
      );
    }
  }, [lightboxIndex, displayItems.length]);

  // Keyboard navigation for slider
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "dune-bashing":
        return "Dune Bashing";
      case "entertainment":
        return "Live Shows";
      case "camp":
        return "Bedouin Camp";
      case "food":
        return "BBQ Dining";
      default:
        return "Desert Safari";
    }
  };

  return (
    <section className="relative py-20 sm:py-28 bg-[#F2E8D5] dark:bg-[#1D150E] transition-colors duration-200 overflow-hidden border-t border-[#C89B3C]/15">
      {/* Ambient Luxury Desert Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C89B3C]/10 blur-[140px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Visual Desert Portfolio
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
              Glimpses of the <span className="gold-text-gradient">Arabian Dunes</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-2xl leading-relaxed">
              Real captured moments from thrilling red dune bashings to romantic starlit Bedouin nights.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#C89B3C]/40 bg-white/70 dark:bg-white/5 backdrop-blur-md text-xs font-bold text-[#17120D] dark:text-[#FBF7F0] hover:bg-[#C89B3C] hover:text-[#17120D] hover:border-[#C89B3C] transition-all duration-300 shadow-sm group shrink-0 w-fit"
          >
            <Camera className="w-4 h-4 text-[#C89B3C] group-hover:text-[#17120D]" />
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Image Grid with Premium Asymmetric Luxury Dynamics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {displayItems.map((item, index) => {
            // Asymmetric layout spans: Item 0 (wide 2-cols), Items 1-4 (1-col), Item 5 (wide panoramic)
            const isFirst = index === 0;
            const isLast = index === displayItems.length - 1 && displayItems.length > 4;
            const spanClass = isFirst
              ? "col-span-2 md:col-span-2 h-56 sm:h-72 md:h-80"
              : isLast
              ? "col-span-2 md:col-span-3 h-52 sm:h-64 md:h-72"
              : "col-span-1 h-52 sm:h-64 md:h-72";

            return (
              <ScrollReveal key={item.id} delay={index * 70} className={spanClass}>
                <div
                  onClick={() => openLightbox(index)}
                  className="group relative w-full h-full rounded-2xl overflow-hidden shadow-sm bg-[#17120D] cursor-pointer border border-[#C89B3C]/20 hover:border-[#C89B3C]/60 hover:shadow-[0_16px_36px_rgba(23,18,13,0.3)] transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={optimizeImageUrl(item.image_url, isFirst || isLast ? 900 : 600)}
                    alt={item.title}
                    width={isFirst || isLast ? 900 : 600}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#17120D]/80 backdrop-blur-md text-[#E8C48A] text-[10px] font-semibold border border-white/10 shadow-sm">
                      <Tag className="w-2.5 h-2.5 text-[#C89B3C]" />
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>

                  {/* Bottom Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/95 via-[#17120D]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
                    <div className="flex-1 pr-2 min-w-0">
                      <p className="font-heading text-sm sm:text-base font-bold text-white truncate group-hover:text-[#E8C48A] transition-colors duration-200">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#B8ADA2] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Click to view in high resolution</span>
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C89B3C] text-[#17120D] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:bg-[#D6A84F] transition-all duration-200">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Luxury Lightbox Modal with Slider */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#17120D]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 pb-2">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-[#E8C48A] text-xs font-semibold backdrop-blur-md border border-white/15">
                {lightboxIndex + 1} / {displayItems.length} Photos
              </span>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#C89B3C]/20 text-[#E8C48A] text-xs font-medium border border-[#C89B3C]/30">
                {getCategoryLabel(displayItems[lightboxIndex].category)}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[#C89B3C] hover:text-[#17120D] flex items-center justify-center transition-colors border border-white/15"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Main Slider Canvas */}
          <div className="relative max-w-5xl w-full mx-auto flex items-center justify-center flex-1 my-auto">
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-1 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#17120D]/80 hover:bg-[#C89B3C] hover:text-[#17120D] text-white flex items-center justify-center transition-all border border-[#C89B3C]/30 shadow-2xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-h-[64vh] sm:max-h-[70vh] w-full flex flex-col items-center justify-center px-12 sm:px-16">
              <div className="relative max-h-[60vh] sm:max-h-[66vh] rounded-2xl overflow-hidden shadow-2xl border border-[#C89B3C]/30 ring-1 ring-white/10">
                <img
                  src={displayItems[lightboxIndex].image_url}
                  alt={displayItems[lightboxIndex].title}
                  className="max-h-[60vh] sm:max-h-[66vh] max-w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="font-heading mt-3.5 text-[#FBF7F0] text-sm sm:text-base font-semibold tracking-wide drop-shadow-md text-center">
                {displayItems[lightboxIndex].title}
              </p>
            </div>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-1 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#17120D]/80 hover:bg-[#C89B3C] hover:text-[#17120D] text-white flex items-center justify-center transition-all border border-[#C89B3C]/30 shadow-2xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip Slider */}
          <div className="w-full max-w-2xl mx-auto pt-2 z-10">
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 overflow-x-auto py-2 px-2 scrollbar-none">
              {displayItems.map((item, idx) => (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${
                    lightboxIndex === idx
                      ? "ring-2 ring-[#C89B3C] scale-110 opacity-100 shadow-xl border border-[#E8C48A]"
                      : "opacity-40 hover:opacity-85 border border-white/20"
                  }`}
                  aria-label={`Jump to image ${idx + 1}`}
                >
                  <img
                    src={optimizeImageUrl(item.image_url, 150)}
                    alt={item.title}
                    width={80}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
