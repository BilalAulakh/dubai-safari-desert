import { Metadata } from "next";
import { ShieldCheck, Clock, MapPin } from "lucide-react";
import { getPackages } from "@/lib/data/store";
import { SITE_CONFIG } from "@/lib/config/site";
import PackagesCatalogFilter from "@/components/packages/PackagesCatalogFilter";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Packages & Tour Prices | Safari Dune Tours",
  description:
    "Explore our complete collection of Dubai desert safari tours: evening BBQ dinners, morning sunrise safaris, overnight desert camps, and private luxury Land Cruiser experiences.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/packages`,
  },
  openGraph: {
    title: "Dubai Desert Safari Packages & Tour Prices | Safari Dune Tours",
    description:
      "Explore our complete collection of Dubai desert safari tours: evening BBQ dinners, morning sunrise safaris, overnight desert camps, and private luxury Land Cruiser experiences.",
    url: `${SITE_CONFIG.url}/packages`,
    siteName: SITE_CONFIG.name,
  },
};

export const revalidate = 3600;

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Header Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Curated Desert Tours</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            Dubai Desert Safari Packages
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Choose from authentic evening BBQ tours, sunrise morning treks, romantic starlight camps, or VIP private 4x4 safaris. All packages include door-to-door hotel pickup.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#E8C48A]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C89B3C]" />
              <span>Complimentary Hotel Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C89B3C]" />
              <span>No Advance Card Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C89B3C]" />
              <span>Free 24h Cancellation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Filter Catalog Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PackagesCatalogFilter initialPackages={packages} />
      </section>

      <CTASection />
    </div>
  );
}
