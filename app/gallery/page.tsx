import { Metadata } from "next";
import { Camera } from "lucide-react";
import { getGalleryItems, getGalleryCategories } from "@/lib/data/store";
import { SITE_CONFIG } from "@/lib/config/site";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Gallery | Photos & Visual Moments | Safari Dune Tours",
  description:
    "View our stunning photo gallery of Dubai desert safaris, featuring red dune bashing, sunset camel rides, live Arabian shows, and Bedouin camp dinners.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/gallery`,
  },
  openGraph: {
    title: "Dubai Desert Safari Gallery | Safari Dune Tours",
    description:
      "View our stunning photo gallery of Dubai desert safaris, featuring red dune bashing, sunset camel rides, live Arabian shows, and Bedouin camp dinners.",
    url: `${SITE_CONFIG.url}/gallery`,
    siteName: SITE_CONFIG.name,
  },
};

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export default async function GalleryPage() {
  const [items, categories] = await Promise.all([getGalleryItems(), getGalleryCategories()]);

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Desert Memories</span>
          </div>
          <h1 className="font-heading text-h1 font-extrabold text-white max-w-4xl mx-auto">
            Dubai Desert Safari <span className="gold-text-gradient">Photo Gallery</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Explore authentic moments captured across the golden sands of Dubai. Click any image to view in high resolution.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid items={items} categories={categories} />
      </section>

      <CTASection />
    </div>
  );
}
