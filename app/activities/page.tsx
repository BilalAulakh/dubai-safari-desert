import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { getActivities } from "@/lib/data/store";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dubai Desert Safari Activities | Dune Bashing, Camel Ride & Quad Biking",
  description:
    "Discover the best desert safari activities in Dubai: 4x4 red dune bashing, camel trekking, sandboarding, quad bikes, dune buggies, fire shows, and BBQ dining.",
  alternates: {
    canonical: "/activities",
  },
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <div className="bg-[#FCFBF8]">
      {/* Banner */}
      <section className="relative py-20 bg-[#0B0F17] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Adventures & Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Dubai Desert Safari Activities
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Explore every exciting dimension of the Arabian desert. From heart-pounding dune bashing and quad biking to peaceful camel caravans and hypnotic cultural stage shows.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                <img
                  src={activity.image}
                  alt={activity.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {activity.description}
                  </p>

                  {activity.highlights && (
                    <div className="space-y-1.5 mb-6">
                      {activity.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/booking"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
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
