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
    <div className="group flex flex-col rounded-2xl bg-white border border-amber-900/10 shadow-md hover:shadow-xl hover:border-amber-500/30 transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={optimizeImageUrl(pkg.main_image, 600)}
          alt={pkg.name}
          width={600}
          height={400}
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Featured Badge */}
        {pkg.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow">
            Bestseller
          </div>
        )}

        {/* Duration Chip */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{pkg.duration}</span>
        </div>

        {/* Starting Price Tag */}
        <div className="absolute bottom-3 right-3 text-right">
          <span className="text-[10px] text-amber-200 uppercase font-semibold block">From</span>
          <span className="text-xl font-extrabold text-white">
            {formatPrice(pkg.price)}
          </span>
          <span className="text-[10px] text-slate-300"> / person</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
            <Link href={`/packages/${pkg.slug}`}>{pkg.name}</Link>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {pkg.short_description}
          </p>

          {/* Highlights List */}
          <div className="space-y-1.5 mb-6">
            {pkg.inclusions.slice(0, 4).map((inc, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
          <Link
            href={`/packages/${pkg.slug}`}
            className="w-full py-2.5 px-3 text-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          <Link
            href={`/booking?package=${encodeURIComponent(pkg.id)}`}
            className="w-full py-2.5 px-3 text-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 text-xs font-bold uppercase tracking-wider shadow transition-all hover:scale-[1.02]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
