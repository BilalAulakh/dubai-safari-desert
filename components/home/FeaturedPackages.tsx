"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PackageCard, { type PackageCardData } from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";

interface FeaturedPackagesProps {
  packages: PackageCardData[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Use all active packages
  const displayPackages = packages.filter((p) => p.active);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
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


  const arrowClass =
    "flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-line text-ink transition-colors hover:bg-gold-500 hover:text-dune-900 hover:ring-gold-500 disabled:pointer-events-none disabled:opacity-30 cursor-pointer";

  return (
    <section className="section-y overflow-hidden bg-page">
      <div className="container-page">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end lg:mb-16">
            <div className="max-w-2xl">
              <p className="kicker">Curated Safari Experiences</p>
              <h2 className="mt-5 font-display text-h2 font-semibold text-ink">
                Signature Dubai Desert Safaris & Tours
              </h2>
              <p className="mt-5 text-body-lg text-muted">
                Explore our hand-picked collection of red dune bashes, quad bike adventures, and authentic Bedouin camps.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className={arrowClass}
                aria-label="Previous package"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className={arrowClass}
                aria-label="Next package"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel bleeds to the viewport edge on small screens */}
        <div className="-mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <div
            ref={sliderRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8 pt-2 lg:gap-8"
          >
            {displayPackages.map((pkg) => (
              <div key={pkg.id} className="flex w-[85vw] max-w-[380px] shrink-0 snap-start flex-col sm:w-[360px]">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
