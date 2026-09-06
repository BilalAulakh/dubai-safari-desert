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
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? "bg-slate-900 text-amber-400 shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md bg-slate-900 cursor-pointer border border-slate-200"
          >
            <img
              src={optimizeImageUrl(item.image_url, 600)}
              alt={item.title}
              width={600}
              height={400}
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
              <span className="text-sm font-semibold text-white truncate max-w-[80%]">
                {item.title}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Current image and title */}
          <div className="relative max-w-4xl max-h-[80vh] w-full h-[70vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].image_url}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-full object-contain"
                loading="eager"
              />
            </div>
            <p className="mt-4 text-white text-sm font-medium">
              {filteredItems[lightboxIndex].title} ({lightboxIndex + 1} of{" "}
              {filteredItems.length})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
