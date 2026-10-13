import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getActivities } from "@/lib/data/store";
import { optimizeImageUrl } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/config/site";
import CTASection from "@/components/home/CTASection";

export const revalidate = 86400; // 1 day; admin saves refresh pages on demand

export const metadata: Metadata = {
  title: "Desert Safari Activities in Dubai | Safari Dune Tours",
  description:
    "Discover the best desert safari activities in Dubai: 4x4 red dune bashing, camel trekking, sandboarding, quad bikes, dune buggies, fire shows, and BBQ dining.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/activities`,
  },
  openGraph: {
    title: "Dubai Desert Safari Activities | Safari Dune Tours",
    description:
      "Discover the best desert safari activities in Dubai: 4x4 red dune bashing, camel trekking, sandboarding, quad bikes, dune buggies, fire shows, and BBQ dining.",
    url: `${SITE_CONFIG.url}/activities`,
    siteName: SITE_CONFIG.name,
  },
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="bg-[#FBF7F0] dark:bg-[#17120D] text-[#17120D] dark:text-[#FBF7F0] transition-colors duration-200">
      {/* Banner */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 bg-[#17120D] text-white border-b border-[#C89B3C]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C89B3C] via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Adventures & Heritage</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.08]">
            Dubai Desert Safari <span className="gold-text-gradient">Activities</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#B8ADA2] max-w-2xl mx-auto leading-relaxed">
            Explore every exciting dimension of the Arabian desert. From heart-pounding dune bashing and quad biking to peaceful camel caravans and hypnotic cultural stage shows.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white dark:bg-[#241A12] rounded-2xl overflow-hidden border border-[#C89B3C]/20 hover:border-[#C89B3C]/50 shadow-sm hover:shadow-[0_16px_36px_rgba(23,18,13,0.15)] transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#17120D]">
                <img
                  src={optimizeImageUrl(activity.image, 600)}
                  alt={activity.name}
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17120D]/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#17120D] dark:text-[#FBF7F0] group-hover:text-[#C89B3C] transition-colors mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-[#6B6258] dark:text-[#B8ADA2] leading-relaxed mb-4">
                    {activity.description}
                  </p>

                  {activity.highlights && (
                    <div className="space-y-1.5 mb-6">
                      {activity.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#17120D]/90 dark:text-[#FBF7F0]/90 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/booking"
                  className="btn-gold w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                >
                  <span>Book This Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
