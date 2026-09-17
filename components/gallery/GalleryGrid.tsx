"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GalleryItem } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "desert", label: "Desert Landscapes" },
    { id: "dune-bashing", label: "Dune Bashing" },
    { id: "camp", label: "Bedouin Camp" },
    { id: "food", label: "BBQ & Dining" },
    { id: "entertainment", label: "Live Shows" },
    { id: "activities", label: "Activities" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              selectedCategory === cat.id
                ? "bg-[#C89B3C] text-[#17120D] shadow-md font-bold"
                : "bg-white dark:bg-[#241A12] text-[#6B6258] dark:text-[#B8ADA2] hover:text-[#C89B3C] border border-[#C89B3C]/25"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative h-44 sm:h-60 rounded-2xl overflow-hidden shadow-sm bg-[#17120D] cursor-pointer border border-[#C89B3C]/20 hover:border-[#C89B3C]/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={optimizeImageUrl(item.image_url, 600)}
              alt={item.title}
              width={600}
              height={400}
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/90 via-[#17120D]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <span className="text-xs sm:text-sm font-heading font-bold text-white truncate max-w-[80%]">
                {item.title}
              </span>
              <div className="w-8 h-8 rounded-full bg-[#C89B3C] text-[#17120D] flex items-center justify-center shrink-0 shadow group-hover:scale-105 transition-transform duration-200">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Full Slider & Thumbnails */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full max-w-5xl mx-auto z-10 pb-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-md border border-white/15">
              {lightboxIndex + 1} / {filteredItems.length} Photos
            </span>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/25 flex items-center justify-center transition-colors border border-white/15"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Slider Canvas */}
          <div className="relative max-w-5xl w-full mx-auto flex items-center justify-center flex-1 my-auto">
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-1 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative max-h-[62vh] sm:max-h-[68vh] w-full flex flex-col items-center justify-center px-12">
              <img
                src={filteredItems[lightboxIndex].image_url}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[58vh] sm:max-h-[64vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                loading="eager"
              />
              <p className="mt-3 text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md text-center">
                {filteredItems[lightboxIndex].title}
              </p>
            </div>

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-1 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all border border-white/20 shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Slider Strip */}
          <div className="w-full max-w-2xl mx-auto pt-2 z-10">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto py-2 px-2 scrollbar-none">
              {filteredItems.map((item, idx) => (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-12 h-9 sm:w-14 sm:h-11 rounded-lg overflow-hidden shrink-0 transition-all ${
                    lightboxIndex === idx
                      ? "ring-2 ring-amber-400 scale-105 opacity-100 shadow-lg border border-amber-300"
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
    </div>
  );
}
