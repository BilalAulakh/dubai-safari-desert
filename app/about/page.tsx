import { Metadata } from "next";
import Link from "next/link";
import { Compass, ShieldCheck, HeartHandshake, Award, MapPin, Users, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import CTASection from "@/components/home/CTASection";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export const metadata: Metadata = {
  title: "About Safari Dune Tours | Desert Safari Mission & Story",
  description:
    "Learn about Safari Dune Tours, our dedication to authentic Arabian hospitality, desert adventures, and unforgettable experiences in Dubai.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: "About Safari Dune Tours | Desert Safari Mission & Story",
    description:
      "Learn about Safari Dune Tours, our dedication to authentic Arabian hospitality, desert adventures, and unforgettable experiences in Dubai.",
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.name,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Hero */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-[#8C6214] dark:text-[#E8C48A]" />
            <span>Discover Our Story</span>
          </div>
          <h1 className="font-heading text-h1 font-extrabold text-white max-w-4xl mx-auto">
            About <span className="gold-text-gradient">Safari Dune Tours</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Connecting international travelers with the raw majesty, peaceful beauty, and warm hospitality of the Dubai desert.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="eyebrow">
              Our Heritage & Vision
            </span>
            <h2 className="font-heading text-h2 font-bold text-[#17120D] dark:text-[#FBF7F0]">
              Dedicated to Genuine Desert Adventures
            </h2>
            <p className="text-base text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed">
              Dubai is internationally renowned for ultra-modern skyscrapers and architectural marvels. Yet just beyond the city skyline lies a mesmerizing wilderness that has inspired travelers and Bedouin nomads for centuries.
            </p>
            <p className="text-base text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed">
              At <strong>Safari Dune Tours</strong>, our vision is to provide travelers with an experience that honors this rich natural heritage. From thrilling drives over the Lahbab red dunes to traditional open-air BBQ camps and Sufi Tanoura dance performances, every element of our tours is carefully organized.
            </p>

            <div className="pt-4 border-t border-[#C89B3C]/20 grid grid-cols-2 gap-4 text-xs font-semibold text-[#17120D] dark:text-[#FBF7F0]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Experienced Safari Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hotel Pickup Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Comfortable 4x4 Vehicles</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Authentic Bedouin Camps</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-[#C89B3C]/25 group">
            <img
              src="/images/hero-desert.webp"
              alt="Dubai desert safari guide with camel"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#F5EEE3] dark:bg-[#1D150E] border-y border-[#C89B3C]/15 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="eyebrow">
              Our Guiding Principles
            </span>
            <h2 className="font-heading mt-2 text-h2 font-bold text-[#17120D] dark:text-[#FBF7F0]">
              What Guides Safari Dune Tours
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2">Safety Above All</h3>
              <p className="text-sm text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed">
                We enforce rigorous vehicle maintenance, install certified internal roll-cages, and employ licensed safari drivers who undergo regular desert driving certifications.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2">Warm Arabian Hospitality</h3>
              <p className="text-sm text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed">
                From the moment our marshal arrives at your hotel lobby to the steaming cups of traditional Gahwa and fresh dates served at our camp, you are treated as an honored guest.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-[#241A12] border border-[#C89B3C]/20 shadow-sm hover:border-[#C89B3C]/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#C89B3C]/15 text-[#8C6214] dark:text-[#E8C48A] flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] mb-2">Quality Experiences</h3>
              <p className="text-sm text-[#5E554C] dark:text-[#B8ADA2] leading-relaxed">
                We believe in delivering genuine value. That means freshly prepared buffet meals, clean camp washroom facilities, and unhurried sunset photo stops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
