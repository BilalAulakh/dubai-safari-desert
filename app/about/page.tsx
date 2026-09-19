import { Metadata } from "next";
import Link from "next/link";
import { Compass, ShieldCheck, HeartHandshake, Award, MapPin, Users, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";
import CTASection from "@/components/home/CTASection";

export const revalidate = 3600;

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
    <div className="bg-[#FCFBF8] dark:bg-[#080B11] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Hero */}
      <section className="relative py-20 bg-[#F4EFE6] dark:bg-[#0B0F17] text-slate-900 dark:text-white border-b border-amber-900/10 dark:border-amber-500/20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Discover Our Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto">
            About Safari Dune Tours
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Connecting international travelers with the raw majesty, peaceful beauty, and warm hospitality of the Dubai desert.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Our Heritage & Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Dedicated to Genuine Desert Adventures
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Dubai is internationally renowned for ultra-modern skyscrapers and architectural marvels. Yet just beyond the city skyline lies a mesmerizing wilderness that has inspired travelers and Bedouin nomads for centuries.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              At <strong>Safari Dune Tours</strong>, our vision is to provide travelers with an experience that honors this rich natural heritage. From thrilling drives over the Lahbab red dunes to traditional open-air BBQ camps and Sufi Tanoura dance performances, every element of our tours is carefully organized.
            </p>

            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Experienced Safari Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Complimentary Hotel Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Comfortable 4x4 Vehicles</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Authentic Bedouin Camps</span>
              </div>
            </div>
          </div>

          <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop"
              alt="Dubai desert safari guide with camel"
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-[#F8F5EE] border-y border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Our Pillars
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
              What Guides Safari Dune
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Safety Above All</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We enforce rigorous vehicle maintenance, install certified internal roll-cages, and employ licensed safari drivers who undergo regular desert driving certifications.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Warm Arabian Hospitality</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From the moment our marshal arrives at your hotel lobby to the steaming cups of traditional Gahwa and fresh dates served at our camp, you are treated as an honored guest.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Quality Experiences</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
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
