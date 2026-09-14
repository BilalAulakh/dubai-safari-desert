"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Camera, X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Tag } from "lucide-react";
import { GalleryItem } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";

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
        return "Live Show";
      case "camp":
        return "Bedouin Camp";
      case "food":
        return "BBQ Feast";
      default:
        return "Desert Safari";
    }
  };

  return (
    <section className="relative py-12 sm:py-16 bg-[#F8F5EE] dark:bg-[#090D15] transition-colors duration-300 overflow-hidden">
      {/* Ambient Luxury Desert Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact & Beautiful Luxury Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 mb-2">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                Visual Desert Portfolio
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Glimpses of the <span className="gold-text-gradient">Arabian Dunes</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Real captured moments from thrilling red dune bashings to magical starlit Bedouin nights.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-amber-500/30 bg-white/60 dark:bg-white/5 backdrop-blur-md text-xs font-bold text-amber-700 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-amber-500 dark:hover:text-slate-950 transition-all duration-300 shadow-sm group shrink-0 w-fit"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>View Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Beautiful Compact Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {displayItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-36 sm:h-44 md:h-48 rounded-xl overflow-hidden shadow-sm bg-slate-900 cursor-pointer border border-amber-900/10 dark:border-amber-500/20 hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500"
            >
              {/* Photo */}
              <img
                src={optimizeImageUrl(item.image_url, 600)}
                alt={item.title}
                width={500}
                height={350}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Floating Frosted Category Tag */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-amber-300 text-[10px] font-semibold border border-white/15 shadow-sm">
                  <Tag className="w-2.5 h-2.5 text-amber-400" />
                  {getCategoryLabel(item.category)}
                </span>
              </div>

              {/* Cinematic Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3">
                <div className="flex-1 pr-2 min-w-0">
                  <p className="text-xs font-bold text-white truncate drop-shadow group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Click to view slider</span>
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
                  <Maximize2 className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Luxury Lightbox Modal with Slider */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md border border-white/15">
                {lightboxIndex + 1} / {displayItems.length} Photos
              </span>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30">
                {getCategoryLabel(displayItems[lightboxIndex].category)}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/25 flex items-center justify-center transition-colors border border-white/15"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Main Slider Canvas */}
          <div className="relative max-w-5xl w-full mx-auto flex items-center justify-center flex-1 my-auto">
            {/* Prev Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-1 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <div className="relative max-h-[62vh] sm:max-h-[68vh] w-full flex flex-col items-center justify-center px-10 sm:px-14">
              <div className="relative max-h-[58vh] sm:max-h-[64vh] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30 ring-1 ring-white/10">
                <img
                  src={displayItems[lightboxIndex].image_url}
                  alt={displayItems[lightboxIndex].title}
                  className="max-h-[58vh] sm:max-h-[64vh] max-w-full object-contain"
                  loading="eager"
                />
              </div>
              <p className="mt-3 text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md text-center">
                {displayItems[lightboxIndex].title}
              </p>
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-1 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip Slider */}
          <div className="w-full max-w-2xl mx-auto pt-2 z-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 px-2 scrollbar-none">
              {displayItems.map((item, idx) => (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-12 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 transition-all duration-300 ${
                    lightboxIndex === idx
                      ? "ring-2 ring-amber-400 scale-110 opacity-100 shadow-xl border border-amber-300"
                      : "opacity-40 hover:opacity-80 border border-white/20"
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


