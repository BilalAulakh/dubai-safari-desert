"use client";

import Link from "next/link";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Package } from "@/types";
import { formatPrice, optimizeImageUrl } from "@/lib/utils";

interface PackageCardProps {
  pkg: Package;
  featuredOnly?: boolean;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 dark:border-[#C89B3C]/25 shadow-sm hover:shadow-[0_14px_32px_rgba(23,18,13,0.12)] hover:border-[#C89B3C]/55 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image Container with Cinematic Overlay */}
      <div className="relative h-60 w-full overflow-hidden bg-[#17120D]">
        <img
          src={optimizeImageUrl(pkg.main_image, 600)}
          alt={pkg.name}
          width={600}
          height={400}
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/90 via-[#17120D]/30 to-transparent group-hover:bg-black/15 transition-colors duration-300" />

        {/* Featured Badge */}
        {pkg.featured && (
          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md bg-[#C89B3C] text-[#17120D] text-[11px] font-bold uppercase tracking-wider shadow-md">
            Signature Tour
          </div>
        )}

        {/* Duration Chip */}
        <div className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#17120D]/75 backdrop-blur-md text-white text-xs font-medium border border-white/10">
          <Clock className="w-3.5 h-3.5 text-[#E8C48A]" />
          <span>{pkg.duration}</span>
        </div>

        {/* Starting Price Tag */}
        <div className="absolute bottom-3.5 right-3.5 text-right">
          <span className="text-[10px] text-[#E8C48A] uppercase tracking-wider font-semibold block">From</span>
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {formatPrice(pkg.price)}
          </span>
          <span className="text-[11px] text-[#FBF7F0]/80"> / guest</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] group-hover:text-[#C89B3C] transition-colors mb-2 leading-snug">
            <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
          </h3>
          <p className="text-sm text-[#6B6258] dark:text-[#B8ADA2] line-clamp-2 leading-relaxed mb-5">
            {pkg.short_description}
          </p>

          {/* Highlights List */}
          <div className="space-y-2 mb-6">
            {pkg.inclusions.slice(0, 4).map((inc, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-[#17120D]/90 dark:text-[#FBF7F0]/90">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-5 border-t border-[#C89B3C]/15 dark:border-white/10">
          <Link
            href={`/packages/${pkg.slug}`}
            className="w-full py-2.5 px-3 text-center rounded-xl border border-[#C89B3C]/30 text-[#17120D] dark:text-[#FBF7F0] hover:border-[#C89B3C] hover:bg-[#C89B3C]/10 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />
          </Link>

          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="btn-gold w-full py-2.5 px-3 text-center text-xs font-bold uppercase tracking-wider shadow-sm justify-center group-hover:brightness-105 group-hover:shadow-md transition-all duration-200"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
