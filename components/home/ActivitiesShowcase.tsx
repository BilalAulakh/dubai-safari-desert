import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Activity } from "@/types";

interface ActivitiesShowcaseProps {
  activities: Activity[];
}

export default function ActivitiesShowcase({ activities }: ActivitiesShowcaseProps) {
  const displayActivities = activities.slice(0, 6);

  return (
    <section className="py-20 bg-[#FCFBF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Thrills & Traditions
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Dubai Safari Desert Activities
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl">
              From the surge of power on towering dunes to the tranquility of camel trekking and the spectacle of Arabian fire artists.
            </p>
          </div>

          <Link
            href="/activities"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors group"
          >
            <span>Explore All 11 Activities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayActivities.map((act) => (
            <div
              key={act.id}
              className="group relative rounded-2xl overflow-hidden shadow-md bg-slate-900 h-72 flex flex-col justify-end p-6 border border-amber-900/10"
            >
              <Image
                src={act.image}
                alt={act.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-70 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10">
                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {act.name}
                </h3>
                <p className="mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>

                {act.highlights && act.highlights.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {act.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-amber-200 font-medium backdrop-blur-sm"
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
