import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Activity } from "@/types";
import { optimizeImageUrl } from "@/lib/utils";

interface ActivitiesShowcaseProps {
  activities: Activity[];
}

export default function ActivitiesShowcase({ activities }: ActivitiesShowcaseProps) {
  const displayActivities = activities.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-[#FBF7F0] dark:bg-[#17120D] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C89B3C]/15 border border-[#C89B3C]/30 text-[#C89B3C] dark:text-[#E8C48A] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
              <span>Thrills & Traditions</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#17120D] dark:text-[#FBF7F0] tracking-tight leading-[1.15]">
              Dubai Desert Safari Activities
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B6258] dark:text-[#B8ADA2] max-w-2xl leading-relaxed">
              From heart-racing red dune power slides and ATV quad biking to serene sunset camel rides and mesmerizing Sufi Tanoura shows.
            </p>
          </div>

          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#C89B3C] hover:text-[#D6A84F] transition-colors group shrink-0"
          >
            <span>Explore All Activities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayActivities.map((act) => (
            <div
              key={act.id}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-[#17120D] h-80 flex flex-col justify-end p-6 sm:p-7 border border-[#C89B3C]/20 hover:border-[#C89B3C]/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={optimizeImageUrl(act.image, 600)}
                alt={act.name}
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out opacity-75 group-hover:opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17120D] via-[#17120D]/50 to-transparent" />

              <div className="relative z-10">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#E8C48A] transition-colors leading-snug">
                  {act.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#FBF7F0]/85 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>

                {act.highlights && act.highlights.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {act.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#17120D]/70 text-[#E8C48A] font-medium backdrop-blur-md border border-white/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
