"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Package } from "@/types";
import PackageCard from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";

interface FeaturedPackagesProps {
  packages: Package[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use all active packages
  const displayPackages = packages.filter((p) => p.active);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 24;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, index), displayPackages.length - 1));
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [displayPackages]);

  const handleScroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : container.offsetWidth * 0.85;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const card = container.children[index] as HTMLElement | null;
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title & Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#8C6214] dark:text-[#E8C48A] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Signature Desert Tours</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
                Top Rated Dubai Desert Safaris & Buggy Rides
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-2xl leading-relaxed">
                Swipe through our complete collection of red dune bashes, quad bike safaris, and luxury Bedouin camps.
              </p>
            </div>

            {/* Slider Arrow Controls & View All Link */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className="p-3 rounded-full border border-[#C89B3C]/30 bg-white dark:bg-[#241A12] text-[#17120D] dark:text-white shadow-sm hover:bg-[#C89B3C] hover:text-[#17120D] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                  aria-label="Previous package"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className="p-3 rounded-full border border-[#C89B3C]/30 bg-white dark:bg-[#241A12] text-[#17120D] dark:text-white shadow-sm hover:bg-[#C89B3C] hover:text-[#17120D] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                  aria-label="Next package"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <Link
                href="/packages"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C89B3C] hover:text-[#D6A84F] transition-colors ml-2"
              >
                <span>View All ({packages.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Interactive Carousel Container */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-6 pt-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayPackages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="w-[88vw] sm:w-[380px] lg:w-[390px] shrink-0 snap-start flex flex-col"
              >
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Pagination Dots & Mobile Indicator */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            {displayPackages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-[#C89B3C]"
                    : "w-2 bg-[#C89B3C]/30 hover:bg-[#C89B3C]/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#8C6214] dark:text-[#E8C48A]">
            <span>
              Slide {activeIndex + 1} of {displayPackages.length}
            </span>
            <span className="text-[#C89B3C]/40">•</span>
            <Link
              href="/packages"
              className="hover:underline inline-flex items-center gap-1 text-[#C89B3C]"
            >
              <span>Explore All Tours</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
