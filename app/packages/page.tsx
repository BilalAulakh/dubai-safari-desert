import { Metadata } from "next";
import { Sparkles, ShieldCheck, Clock, MapPin } from "lucide-react";
import { getPackages } from "@/lib/data/store";
import PackageCard from "@/components/packages/PackageCard";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Packages & Tour Prices",
  description:
    "Explore our complete collection of Dubai desert safari tours: evening BBQ dinners, morning sunrise safaris, overnight desert camps, and private luxury Land Cruiser experiences.",
  alternates: {
    canonical: "/packages",
  },
};

export const revalidate = 3600;

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="bg-[#FCFBF8]">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Desert Tours</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dubai Desert Safari Packages
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Choose from authentic evening BBQ tours, sunrise morning treks, romantic starlight camps, or VIP private 4x4 safaris. All packages include door-to-door hotel pickup.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-300/80">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Complimentary Hotel Pickup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>No Advance Card Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Free 24h Cancellation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
