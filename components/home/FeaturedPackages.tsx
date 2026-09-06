import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Package } from "@/types";
import PackageCard from "@/components/packages/PackageCard";

interface FeaturedPackagesProps {
  packages: Package[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const displayPackages = packages.slice(0, 4);

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Signature Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Dubai Safari Packages
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From adrenaline-packed red dune bashing to peaceful overnight starlight camps and VIP private Land Cruisers.
            </p>
          </div>

          <Link
            href="/packages"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
