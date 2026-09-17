import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Package } from "@/types";
import PackageCard from "@/components/packages/PackageCard";
import ScrollReveal from "@/components/common/ScrollReveal";

interface FeaturedPackagesProps {
  packages: Package[];
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  const displayPackages = packages.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>Signature Experiences</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
                Featured Dubai Safari Packages
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-2xl leading-relaxed">
                From adrenaline-packed red dune bashing to peaceful overnight starlight camps and VIP private Land Cruisers.
              </p>
            </div>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#C89B3C] hover:text-[#D6A84F] transition-colors group shrink-0"
            >
              <span>View All Packages</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Grid with subtle card stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayPackages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 90}>
              <PackageCard pkg={pkg} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
