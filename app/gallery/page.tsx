import { Metadata } from "next";
import { Sparkles, Camera } from "lucide-react";
import { getGalleryItems } from "@/lib/data/store";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Gallery | Photos & Visual Moments",
  description:
    "View our stunning photo gallery of Dubai desert safaris, featuring red dune bashing, sunset camel rides, live Arabian shows, and Bedouin camp dinners.",
  alternates: {
    canonical: "/gallery",
  },
};

export const revalidate = 3600;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Banner */}
      <section className="relative py-20 bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border-b border-amber-900/10 dark:border-amber-500/20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Desert Memories</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto">
            Dubai Desert Safari Photo Gallery
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore authentic moments captured across the golden sands of Dubai. Click any image to view in high resolution.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GalleryGrid items={items} />
      </section>

      <CTASection />
    </div>
  );
}
