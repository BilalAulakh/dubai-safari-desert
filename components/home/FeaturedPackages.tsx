"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard, { type PackageCardData } from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";

interface FeaturedPackagesProps {
  packages: PackageCardData[];
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


  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title & Navigation Controls */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div>
              <div className="eyebrow">
                <span>Curated Safari Experiences</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#17120D] dark:text-[#FBF7F0] leading-[1.1]">
                Signature Dubai Desert Safaris & Tours
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-2xl leading-relaxed">
                Explore our hand-picked collection of red dune bashes, quad bike adventures, and authentic Bedouin camps.
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
          >
            {displayPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-[88vw] sm:w-[380px] lg:w-[390px] shrink-0 snap-start flex flex-col"
              >
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicator & Explore All Link */}
        <div className="mt-4 flex items-center justify-between sm:justify-end gap-4 pt-2">
          <span className="text-xs font-semibold text-[#8C6214] dark:text-[#E8C48A]">
            Showing {activeIndex + 1} of {displayPackages.length} packages
          </span>
          <span className="hidden sm:inline text-[#C89B3C]/40">•</span>
          <Link
            href="/packages"
            className="hover:underline inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#C89B3C]"
          >
            <span>Explore All Packages ({packages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
